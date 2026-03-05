import React from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Reply, 
  Forward, 
  Printer, 
  ExternalLink,
  Download,
  FileText,
  Clock,
  User as UserIcon,
  Tag
} from 'lucide-react';
import { Message, Case } from '../types';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface EmailDetailProps {
  message: Message;
  relatedCase?: Case;
  onBack: () => void;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ message, relatedCase, onBack }) => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Archive">
            <Reply className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Delete">
            <Forward className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Mark as unread">
            <Printer className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Case Context Header */}
          {relatedCase && (
            <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{relatedCase.title}</h3>
                  <p className="text-xs text-slate-500">{relatedCase.id} • {relatedCase.clientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                  relatedCase.status === 'open' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                )}>
                  {relatedCase.status}
                </span>
                <button className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1">
                  View Case <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Email Subject */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{message.subject}</h1>
              <div className="flex gap-1">
                {message.labels.map(label => (
                  <span key={label} className="px-2 py-0.5 bg-slate-100 text-[10px] rounded uppercase tracking-wider font-bold text-slate-500">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              {message.sender.avatar ? (
                <img 
                  src={message.sender.avatar} 
                  alt={message.sender.name} 
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <UserIcon className="w-6 h-6" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{message.sender.name}</span>
                  <span className="text-sm text-slate-400">&lt;{message.sender.email}&gt;</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  to me
                  <Clock className="w-3 h-3 ml-2" />
                  {format(new Date(message.timestamp), 'PPP p')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Reply className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Email Body */}
          <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap mb-12 leading-relaxed">
            {message.body}
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="border-t border-slate-100 pt-8">
              <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                Attachments ({message.attachments.length})
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {message.attachments.map(att => (
                  <div key={att.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{att.name}</p>
                        <p className="text-xs text-slate-400">{att.size}</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reply Area */}
          <div className="mt-12 p-6 border border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-sm text-slate-400 mb-4">Click here to <span className="text-indigo-600 font-semibold cursor-pointer">Reply</span> or <span className="text-indigo-600 font-semibold cursor-pointer">Forward</span></p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Reply className="w-4 h-4" />
                Reply
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Forward className="w-4 h-4" />
                Forward
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
