"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function DisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("hasSeenDisclaimer");
    if (!hasSeenDisclaimer) {
      setIsVisible(true);
    }
    // return (
    //     localStorage.clear()
    // )
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenDisclaimer", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-xl font-bold text-red-500">
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Welcome to Quix - Crypto exchange. Before you proceed, please be
            aware of the following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              The data displayed on this website is sourced from real exchanges.
            </li>
            <li>
              Due to the volatile nature of cryptocurrency markets and potential
              technical issues, the data may not always be 100% accurate or
              up-to-date.
            </li>
            <li>
              We strive to provide the most reliable information possible, but
              discrepancies may occur.
            </li>
            <li>
              Always verify important data through real sources before making
              any financial decisions.
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleDismiss}>
            I Understand
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
