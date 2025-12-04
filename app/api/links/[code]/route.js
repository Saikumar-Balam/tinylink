import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import Link from "@/lib/models/Link";

export async function GET(req, context) {
  await dbConnect();

  try {
    const params = await context.params; // unwrap the params Promise
    const code = params.code;

    console.log("Fetching code:", code);

    if (!code) {
      return NextResponse.json({ error: "Code is missing" }, { status: 400 });
    }

    const doc = await Link.findOne({ code, deleted: false }).lean();
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      code: doc.code,
      target: doc.target,
      clicks: doc.clicks,
      lastClicked: doc.lastClicked,
      createdAt: doc.createdAt,
    }, { status: 200 });

  } catch (err) {
    console.error("GET /api/links/[code] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const params = await context.params; // unwrap the params Promise
    const code = params.code;

    console.log("Deleting code:", code);

    if (!code) {
      return NextResponse.json({ error: "Code is missing" }, { status: 400 });
    }

    const doc = await Link.findOne({ code, deleted: false });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await Link.deleteOne({ _id: doc._id });
    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err) {
    console.error("DELETE /api/links/[code] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
