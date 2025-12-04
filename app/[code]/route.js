import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import Link from "@/lib/models/Link";

export async function GET(request, context) {
  // ✅ FIX: await params (VERY IMPORTANT)
  const { code } = await context.params;

  if (!code) {
    return NextResponse.json({ error: "Code missing" }, { status: 400 });
  }

  await dbConnect();

  const link = await Link.findOne({ code, deleted: false });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // ✅ Update analytics
  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();

  // ✅ Redirect
  return NextResponse.redirect(link.target, 302);
}
