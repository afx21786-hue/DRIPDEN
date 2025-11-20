import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Brain, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function DripBotChat() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! I'm DripBot, your AI fashion assistant. Need help finding the perfect fit? 💫",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your request... Let me find the perfect items for you! ✨",
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const menuItems = [
    {
      id: "drip-analyzer",
      icon: Brain,
      label: "AI Drip Analyzer",
      gradient: "from-secondary to-accent"
    },
    {
      id: "shop-recommendations",
      icon: TrendingUp,
      label: "AI Shop Recommendations",
      gradient: "from-accent to-primary"
    },
    {
      id: "flash-predictor",
      icon: Zap,
      label: "Flash Drop Predictor",
      gradient: "from-primary via-secondary to-accent"
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: "Chat with DripBot",
      gradient: "from-primary to-secondary"
    },
    {
      id: "outfit-combiner",
      icon: Sparkles,
      label: "AI Outfit Combiner",
      gradient: "from-primary to-secondary"
    }
  ];

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === "chat") {
      setIsChatOpen(true);
      setIsMenuOpen(false);
    } else {
      console.log(`Clicked: ${itemId}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
            data-testid="chat-window"
          >
            <Card className="border-primary/30 overflow-hidden glass-blur shadow-neon-primary">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-heading font-semibold">DripBot AI</h3>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsChatOpen(false)}
                  className="hover-elevate active-elevate-2"
                  data-testid="button-close-chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-primary to-secondary"
                            : "bg-card border border-primary/20"
                        }`}
                        data-testid={`message-${message.sender}`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-primary/20">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask me anything..."
                    className="border-primary/30 bg-card/50"
                    data-testid="input-chat-message"
                  />
                  <Button 
                    size="icon" 
                    onClick={sendMessage}
                    className="bg-primary hover-elevate active-elevate-2"
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
            data-testid="dripden-menu"
          >
            <div 
              className="rounded-2xl p-4 shadow-2xl border border-primary/30"
              style={{
                background: "rgba(15, 15, 16, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
              }}
            >
              <div className="grid grid-cols-2 gap-3 w-72">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${item.gradient} hover-elevate active-elevate-2 transition-all ${
                      item.id === "chat" || item.id === "outfit-combiner" ? "col-span-2" : ""
                    }`}
                    data-testid={`menu-item-${item.id}`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsChatOpen(false);
          }}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-neon-primary animate-neon-pulse"
          data-testid="button-toggle-dripden-menu"
        >
          <div className="text-xl font-heading font-bold">D</div>
        </Button>
      </motion.div>
    </>
  );
}
