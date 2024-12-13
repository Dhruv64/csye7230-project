import Groq from "groq-sdk";

// llama3-8b-8192
export const POST = async (req: Request) => {
    const API = process.env.GROQ_API_KEY;
    const groq = new Groq({ apiKey: API });

    try {
        const {message} = await req.json();
        const response = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            model: "gemma2-9b-it",
          });

          if(!response.choices[0]?.message?.content){
                return new Response(JSON.stringify("I'm sorry, I didn't understand that."), {status: 404});
          }
        
        return new Response(JSON.stringify(response.choices[0]?.message?.content), {status: 200});
    }

    catch(err){
        return new Response(JSON.stringify({ error: "Failed to create Expense" }), {status: 500});
    }

}