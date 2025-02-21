import Questions from '@/components/questions';
import { getQuestion } from '@/utils/actions/questions';

export default async function PracticePage() {
  const initialQuestion = await getQuestion(1);
  
  if (!initialQuestion) {
    return <div>No questions found</div>;
  }

  return (
    <Questions 
      mode="practice"
      initialQuestion={initialQuestion}
    />
  );
} 