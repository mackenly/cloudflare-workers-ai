import { Ai } from '@cloudflare/ai'
import { llm, tagImage, generateImage, classify } from './actions'
import {
	error,
	json,
	Router,
	withParams,
} from 'itty-router'

export interface Env {
	AI: any;
	API_KEY: string;
}

// create a new Router
const router = Router()

router
	// add some middleware upstream on all routes
	.all('*', withParams)

	.all('*', async (request, env: Env) => {
		// check if the request is authorized
		// if not, return a 401
		// if so, continue
		const auth = request.query.auth
		if (auth !== env.API_KEY) {
			return error(401, 'Unauthorized')
		}
	})

	.get('/look/image', async (request, env: Env) => {
		const query = request.query as any;
		console.log(query);
		if (!query.url) {
			return error(400, 'Missing url');
		}
		const result = await tagImage(query.url, env);

		return Response.json(result);
	})

	.get('/look/text', async (request, env: Env) => {
		const query = request.query as any;
		console.log(query);
		if (!query.text) {
			return error(400, 'Missing text');
		}
		const result = await classify(query.text, env);
		return Response.json(result, { headers: { "content-type": "application/json" } });
	})

	.get('/create/text', async (request, env: Env) => {
		const query = request.query as any;
		if (!query.prompt) {
			return error(400, 'Missing prompt');
		}
		const stream = await llm(query.prompt, env);
		return Response.json(stream, { headers: { "content-type": "text/event-stream" } });
	})

	.get('/create/image', async (request, env: Env) => {
		const query = request.query as any;
		console.log(query);
		if (!query.prompt) {
			return error(400, 'Missing url');
		}

		return new Response(await generateImage(query.prompt, env), {
			headers: {
				"content-type": "image/png",
			},
		});
	})

	// 404 for everything else
	.all('*', () => error(404))

// Example: Cloudflare Worker module syntax
export default {
	fetch: (request, env: Env, ...args) =>
		router
			.handle(request, env, ...args)
			.then(json)     // send as JSON
			.catch(error),  // catch errors
}