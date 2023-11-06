import React from "react"
import { Box, Checkbox } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

interface OperationRowProps {
    // operation : Operation
}

export const OperationRow: React.FC<OperationRowProps> = ({operation}) => {

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
                    width: "55%"
                }}
            >
                {/* <p>{operation.name}</p> */}
                <p>Elementum senectus diam neque aliquet</p>
            </Box>
            <Box
                sx={{
                    width: "15%",
                    justifyContent: "center"
                }}
            >
                {/* <p>{operation.taxation}</p> */}
                <VisibilityOutlinedIcon />
            </Box>
            <Box
                sx={{
                    width: "15%",
                    justifyContent: "center"
                }}
            >
                <EditOutlinedIcon />
            </Box>
            <Box
                sx={{
                    width: "15%",
                    justifyContent: "center"
                }}
            >
                <FormatListBulletedOutlinedIcon />
            </Box>
        </Box>
    </Box>
)}