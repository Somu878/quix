"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Primary, Success } from "./common/Button";
import { signInWithGitHub } from "@/lib/auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
function Appbar() {
  const route = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast()

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });    
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setIsDialogOpen(false);
        const {
          data: { user }
        } = await supabase.auth.getUser();
        console.log(user);
        toast({
          title: "Signed in",
          description: "You have been signed in",
        })
     
      }
    }
  }

  return (
    <div className="text-white border-b border-slate-800 ">
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <div className="pl-4 text-2xl font-semibold ">
            <Link href={"/"}>Quix</Link>
          </div>
          <div
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${
              route.startsWith("/markets") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/markets")}
          >
            Markets
          </div>
          <div
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${
              route.startsWith("/trade") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/trade/BTC_USDC")}
          >
            Trade
          </div>
        </div>
        <div className="flex ">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Primary onClick={() => setIsDialogOpen(true)}>Sign in</Primary>
        <DialogContent className="sm:max-w-[450px]  text-white">
          <DialogHeader>
            <DialogTitle>{isSignUp ? "Sign Up for Quix" : "Log In to Quix"}</DialogTitle>
            <DialogDescription>
              {isSignUp ? "Create your account" : "Enter your credentials to access your account"}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAuth}>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" variant={"secondary"} className="w-full">{isSignUp ? "Sign Up" : "Sign In"}</Button>
            <br />
            <div className="text-gray-400 text-sm text-center w-full">
        or sign in with
            </div>
            
            <Button variant={"outline"} onClick={signInWithGitHub} className="hover:bg-gray-800 flex items-center justify-center p-2  w-full">
        <Image
          className="w-8 pr-2 rounded-full"
          src="/github-mark-white.png"
          width={100}
          height={100}
          alt="GitHub logo"
        />
        Sign in with GitHub
      </Button>
          </form>
          <DialogFooter className="flex flex-col items-center">
            {!isSignUp && <a href="#" className="text-sm text-white hover:underline">Forgot password?</a>}
            <p className="text-sm text-gray-400 mt-2">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <a href="#" className="text-white hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign in" : "Sign up"}
              </a>
            </p>
          </DialogFooter>
        </DialogContent>
        </Dialog>
       
          <Success  onClick={signInWithGitHub}>Sign up</Success>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
