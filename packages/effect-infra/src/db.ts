import * as SqlDrizzle from "@effect/sql-drizzle/Pg";
import { PgClient } from "@effect/sql-pg";
import { Config, Layer, Redacted } from "effect";
import { DatabaseUrl } from "./config.js";

export const PgLive = PgClient.layerConfig({
	url: DatabaseUrl,
});

export const DrizzleLive = SqlDrizzle.layer.pipe(Layer.provide(PgLive));

export const PgTest = (url: string) =>
	PgClient.layerConfig({
		url: Config.succeed(Redacted.make(url)),
	});
