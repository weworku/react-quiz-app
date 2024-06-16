export type CardData = {
  title: string;
  description: string;
  imageUrl?: string;
  answers: [
    {
      answer_sentence?: string;
      answer_image_url?: string;
      is_correct_answer: boolean;
    }
  ]
  correctAnswer: string; //** 正答 */
  userCorrectAnswer: string; //** ユーザーが選択した正答 */
  explanation: string;
}
export type QuizData = {
  id: number;
  question_sentence: string;
  image_url?: string;
  correct_answer_count: number;
  answers_attributes: [
    {
      answer_sentence: string;
      answer_image_url?: string;
      is_correct_answer: boolean;
    }
  ]
  explanation: string;
}
export type QuizResult = {
  correctAnswerCount: number;
}