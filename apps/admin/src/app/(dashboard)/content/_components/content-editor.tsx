"use client";

import { Button } from "@beavercoding/ui/components/button";
import { Input } from "@beavercoding/ui/components/input";
import { Label } from "@beavercoding/ui/components/label";
import { Textarea } from "@beavercoding/ui/components/textarea";
import { Loader2, Pencil, X } from "lucide-react";
import { useState, useTransition } from "react";
import { upsertContent } from "../actions";

interface ContentItem {
	id: string;
	key: string;
	title: string | null;
	body: string | null;
	updated_at: string | null;
}

interface ContentEditorProps {
	item: ContentItem;
}

export function ContentEditor({ item }: ContentEditorProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();

	function handleSubmit(formData: FormData) {
		startTransition(async () => {
			await upsertContent(formData);
			setIsEditing(false);
		});
	}

	if (!isEditing) {
		return (
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 flex-1 space-y-1">
					<div className="flex items-center gap-2">
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
							{item.key}
						</code>
						{item.title && (
							<span className="text-sm font-medium">{item.title}</span>
						)}
					</div>
					{item.body ? (
						<p className="line-clamp-2 text-xs text-muted-foreground">
							{item.body}
						</p>
					) : (
						<p className="text-xs italic text-muted-foreground">
							(내용 없음)
						</p>
					)}
					{item.updated_at && (
						<p className="text-xs text-muted-foreground">
							수정:{" "}
							{new Date(item.updated_at).toLocaleDateString("ko-KR", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</p>
					)}
				</div>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsEditing(true)}
					className="shrink-0"
				>
					<Pencil className="size-3.5" />
					편집
				</Button>
			</div>
		);
	}

	return (
		<form action={handleSubmit} className="space-y-4">
			<input type="hidden" name="key" value={item.key} />

			<div className="flex items-center gap-2">
				<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
					{item.key}
				</code>
				<span className="text-xs text-muted-foreground">편집 중</span>
			</div>

			<div className="space-y-1.5">
				<Label htmlFor={`title-${item.id}`} className="text-xs">
					제목
				</Label>
				<Input
					id={`title-${item.id}`}
					name="title"
					defaultValue={item.title ?? ""}
					placeholder="콘텐츠 제목"
					className="h-8 text-sm"
				/>
			</div>

			<div className="space-y-1.5">
				<Label htmlFor={`body-${item.id}`} className="text-xs">
					본문
				</Label>
				<Textarea
					id={`body-${item.id}`}
					name="body"
					defaultValue={item.body ?? ""}
					placeholder="콘텐츠 내용..."
					className="min-h-[120px] text-sm"
				/>
			</div>

			<div className="flex items-center gap-2">
				<Button type="submit" size="sm" disabled={isPending}>
					{isPending && <Loader2 className="size-3.5 animate-spin" />}
					{isPending ? "저장 중..." : "저장"}
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => setIsEditing(false)}
					disabled={isPending}
				>
					<X className="size-3.5" />
					취소
				</Button>
			</div>
		</form>
	);
}
