import React from "react"
import { Box, Switch } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useIo } from "../../hooks/useIo"

interface ToggleSwitchProps {
    checked: boolean
    toggleSwitchCallback: () => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, toggleSwitchCallback }) => {
    const handleChange = () => {
        toggleSwitchCallback()
    }

    return (
        <Box>
            <Switch checked={checked} onChange={handleChange} sx={{}} icon={<CircleIcon sx={{}} />} checkedIcon={<CheckCircleIcon sx={{}} />} />
        </Box>
    )
}
