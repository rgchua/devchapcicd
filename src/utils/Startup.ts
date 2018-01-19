import * as Shutdown from "../utils/Shutdown";
import Logger from "../utils/Logger";

export function startUp(promiseFn: () => Promise<any>) {
	try {
		// Register shutdown hook
		Shutdown.register();

		// Start up and catch errors
		return Promise.resolve(promiseFn())
			.catch((err) => {
				// Handle error
				Logger.error(err);
			});
	} catch (err) {
		// Handle error
		Logger.error(err);
	}
}
