import React from "react"
import { Box, Button, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import { colors } from "../../style/colors"

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
                    padding: "0",
                },
            }}
        />
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                gap: "2vw",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <p>28/11/2022</p>
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <p>920/7</p>
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <p>Lorem Ipsum</p>
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <p>Aliquam aliquet</p>
            </Box>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <p>Dignissim Consectetur</p>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    color: colors.primary,
                }}
            >
                <p>R$60.475,00</p>
            </Box>
            <Button
                variant="contained"
                sx={{
                    flex: 1,
                    borderRadius: "30px",
                    textTransform: "unset",
                    pointerEvents: "none",
                }}
            >
                <p>Autorizada</p>
            </Button>
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <FormatListBulletedOutlinedIcon />
            </Box>
        </Box>
    </Box>
)}