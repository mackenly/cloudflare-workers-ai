import { Ai } from '@cloudflare/ai';

export interface Env {
    // If you set another name in wrangler.toml as the value for 'binding',
    // replace "AI" with the variable name you defined.
    AI: any;
}

export async function llm(prompt: string, env: Env) {
    const ai = new Ai(env.AI);
    const messages = [
        { role: 'system', content: 'You are a friendly assistant' },
        { role: 'user', content: prompt }
    ];
    return await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', {
        messages: messages,
        stream: false
    });
}

export async function image(url: string, env: Env) {
    const imageResponse = await fetch(url);
    const blob = await imageResponse.arrayBuffer();

    const ai = new Ai(env.AI);

    const response = await ai.run('@cf/microsoft/resnet-50', {
        image: [...new Uint8Array(blob)]
    });

    return {
        inputs: {
            image: [
                imageResponse.url
            ]
        }, response
    };
}

export async function generateImage(prompt: string, env: Env) {
    const ai = new Ai(env.AI);

    return await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', { prompt: prompt });
}

export async function classify(text: string, env: Env) {
    const ai = new Ai(env.AI);

    return await ai.run('@cf/huggingface/distilbert-sst-2-int8', {
        text: text
    });
}