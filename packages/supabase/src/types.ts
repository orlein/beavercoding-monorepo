// This file will be replaced by `pnpm run generate` (supabase gen types typescript --local)
// Manually maintained until Supabase CLI generates the real types.

export type PostStatus = "draft" | "published" | "hidden";

export interface BlogPostRow {
	id: string;
	title: string;
	slug: string;
	body: string | null;
	status: PostStatus;
	author_id: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface StaticContentRow {
	id: string;
	key: string;
	title: string | null;
	body: string | null;
	updated_by: string | null;
	updated_at: string | null;
}

type GenericRelationshipShape = {
	foreignKeyName: string;
	columns: string[];
	isOneToOne?: boolean;
	referencedRelation: string;
	referencedColumns: string[];
}[];

export type Database = {
	public: {
		Tables: {
			blog_posts: {
				Row: BlogPostRow;
				Insert: {
					id?: string;
					title: string;
					slug: string;
					body?: string | null;
					status?: PostStatus;
					author_id: string;
					created_at?: string | null;
					updated_at?: string | null;
				};
				Update: {
					id?: string;
					title?: string;
					slug?: string;
					body?: string | null;
					status?: PostStatus;
					author_id?: string;
					created_at?: string | null;
					updated_at?: string | null;
				};
				Relationships: GenericRelationshipShape;
			};
			static_contents: {
				Row: StaticContentRow;
				Insert: {
					id?: string;
					key: string;
					title?: string | null;
					body?: string | null;
					updated_by?: string | null;
					updated_at?: string | null;
				};
				Update: {
					id?: string;
					key?: string;
					title?: string | null;
					body?: string | null;
					updated_by?: string | null;
					updated_at?: string | null;
				};
				Relationships: GenericRelationshipShape;
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			post_status: PostStatus;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};
