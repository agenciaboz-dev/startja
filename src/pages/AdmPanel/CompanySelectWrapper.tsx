import React from "react"
import { Box } from "@mui/material"
import { useCustomer } from "../../hooks/useCustomer"
import { useParams } from "react-router-dom"
import { CompanySelection } from "../CompanySelection"

interface CompanySelectWrapperProps {}

export const CompanySelectWrapper: React.FC<CompanySelectWrapperProps> = ({}) => {
    const customers = useCustomer()
    const customerId = Number(useParams().customerId)

    const customer = customers.list.find((item) => item.id == customerId)

    return customer ? <CompanySelection user={customer} /> : <Box>cliente não encontrado</Box>
}
