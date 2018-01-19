import * as Pino from "pino";
import * as stream from "stream";

export interface LoggerConfig {
	options?: Pino.LoggerOptions;
	logStream?: stream.Writable | stream.Duplex | stream.Transform;
	onWarn?: (obj) => Promise<void>;
	onError?: (obj) => Promise<void>;
}

export class Logger {
	private logger: Pino.Logger;
	private defaultOptions: Pino.LoggerOptions = {
		prettyPrint: true,
	};
	private onWarn?: (obj) => Promise<void>;
	private onError?: (obj) => Promise<void>;

	constructor() {
		this.logger = Pino(this.defaultOptions);
	}

	configure = (loggerConfig: LoggerConfig) => {
		// Merge options with default options and initialize logger
		this.logger = Pino(Object.assign(this.defaultOptions, loggerConfig.options), loggerConfig.logStream);
		this.onWarn = loggerConfig.onWarn;
		this.onError = loggerConfig.onError;
		this.logger.info("Logger configured");
	}

	info = (obj) => {
		this.log("info", obj);
	}

	warn = (obj) => {
		this.log("warn", obj);

		if (this.onWarn)
			this.onWarn(obj);
	}

	error = (obj) => {
		this.log("error", obj);

		if (this.onError)
			this.onError(obj);
	}

	// ============================================================================
	// Helpers
	// ============================================================================

	private log = (loggerFunc, obj) => {
		// Log normally
		this.logger[loggerFunc](obj);
	}
}

export default new Logger();
