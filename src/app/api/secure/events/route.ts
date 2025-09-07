import { NextRequest, NextResponse } from "next/server";
import { registerConnection, removeConnection } from "@/lib/sse";
const connections = new Map<string, WritableStreamDefaultWriter>(); 

export async function GET(req: NextRequest){ 
  const {searchParams } = new URL(req.url); 
  const userId = searchParams.get('userId'); 

  if(!userId){ 
    return NextResponse.json({error: "Missing userId"}, {status: 400}); 
  }

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  registerConnection(userId, writer);

  const encoder = new TextEncoder();
  const interval = setInterval(()=>{
    writer.write(encoder.encode("data: ping\n\n"))
  }, 15000);

  req.signal.addEventListener("abort", ()=>{
    clearInterval(interval);
    removeConnection(userId);
    writer.close();
  });

  return new Response(stream.readable, { 
    headers: { 
      'Content-Type': "text/event-stream", 
      'Cache-Control': 'no-cache', 
      Connection: 'keep-alive', 
    }
  })
}
export function sendToUser (userId: string, msg: string){ 
  console.log('[SSE CONNECTED]: ', userId); 
  const writer = connections.get(userId); 
  if(!writer) return false; 
  const encoder = new TextEncoder(); 
  writer.write(encoder.encode(`data: ${msg}\n\n`)); 
  return true; 
}