export type QuestionMode = 'question' | 'practice' | 'review' | 'skill';

export interface QuestionMetadata {
  subject: string;
  domain: string;
  skill: string;
}

export interface Choice {
  id: string;
  content: string; // markdown content
}

export interface Question {
  id: string;
  questionNumber: number;
  content: string; // markdown content
  choices: Choice[];
  metadata?: QuestionMetadata;
  totalQuestions: number;
  timeLimit?: number; // in seconds, for the entire set
}

export interface QuestionAnswer {
  id: string;
  correctChoiceId: string;
  explanation: string; // markdown content
}

export interface QuestionResponse {
  questionId: string;
  selectedChoiceId: string;
  timeTaken: number; // in seconds
} 