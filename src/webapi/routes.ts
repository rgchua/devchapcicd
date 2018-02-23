import * as KoaRouter from "koa-router";
import * as KoaBody from "koa-body";
import * as shell from "shelljs";

interface GitCommitData {
	repoID: string;
	repoUrl: string;
	commitID: string;
	committerName: string;
	committerEmail: string;
	commitTimeStamp: string;
}

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
			// console.log(JSON.stringify(ctx.request.body));
			ctx.response.status = 200;

			const body = ctx.request.body;
			const commits: any[] = body.commits;
			const lastCommit = commits[commits.length - 1];

			const gitCommitData: GitCommitData = {
				repoID: body.repository.id,
				repoUrl: body.repository.clone_url,
				commitID: lastCommit.id,
				committerName: lastCommit.author.name,
				committerEmail: lastCommit.author.email,
				commitTimeStamp: lastCommit.timestamp,
			};

			doSomeGitStuff(gitCommitData, (log) => {
				if (log.length) {
					// do something
					console.log(`${Date().toString}: `, log);
				}
			});
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

const doSomeGitStuff = async (gitCommitData: GitCommitData, callback: (log: string) => void) => {
	// cd up
	// create repo dir
	// clone

	console.log("Git commit data: ", gitCommitData);
	console.log("working dir: ", shell.pwd());

	const basePath = "../repos";

	const folder: string = `${gitCommitData.repoID}`;

	const basePathExists = shell.test("-e", basePath);

	if (!basePathExists) {
		shell.mkdir(basePath);
	}

	shell.cd(basePath);
	const directoryExists = shell.test("-e", folder);

	if (directoryExists) {
		shell.cd(folder);
		shellExec(`git clean -x -d -f`);
		shellExec(`git pull`);
	} else {
		shell.mkdir("-p", folder);
		shell.cd(folder);
		shellExec(`git clone ${gitCommitData.repoUrl} .`);
	}

	const log = "";

	appendResponseToLog(log, await shellExec(`docker-compose up -d`));
	appendResponseToLog(log, await shellExec(`go get -v`));
	appendResponseToLog(log, await shellExec(`go build`));
	appendResponseToLog(log, await shellExec(`go run main.go`));

	console.log(`git repo ${gitCommitData.repoUrl} updated`);
	callback(log);
};

const appendResponseToLog = (log: string, response: ShellOut): string => {
	let ret = log;

	if (!!response.exitcode) {
		ret += !!log.length ? "\n" : "";
		ret += `Error: ${response.err}`;
		ret += "\n";
	}

	if (!!response.out.length) {
		ret += !!log.length ? "\n" : "";
		ret += `Out: ${response.out}`;
		ret += "\n";
	}

	return ret;
};

interface ShellOut {
	exitcode: number;
	err: string;
	out: string;
}

const shellExec = (cmd: string): Promise<ShellOut> => {
	return new Promise((resolve) => {
		shell.exec(cmd, (exitcode, stdout, stderr) => {
			resolve({ exitcode, err: !!exitcode ? stderr : null, out: stdout });
		});
	});
};
