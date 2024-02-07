import React from "react"
import { Box, Switch, SwitchProps } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface ToggleSwitchProps extends SwitchProps {
    checked?: boolean
    handleChange?: () => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
            }}
        >
            <Switch
                {...props}
                sx={{}}
                icon={<CircleIcon sx={{ color: "gray", transform: "scale(1.5)" }} />}
                checkedIcon={<CheckCircleIcon sx={{ transform: "scale(1.5)" }} />}
            />
        </Box>
    )
}
