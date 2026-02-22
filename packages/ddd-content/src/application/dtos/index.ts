import type { ContentStatus } from "../../domain/value-objects/content-status.js";

export interface BlogPostDto {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly body: string;
  readonly status: ContentStatus;
  readonly authorId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface StaticContentDto {
  readonly id: string;
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly updatedAt: string;
}
