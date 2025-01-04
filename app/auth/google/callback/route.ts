import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Authorization code not provided");
    return NextResponse.json(
      { error: "Authorization code not provided" },
      { status: 400 }
    );
  }

  try {
    console.log("Authorization code received:", code);

    const response = await fetch(
      "https://beportal1-c69uolb8.b4a.run/auth/google/callback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ code }),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to exchange code for access token:", errorText);
      return NextResponse.json(
        { error: "Failed to exchange code for access token", details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Data received from backend:", data);

    const { accessToken } = data;
    if (!accessToken) {
      console.error("Access token not found in backend response");
      throw new Error("Access token not found in backend response");
    }

    const redirectResponse = NextResponse.redirect("/");

    redirectResponse.cookies.set("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("Redirecting to / with accessToken in cookie");

    return redirectResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during Google OAuth callback:", error.message);
      return NextResponse.json(
        { error: "Google OAuth callback failed", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error during Google OAuth callback:", error);
      return NextResponse.json(
        { error: "Google OAuth callback failed", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
