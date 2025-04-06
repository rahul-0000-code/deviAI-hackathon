
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import VideoBackground from "../components/VideoBackground";
import { Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  // Get the current mode from URL params (login or signup)
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState(initialMode);
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo authentication - In a real app, this would call an API
    if (loginForm.email && loginForm.password) {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/server-connect');
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast({
        title: "Signup Failed",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Demo signup - In a real app, this would call an API
    toast({
      title: "Signup Successful",
      description: "Your account has been created.",
    });
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/server-connect');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground overlayOpacity={0.85}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="relative size-10 bg-primary rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <span className="text-2xl font-bold text-gradient">DeviAI</span>
              </Link>
            </div>
            
            <Card className="border border-border bg-background/60 backdrop-blur-md shadow-xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-4">
                  <form onSubmit={handleLoginSubmit}>
                    <CardHeader>
                      <CardTitle>Welcome Back</CardTitle>
                      <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input 
                          id="login-email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <Link to="#" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input 
                            id="login-password" 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">Sign In</Button>
                    </CardFooter>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-4">
                  <form onSubmit={handleSignupSubmit}>
                    <CardHeader>
                      <CardTitle>Create an Account</CardTitle>
                      <CardDescription>Enter your information to create a new account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input 
                          id="signup-name" 
                          type="text" 
                          placeholder="John Doe"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="signup-password" 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                        <Input 
                          id="signup-confirm-password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">Sign Up</Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="p-4 pt-0 text-center text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="#" className="underline text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="underline text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </div>
            </Card>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </VideoBackground>
    </div>
  );
}
