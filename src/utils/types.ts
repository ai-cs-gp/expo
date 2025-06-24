import { IconName } from '@/components';

export type WalletLog = {
  id: string;
  missionId: string;
  missionType: string;
  amount: number;
  type: 'incoming' | 'outgoing';
};

export type Mission = {
  id: string;
  imageUrl: string;
  title: string;
  address: string;
  duration: string;
  categories: string[];
  type: string;
  distance: number;
  reward: number;
  description?: string;
  rulesAndConditions?: string[];
  tasks?: Task[];
};

export type TaskStatus = 'pending' | 'completed';

export type Task = {
  icon?: IconName;
  title: string;
  description: string;
  answer: Answer;
  status: TaskStatus;
} & (TaskPendingAnswer | TaskCompletedAnswer);

type TaskPendingAnswer = {
  status: 'pending';
};

type TaskCompletedAnswer = {
  status: 'completed';
  answer: Answer;
};

export type Answer = {
  value?: string;
  type: 'text' | 'image' | 'number' | 'multiple_choice';
  options?: string[];
};
