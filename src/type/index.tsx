export type CardData = {
  title: string;
  description: string;
  answers: [
    {
      answer_sentence: string;
      is_correct_answer: boolean;
    }
  ]
  correctAnswer: string;
  color: string;
}
export type QuizData = {
  id: number;
  question_sentence: string;
  correct_answer_count: number;
  answers_attributes: [
    {
      answer_sentence: string;
      is_correct_answer: boolean;
    }
  ]
}