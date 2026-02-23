// Domain

// Application
export type {
	BlogPostDto,
	StaticContentDto,
} from "./application/dtos/index.js";
export {
	toBlogPostDto,
	toStaticContentDto,
} from "./application/mappers/index.js";
export {
	getPostBySlug,
	getPublishedPosts,
	getStaticContent,
} from "./application/services/index.js";
export type { BlogPost } from "./domain/entities/blog-post.js";
export type { StaticContent } from "./domain/entities/static-content.js";
export {
	ContentNotFoundError,
	SlugAlreadyExistsError,
} from "./domain/errors/index.js";
export {
	ContentUpdated,
	PostPublished,
	PostUpdated,
} from "./domain/events/index.js";
export {
	ContentBody,
	ContentId,
	ContentStatus,
	Slug,
} from "./domain/value-objects/index.js";
// Infrastructure — Adapters
export {
	BlogPostRepositoryLive,
	StaticContentRepositoryLive,
} from "./infrastructure/adapters/outbound/index.js";
// Infrastructure — Layer
export {
	ContentLive,
	ContentRepositories,
} from "./infrastructure/layer.js";
export type { ContentQueryPort } from "./infrastructure/ports/inbound/index.js";
export type {
	BlogPostRepositoryService,
	StaticContentRepositoryService,
} from "./infrastructure/ports/outbound/index.js";
// Infrastructure — Ports
export {
	BlogPostRepository,
	StaticContentRepository,
} from "./infrastructure/ports/outbound/index.js";
// Infrastructure — Schema
export { blogPosts } from "./infrastructure/schema/blog-posts.js";
export { staticContents } from "./infrastructure/schema/static-contents.js";
