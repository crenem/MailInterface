import { Case, Message, User } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Case Manager',
  email: 'alex@casemail.com',
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

export const mockCases: Case[] = [
  {
    id: 'CASE-2024-001',
    title: 'Estate Planning - Johnson Family',
    status: 'open',
    priority: 'high',
    clientName: 'Robert Johnson',
    assignedTo: 'u1',
    createdAt: '2024-01-15'
  },
  {
    id: 'CASE-2024-002',
    title: 'Corporate Merger - TechFlow Inc',
    status: 'pending',
    priority: 'medium',
    clientName: 'Sarah Miller',
    assignedTo: 'u1',
    createdAt: '2024-02-10'
  },
  {
    id: 'CASE-2024-003',
    title: 'Property Dispute - Oak Street',
    status: 'open',
    priority: 'low',
    clientName: 'James Wilson',
    assignedTo: 'u2',
    createdAt: '2024-02-28'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    caseId: 'CASE-2024-001',
    sender: {
      id: 'u2',
      name: 'Robert Johnson',
      email: 'robert.j@gmail.com',
      avatar: 'https://picsum.photos/seed/robert/100/100'
    },
    recipients: [currentUser],
    subject: 'Updated documents for the trust',
    body: 'Hi Alex,\n\nI have attached the updated property deeds for the family trust. Please review them and let me know if everything is in order.\n\nBest regards,\nRobert',
    timestamp: '2024-03-03T10:30:00Z',
    isRead: false,
    isStarred: true,
    labels: ['Legal', 'Urgent'],
    attachments: [
      { id: 'a1', name: 'property_deed_v2.pdf', size: '2.4 MB', type: 'pdf', url: '#' }
    ]
  },
  {
    id: 'm2',
    caseId: 'CASE-2024-002',
    sender: {
      id: 'u3',
      name: 'Sarah Miller',
      email: 'sarah@techflow.io',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    recipients: [currentUser],
    subject: 'TechFlow Merger - Internal Review',
    body: 'The internal review of the merger documents is complete. We found a few discrepancies in the financial statements from Q3. Can we schedule a call to discuss this tomorrow?',
    timestamp: '2024-03-03T09:15:00Z',
    isRead: true,
    isStarred: false,
    labels: ['Corporate']
  },
  {
    id: 'm3',
    caseId: 'CASE-2024-001',
    sender: currentUser,
    recipients: [{ id: 'u2', name: 'Robert Johnson', email: 'robert.j@gmail.com' }],
    subject: 'Re: Updated documents for the trust',
    body: 'Thank you Robert. I will review these today and get back to you by EOD.',
    timestamp: '2024-03-02T16:45:00Z',
    isRead: true,
    isStarred: false,
    labels: ['Sent']
  },
  {
    id: 'm4',
    caseId: 'CASE-2024-003',
    sender: {
      id: 'u4',
      name: 'James Wilson',
      email: 'james.w@outlook.com',
      avatar: 'https://picsum.photos/seed/james/100/100'
    },
    recipients: [currentUser],
    subject: 'Question about the boundary line',
    body: 'Alex, I was looking at the survey again and I have a question about the northern boundary line. It seems different from the 1998 survey.',
    timestamp: '2024-03-01T11:20:00Z',
    isRead: true,
    isStarred: false,
    labels: ['Property']
  }
];
