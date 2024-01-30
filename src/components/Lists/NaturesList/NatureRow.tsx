import React, { useEffect, useState } from "react"
import { Box, Checkbox, IconButton, useMediaQuery } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../../ToggleSwitch"
import AddNatureModal from "../../Modals/AddNatureModal"
import { useIo } from "../../../hooks/useIo"
import { useNature } from "../../../hooks/useNature"
import { colors } from "../../../style/colors"

interface NatureRowProps {
    nature: Natureza
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { updateNature } = useNature()

    const [openModal, setOpenModal] = useState(false)

    const handleChange = () => {
        io.emit("nature:toggle", nature.id)
    }

    useEffect(() => {
        io.on("nature:toggle:success", (nature) => {
            updateNature(nature)
        })

        return () => {
            io.off("nature:toggle:success")
        }
    }, [])

    const types = [
        { number: 0, type: "0 - Entrada" },
        { number: 1, type: "1 - Saída" },
    ]

    const getTypeText = (typeNumber: number) => {
        const typeObj = types.find((t) => t.number === typeNumber)
        return typeObj ? typeObj.type : ""
    }

    const finalities = [
        { number: 1, finality: "1 - Nota normal" },
        { number: 2, finality: "2 - Nota complementar" },
        { number: 3, finality: "3 - Nota de ajuste" },
        { number: 4, finality: "4 - Devolução de mercadoria" },
    ]

    const getFinalityText = (finalityNumber: number) => {
        const finalityObj = finalities.find((t) => t.number === finalityNumber)
        return finalityObj ? finalityObj.finality : ""
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
                ":hover": {
                    backgroundColor: colors.background2,
                },
            }}
        >
            <Checkbox
                inputProps={{
                    style: {
                        padding: "0",
                    },
                }}
            />
            <Box
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        flex: 0.4,
                        alignItems: "center",
                    }}
                >
                    <p>{nature.motive}</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center",
                    }}
                >
                    <p>{nature.operation}</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center",
                    }}
                >
                    <p>{getTypeText(nature.type)}</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center",
                    }}
                >
                    <p>{getFinalityText(nature.finality)}</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center",
                    }}
                >
                    <IconButton color="inherit" onClick={() => setOpenModal(true)}>
                        <EditOutlinedIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1,
                        justifyContent: "center",
                    }}
                >
                    <ToggleSwitch checked={nature.active} handleChange={handleChange} />
                </Box>
            </Box>
            <AddNatureModal open={openModal} onClose={() => setOpenModal(false)} current_nature={nature} />
        </Box>
    )
}
