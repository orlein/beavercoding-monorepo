"use client";

import { Button } from "@beavercoding/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@beavercoding/ui/components/card";
import { Input } from "@beavercoding/ui/components/input";
import { Label } from "@beavercoding/ui/components/label";
import { Textarea } from "@beavercoding/ui/components/textarea";
import { Loader2, Plus, X } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { upsertContent } from "../actions";

export function AddContentForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	function handleSubmit(formData: FormData) {
		startTransition(async () => {
			await upsertContent(formData);
			formRef.current?.reset();
			setIsOpen(false);
		});
	}

	if (!isOpen) {
		return (
			<Button onClick={() => setIsOpen(true)} variant="outline">
				<Plus className="size-4" />
				새 콘텐츠 추가
			</Button>
		);
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">새 콘텐츠 추가</CardTitle>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => setIsOpen(false)}
					>
						<X className="size-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<form ref={formRef} action={handleSubmit} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="new-key">키 (고유 식별자) *</Label>
						<Input
							id="new-key"
							name="key"
							required
							placeholder="예: hero-title, about-body"
							className="font-mono"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="new-title">제목</Label>
						<Input
							id="new-title"
							name="title"
							placeholder="콘텐츠 제목"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="new-body">본문</Label>
						<Textarea
							id="new-body"
							name="body"
							placeholder="콘텐츠 내용..."
							className="min-h-[100px]"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Button type="submit" size="sm" disabled={isPending}>
							{isPending && <Loader2 className="size-4 animate-spin" />}
							{isPending ? "추가 중..." : "추가"}
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(false)}
							disabled={isPending}
						>
							취소
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
