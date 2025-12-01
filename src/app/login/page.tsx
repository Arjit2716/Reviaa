"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }
    // Simulate sending OTP
    setStep(2);
    toast({
      title: "OTP Sent",
      description: "An OTP has been sent to your mobile number.",
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") { // Mock OTP
      toast({
        title: "Login Successful",
        description: "Welcome back to StyleSwap!",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center text-primary">
            {step === 1 ? "Welcome to StyleSwap" : "Verify Your Number"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "Enter your mobile number to login or sign up." : `Enter the OTP sent to ${mobileNumber}`}
          </CardDescription>
        </CardHeader>
        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <CardContent className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="e.g., 9876543210"
                  className="pl-10"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full font-bold">Send OTP</Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <CardContent className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="pl-10 tracking-widest text-center"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Mock OTP is <span className="font-bold text-primary">123456</span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full font-bold">Verify & Login</Button>
              <Button variant="link" size="sm" onClick={() => setStep(1)}>
                Back to mobile number entry
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
