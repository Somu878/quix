import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LoginForm() {
  const signIn = async () => {
    'use server';

    const supabase = createClient();
    const origin = headers().get('origin');
    
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      // return redirect("/");
    }
  };

  return (
    <form
      action={signIn}
      className="flex-1 flex min-h-screen justify-center items-center"
    >
      <button className="hover:bg-gray-800 p-8 rounded-xl">
        <Image
          className="mx-auto mb-3"
          src="/github-mark-white.png"
          width={100}
          height={100}
          alt="GitHub logo"
        />
        Sign in with GitHub
      </button>
    </form>
  );
}
