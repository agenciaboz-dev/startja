import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Radio, RadioGroup, useMediaQuery } from "@mui/material"
import { useIo } from "../../../../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useFormik } from "formik"

interface FunruralContainerProps {
    user: User
}

export const FunruralContainer: React.FC<FunruralContainerProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<FunruralForm>({
        initialValues: {
            recolhimento: user.recolhimento,
            show_funrural_on_invoices: user.show_funrural_on_invoices,
        },
        onSubmit: (values) => {
            setLoading(true)
            values.recolhimento = Number(values.recolhimento)
            io.emit("user:update", user.id, values)
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        io.on("user:update:success", () => {
            setLoading(false)
            snackbar({ severity: "info", text: "dados do Funrural atualizados" })
        })

        io.on("user:update:error", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "erro ao atualizar os dados" })
        })

        return () => {
            io.off("user:update:success")
            io.off("user:update:error")
        }
    }, [])

    return (
        <Box
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
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <h2>Funrural</h2>
                    <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset" }} type="submit">
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Salvar informações"}
                    </Button>
                </Box>
                <p>Escolha uma configuração como padrão para o recolhimento Funrural</p>
                <RadioGroup value={formik.values.recolhimento} onChange={formik.handleChange} name="recolhimento" sx={{ marginTop: "0.5vw" }}>
                    <FormControlLabel value={1} control={<Radio />} defaultChecked label="Recolhimento pela folha de pagamento" />
                    <FormControlLabel value={2} control={<Radio />} label="Recolhimento pelo valor da produção agrícola" />
                </RadioGroup>
                <hr style={{ margin: "0.5vw 0" }} />
                <FormControlLabel
                    control={
                        <Checkbox checked={formik.values.show_funrural_on_invoices} onChange={formik.handleChange} name="show_funrural_on_invoices" />
                    }
                    label="Exibir recolhimento do Funrural nas observações da nota fiscal"
                />
            </form>
        </Box>
    )
}
