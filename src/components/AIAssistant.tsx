import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { queryTharunRAG } from '../utils/ragEngine';
import type { PageId } from '../types/theme';

let messageCounter = 0;
const generateMessageId = () => `msg-${Date.now()}-${++messageCounter}`;

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  sources?: { id: string; title: string; score: number }[];
  action?: {
    label: string;
    page?: PageId;
    isResume?: boolean;
    externalUrl?: string;
  };
  followUps?: string[];
  timestamp: string;
}

const INITIAL_QUICK_PROMPTS = [
  'Why should a team hire Tharun Raj?',
  'How was GitPulse built and what makes it unique?',
  'View official formatted resume',
  'Tell me about his 30+ days LeetCode streak',
  'What Microsoft certificates does he hold?',
  'Summarize his education & CGPA at LPU',
  'What is his technical skill proficiency?',
  'How can I get in touch with Tharun?'
];

interface AIAssistantProps {
  onOpenResume?: () => void;
  onNavigatePage: (page: PageId) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigatePage, onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [activePrompts, setActivePrompts] = useState<string[]>(INITIAL_QUICK_PROMPTS);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 I am Tharun AI, the intelligent RAG-powered copilot for THARUN RAJ T P. I have complete indexed knowledge of his academic record at LPU (CGPA 7.88), his GitPulse 3D analytics platform, LeetCode 30+ day streak, 8x Microsoft certificates, technical skill set (~60% Intermediate), and official resume. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      followUps: [
        'Why should a team hire Tharun Raj?',
        'How was GitPulse built and what makes it unique?',
        'View official formatted resume'
      ]
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Clean up speech on close or unmount
  useEffect(() => {
    return () => {
      soundFx.stopSpeech();
    };
  }, []);

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      soundFx.stopSpeech();
      setSpeakingMsgId(null);
      return;
    }

    soundFx.stopSpeech();
    setSpeakingMsgId(msgId);
    soundFx.speakText(
      text,
      () => setSpeakingMsgId(msgId),
      () => setSpeakingMsgId(null)
    );
  };

  const startVoiceInput = () => {
    soundFx.playClick();
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    soundFx.playKeypress();
    const userMsg: Message = {
      id: generateMessageId(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Execute RAG retrieval and synthesis
      const ragResult = queryTharunRAG(query);
      const aiMsgId = generateMessageId();
      const aiMsg: Message = {
        id: aiMsgId,
        sender: 'ai',
        text: ragResult.answer,
        sources: ragResult.retrievedDocs,
        action: ragResult.action,
        followUps: ragResult.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      if (ragResult.suggestedFollowUps && ragResult.suggestedFollowUps.length > 0) {
        setActivePrompts(ragResult.suggestedFollowUps);
      }
      setIsTyping(false);
      soundFx.playSuccess();

      if (autoSpeak) {
        handleSpeakMessage(aiMsgId, ragResult.answer);
      }
    }, 350);
  };

  const handleActionClick = (action: { label: string; page?: PageId; isResume?: boolean; externalUrl?: string }) => {
    soundFx.playClick();
    if (action.isResume) {
      if (onOpenResume) {
        onOpenResume();
      }
    } else if (action.page) {
      onNavigatePage(action.page);
    } else if (action.externalUrl) {
      window.open(action.externalUrl, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Copilot Agent Button in Theme Accent */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => {
            soundFx.playClick();
            setIsOpen(!isOpen);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full btn-theme-primary font-heading font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Bot size={18} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>
          <span>Ask Tharun AI</span>
          <Sparkles size={14} className="text-white animate-pulse" />
        </button>
      </div>

      {/* Slide-out Interactive Copilot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[580px] h-[78vh] z-50 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 print:hidden">
          {/* Header */}
          <div className="p-4 bg-[#faf8f5] border-b border-[var(--theme-border)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)]">
                <Bot size={20} className="text-[var(--theme-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-heading font-bold text-[#1c1917]">Tharun AI Copilot</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-[#78716c]">
                  AI &amp; Data Engineering • LPU (CGPA 7.88)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Auto Speak Toggle */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setAutoSpeak(!autoSpeak);
                  if (autoSpeak) soundFx.stopSpeech();
                }}
                title={autoSpeak ? 'Auto Voice Narration: ON' : 'Enable Auto Voice Narration'}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  autoSpeak
                    ? 'bg-[var(--theme-light)] border-[var(--theme-primary)] text-[var(--theme-dark)]'
                    : 'bg-[#ffffff] border-[var(--theme-border)] text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                {autoSpeak ? <Volume2 size={15} className="text-[var(--theme-primary)] animate-pulse" /> : <VolumeX size={15} />}
              </button>

              {/* Reset Chat */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  soundFx.stopSpeech();
                  setMessages([
                    {
                      id: generateMessageId(),
                      sender: 'ai',
                      text: `Chat reset. Ask me anything about Tharun's projects, LeetCode streak, LPU coursework, or technical skills!`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
                  ]);
                }}
                title="Reset Conversation"
                className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#78716c] hover:text-[#1c1917] border border-[var(--theme-border)] cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  soundFx.stopSpeech();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[var(--theme-light)] text-[#57534e] hover:text-[#1c1917] border border-[var(--theme-border)] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#faf8f5]/80 border-b border-[var(--theme-border)] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-[#78716c] text-[10px] shrink-0 font-bold flex items-center gap-1">
              <Sparkles size={11} className="text-[var(--theme-primary)]" />
              <span>Ask:</span>
            </span>
            {activePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-[#ffffff] hover:bg-[var(--theme-light)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-[var(--theme-dark)] whitespace-nowrap shrink-0 transition-colors font-medium cursor-pointer shadow-xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#fdfbf7]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-[var(--theme-primary)]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                    m.sender === 'user'
                      ? 'btn-theme-primary rounded-br-none shadow-sm'
                      : 'bg-[#ffffff] border border-[var(--theme-border)] text-[#1c1917] rounded-bl-none shadow-sm'
                  }`}
                >
                  {/* Retrieved Knowledge Base Source Badges */}
                  {m.sources && m.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pb-1.5 border-b border-[var(--theme-border)]/60 text-[9px] text-[#78716c]">
                      <BookOpen size={10} className="text-[var(--theme-primary)]" />
                      <span className="font-semibold text-[#57534e]">RAG Source:</span>
                      <span className="px-1.5 py-0.5 rounded bg-[var(--theme-light)] font-mono text-[var(--theme-dark)]">
                        {m.sources[0].title}
                      </span>
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                  {/* Primary Action Button */}
                  {m.action && (
                    <button
                      onClick={() => handleActionClick(m.action!)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-light)] hover:bg-[#ffffff] border border-[var(--theme-border)] text-[var(--theme-dark)] text-[11px] font-bold transition-all mt-1 cursor-pointer"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight size={11} />
                    </button>
                  )}

                  {/* Contextual Suggested Follow-up Questions */}
                  {m.sender === 'ai' && m.followUps && m.followUps.length > 0 && (
                    <div className="pt-1.5 border-t border-[var(--theme-border)]/50 space-y-1">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-[#78716c]">
                        <HelpCircle size={9} />
                        <span>Suggested follow-ups:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.followUps.slice(0, 2).map((fu, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(fu)}
                            className="px-2 py-0.5 rounded bg-[#f5f5f4] hover:bg-[var(--theme-light)] hover:border-[var(--theme-primary)] border border-stone-200 text-[10px] text-[#44403c] transition-colors cursor-pointer text-left font-medium"
                          >
                            💬 {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-black/5 text-[9px] font-mono">
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => handleSpeakMessage(m.id, m.text)}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                          speakingMsgId === m.id
                            ? 'text-[var(--theme-primary)] font-bold bg-[var(--theme-light)] animate-pulse'
                            : 'text-[#78716c] hover:text-[#1c1917]'
                        }`}
                        title={speakingMsgId === m.id ? 'Stop reading' : 'Read message aloud in male voice'}
                      >
                        <Volume2 size={11} />
                        <span>{speakingMsgId === m.id ? 'Speaking...' : 'Listen'}</span>
                      </button>
                    )}

                    <div className={`${m.sender === 'user' ? 'text-white/70 ml-auto' : 'text-[#a8a29e]'}`}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0 mt-0.5">
                    <User size={13} className="text-[var(--theme-primary)]" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-[#78716c] text-xs">
                <div className="w-6 h-6 rounded-lg bg-[var(--theme-light)] border border-[var(--theme-border)] text-[var(--theme-dark)] flex items-center justify-center shrink-0">
                  <Bot size={13} className="text-[var(--theme-primary)]" />
                </div>
                <div className="flex items-center gap-1 p-3 rounded-2xl bg-[#ffffff] border border-[var(--theme-border)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#faf8f5] border-t border-[var(--theme-border)] flex items-center gap-2">
            <button
              onClick={startVoiceInput}
              title={isListening ? 'Listening... click to stop' : 'Click to speak your question'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-[#fee2e2] text-[#ef4444] border-[#fca5a5] animate-pulse'
                  : 'bg-[#ffffff] text-[#78716c] hover:text-[#1c1917] border-[var(--theme-border)]'
              }`}
            >
              {isListening ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Listening to your voice...' : "Ask anything about Tharun's skills, GitPulse, LPU..."}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[var(--theme-border)] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:border-[var(--theme-primary)] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-xl btn-theme-primary disabled:opacity-40 text-white transition-colors cursor-pointer"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
