'use server';
import { createClient } from "@/utils/supabase/client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const supabase = createClient();



export const signInWithGitHub = async () => {
 

    // 1. Create a Supabase client
  
    const origin = headers().get('origin');
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider:"github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}