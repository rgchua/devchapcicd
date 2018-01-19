import * as KoaModule from "koa";
import * as KoaRouter from "koa-router";
import * as Body from "koa-body";
import * as Compress from "koa-compress";
import { Server } from "http";
import Logger from "../utils/Logger";
import * as Shutdown from "../utils/Shutdown";

export default class Koa {
	private name: string;
	private port: number;
	private configure: (app: KoaModule) => Promise<void>;
	private server: Server;

	constructor(name: string, port: number) {
		this.name = name;
		this.port = port;
	}

	public setConfig = (configureServer: (app: KoaModule) => Promise<void>) => {
		this.configure = configureServer;
	}

	public setDefaultConfig = (registerRoutes: (router: KoaRouter) => Promise<void>) => {
		this.setConfig(async (app) => {
			// Set middleware
			app.use(Body({ multipart: true }));
			app.use(Compress());								// Compress the result (ctx.compress = false to disable)
			app.use(this.errorHandler);					// Handles thrown errors from here on

			// Set routes
			const router = new KoaRouter();
			registerRoutes(router);
			app.use(router.routes());
			app.use(router.allowedMethods());
		});
	}

	public start = async () => {
		// Setup koa
		const app = new KoaModule();
		if (this.configure)
			await this.configure(app);
		else
			throw new Error("Missing Koa Configuration");

		console.log("blahblah");

		// Start router
		this.server = app.listen(this.port);

		// Graceful shutdown
		Shutdown.add("router", async () => {
			Logger.info("Server closing");
			await this.stop();
		});

		Logger.info(this.name + " started on port: " + this.port);
	}

	public stop = async () => {
		return await new Promise((resolve, reject) => {
			this.server.close(() => {
				resolve();
			});
		});
	}

	// ============================================================================
	// Helpers
	// ============================================================================

	// Error handler
	private errorHandler = async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			// Log
			Logger.error(err);

			// Send JSON response
			ctx.status = 500;
			ctx.body = err;
		}
	}
}
