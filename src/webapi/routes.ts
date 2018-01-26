import * as KoaRouter from "koa-router";
import * as KoaBody from "koa-body";

// tslint:disable:no-console
export default function registerRoutes(router: KoaRouter) {

	// ============================================================================
	// Server
	// ============================================================================

	router
		.get("/", (ctx, next) => {
			ctx.body = "Hello World!";
		});

	router
		.post("/codeCommitted", (ctx, next) => {

			// console.log(JSON.stringify(ctx));
			console.log("code push detected!");
			console.log(JSON.stringify(ctx.request.body));
			ctx.response.status = 200;

			const body = ctx.request.body;
			const repoID = body.repository.id;
			const repoUrl = body.repository.clone_url;
			const commitID = body.commits.id;
			const committerName = body.commits.author.name;
			const committerEmail = body.commits.author.email;
			const commitTimeStamp = body.commits.timestamp;
		});

	router.get("/method1", (ctx, next) => {
		ctx.body = "Hello World1!";
	});

	router.get("/method2/", (ctx, next) => {
		ctx.body = "Hello World1!";
	});

	router.post("/server/", "start", async (ctx, next) => {

		console.log("blahblah");
		// TODO:
	});

	router.post("/server/", "stop", async (ctx, next) => {
		// TODO:
	});
}
