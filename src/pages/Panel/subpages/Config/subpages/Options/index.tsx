import React, { useEffect } from "react"
import { Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextareaAutosize } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ConfigOptionsProps {
    user: User
}

export const ConfigOptions: React.FC<ConfigOptionsProps> = ({ user }) => {
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
                gap: "1vw",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    padding: "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <h2>Observações</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>As observações poderão ser alteradas no momento da emissão da NFe.</p>
                <TextareaAutosize
                    // minRows={3}
                    // maxRows={10}
                    // value={value}
                    // onChange={handleChange}
                    style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: "30px",
                        height: "100%",
                        width: "100%",
                        padding: "0.5vw",
                        marginTop: "1vw",
                        resize: "none",
                        overflowY: "scroll",
                    }}
                    placeholder="A observação padrão aparecerá em todas notas fiscais."
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    padding: "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Funrural</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>Escolha uma configuração como padrão para o recolhimento Funrural</p>
                <RadioGroup defaultValue="payroll" name="funrural-collect" sx={{ marginTop: "0.5vw" }}>
                    <FormControlLabel value="payroll" control={<Radio />} defaultChecked label="Recolhimento pela folha de pagamento" />
                    <FormControlLabel value="produce" control={<Radio />} label="Recolhimento pelo valor da produção agrícola" />
                </RadioGroup>
                <hr style={{ margin: "0.5vw 0" }} />
                <FormControlLabel
                    value="funrural-on-invoice"
                    control={<Checkbox defaultChecked />}
                    label="Exibir recolhimento do Funrural nas observações da nota fiscal"
                />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    padding: "1.5vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Livro-caixa</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
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
            </Box>
        </Box>
    )
}
