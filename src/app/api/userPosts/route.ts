export async function GET(request: Request) {
  // Return empty array of posts
  return Response.json([]);
}

export async function POST(request: Request) {
  return Response.json({ message: 'Create post' });
}
