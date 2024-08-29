"use client";

import { useEffect, useState } from "react";
//@ts-ignore
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function MobileCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Alert variant="destructive" className="bg-red-900 border-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-red-300">
            Mobile Access Unavailable
          </AlertTitle>
          <AlertDescription className="text-red-100">
            Quix is currently not available on mobile devices. Please access our
            platform using a desktop or laptop computer for the best trading
            experience.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
