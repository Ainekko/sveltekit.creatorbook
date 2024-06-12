import { error } from '@sveltejs/kit';



import 'dotenv/config'


/** @type {import('./$types').RequestHandler} */
/** @type {import('@sveltejs/adapter-vercel').Config} */

import OpenAI from 'openai';

/**
 * Example of streaming a response from an assistant
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ||'',
  organization:'org-h7LXws3paWquocr1Ln69i9m0',
  project: "proj_mlf8kbytfNAkxssW3Zeki45y",
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ url }) {

  // const assistant = await openai.beta.assistants.create({
  //   model: 'gpt-4-1106-preview',
  //   name: 'Math Tutor',
  //   instructions: '',
  //   // tools = [],
  // });

  const assistantId = process.env.OPENAI_GNE ||'';
  console.log('Created Assistant with Id: ' + assistantId);

  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: 'I want a unique start up idea that is doable to create and market as a solo founder',
      },
    ],
  });

  let threadId = thread.id;
  console.log('Created thread with Id: ' + threadId);

  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: 'asst_yd5XAIu8PKlcneBWKmc1VMAQ',
    additional_instructions: 'Organize the description with subheadings and new lines using mark down. for example overview then new line when the overview is finished start a sub heading with marketing related part in a new line',
  });

  console.log('Run finished with status: ' + run.status);

  let msg;
  if (run.status == 'completed') {
    const messages = await openai.beta.threads.messages.list(thread.id);
    for (const message of messages.getPaginatedItems()) 

    if (message.role === 'assistant') {
      // Assuming each message.content is an array and we want the text from the first content item
      msg = JSON.parse(message.content[0].text.value + '\n'); // Concatenate each assistant message with a newline
    }
    
  }
  console.log(msg.title)


  if (msg) {
    return new Response(JSON.stringify(msg), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    return new Response(JSON.stringify({ error: 'No message received from the assistant.' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  }
