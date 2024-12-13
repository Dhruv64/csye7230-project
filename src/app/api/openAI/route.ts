import OpenAI from "openai";



const api = process.env.OPENAI_API_KEY;


// llama3-8b-8192
export const POST = async (req: Request) => {
    const openai = new OpenAI({
        apiKey: api, // Ensure this is set in your environment
    });

    try {
        const { message } = await req.json();
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use the correct model name
            messages: [
                { 
                    role: "system", 
                    content: "You are a knowledgeable and helpful expense tracker advisor. Your job is to provide detailed, accurate, and insightful financial advice, based on my budgets, total expenses, and income streams. Always aim to explain concepts cleary and make it short in 1 paragraph." 
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        if (!response.choices[0]?.message) {
            return new Response(JSON.stringify("I'm sorry, I didn't understand that."), { status: 404 });
        }
        
        return new Response(JSON.stringify(response.choices[0]?.message?.content), { status: 200 });
    } catch (error) {
        if ((error as any).code === 'insufficient_quota') {
            return new Response(JSON.stringify({ error: "Quota exceeded. Please check your OpenAI billing details." }), { status: 429 });
        }
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Failed to create Expense" }), { status: 500 });
    }
}
