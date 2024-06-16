import { useEffect } from 'react';
import { CardData, QuizData } from '../type';

export default function useQuizData({ setCards }: { setCards: (cards: CardData[]) => void }) {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/data/r06_01/it_passport_questions_r06.json`);
        const data: QuizData[] = await response.json();
        const randomQuestions = getRandomQuestions(data, 10, baseUrl);
        console.log('randomQuestions:', randomQuestions);
        setCards(randomQuestions);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []);

  const getRandomQuestions = (data: QuizData[], count: number, baseUrl: string): CardData[] => {
    const shuffledData = data.sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count).map((quiz) => ({
      title: quiz.question_sentence.substring(0, quiz.question_sentence.indexOf(' ')),
      description: quiz.question_sentence.substring(quiz.question_sentence.indexOf(' '), quiz.question_sentence.length),
      imageUrl: quiz.image_url ? `${baseUrl}${quiz.image_url}` : undefined,
      answers: quiz.answers_attributes,
      correctAnswer: quiz.answers_attributes.find((answer) => answer.is_correct_answer)?.answer_sentence.substring(0, 1) ?? '',
      userCorrectAnswer: '',
      explanation: quiz.explanation,
    }));
  };
}

// dummy data
// const cards: CardData[] = [
//   {
//     title: '問題1',
//     description: 'マーケティングオートメーション（MA）に関する記述として、適切なものはどれか。',
//     answer1: 'ア 企業内に蓄積された大量のデータを分析して、事業戦略などに有効活用する。',
//     answer2: 'イ 小売業やサービス業において、販売した商品単位の情報の収集・蓄積及び分析を行う。',
//     answer3: 'ウ これまで人間が手作業で行っていた定型業務を、AI や機械学習などを取り入れたソフトウェアのロボットが代行することによって自動化や効率化を図る。',
//     answer4: 'エ見込み顧客の抽出，獲得、育成などの営業活動を効率化する。',
//     correctAnswer: 'ア',
//     color: 'lightblue'
//   },
//   { title: 'Card 2', description: 'This is the second card.', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: 'ア', color: 'lightgreen' },
//   { title: 'Card 3', description: 'This is the third card.', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: 'ア', color: 'lightcoral' }
// ];

