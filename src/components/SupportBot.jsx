import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X, Sparkles, User, Zap, ShieldCheck, Heart, MessageSquare } from "lucide-react";
import api from "../api/axiosInstance";

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hey there! I'm your THS Genius. Ready to explore?", isHtml: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickActions = [
    { label: "📚 Admission Info", query: "Tell me about admission" },
    { label: "📅 Events", query: "What are the latest events?" },
    { label: "👨‍💻 Contact Dev", query: "contact developer" },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedAnswers = {
    "who developed this website": "👨‍💻 This vision was brought to life by **Vinayak NV**, a passionate developer dedicated to modernizing school infrastructure.",
    "who made this website": "👨‍💻 This platform was crafted with ❤️ by **Vinayak NV**.",
    "who created this website": "👨‍💻 This website was developed by **Vinayak NV**.",
    "who developed ai chatbot": "🤖 I was engineered and integrated by **Vinayak NV** to provide instant secondary support.",
    "who created ai chatbot": "🤖 My core integration was handled by **Vinayak NV**.",
    "who made this project": "🚀 This entire ecosystem was developed and deployed by **Vinayak NV**.",
    "contact developer": '📞 <a href="tel:8075631073" class="font-bold text-violet-400">8075631073</a> <br/> 🌐 <a href="https://youtubejd56.github.io/vinayak-portfolio/" target="_blank" rel="noopener noreferrer" class="text-violet-400 underline font-bold">Visit Portfolio</a>',
    "features": "✨ I can help you with admission queries, event updates, and quick school information. Ask me anything!",
    "help": "Try asking about 'admission', 'contact developer', or 'latest events'!",
    "admission": "📝 Admissions are currently open! You can fill out the form in the 'Admission' section of the website or visit the school office.",
    "events": "📅 Keep an eye on the 'Latest Events' section for upcoming school programs and celebrations!",
    "contact": "📞 0482 2205285, Email: Thspala@gmail.com",
    "location": "📍 The School is located in Pala, Kottayam, Kerala, India.",
  };

  const handleSend = async (customMsg = null) => {
    const trimmedInput = (customMsg || input).trim();
    if (!trimmedInput) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmedInput, isHtml: false },
    ]);
    if (!customMsg) setInput("");
    setLoading(true);

    const lowerInput = trimmedInput.toLowerCase();
    const matchedKey = Object.keys(predefinedAnswers).find(key => lowerInput.includes(key));

    if (matchedKey) {
      setTimeout(() => {
        const answer = predefinedAnswers[matchedKey];
        const isHtml = /<[^>]+>/.test(answer);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: answer, isHtml },
        ]);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const res = await api.post("/ai-chat/", { message: trimmedInput });
      const botReply = res.data.reply || "I'm processing your request. Could you rephrase that?";
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: botReply, isHtml: false },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ My circuits are a bit fuzzy right now. Try again soon!", isHtml: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="support-bot-container font-sans overflow-hidden">
      {/* VIBRANT TOGGLE BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-[0_15px_40px_rgba(79,70,229,0.5)] z-[500] flex items-center justify-center group overflow-hidden bg-white p-[3px]"
          >
            {/* VIBRANT GRADIENT BORDER */}
            <div className="absolute inset-[-100%] bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-[length:200%_200%] animate-gradient-flow rounded-full" />

            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center relative z-10">
              <Bot size={32} className="text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>

            {/* ONLINE BADGE */}
            <span className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 z-20 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* VIBRANT CHAT INTERFACE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100vw-3rem)] h-[650px] rounded-[2.5rem] shadow-[0_0_80px_rgba(79,70,229,0.2)] z-[1000] overflow-hidden flex flex-col bg-slate-950 border border-white/5"
          >
            {/* HEADER: USER REQUESTED GRADIENT */}
            <div className="relative p-7 bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
              {/* GLASSY OVERLAY */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[4px]" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

              <div className="flex items-center gap-4 relative z-10 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-inner">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <Bot size={34} className="drop-shadow-lg" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl tracking-tight flex items-center gap-2">
                    THS GENIUS
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-400 text-slate-900 text-[9px] font-black uppercase tracking-wider">
                      Online
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 opacity-80 mt-1">
                    <Zap size={10} className="text-yellow-400 fill-yellow-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Pala THS Intelligence</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/10 relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGE AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 scrollbar-hide">

              {/* QUICK ACTIONS START */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 gap-3 py-4"
                >
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1 px-1">Quick Suggestions</p>
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.query)}
                      className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm font-bold text-left hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-between group"
                    >
                      {action.label}
                      <Sparkles size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse text-right' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg ${msg.role === 'user'
                        ? 'bg-linear-to-tr from-indigo-600 to-purple-600 text-white'
                        : 'bg-white/5 backdrop-blur-xl text-indigo-400 border border-white/10'
                      }`}>
                      {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>

                    <div className="space-y-1">
                      <div className={`px-5 py-4 text-[14px] leading-relaxed shadow-xl font-medium ${msg.role === 'user'
                          ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-[1.8rem] rounded-tr-none'
                          : 'bg-white/5 backdrop-blur-2xl text-slate-200 rounded-[1.8rem] rounded-tl-none border border-white/10'
                        }`}>
                        {msg.isHtml ? <div dangerouslySetInnerHTML={{ __html: msg.content }} className="prose prose-invert prose-sm" /> : <p>{msg.content}</p>}
                      </div>
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1 block">
                        {msg.role === 'user' ? 'Confirmed • Sent' : 'Verified Agent Response'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 animate-pulse">
                    <Zap size={18} />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl rounded-tl-none flex gap-2 items-center border border-white/10 shadow-lg shadow-indigo-500/5">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT SECTION */}
            <div className="p-7 bg-slate-900/50 backdrop-blur-3xl border-t border-white/5">
              <div className="relative group flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border-2 border-transparent focus:border-indigo-500/40 rounded-2xl transition-all outline-none text-sm font-bold text-white placeholder:text-slate-600 group-focus-within:bg-white/10"
                  />
                  <MessageSquare size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                </div>

                <motion.button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-xl shadow-indigo-900/20 disabled:opacity-20 transition-all"
                >
                  <Send size={24} />
                </motion.button>
              </div>

              {/* FOOTER: USER REQUESTED */}
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 w-full">
                  <div className="h-px bg-white/5 flex-1" />
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em] flex items-center gap-2">
                    Vinayak <Heart size={10} className="fill-indigo-500 text-indigo-500" />
                  </p>
                  <div className="h-px bg-white/5 flex-1" />
                </div>
                <div className="text-[9px] text-slate-500/60 font-black uppercase tracking-[0.2em]">
                  Powered by Pala THS AI Engine
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SupportBot;
