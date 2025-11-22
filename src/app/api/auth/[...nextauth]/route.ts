// Mock auth API routes for frontend testing
export async function GET(req: Request) {
    return Response.json({ message: "Mock GET", status: "ok" });
}

export async function POST(req: Request) {
    return Response.json({ message: "Mock POST", status: "ok" });
}
