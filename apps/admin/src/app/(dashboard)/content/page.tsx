import { createServerClient } from "@beavercoding/supabase/server";
import type { StaticContentRow } from "@beavercoding/supabase/types";
import { Card, CardContent } from "@beavercoding/ui/components/card";
import { Separator } from "@beavercoding/ui/components/separator";
import { Settings } from "lucide-react";
import { AddContentForm } from "./_components/add-content-form";
import { ContentEditor } from "./_components/content-editor";
import { DeleteContentButton } from "./_components/delete-content-button";

type ContentListRow = Pick<
	StaticContentRow,
	"id" | "key" | "title" | "body" | "updated_at"
>;

export default async function StaticContentPage() {
	const supabase = await createServerClient();

	// biome-ignore lint/suspicious/noExplicitAny: placeholder DB types
	const { data: contents, error } = (await (supabase as any)
		.from("static_contents")
		.select("id, key, title, body, updated_at")
		.order("key", { ascending: true })) as {
		data: ContentListRow[] | null;
		error: { message: string } | null;
	};

	if (error) {
		throw new Error(`Failed to fetch contents: ${error.message}`);
	}

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">
						Static Content
					</h1>
					<p className="text-sm text-muted-foreground">
						사이트의 정적 콘텐츠를 관리합니다.
					</p>
				</div>
				<AddContentForm />
			</div>

			{/* Empty state */}
			{(!contents || contents.length === 0) && (
				<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
					<Settings className="mb-4 size-10 text-muted-foreground" />
					<p className="text-sm font-medium">등록된 정적 콘텐츠가 없습니다</p>
					<p className="mt-1 text-xs text-muted-foreground">
						상단의 &quot;새 콘텐츠 추가&quot; 버튼으로 첫 번째 항목을
						추가하세요.
					</p>
				</div>
			)}

			{/* Content list */}
			{contents && contents.length > 0 && (
				<Card>
					<CardContent className="divide-y p-0">
						{contents.map((item, index) => (
							<div key={item.id}>
								{index > 0 && <Separator />}
								<div className="flex items-start gap-4 p-4">
									<div className="min-w-0 flex-1">
										<ContentEditor item={item} />
									</div>
									<DeleteContentButton id={item.id} contentKey={item.key} />
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
