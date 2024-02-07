import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, TextareaAutosize, useMediaQuery } from "@mui/material"
import { colors } from "../../../../../../style/colors"
import { useFormik } from "formik"
import { useIo } from "../../../../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface ObservationsContainerProps {
    user: User
}

export const ObservationsContainer: React.FC<ObservationsContainerProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)

    const formik = useFormik<ObservationsForm>({
        initialValues: {
            observations: user.observations,
        },
        onSubmit: (values) => {
            setLoading(true)
            io.emit("user:update", user.id, values)
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        io.on("user:update:success", () => {
            setLoading(false)
            snackbar({ severity: "info", text: "observações atualizadas" })
        })

        io.on("user:update:error", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "erro ao atualizar as observações" })
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
                        width: "100%",
                    }}
                >
                    <h2>Observações</h2>
                    <Button variant="contained" sx={{ borderRadius: "20px", textTransform: "unset" }} type="submit">
                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Salvar informações"}
                    </Button>
                </Box>
                <p>As observações poderão ser alteradas no momento da emissão da NFe.</p>
                <TextareaAutosize
                    minRows={3}
                    // maxRows={10}
                    value={formik.values.observations}
                    name="observations"
                    onChange={formik.handleChange}
                    style={{
                        backgroundColor: colors.background,
                        borderRadius: "20px",
                        height: "100%",
                        width: "100%",
                        padding: isMobile ? "5vw" : "0.5vw",
                        marginTop: "1vw",
                        resize: "none",
                        overflowY: "scroll",
                    }}
                    placeholder="A observação padrão aparecerá em todas notas fiscais."
                />
            </form>
        </Box>
    )
}
