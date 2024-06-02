// import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme';
import ButtonAppBar from './component/ButtonAppBar'
import QuizApp from './component/QuizApp';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ヘッダー部 */}
      <ButtonAppBar />
      {/* ボディー部 */}
      <QuizApp />

    </ThemeProvider>
  )
}

export default App
