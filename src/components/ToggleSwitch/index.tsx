import React, { useEffect } from "react"
import { Box, Switch, SwitchProps } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useIo } from "../../hooks/useIo"
import { colors } from "../../style/colors"
import { useNature } from "../../hooks/useNature"

interface ToggleSwitchProps extends SwitchProps {
    nature: Natureza
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ nature }) => {
    const io = useIo()
    const { updateNature } = useNature()

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

    return (
        <Box
            sx={{
                padding: 0,
                margin: 0
            }}>
            <Switch
                checked={nature.active}
                onChange={handleChange}
                sx={{}}
                icon={<CircleIcon sx={{ color: "gray", transform: "scale(1.5)" }} />}
                checkedIcon={<CheckCircleIcon sx={{ transform: "scale(1.5)" }} />}
            />
        </Box>
    )
}
