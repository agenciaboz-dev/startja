import React, { useEffect } from "react"
import { Box, Button, FormControlLabel, TextareaAutosize } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"
import { colors } from "../../../../../../style/colors"
import { ToggleSwitch } from "../../../../../../components/ToggleSwitch"

interface ConfigIntegrationsProps {
    user: User
}

export const ConfigIntegrations: React.FC<ConfigIntegrationsProps> = ({ user }) => {
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
                    gap: "0.5vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <h2>Integração Sistema Domínio</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>A integração envia as NFe's emitidas para o sistema do seu contador automaticamente.</p>
                <p>Insira a chave de integração:</p>
                <TextareaAutosize
                    // minRows={3}
                    // maxRows={10}
                    // value={value}
                    // onChange={handleChange}
                    style={{
                        backgroundColor: colors.background,
                        borderRadius: "30px",
                        height: "100%",
                        width: "100%",
                        padding: "0.5vw",
                        // marginTop: "1vw",
                        resize: "none",
                        overflowY: "scroll",
                    }}
                    placeholder="Exemplo de chave: 9562e184n398498nhfsadf808333"
                />
                <p>Entre em contato com o seu contador para gerar uma chave de integração no sistema Domínio.</p>
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
                    gap: "0.5vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <h2>Integração Omie</h2>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Salvar informações
                    </Button>
                </Box>
                <p>
                    Com a integração do StartJá com a Omie, os lançamentos feitos dentro do StartJá são realizados automaticamente na Omie ao
                    escriturar um documento.
                </p>
                <p>Para integrar, copie e cole as chaves de integrações do sistema Omie. Veja aonde encontrar as chaves de integração.</p>
                <FormControlLabel
                    value="omie-integration"
                    control={<ToggleSwitch toggleSwitchCallback={() => {}} />}
                    label="Ativar integração com Omie"
                />
            </Box>
        </Box>
    )
}
