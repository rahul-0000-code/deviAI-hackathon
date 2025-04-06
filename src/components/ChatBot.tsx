
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ user: boolean; text: string }>>([
    { user: false, text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (input.trim() === "") return;
    
    // Add user message
    setMessages([...messages, { user: true, text: input }]);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          user: false, 
          text: "This is a demo chatbot. In a real implementation, this would connect to your AI backend." 
        },
      ]);
      
      toast({
        title: "ChatBot",
        description: "New message received",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-3 shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 animate-pulse-glow"
        }`}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] h-[500px] rounded-2xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="p-4 border-b border-border bg-muted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative size-8 bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="font-medium">DeviAI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.user ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.user
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-foreground rounded-tl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={input.trim() === ""}
              className="h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
