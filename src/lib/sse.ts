const connections = new Map<string, WritableStreamDefaultWriter>();

export function registerConnection(userId: string, writer: WritableStreamDefaultWriter): void {
  connections.set(userId, writer);
}

export function removeConnection(userId: string){
  connections.delete(userId);
}

export function sendToUser(userId: string, msg: string){
  console.log('[SSE CONNECTED]: ', userId);
  const writer = connections.get(userId);
  if(!writer) return false;
  const encoder = new TextEncoder();
  writer.write(encoder.encode(`data: ${msg}\n\n`));
  return true;
}