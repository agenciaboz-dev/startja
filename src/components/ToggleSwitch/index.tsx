import React from "react"
import { Box, Switch, SwitchProps } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useIo } from "../../hooks/useIo"
import { colors } from "../../style/colors"

interface ToggleSwitchProps extends SwitchProps {
    toggleSwitchCallback: () => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (props.onChange) {
            props.onChange(ev, checked)
        }

        props.toggleSwitchCallback()
    }

    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
            }}
        >
            <Switch
                {...props}
                onChange={handleChange}
                sx={{}}
                icon={<CircleIcon sx={{ color: "gray", transform: "scale(1.5)" }} />}
                checkedIcon={<CheckCircleIcon sx={{ transform: "scale(1.5)" }} />}
            />
        </Box>
    )
}
