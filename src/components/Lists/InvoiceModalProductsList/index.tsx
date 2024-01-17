import React from "react"
import { Box } from "@mui/material"
import { InvoiceModalProductRow } from "./InvoiceModalProductRow"
import { FormikErrors } from "formik"

interface InvoiceModalProductsListProps {
    list: InvoiceProduct[]
    updateList: (list: InvoiceProduct[]) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
}

export const InvoiceModalProductsList: React.FC<InvoiceModalProductsListProps> = ({ list, updateList }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto"
            }}>
            {list.map((product) => (
                <InvoiceModalProductRow key={product.id} product={product} products={list} updateList={updateList} />
            ))}
        </Box>
    )
}