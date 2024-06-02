import { useEffect } from 'react';
import { CardData } from '../type';

export default function useQuizData({ setCards }: { setCards: (cards: CardData[]) => void }) {

  const cards: CardData[] = [
    {
      title: '問題1',
      description: 'マーケティングオートメーション（MA）に関する記述として、適切なものはどれか。',
      answer1: 'ア 企業内に蓄積された大量のデータを分析して、事業戦略などに有効活用する。',
      answer2: 'イ 小売業やサービス業において、販売した商品単位の情報の収集・蓄積及び分析を行う。',
      answer3: 'ウ これまで人間が手作業で行っていた定型業務を、AI や機械学習などを取り入れたソフトウェアのロボットが代行することによって自動化や効率化を図る。',
      answer4: 'エ見込み顧客の抽出，獲得、育成などの営業活動を効率化する。',
      correctAnswer: 'ア',
      color: 'lightblue'
    },
    { title: 'Card 2', description: 'This is the second card.', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: 'ア', color: 'lightgreen' },
    { title: 'Card 3', description: 'This is the third card.', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: 'ア', color: 'lightcoral' }
  ];

  useEffect(() => {
    setCards(cards);
  }, [setCards, cards]);
}