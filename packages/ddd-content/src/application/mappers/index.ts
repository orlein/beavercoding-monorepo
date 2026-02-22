import type { BlogPost } from "../../domain/entities/blog-post.js";
import type { StaticContent } from "../../domain/entities/static-content.js";
import type { BlogPostDto, StaticContentDto } from "../dtos/index.js";

export function toBlogPostDto(post: BlogPost): BlogPostDto {
  return {
    id: post.id.value,
    title: post.title,
    slug: post.slug.value,
    body: post.body.value,
    status: post.status,
    authorId: post.authorId,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export function toStaticContentDto(content: StaticContent): StaticContentDto {
  return {
    id: content.id.value,
    key: content.key,
    title: content.title,
    body: content.body.value,
    updatedAt: content.updatedAt.toISOString(),
  };
}
