import React from "react"
import { Box, Checkbox } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ToggleSwitch } from "../ToggleSwitch"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface CollaboratorRowProps {
    // collaborator: Collaborator
}

export const CollaboratorRow: React.FC<CollaboratorRowProps> = ({ collaborator }) => {
    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%",
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
                    flex: 1,
                }}
            >
                <Box
                    sx={{
                        width: "35%",
                        alignItems: "center",
                    }}
                >
                    {/* <p>{collaborator.name}</p> */}
                    <p>Giana Workman</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "25%",
                        justifyContent: "center",
                    }}
                >
                    <p>cursus@outlook.com.br</p>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        width: "20%",
                        justifyContent: "center",
                    }}
                >
                    <p>05/08/2022</p>
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        justifyContent: "center",
                    }}
                >
                    <ToggleSwitch />
                </Box>
                <Box
                    sx={{
                        width: "10%",
                        justifyContent: "end",
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
