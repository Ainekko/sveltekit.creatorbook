import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const tasks: { [key: string]: { status: string; result: any; blogPostData?: any } } = {};

async function generateBlogContent(taskId: string, outlineData: any) {
  console.log(`[${taskId}] Starting SaaS blog content generation...`);

  try {
    // Create assistant with improved instructions
    console.log(`[${taskId}] Creating new assistant...`);
    const assistant = await openai.beta.assistants.create({
      name: "SaaS Blog Content Expert",
      instructions: `
        You are a specialized SaaS content marketing expert. Your task is to expand blog post outlines into 
        comprehensive, highly engaging, and SEO-optimized articles specifically for SaaS companies.
        
        Follow these guidelines for excellent SaaS blog content:
        
        1. STRUCTURE AND FORMATTING:
           - Use proper semantic HTML with clear hierarchy (H2 for main sections, H3 for subsections)
           - Include a compelling introduction that highlights the problem being solved
           - Create scannable content with short paragraphs (2-3 sentences each)
           - Use bullet points and numbered lists for better readability
           - Include a strong call-to-action in the conclusion
        
        2. CONTENT QUALITY:
           - Focus on providing actionable insights and practical advice
           - Include relevant statistics, examples, and case studies when possible
           - Adopt a conversational yet authoritative tone
           - Address potential objections or questions readers might have
           - Incorporate strategic storytelling elements to illustrate key points
        
        3. SEO OPTIMIZATION:
           - Naturally integrate target and secondary keywords (avoid keyword stuffing)
           - Create meaningful subheadings that incorporate keywords when appropriate
           - Suggest 2-3 internal linking opportunities within the content
           - Include meta description that drives clicks and contains target keyword
        
        4. SAAS-SPECIFIC ELEMENTS:
           - Emphasize business value and ROI of solutions
           - Address common pain points in the specific SaaS vertical
           - Include sections on implementation ease/challenges when relevant
           - Consider buyer journey stage (awareness, consideration, decision)
           - Highlight competitive advantages without being overly promotional
        
        Return the complete article in clean HTML format, ready for web publication.
      `,
      model: "o3-mini", // Consider using a more powerful model if available
    });
    console.log(`[${taskId}] Assistant created: ${assistant.id}`);

    // Create thread with enhanced user message
    const messageContent = `
      Please create a comprehensive SaaS blog post based on this outline:

      Title: ${outlineData.title}
      Target Keyword: ${outlineData.target_keyword}
      Secondary Keywords: ${outlineData.secondary_keywords.join(', ')}
      Meta Description: ${outlineData.meta_description}
      
      Outline:
      ${outlineData.outline || ''}
      
      Additional Context:
      - Estimated Ranking Potential: ${outlineData.estimated_ranking_potential}
      - Target Audience: refer it from the context
      - Content Goal: Educate and persuade readers about this solution while establishing thought leadership
      
      Please return a complete, publication-ready article with the following:
      
      1. A compelling headline that includes the target keyword
      2. An engaging introduction that highlights the problem and promises a solution
      3. Well-structured main sections with appropriate H2 and H3 headings
      4. A persuasive conclusion 
      5. Proper formatting with short paragraphs, bullet points where appropriate, and emphasis on key points
      6. Naturally integrated keywords throughout the content
      
      Return the content in clean HTML format, ready for web publication.
    `;

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

    // Run assistant on thread with additional instructions
    console.log(`[${taskId}] Starting run...`);
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
      additional_instructions: `
        This is for a professional SaaS company blog. Focus on providing valuable insights rather than general information.
        Ensure the content demonstrates deep understanding of industry challenges and speaks directly to decision-makers.
        The article should be approximately 1200-1500 words, well-formatted with proper HTML, and highly engaging.
        Include a suggested featured image description at the top of the article.
      `,
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

      // Post-process the content to fix any formatting issues
      expandedContent = postProcessContent(expandedContent);

      console.log(`[${taskId}] Content generation and processing completed.`);
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

// Function to fix common formatting issues in the generated content
function postProcessContent(content: string): string {
  let processedContent = content;
  
  // Ensure proper heading structure
  processedContent = processedContent.replace(/<h1>/gi, '<h2>');
  processedContent = processedContent.replace(/<\/h1>/gi, '</h2>');
  
  // Add spacing after paragraphs for better readability
  processedContent = processedContent.replace(/<\/p>/gi, '</p>\n\n');
  
  // Ensure lists have proper spacing
  processedContent = processedContent.replace(/<\/ul>/gi, '</ul>\n');
  processedContent = processedContent.replace(/<\/ol>/gi, '</ol>\n');
  
  // Add CSS classes for better formatting
  processedContent = processedContent.replace(/<h2>/gi, '<h2 class="blog-heading">');
  processedContent = processedContent.replace(/<h3>/gi, '<h3 class="blog-subheading">');
  
  // Ensure proper blockquote formatting
  processedContent = processedContent.replace(/<blockquote>/gi, '<blockquote class="blog-quote">');
  
  // Add CTA styling
  if (processedContent.includes('call-to-action') || processedContent.includes('CTA')) {
    processedContent = processedContent.replace(
      /<p>(.*?call-to-action.*?)<\/p>/gi,
      '<div class="cta-container"><p>$1</p></div>'
    );
  }
  
  return processedContent;
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
  console.log(`[${taskId}] Received POST request for SaaS blog. Starting task...`);
  tasks[taskId] = { status: 'processing', result: null };

  generateBlogContent(taskId, outline_data);

  return new Response(
    JSON.stringify({
      taskId,
      message: 'SaaS blog content generation has been queued',
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