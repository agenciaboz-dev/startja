import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { AddedTaxationRuleRow } from "./AddedTaxationRulesRow"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
// import { useAddedTaxationRuleRow } from "../../hooks/useAddedTaxationRuleRow"

interface AddedTaxationRuleRowsListProps {
    list: TaxRulesForm[]
    deleteTaxRule: (rule: TaxRulesForm) => void
}

export const AddedTaxationRuleRowsList: React.FC<AddedTaxationRuleRowsListProps> = ({ list, deleteTaxRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0"
            }}>
            {list.map((item, index) => (
                <AddedTaxationRuleRow
                    key={`${index}:${item.product_id}:${item.origem}:${item.destino}`}
                    tax_rule={item}
                    deleteTaxRule={deleteTaxRule}
                />
            ))}
        </Box>
    )
}