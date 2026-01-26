import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await fs.promises.mkdir(uploadsDir, { recursive: true })

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`
    const outPath = path.join(uploadsDir, safeName)

    const arrayBuffer = await file.arrayBuffer()
    await fs.promises.writeFile(outPath, Buffer.from(arrayBuffer))

    const url = `/uploads/${safeName}`
    return NextResponse.json({ ok: true, url })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
