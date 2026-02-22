import type { Effect } from "effect";
import type { BlogPostDto, StaticContentDto } from "../../../application/dtos/index.js";
import type { ContentNotFoundError } from "../../../domain/errors/index.js";
import type { BlogPostRepository } from "../outbound/blog-post-repository.js";
import type { StaticContentRepository } from "../outbound/static-content-repository.js";

export interface ContentQueryPort {
  readonly getPublishedPosts: () => Effect.Effect<
    readonly BlogPostDto[],
    never,
    BlogPostRepository
  >;
  readonly getPostBySlug: (
    slug: string,
  ) => Effect.Effect<BlogPostDto, ContentNotFoundError, BlogPostRepository>;
  readonly getStaticContent: (
    key: string,
  ) => Effect.Effect<
    StaticContentDto,
    ContentNotFoundError,
    StaticContentRepository
  >;
}
