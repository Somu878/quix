"use client";
import Link from "next/link";
import Image from "next/image";
import {  usePathname, useRouter } from "next/navigation";
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
import { useState, FormEvent, useEffect } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuthDialog } from "@/context/DialogContext";
function Appbar() {
  const route = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { isOpen, openDialog, closeDialog } = useAuthDialog();
  const { toast } = useToast()

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    
    if (isSignUp) {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      if (data) {
        console.log("Attempting to close dialog")
        toast({

          title: "Verification email sent",
          description: (
            <div className="flex  items-center">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
              <span>Please check your email to confirm your account</span>
            </div>
          ),
          
          variant: "default",
        });
        closeDialog();
      } else {
        toast({
          title: "Sign up failed",
          variant: "destructive",
        });
      }
    }

  else {
      await supabase.auth.signInWithPassword({
        email,
        password,
      }).then((data)=>{
        toast({
          title: "Sign in successful",
          variant: "default",
        });
        closeDialog()
      }).catch((error)=>{
        toast({
          title: "Sign in failed",
          variant: "destructive",
        });
      })
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setIsSignUp(false);
    }
  }, [isOpen]);
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
        <Dialog open={isOpen} onOpenChange={(open) => {
  if (!open) closeDialog()}}>
          <Primary onClick={openDialog}>Sign in</Primary>
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
                autoComplete="email"
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
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div className="text-sm text-gray-400 mt-2 flex justify-between">
         <div>     {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <a href="#" className="text-white hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign in" : "Sign up"}
              </a></div>
              {!isSignUp && <a href="#" className="text-sm text-white hover:underline">Forgot password</a>}
            </div>
              </div>
            </div>
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
          <DialogFooter className="flex flex-col justify-center items-center">
           
         
          </DialogFooter>
        </DialogContent>
        </Dialog>
       
          <Success  onClick={()=>{
            openDialog()
            setIsSignUp(true)
          }}>Sign up</Success>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
