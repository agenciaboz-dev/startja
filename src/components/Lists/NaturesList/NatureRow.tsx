import React, { useEffect, useState } from "react"
import { Box, Checkbox, IconButton, useMediaQuery } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../../ToggleSwitch"
import AddNatureModal from "../../Modals/AddNatureModal"
import { useIo } from "../../../hooks/useIo"
import { useNature } from "../../../hooks/useNature"
import { colors } from "../../../style/colors"
import { useUser } from "../../../hooks/useUser"

interface NatureRowProps {
    nature: Natureza
    disabled?: boolean
}

export const NatureRow: React.FC<NatureRowProps> = ({ nature, disabled }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const { updateNature } = useNature()
    const { user } = useUser()

    const [openModal, setOpenModal] = useState(false)

    const handleUserToggle = () => {
        console.log("user toggle")
        io.emit("nature:usertoggle", nature.id, user?.id)
    }

    const handleToggle = () => {
        console.log("admin toggle")
        io.emit("nature:toggle", nature.id)
    }

    useEffect(() => {
        io.on("nature:toggle:success", (nature: Natureza) => {
            updateNature(nature)
        })

        io.on("nature:usertoggle", (nature: Natureza) => {
            updateNature(nature)
        })

        return () => {
            io.off("nature:toggle:success")
            io.off("nature:usertoggle")
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

    const cellStyle = {
        alignItems: "center",
        flex: 0.12,
        justifyContent: "center",
        textAlign: "center",
    }

    return (
        <Box sx={{ alignItems: "center", width: "100%", ":hover": { backgroundColor: colors.background2 } }}>
            <Checkbox disabled={disabled} inputProps={{ style: { padding: "0" } }} />
            <Box
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "20vw" : "2vw",
                }}
            >
                <Box sx={{ flex: 0.4, alignItems: "center" }}>
                    <p>{nature.motive}</p>
                </Box>
                <Box sx={cellStyle}>
                    <p>{nature.operation}</p>
                </Box>
                <Box sx={cellStyle}>
                    <p>{getTypeText(nature.type)}</p>
                </Box>
                <Box sx={cellStyle}>
                    <p>{getFinalityText(nature.finality)}</p>
                </Box>
                <Box sx={cellStyle}>
                    <IconButton color="inherit" onClick={() => setOpenModal(true)} disabled={disabled}>
                        <EditOutlinedIcon />
                    </IconButton>
                </Box>
                <Box sx={cellStyle}>
                    <ToggleSwitch
                        checked={
                            user
                                ? nature.user_id
                                    ? nature.active
                                    : !nature.hidden_by.split(",").includes(user?.id.toString() || "a")
                                : nature.active
                        }
                        onClick={user ? (nature.user_id ? handleToggle : handleUserToggle) : handleToggle}
                    />
                </Box>
            </Box>
            <AddNatureModal open={openModal} onClose={() => setOpenModal(false)} current_nature={nature} />
        </Box>
    )
}
