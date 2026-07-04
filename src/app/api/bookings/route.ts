import { NextResponse } from "next/server";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { ddb, BOOKINGS_TABLE } from "@/lib/dynamodb";
import { bookingSchema } from "@/lib/validation";
import type { Booking, BookingSummary } from "@/types/booking";

export async function GET() {
  try {
    const result = await ddb.send(
      new ScanCommand({
        TableName: BOOKINGS_TABLE,
        ProjectionExpression: "id, #bookingDate, #bookingTime",
        ExpressionAttributeNames: {
          "#bookingDate": "date",
          "#bookingTime": "time",
        },
      }),
    );

    const bookings: BookingSummary[] = (result.Items ?? []) as BookingSummary[];

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("GET /api/bookings failed", error);
    return NextResponse.json(
      { error: "Unable to reach the booking database. Please try again shortly." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some fields need your attention.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { date, time, fullName, email, phone, notes, companyName, consent } = parsed.data;

  try {
    const existing = await ddb.send(
      new ScanCommand({
        TableName: BOOKINGS_TABLE,
        FilterExpression: "#bookingDate = :date AND #bookingTime = :time",
        ExpressionAttributeNames: { "#bookingDate": "date", "#bookingTime": "time" },
        ExpressionAttributeValues: { ":date": date, ":time": time },
      }),
    );

    if ((existing.Items ?? []).length > 0) {
      return NextResponse.json(
        { error: "That time slot has just been booked. Please choose another." },
        { status: 409 },
      );
    }

    const booking: Booking = {
      id: ulid(),
      date,
      time,
      fullName,
      email,
      phone,
      notes: notes ?? "",
      companyName: companyName ?? "",
      consent,
      createdAt: new Date().toISOString(),
    };

    await ddb.send(new PutCommand({ TableName: BOOKINGS_TABLE, Item: booking }));

    return NextResponse.json({ booking: { id: booking.id, date, time } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings failed", error);
    return NextResponse.json(
      { error: "Unable to save your booking right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
