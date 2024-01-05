import React from "react"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import { Panel } from "../Panel"
import { useUser } from "../../hooks/useUser"

interface CustomerPanelWrapperProps {}

export const CustomerPanelWrapper: React.FC<CustomerPanelWrapperProps> = ({}) => {
    const user = useUser()
    const customerId = Number(useParams().customerId)

    const customer = user.list.find((item) => item.id == customerId)

    return customer ? <Panel user={customer} /> : <Box>cliente não encontrado</Box>
}
