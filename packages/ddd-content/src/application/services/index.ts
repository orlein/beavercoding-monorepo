import { Effect } from "effect";
import { BlogPostRepository } from "../../infrastructure/ports/outbound/blog-post-repository.js";
import { StaticContentRepository } from "../../infrastructure/ports/outbound/static-content-repository.js";
import { toBlogPostDto, toStaticContentDto } from "../mappers/index.js";
import type { BlogPostDto, StaticContentDto } from "../dtos/index.js";
import { ContentNotFoundError } from "../../domain/errors/index.js";

export const getPublishedPosts = Effect.gen(function* () {
  const repo = yield* BlogPostRepository;
  const posts = yield* repo.findPublished();
  return posts.map(toBlogPostDto);
});

export const getPostBySlug = (
  slug: string,
): Effect.Effect<
  BlogPostDto,
  ContentNotFoundError,
  BlogPostRepository
> =>
  Effect.gen(function* () {
    const repo = yield* BlogPostRepository;
    const post = yield* repo.findBySlug(slug);
    return toBlogPostDto(post);
  });

export const getStaticContent = (
  key: string,
): Effect.Effect<
  StaticContentDto,
  ContentNotFoundError,
  StaticContentRepository
> =>
  Effect.gen(function* () {
    const repo = yield* StaticContentRepository;
    const content = yield* repo.findByKey(key);
    return toStaticContentDto(content);
  });
