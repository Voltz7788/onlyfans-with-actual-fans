import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import bcrypt from "bcryptjs";
import { generateUsername } from "unique-username-generator";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Missing fields. Please enter all required information.",
    });
  }

  const exist = await prisma.user.findUnique({ where: { email: email } });

  if (exist) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Email is already in use. Please use a different email.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const username = generateUsername();

  await prisma.user.create({
    data: { name, email, password: hashedPassword, username: username },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Account created",
  });
}
