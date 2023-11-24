import React from "react"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import { useCustomer } from "../../hooks/useCustomer"
import { Panel } from "../Panel"

interface CustomerPanelWrapperProps {}

export const CustomerPanelWrapper: React.FC<CustomerPanelWrapperProps> = ({}) => {
    const customers = useCustomer()
    const customerId = Number(useParams().customerId)

    const customer = customers.list.find((item) => item.id == customerId)

    return customer ? <Panel user={customer} /> : <Box>cliente não encontrado</Box>
}
