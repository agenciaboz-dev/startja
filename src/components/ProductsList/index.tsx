import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

interface ProductsListProps {}

export const ProductsList: React.FC<ProductsListProps> = ({}) => {

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5rem 0"
            }}    
        >
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
                            width: "45%"
                        }}
                    >
                        <p>Elementum senectus diam neque aliquet</p>
                    </Box>
                    <Box
                        sx={{
                            width: "45%"
                        }}
                    >
                        <p>Cras lobortis sollicitudin consectetur aliquet</p>
                    </Box>
                    <Box
                        sx={{
                            width: "10%",
                            justifyContent: "end"
                        }}
                    >
                        <FormatListBulletedOutlinedIcon />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}