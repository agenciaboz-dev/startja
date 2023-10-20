import { ThemeProvider } from '@mui/material'
import { useMuiTheme } from './hooks/useMuiTheme'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './Providers'
import { Routes } from './Routes'
import './App.css'

function App() {
  const theme = useMuiTheme()

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Providers>
          <Routes />
        </Providers>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
