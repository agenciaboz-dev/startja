import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { AddedTaxationRuleRow } from "./AddedTaxationRulesRow"
// import { useAddedTaxationRuleRow } from "../../hooks/useAddedTaxationRuleRow"

interface AddedTaxationRuleRowsListProps {
    // addedTaxationRule: AddedTaxationRuleRow
}

export const AddedTaxationRuleRowsList: React.FC<AddedTaxationRuleRowsListProps> = ({ addedTaxationRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    // const addedTaxationRules = useAddedTaxationRuleRow()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {addedTaxationRules.list.map(addedTaxationRule => <AddedTaxationRuleRowRow key={addedTaxationRule.id} addedTaxationRule={addedTaxationRule} />)} */}
            <AddedTaxationRuleRow />
        </Box>
    )
}