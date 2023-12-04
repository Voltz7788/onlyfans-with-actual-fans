import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaGlobal";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, confirmPass } = body;

  if (!name || !email || !password || !confirmPass) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Missing fields. Please enter all required information.",
    });
  }

  if (password !== confirmPass) {
    return new NextResponse(null, {
      status: 400,
      statusText:
        "Passwords do not match. Please make sure both passwords are the same.",
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

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return new NextResponse(null, {
    status: 200,
    statusText: "Account created",
  });
}
