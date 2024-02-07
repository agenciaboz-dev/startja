import React, { useEffect } from "react"
import { Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextareaAutosize, useMediaQuery } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { colors } from "../../../../../../style/colors"
import { ObservationsContainer } from "./ObservationsContainer"
import { FunruralContainer } from "./FunruralContainer"

interface ConfigOptionsProps {
    user: User
}

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Configurações")
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                height: "100%",
                width: "100%",
                gap: isMobile ? "5vw" : "1vw",
            }}
        >
            <ObservationsContainer user={user} />
            <FunruralContainer user={user} />
            {/* <Box
                sx={{
                    padding: isMobile ? "5vw" : "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    flexDirection: "column",
                    width: "100%",
                    gap: isMobile ? "5vw" : "",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Livro-caixa</h2>
                    <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>Escolha uma configuração como padrão para a exportação do livro-caixa</p>
                <RadioGroup defaultValue="lcdpr-cashbook-export" name="cashbook-export" sx={{ marginTop: "0.5vw" }}>
                    <FormControlLabel
                        value="lcdpr-cashbook-export"
                        control={<Radio />}
                        defaultChecked
                        label="Livro-caixa digital do produtor rural (LCDPR)"
                    />
                    <FormControlLabel value="simple-cashbook-export" control={<Radio />} label="Livro-caixa simples" />
                </RadioGroup>
            </Box> */}
        </Box>
    )
}
