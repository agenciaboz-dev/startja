import React, { useState } from "react"
import { Box, Button, TextField } from "@mui/material"

interface AdmCustomersScreenProps {}

export const AdmCustomersScreen: React.FC<AdmCustomersScreenProps> = ({}) => {
    const [emptyCustomersList, setEmptyCustomersList] = useState(true)

    return(
        <Box>
            {emptyCustomersList &&
                <Box
                    sx={{
                        height: ""
                    }}
                >

                </Box>
            }
        </Box>
    )
}