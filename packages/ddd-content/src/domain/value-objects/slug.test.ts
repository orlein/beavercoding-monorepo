import { describe, expect, it } from "vitest";
import { Slug } from "./slug.js";

describe("Slug", () => {
	it("should convert title to lowercase slug", () => {
		const slug = Slug.make("Hello World");
		expect(slug.value).toBe("hello-world");
	});

	it("should handle Korean characters", () => {
		const slug = Slug.make("안녕하세요 세계");
		expect(slug.value).toBe("안녕하세요-세계");
	});

	it("should remove special characters", () => {
		const slug = Slug.make("Hello, World! How's it going?");
		expect(slug.value).toBe("hello-world-hows-it-going");
	});

	it("should trim leading and trailing dashes", () => {
		const slug = Slug.make("  --Hello World--  ");
		expect(slug.value).toBe("hello-world");
	});

	it("should collapse multiple spaces and dashes", () => {
		const slug = Slug.make("hello   world---test");
		expect(slug.value).toBe("hello-world-test");
	});

	it("should create from raw value", () => {
		const slug = Slug.fromRaw("already-a-slug");
		expect(slug.value).toBe("already-a-slug");
	});

	it("should handle empty string", () => {
		const slug = Slug.make("");
		expect(slug.value).toBe("");
	});

	it("should handle mixed Korean and English", () => {
		const slug = Slug.make("Effect.ts 사용법");
		expect(slug.value).toBe("effectts-사용법");
	});
});
