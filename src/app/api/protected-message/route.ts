import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import axios from "axios";
import { authOptions } from "../auth/auth-options";

const backendUrl = "http://localhost:3001";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(`${backendUrl}/api/protected`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in protected route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
