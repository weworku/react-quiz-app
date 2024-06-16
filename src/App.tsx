// import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme';
import ButtonAppBar from './component/ButtonAppBar'
import QuizApp from './component/QuizApp/QuizApp';
import { Typography } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ヘッダー部 */}
      <ButtonAppBar />
      {/* ボディー部 */}
      <QuizApp />
      <Typography align={'right'}>※出典：令和6年度分 ITパスポート試験&nbsp;</Typography>
    </ThemeProvider>
  )
}

export default App
