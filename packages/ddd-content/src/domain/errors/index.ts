import { Data } from "effect";

export class ContentNotFoundError extends Data.TaggedError(
  "ContentNotFoundError",
)<{
  readonly message: string;
  readonly id: string;
}> {}

export class SlugAlreadyExistsError extends Data.TaggedError(
  "SlugAlreadyExistsError",
)<{
  readonly message: string;
  readonly slug: string;
}> {}
