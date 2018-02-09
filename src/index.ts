import * as Startup from "./utils/Startup";
import Server from "./utils/Server";
import registerRoutes from "./webapi/routes";
import * as shell from "shelljs";

Startup.startUp(async () => {
	// Setup server
	const server = new Server("Dev Chap CI/CD", 4000);
	server.setDefaultConfig(async (router) => {
		registerRoutes(router);
	});

	console.log(shell.pwd());

	// Start
	await server.start();
});
