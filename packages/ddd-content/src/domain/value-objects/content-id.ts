import { Data } from "effect";

export class ContentId extends Data.Class<{ readonly value: string }> {
  static make(value: string): ContentId {
    return new ContentId({ value });
  }
}
