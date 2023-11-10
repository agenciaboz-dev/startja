import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

interface AddedTaxationRuleRowProps {
    // addedTaxationRule : AddedTaxationRule
}

export const AddedTaxationRuleRow: React.FC<AddedTaxationRuleRowProps> = ({addedTaxationRule}) => {

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
                justifyContent: "space-between",
                flex: 1,
            }}
        >

            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "10%"
                }}
            >
                <p>SP</p>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "10%"
                }}
            >
                <p>00000001</p>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%"
                }}
            >
                <p>SIT FERMENTUM</p>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%"
                }}
            >
                <p>Nulla lacus etiam</p>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "10%"
                }}
            >
                <p>32 - Morbi</p>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "10%"
                }}
            >
                <FormatListBulletedOutlinedIcon />
            </Box>
            
        </Box>
    </Box>
)}