import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const tasks: { [key: string]: { status: string; result: any; blogPostData?: any } } = {};

async function generateBlogContent(taskId: string, outlineData: any) {
  console.log(`[${taskId}] Starting blog content generation...`);

  try {
    // Create assistant
    console.log(`[${taskId}] Creating new assistant...`);
    const assistant = await openai.beta.assistants.create({
      name: "SEO Blog Expander",
      instructions:
        "You are a blogging assistant. Expand blog post outlines into full, SEO-optimized blog articles using provided structure and keywords. Use clear headings (H2, H3), good formatting, and natural keyword integration.",
      model: "o3-mini",
    });
    console.log(`[${taskId}] Assistant created: ${assistant.id}`);

    // Create thread with user message
    const messageContent = `Please expand this blog post outline into a complete, SEO-optimized article:

Title: ${outlineData.title}
Target Keyword: ${outlineData.target_keyword}
Secondary Keywords: ${outlineData.secondary_keywords.join(', ')}
Meta Description: ${outlineData.meta_description}

Outline:
${outlineData.outline || ''}

Estimated Ranking Potential: ${outlineData.estimated_ranking_potential}

Structure the article with proper H2/H3 headers, an engaging intro, and a strong conclusion. Use keywords naturally.`;

    console.log(`[${taskId}] Creating thread with user message...`);
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: messageContent,
        },
      ],
    });
    console.log(`[${taskId}] Thread created: ${thread.id}`);

    // Run assistant on thread
    console.log(`[${taskId}] Starting run...`);
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
      additional_instructions:
        "Create a comprehensive, well-structured blog post that naturally incorporates the target keywords.",
    });
    console.log(`[${taskId}] Run status: ${run.status}`);

    if (run.status === 'completed') {
      console.log(`[${taskId}] Run completed. Fetching messages...`);
      const messages = await openai.beta.threads.messages.list(thread.id);
      let expandedContent = '';

      for (const message of messages.getPaginatedItems()) {
        if (message.role === 'assistant') {
          for (const contentPart of message.content) {
            if (contentPart.type === 'text') {
              expandedContent += contentPart.text.value;
            }
          }
          break;
        }
      }

      console.log(`[${taskId}] Content extraction completed.`);
      tasks[taskId] = {
        status: 'completed',
        result: expandedContent,
        blogPostData: {
          ...outlineData,
          content: expandedContent,
        },
      };
    } else {
      console.warn(`[${taskId}] Run failed or incomplete: ${run.status}`);
      tasks[taskId] = {
        status: 'failed',
        result: `Assistant run failed with status: ${run.status}`,
      };
    }
  } catch (error: any) {
    console.error(`[${taskId}] Error generating blog content:`, error);
    tasks[taskId] = { status: 'error', result: error.message };
  }
}

export async function POST({ request }) {
  const requestData = await request.json();
  const { outline_data } = requestData;

  if (!outline_data) {
    console.warn(`POST request missing 'outline_data'`);
    return new Response(JSON.stringify({ error: 'Outline data is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const taskId = uuidv4();
  console.log(`[${taskId}] Received POST request. Starting task...`);
  tasks[taskId] = { status: 'processing', result: null };

  generateBlogContent(taskId, outline_data);

  return new Response(
    JSON.stringify({
      taskId,
      message: 'Blog content generation has been queued',
    }),
    {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function GET({ url }) {
  const taskId = url.searchParams.get('taskId');

  if (!taskId || !tasks[taskId]) {
    console.warn(`GET request for unknown or missing taskId: ${taskId}`);
    return new Response(JSON.stringify({ error: 'Task not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`[${taskId}] GET request - status: ${tasks[taskId].status}`);
  console.log(tasks[taskId].result)
  return new Response(
    JSON.stringify({
      status: tasks[taskId].status,
      result: tasks[taskId].status === 'completed' ? tasks[taskId].result : null,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
