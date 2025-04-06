
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronRight, ArrowRight, Sparkles, Database, Server, Shield, LineChart } from "lucide-react";
import Navigation from "../components/Navigation";
import VideoBackground from "../components/VideoBackground";
import ChatBot from "../components/ChatBot";

export default function Index() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />
      
      {/* Hero Section */}
      <section className="min-h-screen pt-16 relative overflow-hidden">
        <VideoBackground overlayOpacity={0.7}>
          <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
            <div className="mb-2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in [animation-delay:0ms]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Innovating AI Integration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 animate-fade-in [animation-delay:200ms] text-gradient">
              The Intelligent AI Integration Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mb-8 animate-fade-in [animation-delay:400ms]">
              Connect, configure and deploy powerful AI models with your infrastructure in minutes with Devi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in [animation-delay:600ms]">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="text-lg px-8 glow-effect shimmer">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in [animation-delay:800ms]">
              {[
                {
                  icon: <Server className="h-6 w-6 text-primary" />,
                  title: "Connect MCP Servers",
                  description: "Easily connect to wardrobe MCP, scraping MCP servers and more."
                },
                {
                  icon: <Database className="h-6 w-6 text-primary" />,
                  title: "Custom Knowledge Base",
                  description: "Upload and manage your PDF, DOC files to train your AI models."
                },
                {
                  icon: <Shield className="h-6 w-6 text-primary" />,
                  title: "Domain-Specific Configuration",
                  description: "Customize prompts and information specific to your domain."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="enterprise-card glow-effect hover-lift animated-gradient-border"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="mb-4 bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground animate-bounce cursor-pointer">
              <span className="text-sm mb-2">Scroll to explore</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          )}
        </VideoBackground>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              <LineChart className="mr-1 h-3 w-3" /> Enterprise Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary">
              Built for Enterprise AI Integration
            </h2>
            <p className="text-xl text-center text-muted-foreground max-w-2xl">
              Powerful tools designed to streamline enterprise AI workflows and maximize productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MCP Server Configuration",
                description: "Connect to wardrobe MCP, scraping MCP and other server types with our intuitive interface.",
                delay: 0
              },
              {
                title: "AI Chat Integration",
                description: "Implement AI chat functionality directly into your applications with minimal setup.",
                delay: 100
              },
              {
                title: "Document Analysis",
                description: "Upload PDF, DOC, and other file types for AI processing and knowledge extraction.",
                delay: 200
              },
              {
                title: "Domain-Specific Training",
                description: "Train AI models with specialized knowledge to fit your industry's specific needs.",
                delay: 300
              },
              {
                title: "Custom Prompts Library",
                description: "Create and manage libraries of effective prompts for different use cases.",
                delay: 400
              },
              {
                title: "Real-time Configuration",
                description: "Adjust AI parameters and settings in real-time for optimal performance.",
                delay: 500
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="enterprise-card animated-gradient-border hover-lift"
                style={{ 
                  opacity: 0, 
                  transform: `translateY(20px)`,
                  animation: `fade-in 0.5s ease-out forwards ${0.2 + index * 0.1}s`,
                }}
              >
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Link to="/auth?mode=signup" className="inline-flex items-center text-primary hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "30+", label: "AI Models" },
              { value: "500+", label: "Enterprise Users" },
              { value: "100TB+", label: "Data Processed" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 enterprise-card"
                style={{ 
                  opacity: 0, 
                  transform: `translateY(20px)`,
                  animation: `fade-in 0.5s ease-out forwards ${0.3 + index * 0.1}s`
                }}
              >
                <div className="text-4xl font-bold mb-2 text-gradient-primary">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Transform your AI workflow with Devi
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get started today and see the difference our platform can make for your business.
            </p>
            <Link to="/auth?mode=signup">
              <Button 
                size="lg" 
                className="text-lg px-8 glow-effect shimmer"
                style={{ 
                  opacity: 0, 
                  transform: `translateY(20px)`,
                  animation: `fade-in 0.5s ease-out forwards 0.2s`
                }}
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative size-8 bg-primary rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <span className="text-xl font-bold">Devi</span>
              </Link>
              <p className="mt-2 text-muted-foreground">
                Next-generation AI integration platform
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                  <li><Link to="/auth?mode=login" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
                  <li><Link to="/auth?mode=signup" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Devi. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Chatbot Component */}
      <ChatBot />
    </div>
  );
}
