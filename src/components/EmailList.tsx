import React from 'react';
import { 
  Star, 
  Paperclip, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Archive,
  Trash2,
  Inbox
} from 'lucide-react';
import { Message } from '../types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface EmailListProps {
  messages: Message[];
  selectedId?: string;
  onSelect: (message: Message) => void;
}

export const EmailList: React.FC<EmailListProps> = ({ messages, selectedId, onSelect }) => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* List Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search cases and messages..." 
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-slate-400"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span>1-50 of 1,234</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-slate-100 rounded-lg disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onSelect(msg)}
            className={cn(
              "group flex items-center gap-4 px-4 py-3 border-b border-slate-100 cursor-pointer transition-all relative",
              !msg.isRead ? "bg-white font-semibold" : "bg-slate-50/30 text-slate-600",
              selectedId === msg.id && "bg-indigo-50/50 border-l-4 border-l-indigo-500"
            )}
          >
            <div className="flex items-center gap-3 flex-shrink-0">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle star toggle
                }}
                className={cn(
                  "p-1 rounded-full hover:bg-slate-100 transition-colors",
                  msg.isStarred ? "text-amber-400" : "text-slate-300"
                )}
              >
                <Star className={cn("w-4 h-4", msg.isStarred && "fill-current")} />
              </button>
            </div>

            <div className="w-48 flex-shrink-0 truncate text-sm">
              {msg.sender.name}
            </div>

            <div className="flex-1 min-w-0 flex items-center gap-3">
              <span className="truncate text-sm">
                {msg.subject}
                <span className="text-slate-400 font-normal ml-2">
                  - {msg.body.substring(0, 100)}...
                </span>
              </span>
              
              <div className="flex items-center gap-1 flex-shrink-0">
                {msg.labels.map(label => (
                  <span 
                    key={label}
                    className="px-2 py-0.5 bg-slate-100 text-[10px] rounded uppercase tracking-wider font-bold text-slate-500"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 text-xs text-slate-400">
              {msg.attachments && msg.attachments.length > 0 && (
                <Paperclip className="w-3 h-3" />
              )}
              <span>{format(new Date(msg.timestamp), 'MMM d')}</span>
            </div>

            {/* Hover Actions */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 bg-white pl-4 shadow-[-20px_0_20px_white]">
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Archive">
                <Archive className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Mark as unread">
                <Inbox className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
