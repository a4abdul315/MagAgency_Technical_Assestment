import { NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { ddb, LEADS_TABLE } from "@/lib/dynamodb";
import { leadSchema } from "@/lib/validation";
import type { Lead } from "@/types/booking";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some fields need your attention.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { fullName, email, consent } = parsed.data;

  try {
    const lead: Lead = {
      id: ulid(),
      fullName,
      email,
      consent,
      createdAt: new Date().toISOString(),
    };

    await ddb.send(new PutCommand({ TableName: LEADS_TABLE, Item: lead }));

    return NextResponse.json({ lead: { id: lead.id } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json(
      { error: "Unable to save your details right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
