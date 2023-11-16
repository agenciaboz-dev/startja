import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"

interface AccountRowProps {
    // account : Account
}

export const AccountRow: React.FC<AccountRowProps> = ({ account }) => {
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
                        flex: 1,
                    }}
                >
                    <p>879 - Facilisis et nullam quisque</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>48123</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>1240/01246</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <p>TestBank</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <FormatListBulletedOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}
