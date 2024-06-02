import { useState } from "react";
import { CardData } from "../../type";
import AnimatedCard from "./AnimatedCard"
import HorizontalLinearStepper from "./HorizontalLinearStepper"
import useQuizData from "../../hooks/useQuizData";

export default function QuizApp() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [position, setPosition] = useState<'left' | 'right'>('right');

  const [skipped, setSkipped] = useState(new Set<number>());
  // Quizの取得
  useQuizData({ setCards });
  return (
    <>
      {/* 問題の解答状況インジケーター */}
      <HorizontalLinearStepper
        activeStep={activeIndex}
        skipped={skipped}
      />
      {/* カード式の問題・回答 */}
      <AnimatedCard
        cards={cards}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        position={position}
        setPosition={setPosition}
        skipped={skipped}
        setSkipped={setSkipped}
      />
    </>)
}