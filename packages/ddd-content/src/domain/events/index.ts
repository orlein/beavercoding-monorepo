import { Data } from "effect";

export class PostPublished extends Data.TaggedClass("PostPublished")<{
  readonly postId: string;
  readonly slug: string;
  readonly publishedAt: Date;
}> {}

export class PostUpdated extends Data.TaggedClass("PostUpdated")<{
  readonly postId: string;
  readonly updatedAt: Date;
}> {}

export class ContentUpdated extends Data.TaggedClass("ContentUpdated")<{
  readonly contentId: string;
  readonly key: string;
  readonly updatedAt: Date;
}> {}
