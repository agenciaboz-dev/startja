import React from "react"
import { Box } from "@mui/material"
import { ToggleSwitch } from "../ToggleSwitch"

interface PermissionsCardProps {
    header: string
}

export const PermissionsCard: React.FC<PermissionsCardProps> = ({header}) => {
    return (
        <Box
            sx={{
                flex: 1,
                padding: "1vw",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                backgroundColor: "white",
                borderRadius: "10px",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <p>{header}</p>
                <ToggleSwitch />
            </Box>
            <hr />
            <Box
                sx={{
                    marginTop: "1vw",
                    justifyContent: "space-between",
                }}
            >
                <p>Lorem Ipsum</p>
                <ToggleSwitch />
            </Box>
            <Box
                sx={{
                    justifyContent: "space-between",
                }}
            >
                <p>Dolor Sit Amet</p>
                <ToggleSwitch />
            </Box>
        </Box>
    )
}