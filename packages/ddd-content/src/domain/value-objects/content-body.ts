import { Data } from "effect";

export class ContentBody extends Data.Class<{ readonly value: string }> {
	static make(value: string): ContentBody {
		return new ContentBody({ value });
	}
}
