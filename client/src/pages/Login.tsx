import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        await register(username, password);
        toast({
          title: "Welcome to DRIPDEN",
          description: "Account created successfully! You've earned 1250 DripCoins as a welcome bonus.",
        });
      } else {
        await login(username, password);
        toast({
          title: "Welcome back",
          description: "You've successfully logged in.",
        });
      }
      setLocation("/");
    } catch (error: any) {
      toast({
        title: isRegister ? "Registration failed" : "Login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-heading gradient-text text-center">
              {isRegister ? "Join DRIPDEN" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-center">
              {isRegister
                ? "Create your account and start exploring local fashion"
                : "Sign in to your account"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full neon-glow bg-gradient-to-r from-primary to-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
              </Button>
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isRegister ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
