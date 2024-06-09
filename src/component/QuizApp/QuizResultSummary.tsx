import { Box, Button } from "@mui/material";
import { QuizResult } from "../../type";

type Props = {
  setFifnished: React.Dispatch<React.SetStateAction<boolean>>,
  quizResult: QuizResult
}

export default function QuizResultSummary({ setFifnished, quizResult }: Props) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Box sx={{ width: '50%', mb: 1.5 }}>
        <h1>QuizResultSummary</h1>
        <p>結果: {quizResult.correctAnswerCount} / 10</p>
        <Button onClick={() => setFifnished(false)}>Try again</Button>
      </Box>
    </Box>
  );
}