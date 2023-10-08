/** @type {import('./$types').RequestHandler} */
import OpenAI from 'openai';
//import {get_docs} from '$lib/check'

//import { OpenAIStream, StreamingTextResponse } from 'ai';

import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
 
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { Document } from "langchain/document";




 
import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'
 
import type { RequestHandler } from './$types';

export const config = {
	runtime: 'edge'
};
 
// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || '',
});
 


//const db_content = await get_docs()

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 1,
});

// const docs = await splitter.splitDocuments([
//   new Document({ pageContent: db_content }),
// ]);

// const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
//   batchSize: 512, // Default value if omitted is 512. Max is 2048
// });

// const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({
//   openAIApiKey: env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
//   batchSize: 512, // Default value if omitted is 512. Max is 2048
// }));



//console.log('splitted' , docs)

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};
//let context = ''
const TEMPLATE = `

AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      {context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.

You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export const POST = (async ({ request }) => {
  // Extract the `prompt` from the body of the request
    const { messages, auth_token } = await request.json();
    console.log('tuht : ', auth_token)
    

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    //const body = await request.json();
    //const Rdocs = await vectorStore.similaritySearch(currentMessageContent, 5);
    let context = ''

    // for (const doc of Rdocs) {
    //   context += doc.pageContent + ' ';
    // }

    // context = context.trim();



    // console.log('cntx',context)

    const chatModel = new ChatOpenAI({
      openAIApiKey: env.OPENAI_API_KEY,
    });

    const outputParser = new BytesOutputParser();

    console.log("entering chain")

    const chain = prompt.pipe(chatModel).pipe(outputParser);  
  
    
    const stream = await chain.stream({
      context  : context,
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });

 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;