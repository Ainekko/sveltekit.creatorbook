
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ||'',
});

export async function main() :Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });
  let message = (completion.choices[0].message.content) ?? 'failed to respond';
  console.log(message);
  return message 
  
}
  

