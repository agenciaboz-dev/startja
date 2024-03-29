import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { AddedTaxationRuleRow } from "./AddedTaxationRulesRow"
// import { useAddedTaxationRuleRow } from "../../hooks/useAddedTaxationRuleRow"

interface AddedTaxationRuleRowsListProps {
    list: TaxRulesForm[]
    deleteTaxRule: (rule: TaxRulesForm) => void
    updateTaxRule: (rule: TaxRulesForm) => void
    block_editing?: boolean
}

export const AddedTaxationRuleRowsList: React.FC<AddedTaxationRuleRowsListProps> = ({ list, deleteTaxRule, updateTaxRule, block_editing }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
                // overflowY: "auto",
            }}
        >
            {list
                .sort((a, b) => Number(a.id) - Number(b.id))
                .map((item, index) => (
                    <AddedTaxationRuleRow
                        key={`${index}:${item.destino}:${item.origem}:${item.destino}`}
                        tax_rule={item}
                        deleteTaxRule={deleteTaxRule}
                        updateTaxRule={updateTaxRule}
                        block_editing={block_editing}
                    />
                ))}
        </Box>
    )
}