'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question, QuestionMode, QuestionAnswer, QuestionResponse } from '@/types/question';
import { getQuestion, getAnswer } from '@/utils/actions/questions';
import { MarkdownFinal as Markdown } from '@/components/markdown/markdown_final';
import { cn } from '@/lib/utils';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineAcademicCap,
  HiOutlineBookOpen
} from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

interface QuestionsProps {
  mode: QuestionMode;
  initialQuestion: Question;
}

export default function Questions({ mode, initialQuestion }: QuestionsProps) {
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [answer, setAnswer] = useState<QuestionAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [remainingTime, setRemainingTime] = useState<number | null>(
    initialQuestion.timeLimit || null
  );
  const router = useRouter();

  // Handle time limit
  useEffect(() => {
    if (!remainingTime) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          router.push('/dashboard/practice/results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, router]);

  // Reset timer when question changes
  useEffect(() => {
    setStartTime(Date.now());
  }, [question.id]);

  const showMetadata = mode === 'practice' || mode === 'skill';
  const showAnswerImmediately = mode === 'skill';
  const showAnswer = mode === 'review' || (showAnswerImmediately && selectedChoices[question.id]);

  const handleChoiceSelect = async (choiceId: string) => {
    const timeTaken = (Date.now() - startTime) / 1000;
    setSelectedChoices(prev => ({ ...prev, [question.id]: choiceId }));

    const response: QuestionResponse = {
      questionId: question.id,
      selectedChoiceId: choiceId,
      timeTaken
    };
    
    // TODO: Send response to server
    console.log('Question response:', response);

    if (showAnswerImmediately) {
      setLoading(true);
      const answer = await getAnswer(question.id);
      setAnswer(answer);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (question.questionNumber < question.totalQuestions) {
      setLoading(true);
      const nextQuestion = await getQuestion(question.questionNumber + 1);
      if (nextQuestion) {
        setQuestion(nextQuestion);
        setAnswer(null);
        // Load previous answer if it exists
        if (selectedChoices[nextQuestion.id]) {
          const answer = await getAnswer(nextQuestion.id);
          setAnswer(answer);
        }
      }
      setLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (question.questionNumber > 1) {
      setLoading(true);
      const prevQuestion = await getQuestion(question.questionNumber - 1);
      if (prevQuestion) {
        setQuestion(prevQuestion);
        setAnswer(null);
        // Load previous answer if it exists
        if (selectedChoices[prevQuestion.id]) {
          const answer = await getAnswer(prevQuestion.id);
          setAnswer(answer);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Timer Display */}
        {remainingTime !== null && (
          <div className="mb-4 text-right">
            <span className="font-mono text-lg">
              Time remaining: {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Question Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Question {question.questionNumber} of {question.totalQuestions}
          </h2>
          {showMetadata && question.metadata && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <HiOutlineAcademicCap className="h-4 w-4" />
                <span>{question.metadata.subject} - {question.metadata.domain}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineBookOpen className="h-4 w-4" />
                <span>{question.metadata.skill}</span>
              </div>
            </div>
          )}
        </div>

        {/* Question Content */}
        <Card className="mb-6 p-6">
          <Markdown content={question.content} isChoice={false} />
        </Card>

        {/* Choices */}
        <div className="grid gap-4">
          {question.choices.map((choice) => (
            <Button
              key={choice.id}
              variant={selectedChoices[question.id] === choice.id ? "default" : "outline"}
              className={cn(
                "h-auto justify-start p-4 text-left",
                answer && choice.id === answer.correctChoiceId && "border-green-500",
                answer && selectedChoices[question.id] === choice.id && 
                selectedChoices[question.id] !== answer.correctChoiceId && "border-red-500"
              )}
              onClick={() => handleChoiceSelect(choice.id)}
              disabled={loading || (mode === 'review' && selectedChoices[question.id] !== null)}
            >
              <span className="mr-4 font-bold">{choice.id.toUpperCase()}.</span>
              <Markdown content={choice.content} isChoice={true} />
            </Button>
          ))}
        </div>

        {/* Answer Explanation */}
        {showAnswer && answer && (
          <Card className="mt-6 p-6 bg-muted">
            <Markdown content={answer.explanation} isChoice={false} />
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={question.questionNumber === 1 || loading}
          >
            <HiOutlineChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={question.questionNumber === question.totalQuestions || loading}
          >
            Next
            <HiOutlineChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 