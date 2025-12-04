
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import Link from "@/lib/models/Link";
import { isValidHttpUrl, CODE_REGEX, generateCode } from "@/lib/utils"

export async function GET() {
  await dbConnect();
  const docs = await Link.find({ deleted: false }).sort({ createdAt: -1 }).lean();
  const out = docs.map(({ code, target, clicks, lastClicked, createdAt }) => ({ code, target, clicks, lastClicked, createdAt }));
  return NextResponse.json(out, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const target = body.target || body.url || body.link;
  let code = body.code || body.alias || undefined;

  if (!target || !isValidHttpUrl(target)) {
    return NextResponse.json({ error: "Invalid target URL" }, { status: 400 });
  }

  if (code) {
    if (!CODE_REGEX.test(code)) {
      return NextResponse.json({ error: "Invalid code format. Use A-Za-z0-9 (6-8 chars)." }, { status: 400 });
    }
    const exists = await Link.findOne({ code }).lean();
    if (exists) return NextResponse.json({ error: "Code already exists" }, { status: 409 });
  } else {
    let tries = 0;
    do {
      code = generateCode(6);
      const exists = await Link.findOne({ code }).lean();
      if (!exists) break;
      tries++;
    } while (tries < 5);
  }

  try {
    const doc = await Link.create({ code, target });
    return NextResponse.json({ code: doc.code, target: doc.target, clicks: doc.clicks, lastClicked: doc.lastClicked, createdAt: doc.createdAt }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "Code already exists" }, { status: 409 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
