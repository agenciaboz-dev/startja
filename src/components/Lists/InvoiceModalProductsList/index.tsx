import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { InvoiceModalProductRow } from "./InvoiceModalProductRow"
import { FormikErrors } from "formik"

interface InvoiceModalProductsListProps {
    list: InvoiceProduct[]
    updateList: (list: InvoiceProduct[]) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
}

export const InvoiceModalProductsList: React.FC<InvoiceModalProductsListProps> = ({ list, updateList }) => {
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
            {list.map((product) => (
                <InvoiceModalProductRow key={product.id} product={product} products={list} updateList={updateList} />
            ))}
        </Box>
    )
}