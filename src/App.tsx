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
      <ButtonAppBar />
      {/* <AnimatedCard /> */}

    </ThemeProvider>
  )
}

export default App
