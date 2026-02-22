import { Data } from "effect";

export class Slug extends Data.Class<{ readonly value: string }> {
  static make(title: string): Slug {
    const value = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s가-힣-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-+|-+$/g, "");
    return new Slug({ value });
  }

  static fromRaw(raw: string): Slug {
    return new Slug({ value: raw });
  }
}
