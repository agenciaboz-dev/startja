import React from "react"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import { CompanySelection } from "../CompanySelection"
import { useUser } from "../../hooks/useUser"

interface CompanySelectWrapperProps {}

export const CompanySelectWrapper: React.FC<CompanySelectWrapperProps> = ({}) => {
    const user = useUser()
    const customerId = Number(useParams().customerId)

    const customer = user.list.find((item) => item.id == customerId)

    return customer ? <CompanySelection user={customer} /> : <Box>cliente não encontrado</Box>
}
