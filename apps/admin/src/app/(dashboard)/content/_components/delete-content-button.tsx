"use client";

import { Button } from "@beavercoding/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@beavercoding/ui/components/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteContent } from "../actions";

interface DeleteContentButtonProps {
	id: string;
	contentKey: string;
}

export function DeleteContentButton({
	id,
	contentKey,
}: DeleteContentButtonProps) {
	const [isPending, startTransition] = useTransition();

	function handleDelete() {
		startTransition(async () => {
			await deleteContent(id);
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="text-destructive hover:text-destructive"
				>
					<Trash2 className="size-3.5" />
					<span className="sr-only">삭제</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>콘텐츠 삭제</DialogTitle>
					<DialogDescription>
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
							{contentKey}
						</code>{" "}
						항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending && <Loader2 className="size-4 animate-spin" />}
						{isPending ? "삭제 중..." : "삭제"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
