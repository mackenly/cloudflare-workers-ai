import { Ai } from '@cloudflare/ai';

export interface Env {
    AI: any;
    API_KEY: string;
}

/**
 * Run the LLM AI
 * @param prompt - Prompt to send to the AI
 * @param env - Environment variables
 * @returns - Message response from the AI
 */
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

/**
 * Tag an image
 * @param url - input image url
 * @param env - Environment variables
 * @returns - Tag response from the AI
 */
export async function tagImage(url: string, env: Env) {
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

/**
 * Generate an image
 * @param prompt - Prompt for AI image generation
 * @param env - Environment variables
 * @returns - Image response from the AI
 */
export async function generateImage(prompt: string, env: Env) {
    const ai = new Ai(env.AI);

    return await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', { prompt: prompt });
}

/**
 * Classify text as positive or negative
 * @param text - Text to classify as positive or negative
 * @param env - Environment variables
 * @returns - Classification response from the AI
 */
export async function classify(text: string, env: Env) {
    const ai = new Ai(env.AI);

    return await ai.run('@cf/huggingface/distilbert-sst-2-int8', {
        text: text
    });
}