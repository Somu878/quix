'use server';
import { createClient } from "@/utils/supabase/client"
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import GithubProvider from "next-auth/providers/github"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

// export const authOptions = {
//   providers: [
//     Credentials({
//         name: "Credentials",
//         credentials: {
//           email: {
//             label: "Email",
//             type: "email",
//             placeholder: "jsmith@gmail.com",
//           },
//           password: {
//             label: "Password",
//             type: "password",
//             placeholder: "********",
//           },
//         },
//         async authorize(credentials, req) {
//                       if (credentials?.email === "jsmith@gmail.com") {
//             return { id: "1", name: "John Smith", email: "jsmith@gmail.com" }
//           }
//           return null
//         },
//       }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as any,
//       clientSecret: process.env.GITHUB_SECRET as any,
//     }),
//   ],
// }

// export default NextAuth(authOptions)



export const signInWithGitHub = async () => {
 

    // 1. Create a Supabase client
    const supabase = createClient();
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
    // 3. Redirect to landing page
  };