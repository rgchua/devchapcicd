import * as Startup from "./utils/Startup";
import Server from "./utils/Server";
import registerRoutes from "./webapi/routes";
import * as shell from "shelljs";

Startup.startUp(async () => {
	// Setup server
	const server = new Server("Dev Chap CI/CD", 80);
	server.setDefaultConfig(async (router) => {
		registerRoutes(router);
	});

	console.log("Working directory: ", shell.pwd());

	// const dir: string = `74839274893`;
	// shell.cd("../../../devchapcicd");
	// shell.rm("-rf", dir);
	// shell.mkdir("-p", dir);
	// shell.cd(dir);
	// shell.exec(`git clone https://github.com/carrielyp/beatricethetelegrambot.git .`);

	// Start
	await server.start();
});
