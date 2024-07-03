import { v4 as uuidv4 } from 'uuid';
import { error } from '@sveltejs/kit';
import 'dotenv/config';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  organization: 'org-h7LXws3paWquocr1Ln69i9m0',
  project: "proj_mlf8kbytfNAkxssW3Zeki45y",
});

// In-memory storage for task results
const tasks: { [key: string]: { status: string; result: any } } = {};

// Task processing function
async function processTask(taskId: string, input: string) {
  try {
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
    });

    const threadId = thread.id;

    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: 'asst_yd5XAIu8PKlcneBWKmc1VMAQ',
      additional_instructions: 'Organize the description with subheadings and new lines using markdown.',
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId);
      let msg;
      for (const message of messages.getPaginatedItems()) {
        if (message.role === 'assistant') {
          msg = JSON.parse(message.content[0].text.value + '\n');
        }
      }
      tasks[taskId] = { status: 'completed', result: msg };
    } else {
      tasks[taskId] = { status: 'failed', result: null };
    }
  } catch (error) {
    tasks[taskId] = { status: 'error', result: error.message };
  }
}

export async function POST({ url }) {
  const input = 'I want a unique start up idea that is doable to create and market as a solo founder'; // Customize this input as needed
  const taskId = uuidv4();
  tasks[taskId] = { status: 'processing', result: null };
  
  processTask(taskId, input);

  return new Response(JSON.stringify({ taskId }), {
    status: 202,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET({ url }) {
  const taskId = url.searchParams.get('taskId');
  if (!taskId || !tasks[taskId]) {
    return new Response(JSON.stringify({ error: 'Task not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(tasks[taskId]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
