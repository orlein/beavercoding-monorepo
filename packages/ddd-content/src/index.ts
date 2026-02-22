// Domain
export type { BlogPost } from "./domain/entities/blog-post.js";
export type { StaticContent } from "./domain/entities/static-content.js";
export {
  ContentId,
  Slug,
  ContentBody,
  ContentStatus,
} from "./domain/value-objects/index.js";
export {
  PostPublished,
  PostUpdated,
  ContentUpdated,
} from "./domain/events/index.js";
export {
  ContentNotFoundError,
  SlugAlreadyExistsError,
} from "./domain/errors/index.js";

// Application
export type { BlogPostDto, StaticContentDto } from "./application/dtos/index.js";
export { toBlogPostDto, toStaticContentDto } from "./application/mappers/index.js";
export {
  getPublishedPosts,
  getPostBySlug,
  getStaticContent,
} from "./application/services/index.js";

// Infrastructure — Ports
export {
  BlogPostRepository,
  StaticContentRepository,
} from "./infrastructure/ports/outbound/index.js";
export type {
  BlogPostRepositoryService,
  StaticContentRepositoryService,
} from "./infrastructure/ports/outbound/index.js";
export type { ContentQueryPort } from "./infrastructure/ports/inbound/index.js";

// Infrastructure — Schema
export { blogPosts } from "./infrastructure/schema/blog-posts.js";
export { staticContents } from "./infrastructure/schema/static-contents.js";
