// import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import AnimatedCard from './component/AnimatedCard'
import ButtonAppBar from './component/ButtonAppBar'
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ヘッダー部 */}
      <ButtonAppBar />
      {/* ボディー部 */}
      {/* 問題の解答状況インジケーター */}

      {/* カード式の問題・回答 */}
      <AnimatedCard />

    </ThemeProvider>
  )
}

export default App
