import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { ComposeModal } from './components/ComposeModal';
import { mockMessages, mockCases } from './mockData';
import { Message, FolderType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeFolder, setActiveFolder] = useState<FolderType>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const filteredMessages = useMemo(() => {
    if (activeFolder === 'starred') {
      return mockMessages.filter(m => m.isStarred);
    }
    if (activeFolder === 'sent') {
      return mockMessages.filter(m => m.labels.includes('Sent'));
    }
    // Simple mock filtering logic
    return mockMessages;
  }, [activeFolder]);

  const relatedCase = useMemo(() => {
    if (!selectedMessage) return undefined;
    return mockCases.find(c => c.id === selectedMessage.caseId);
  }, [selectedMessage]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900">
      <Sidebar 
        activeFolder={activeFolder} 
        onFolderChange={(folder) => {
          setActiveFolder(folder);
          setSelectedMessage(null);
        }}
        onCompose={() => setIsComposeOpen(true)}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <AnimatePresence mode="wait">
          {!selectedMessage ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col h-full"
            >
              <EmailList 
                messages={filteredMessages} 
                onSelect={setSelectedMessage} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col h-full"
            >
              <EmailDetail 
                message={selectedMessage} 
                relatedCase={relatedCase}
                onBack={() => setSelectedMessage(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </div>
  );
}
