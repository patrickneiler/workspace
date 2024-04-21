export async function POST(request: Request) {
    const data = await request.json();
    const body = JSON.stringify(data);
    return new Response(body);
}

