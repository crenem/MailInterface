export type Priority = 'low' | 'medium' | 'high';
export type CaseStatus = 'open' | 'closed' | 'pending' | 'on-hold';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  priority: Priority;
  clientName: string;
  assignedTo: string;
  createdAt: string;
}

export interface Message {
  id: string;
  caseId: string;
  sender: User;
  recipients: User[];
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  attachments?: Attachment[];
  labels: string[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

export type FolderType = 'inbox' | 'starred' | 'sent' | 'drafts' | 'trash' | 'archive';
