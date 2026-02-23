"use client";

import { Button } from "@beavercoding/ui/components/button";
import { Input } from "@beavercoding/ui/components/input";
import { Label } from "@beavercoding/ui/components/label";
import { Textarea } from "@beavercoding/ui/components/textarea";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import type { PostStatus } from "../actions";

const STATUS_OPTIONS: { value: PostStatus; label: string }[] = [
	{ value: "draft", label: "Draft" },
	{ value: "published", label: "Published" },
	{ value: "hidden", label: "Hidden" },
];

interface PostFormProps {
	action: (formData: FormData) => Promise<{ error?: string } | undefined>;
	defaultValues?: {
		title?: string;
		body?: string;
		status?: PostStatus;
	};
	submitLabel?: string;
}

export function PostForm({
	action,
	defaultValues,
	submitLabel = "저장",
}: PostFormProps) {
	const [status, setStatus] = useState<PostStatus>(
		defaultValues?.status ?? "draft",
	);

	const [state, formAction, isPending] = useActionState(
		async (_prev: { error?: string } | undefined, formData: FormData) => {
			return action(formData);
		},
		undefined,
	);

	return (
		<form action={formAction} className="space-y-6">
			{/* Hidden field carries the status value into FormData */}
			<input type="hidden" name="status" value={status} />

			{state?.error && (
				<div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{state.error}
				</div>
			)}

			<div className="space-y-2">
				<Label htmlFor="title">제목 *</Label>
				<Input
					id="title"
					name="title"
					required
					placeholder="블로그 글 제목"
					defaultValue={defaultValues?.title}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="body">본문</Label>
				<Textarea
					id="body"
					name="body"
					placeholder="마크다운 형식으로 작성하세요..."
					className="min-h-[320px] font-mono text-sm"
					defaultValue={defaultValues?.body}
				/>
			</div>

			<fieldset className="space-y-2">
				<Label asChild>
					<legend>상태</legend>
				</Label>
				<div className="flex gap-2">
					{STATUS_OPTIONS.map((opt) => (
						<button
							key={opt.value}
							type="button"
							onClick={() => setStatus(opt.value)}
							className={[
								"rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								status === opt.value
									? "border-primary bg-primary text-primary-foreground"
									: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
							].join(" ")}
							aria-pressed={status === opt.value}
						>
							{opt.label}
						</button>
					))}
				</div>
			</fieldset>

			<div className="flex items-center gap-3">
				<Button type="submit" disabled={isPending}>
					{isPending && <Loader2 className="size-4 animate-spin" />}
					{isPending ? "저장 중..." : submitLabel}
				</Button>
				<Button type="button" variant="outline" asChild>
					<Link href="/blog">취소</Link>
				</Button>
			</div>
		</form>
	);
}
