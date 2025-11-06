import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  codeContext?: string;
}

const AIChat = ({ codeContext }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `🚀 **Agentic CFD/FEA Assistant Active**

I specialize in:
• **Julia/Pluto.jl** - Code analysis, debugging, optimization
• **CFD Simulations** - Navier-Stokes, mesh generation, convergence
• **FEA Analysis** - Stress analysis, modal analysis, materials
• **Performance** - GPU acceleration, vectorization, parallelization
• **Visualization** - PlotlyJS, 3D flow fields, pressure distributions

**Quick Start:**
- Click **"AI Analyze"** to send your Julia code for deep analysis
- Ask: "Explain the Reynolds number calculation"
- Ask: "How can I improve solver convergence?"
- Ask: "Validate the CFL condition for stability"

Ready to optimize your engineering simulation! 🔬`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input },
          ],
          codeContext,
          agentMode: true, // Enable agentic reasoning
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-primary to-accent border-b border-border flex-shrink-0">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-primary-foreground text-sm sm:text-base">Agentic AI</h2>
          <p className="text-xs text-primary-foreground/80 hidden sm:block">Julia • CFD • FEA Expert</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-foreground/20 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-primary-foreground hidden sm:inline">Active</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 sm:gap-3 ${
                message.role === "assistant" ? "items-start" : "items-start justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
              )}
              
              <div
                className={`flex-1 max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                  message.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "bg-gradient-to-r from-primary to-accent text-primary-foreground ml-auto"
                }`}
              >
                <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
              </div>
              
              {message.role === "user" && (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 sm:gap-3 items-start">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 rounded-lg p-2 sm:p-3 bg-muted">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-border bg-muted/50 flex-shrink-0">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Julia, CFD, FEA, or optimization..."
            className="resize-none bg-background border-border focus:ring-primary text-sm"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 self-end flex-shrink-0"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

