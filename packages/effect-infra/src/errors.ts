import { Data } from "effect";

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
	readonly message: string;
	readonly cause?: unknown;
}> {}

export class ConfigError extends Data.TaggedError("ConfigError")<{
	readonly message: string;
	readonly key: string;
}> {}

export class NotFoundError extends Data.TaggedError("NotFoundError")<{
	readonly message: string;
	readonly entity: string;
	readonly id: string;
}> {}

export class ValidationError extends Data.TaggedError("ValidationError")<{
	readonly message: string;
	readonly field: string;
}> {}
