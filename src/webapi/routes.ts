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
			console.log(JSON.stringify(ctx.request.body));
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

const doSomeGitStuff = (gitCommitData: GitCommitData) => {
	// cd up
	// create repo dir
	// clone

	console.log("Git commit data: ", gitCommitData);

	const dir: string = `${gitCommitData.repoID}`;
	shell.cd("..");
	shell.rm("-rf", dir);
	shell.mkdir("-p", dir);
	shell.cd(dir);
	shell.exec(`git clone ${gitCommitData.repoUrl} .`);
};
