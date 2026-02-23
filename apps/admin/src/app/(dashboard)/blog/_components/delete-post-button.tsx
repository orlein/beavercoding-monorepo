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
import { deletePost } from "../actions";

interface DeletePostButtonProps {
	id: string;
	title: string;
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
	const [isPending, startTransition] = useTransition();

	function handleDelete() {
		startTransition(async () => {
			await deletePost(id);
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" size="sm">
					<Trash2 className="size-3.5" />
					<span className="sr-only">삭제</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>글 삭제</DialogTitle>
					<DialogDescription>
						<span className="font-medium">&quot;{title}&quot;</span>을(를)
						삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
