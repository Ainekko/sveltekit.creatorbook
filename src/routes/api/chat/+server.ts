/** @type {import('./$types').RequestHandler} */
/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'nodejs18.x'
};

import OpenAI from 'openai';
import {get_docs} from '$lib/check'

//import { OpenAIStream, StreamingTextResponse } from 'ai';

import { Message as VercelChatMessage, StreamingTextResponse, LangChainStream, OpenAIStream  } from 'ai';
 
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { RunnableSequence } from "langchain/schema/runnable";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { FaissStore } from "langchain/vectorstores/faiss";

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import * as dotenv from "dotenv";

import { Document } from "langchain/document";


dotenv.config();


 
import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'
 
import type { RequestHandler } from './$types';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
  environment: process.env.PINECONE_ENVIRONMENT || '',
});

const pineconeIndex = pinecone.Index('rechat');

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  batchSize: 512,
});

const pineconeStore = new PineconeStore(embeddings, { pineconeIndex });



// export const config = {
// 	runtime: 'edge'
// };
 
// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});
 


//2const db_content = await get_docs()

let db_content = ''; // Initialize db_content variable
let db_contentFetched = false; // Flag to track if data has been fetched

// Function to fetch and cache the db_content
const fetchDbContent = async () => {
  if (!db_contentFetched) {
    try {
      db_content = await get_docs();
      db_contentFetched = true;
      console.log('Fetched db_content successfully');
    } catch (error) {
      console.error('Error fetching db_content:', error);
    }
  }
  return db_content;
};

console.log('db :', db_content)



// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 100,
//   chunkOverlap: 1,
// });

// async function initializeAIComponents() {
//   //--const dbContent = await fetchDbContent();

//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 100,
//     chunkOverlap: 1,
//   });

//   // --const docs = await splitter.splitDocuments([
//   //   new Document({ pageContent: dbContent }),
//   // ]);

//   const embeddings = new OpenAIEmbeddings({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     batchSize: 512,
//   });

//   //const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

//   const pineconeStore = new PineconeStore(embeddings, { pineconeIndex });
  
//   // i don't need to add everyime -- const ids = await pineconeStore.addDocuments(docs);

//   // const vectorStore = await FaissStore.fromDocuments(
//   //   docs,
//   //   embeddings,
//   // );

//   return { embeddings, pineconeStore};
//  // return { docs, embeddings, vectorStore };
  
// }



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
      AI is a solo founder's assitant to help them come up with marketing strategies and ideas based on the context

      START CONTEXT BLOCK
      {context}
      Current conversation:
      {chat_history}
 
      User: {input}
      AI:
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".

      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      AI will review their answers and make sure it satisfies the user's question 

      AI will make the answer short, cohesive and based on the provided context block Then ask if they want to learn more
      AI will make the answer short, cohesive and based on the provided context block Then ask if they want to learn more
      AI will always review and make sure the idea is complete before starting to answer
      AI will always review and make sure the idea is complete before starting to answer
      AI will always review and make sure the idea is complete before starting to answer


      

 
`;

export const POST = (async ({ request }) => {
  // Extract the `prompt` from the body of the request
    //await initializeAIComponents()
    const { messages, auth_token } = await request.json();
    console.log('tuht : ', auth_token)
    

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    //const body = await request.json();

    //const { embeddings, pineconeStore } = await initializeAIComponents();

   // const { docs, embeddings, vectorStore } = await initializeAIComponents();

    //const Rdocs = await vectorStore.similaritySearch(currentMessageContent, 5);

    const Rdocs = await pineconeStore.similaritySearch(currentMessageContent, 2, {
     
    });

    let context = ''

    for (const doc of Rdocs) {
      context += doc.pageContent + ' ';
    }

    context = context.trim();



    console.log('cntx',context)

    const chatModel = new ChatOpenAI({
      streaming:true,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const outputParser = new BytesOutputParser();

    console.log("entering chain")

    //const chain = RunnableSequence.from([prompt, chatModel, outputParser]);

    const chain = prompt.pipe(chatModel).pipe(outputParser);  
  
    
    
    //const stream = OpenAIStream(response);


    const stream = await chain.stream({
      
      context  : context,
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });

    console.log(stream)

  // Respond with the stream
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;