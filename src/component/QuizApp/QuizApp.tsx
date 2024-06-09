import { useState } from "react";
import { CardData, QuizResult } from "../../type";
import AnimatedCard from "./AnimatedCard"
import HorizontalLinearStepper from "./HorizontalLinearStepper"
import useQuizData from "../../hooks/useQuizData";
import QuizResultSummary from "./QuizResultSummary";

export default function QuizApp() {
  // カードの元になるquizデータ
  const [cards, setCards] = useState<CardData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [QuizResult, setQuizResult] = useState<QuizResult>({ correctAnswerCount: 0 });
  // slideのカットイン方向
  const [position, setPosition] = useState<'left' | 'right'>('right');
  // skipを選択した問題のインデックスを保持する
  const [skipped, setSkipped] = useState(new Set<number>());
  const [finished, setFinished] = useState<boolean>(false);
  // Quizの取得
  useQuizData({ setCards });
  return (
    <>
      {!finished ? (
        <>
          {/* 問題の解答状況インジケーター */}
          <HorizontalLinearStepper
            activeStep={activeIndex}
            skipped={skipped}
          />
          {/* カード式の問題・回答 */}
          <AnimatedCard
            cards={cards}
            setCards={setCards}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            position={position}
            setPosition={setPosition}
            skipped={skipped}
            setSkipped={setSkipped}
            setFifnished={setFinished}
            setQuizResult={setQuizResult}
            explainMode={false}
          />
        </>
      ) : (
        <>
          <QuizResultSummary quizResult={QuizResult} />
          <AnimatedCard
            cards={cards}
            setCards={setCards}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            position={position}
            setPosition={setPosition}
            skipped={skipped}
            setSkipped={setSkipped}
            setFifnished={setFinished}
            setQuizResult={setQuizResult}
            explainMode={true}
          />
        </>
      )}
    </>)
}