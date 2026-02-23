import { Context, type Effect } from "effect";
import type { BlogPost } from "../../../domain/entities/blog-post.js";
import type { ContentNotFoundError } from "../../../domain/errors/index.js";

export interface BlogPostRepositoryService {
	readonly findPublished: () => Effect.Effect<readonly BlogPost[]>;
	readonly findBySlug: (
		slug: string,
	) => Effect.Effect<BlogPost, ContentNotFoundError>;
	readonly findById: (
		id: string,
	) => Effect.Effect<BlogPost, ContentNotFoundError>;
}

export class BlogPostRepository extends Context.Tag(
	"@ddd-content/BlogPostRepository",
)<BlogPostRepository, BlogPostRepositoryService>() {}
