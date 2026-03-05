import React from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Trash2, 
  Archive, 
  Plus,
  FolderOpen,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { FolderType } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeFolder: FolderType;
  onFolderChange: (folder: FolderType) => void;
  onCompose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeFolder, onFolderChange, onCompose }) => {
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const cases = [
    { id: 'CASE-2024-001', label: 'Johnson Estate' },
    { id: 'CASE-2024-002', label: 'TechFlow Merger' },
    { id: 'CASE-2024-003', label: 'Oak St Dispute' },
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
      <div className="p-4">
        <button
          onClick={onCompose}
          className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-slate-700 font-medium w-full"
        >
          <Plus className="w-5 h-5 text-indigo-600" />
          Compose
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onFolderChange(folder.id as FolderType)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm transition-colors",
              activeFolder === folder.id 
                ? "bg-indigo-50 text-indigo-700 font-semibold" 
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center gap-3">
              <folder.icon className={cn("w-4 h-4", activeFolder === folder.id ? "text-indigo-600" : "text-slate-400")} />
              {folder.label}
            </div>
            {folder.count && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                activeFolder === folder.id ? "bg-indigo-100" : "bg-slate-100"
              )}>
                {folder.count}
              </span>
            )}
          </button>
        ))}

        <div className="pt-6 pb-2 px-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Active Cases</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <FolderOpen className="w-4 h-4 text-slate-400" />
            <span className="truncate">{caseItem.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">Alex Manager</p>
            <p className="text-xs text-slate-400 truncate">alex@casemail.com</p>
          </div>
          <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
