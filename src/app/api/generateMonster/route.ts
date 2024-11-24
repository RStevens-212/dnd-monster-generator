import generateMonster from "@/utils/monsterUtils";

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.json();
    
    const monster = generateMonster(formData, res); // Generate monster logic
    
    return new Response(JSON.stringify(monster), { status: 200 });
  } catch (error) {
    console.error("Error in POST /generateMonster:", error); // Log the error
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}