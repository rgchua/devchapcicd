import * as ShutdownHook from "shutdown-hook";

// =============================================================================
// Singleton
// =============================================================================

const shutdownHook = new ShutdownHook();

// =============================================================================
// Functions
// =============================================================================

export function add(name: string, callback: () => Promise<any>) {
	shutdownHook.add(callback, {
		name,
	});
}

export function register() {
	shutdownHook.register();
	process.once("SIGUSR2", shutdownHook.shutdown.bind(shutdownHook));
}
