import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X, Sparkles, User, Zap, ShieldCheck, Heart } from "lucide-react";
import api from "../api/axiosInstance";

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hey there! I'm your THS Genius. Ready to explore?", isHtml: false }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

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
    "contact developer": '📞 <a href="tel:8075631073" class="font-bold text-violet-600">8075631073</a> <br/> 🌐 <a href="https://youtubejd56.github.io/vinayak-portfolio/" target="_blank" rel="noopener noreferrer" class="text-violet-600 underline font-bold">Visit Portfolio</a>',
    "features": "✨ I can help you with admission queries, event updates, and quick school information. Ask me anything!",
    "help": "Try asking about 'admission', 'contact developer', or 'latest events'!",
    "admission": "📝 Admissions are currently open! You can fill out the form in the 'Admission' section of the website or visit the school office.",
    "events": "📅 Keep an eye on the 'Latest Events' section for upcoming school programs and celebrations!",
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmedInput, isHtml: false },
    ]);
    setInput("");
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
    <div className="support-bot-container font-sans">
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
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(139,92,246,0.4)] z-[500] flex items-center justify-center group overflow-hidden bg-white p-[3px]"
          >
            {/* VIBRANT RGB RADIENT BORDER */}
            <div className="absolute inset-[-100%] bg-[linear-gradient(45deg,#ff0080,#7928ca,#ff0080,#0070f3,#00dfd8,#ff0080)] bg-[length:200%_200%] animate-gradient-flow rounded-full" />

            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center relative z-10">
              <Bot size={30} className="text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>

            {/* ONLINE BADGE */}
            <span className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* VIBRANT CHAT INTERFACE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100vw-3rem)] h-[650px] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] z-[1000] overflow-hidden flex flex-col bg-slate-950 border border-white/10"
          >
            {/* HEADER: NEON GRADIENT */}
            <div className="relative p-7 bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 flex items-center justify-between">
              {/* GLASSY OVERLAY */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-2xl">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Bot size={32} className="text-white" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                    THS GENIUS
                    <span className="px-2 py-0.5 rounded-full bg-green-400/20 text-green-300 text-[10px] font-black uppercase tracking-widest border border-green-400/30">Live</span>
                  </h3>
                  <p className="text-indigo-100/70 text-xs font-bold uppercase tracking-widest mt-1">AI Assistant • v2.1</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md border border-white/20 relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGE AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-950 bg-blend-soft-light scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse text-right' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-2xl overflow-hidden ${msg.role === 'user'
                        ? 'bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white'
                        : 'bg-white/10 backdrop-blur-xl text-violet-400 border border-white/10'
                      }`}>
                      {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                    </div>

                    <div>
                      <div className={`px-5 py-4 text-[14px] leading-relaxed shadow-2xl font-medium ${msg.role === 'user'
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-3xl rounded-tr-none'
                          : 'bg-white/5 backdrop-blur-2xl text-slate-200 rounded-3xl rounded-tl-none border border-white/10'
                        }`}>
                        {msg.isHtml ? <div dangerouslySetInnerHTML={{ __html: msg.content }} className="prose prose-invert prose-sm" /> : <p>{msg.content}</p>}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 block px-1">
                        {msg.role === 'user' ? 'Replied' : 'THS Genius Agent'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-violet-400 border border-white/10">
                    <Zap size={18} className="animate-pulse" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl rounded-tl-none flex gap-2 items-center border border-white/10">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT SECTION */}
            <div className="p-7 bg-white/5 backdrop-blur-3xl border-t border-white/10">
              <div className="relative group flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ask THS Genius..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border-2 border-transparent focus:border-violet-500/50 rounded-2xl transition-all outline-none text-sm font-bold text-white placeholder:text-slate-500 group-focus-within:bg-white/10"
                  />
                  <Zap size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>

                <motion.button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-2xl shadow-violet-900/40 disabled:opacity-20 transition-all font-black"
                >
                  <Send size={24} />
                </motion.button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4">
                <div className="h-px bg-white/5 flex-1" />
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                  Developed by <span className="text-violet-400">Vinayak NV</span> <Heart size={10} className="fill-violet-400 text-violet-400" />
                </p>
                <div className="h-px bg-white/5 flex-1" />
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
