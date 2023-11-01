import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

interface InvoiceRowProps {
    invoice : Invoice
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({invoice}) => {

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
                    padding: "0"
                }
            }}
        />
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                gap: "2rem"
            }}
        >

            <Box
                sx={{
                    flex: 1
                }}
                >
                    <p>28/11/2022</p>
                </Box>
                <Box
                sx={{
                    flex: 1
                }}
                >
                    <p>920/7</p>
                </Box>
                <Box
                sx={{
                    flex: 1
                }}
            >
                <p>Lorem Ipsum</p>
            </Box>
            <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <p>Aliquam aliquet</p>
                </Box>
                <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <p>Dignissim Consectetur</p>
                </Box>
                <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <p>R$60.475,00</p>
                </Box>
                <Box
                    sx={{
                        flex: 1
                    }}
                >
                    <p>Autorizada</p>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        justifyContent: "end"
                    }}
                >
                <FormatListBulletedOutlinedIcon />
            </Box>
        </Box>
    </Box>
)}