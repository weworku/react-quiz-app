import { useState } from "react";
import { CardData } from "../../type";
import AnimatedCard from "./AnimatedCard"
import HorizontalLinearStepper from "./HorizontalLinearStepper"
import useQuizData from "../../hooks/useQuizData";

export default function QuizApp() {
  const [cards, setCards] = useState<CardData[]>([]);
  // Quizの取得
  useQuizData({ setCards });
  return (
    <>
      {/* 問題の解答状況インジケーター */}
      <HorizontalLinearStepper />
      {/* カード式の問題・回答 */}
      <AnimatedCard cards={cards} />
    </>)
}