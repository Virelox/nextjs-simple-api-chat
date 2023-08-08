import { Configuration, OpenAIApi } from 'openai';

export async function POST(request) {
    const { messages } = await request.json();

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
    });

    if (response.data.choices[0]) {
        return new Response(JSON.stringify({ role: 'system', response: response.data.choices[0] }));
    } else {
        return new Response(false);
    }
}
