import React, { useState } from 'react';
import { X, Maximize2, Minimize2, Paperclip, Image, Link, Smile, Send, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 right-12 w-[500px] bg-white shadow-2xl rounded-t-xl border border-slate-200 z-50 flex flex-col overflow-hidden"
          style={{ height: isMinimized ? '40px' : '500px' }}
        >
          {/* Header */}
          <div className="h-10 bg-slate-800 text-white px-4 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
            <span className="text-sm font-medium">New Message</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-700 rounded" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </button>
              <button className="p-1 hover:bg-slate-700 rounded" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Fields */}
              <div className="px-4 py-2 space-y-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm border-b border-slate-100 py-1">
                  <span className="text-slate-400 w-12">To</span>
                  <input type="text" className="flex-1 outline-none" />
                  <div className="flex gap-2 text-xs text-slate-400">
                    <button className="hover:text-slate-600">Cc</button>
                    <button className="hover:text-slate-600">Bcc</button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm border-b border-slate-100 py-1">
                  <span className="text-slate-400 w-12">Subject</span>
                  <input type="text" className="flex-1 outline-none" />
                </div>
                <div className="flex items-center gap-2 text-sm py-1">
                  <span className="text-slate-400 w-12">Case ID</span>
                  <select className="flex-1 outline-none bg-transparent text-slate-600">
                    <option>Select a case...</option>
                    <option>CASE-2024-001 - Johnson Estate</option>
                    <option>CASE-2024-002 - TechFlow Merger</option>
                    <option>CASE-2024-003 - Oak St Dispute</option>
                  </select>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-4">
                <textarea 
                  className="w-full h-full resize-none outline-none text-sm text-slate-700 placeholder:text-slate-300"
                  placeholder="Type your message here..."
                />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    Send
                    <Send className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 px-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Paperclip className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Link className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Smile className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Image className="w-4 h-4" /></button>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
