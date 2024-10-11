import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/app/your-workouts`);
    } else {
      // Redirect with error query param on failure
      return NextResponse.redirect(`${origin}/app?error=${encodeURIComponent(error.message)}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/sign-in`);
}
