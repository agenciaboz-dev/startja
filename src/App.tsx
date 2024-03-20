import { Box, ThemeProvider } from "@mui/material"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { BrowserRouter } from "react-router-dom"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import "./App.css"
import { app_version } from "./version"

function App() {
    const theme = useMuiTheme()

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Providers>
                    <Routes />
                    <Box sx={{ position: "absolute", color: "red", bottom: 5, right: 5 }}>{app_version}</Box>
                </Providers>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
