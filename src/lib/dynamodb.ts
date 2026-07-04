import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "eu-west-2",
});

export const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export const BOOKINGS_TABLE = process.env.DYNAMODB_BOOKINGS_TABLE ?? "Bookings";
export const LEADS_TABLE = process.env.DYNAMODB_LEADS_TABLE ?? "Leads";
