import { AnimatePresence, motion } from "framer-motion";
import type { design } from "../../../types";
import ReactFlow from "../ReactFlow";
import { ArrowUp } from "lucide-react";
import type { Node, Edge } from "@xyflow/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown'

type roles = "user" | "assistant" | "error"

type Message = {
  role: roles;
  content: string;
};

const initialMessage = {
  role: "assistant" as roles,
  content: "👋 Hey! I'm here to help you with your design. Just ask me anything! ✨🛠️"
}

// MessageBox unchanged
const MessageBox = ({msg,i}:{msg:Message,i:number}) => {
  return   <div
                  key={i}
                  className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                    msg.role === "user"
                      ? " bg-purple-500/20"
                      : msg.role === "error"
                      ? "ms-auto bg-red-500/20 text-red-300"
                      : "ms-auto bg-white/10"
                  }`}
  >
    <ReactMarkdown>
      {msg.content}
      </ReactMarkdown>
  </div>
}

export default function DesignWithData({
  data,
  chatOpen,
  setChatOpen,
  designId
}: {
  data: design;
    chatOpen: boolean;
    designId: string;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const currentMessageRef = useRef("");
  const [thinking, setThinking] = useState(false);

  // Ref for the messages container to scroll
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change or thinking changes
  useEffect(() => {
    if (chatOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, thinking, chatOpen]);

  const streamResponse = async (query: string) => {
    try {
      setIsStreaming(true);
      currentMessageRef.current = "";

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/chat/query`, {
        method: "POST",
        body: JSON.stringify({ query, design_id: designId }),
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });

      console.log(res)

      if (!res.body) throw new Error("No response body");

      if (!res.ok) {
        let message = "Failed to respond at the moment, please try again.";
        try {
          const body = await res.json();
          message = body?.message || message;
        } catch (e) {
          // ignore, fallback to default message
        }
        throw new Error(message);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        if (thinking)
          setThinking(false)
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log(chunk)

        const parts = chunk.split("<END>").filter(Boolean);
        console.log(parts)
        for (const part of parts) {
          try {
            const parsed = JSON.parse(part);
            console.log(parsed)

            if (parsed.type === "error") {
              setMessages((prev) => [
                ...prev,
                { role: "error", content: parsed.message },
              ]);
              setIsStreaming(false);
              return;
            }

            if (parsed.type === "text") {

              currentMessageRef.current += parsed.content;

              setMessages((prev) => {
                const last = prev[prev.length - 1];

                // update last assistant message
                if (last && last.role === "assistant") {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: currentMessageRef.current,
                  };
                  return updated;
                }

                // create new assistant message
                return [
                  ...prev,
                  {
                    role: "assistant",
                    content: currentMessageRef.current,
                  },
                ];
              });
            }

            if (parsed.type === "end") {
              setIsStreaming(false);
              return;
            }
          } catch (err) {
            console.error("Chunk parse error", err);
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: err.message || "Something went wrong" },
      ]);
      setIsStreaming(false);
      toast.info(err?.message || "Failed to respond at the moment.")
    }
    finally {
      setIsStreaming(false)
    }
  };

  // 🚀 SEND HANDLER
  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const query = input;
    setInput("");

    // add user message
    setMessages((prev) => [...prev, { role: "user", content: query }]);

    await streamResponse(query);
  };


  return (
    <>
      {/* Flow */}
      <ReactFlow
        initialNodes={data.graph.nodes as Node[]}
        initialEdges={data.graph.edges as Edge[]}
        hero={false}
      />

      <button
        onClick={() => setChatOpen((prev) => !prev)}
        className="absolute top-5 cursor-pointer right-6 z-50 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-xs backdrop-blur hover:bg-white/20 transition"
      >
        {chatOpen ? "Hide Chat" : "Show Chat"}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 h-full w-[340px] flex flex-col z-40 pt-10"
          >
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.map((msg, i) => (
                <MessageBox msg={msg} i={i} />
              ))}

              {thinking && (
                <MessageBox msg={{ role: "assistant", content: "Thinking" }} i={-1} />
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-white/10 px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-purple-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={isStreaming}
                className="p-0 px-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm shadow hover:scale-105 transition disabled:opacity-50"
              >
                <ArrowUp size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}