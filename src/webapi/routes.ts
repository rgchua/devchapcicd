import * as KoaRouter from "koa-router";

export default function registerRoutes(router: KoaRouter) {

	// ============================================================================
	// Server
	// ============================================================================

	router
		.get("/", (ctx, next) => {
			ctx.body = "Hello World!";
		});

	router
		.get("/codeCommitted", (ctx, next) => {
			console.log("New code committed");
		});

	router.post("/server/", "start", async (ctx, next) => {

		console.log("blahblah");
		// TODO:
	});

	router.post("/server/", "stop", async (ctx, next) => {
		// TODO:
	});
}
