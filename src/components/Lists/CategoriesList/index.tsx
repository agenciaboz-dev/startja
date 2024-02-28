import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { CategoryRow } from "./CategoryRow"
import { useCategory } from "../../../hooks/useCategory"

interface CategoriesListProps {
    // category : Category
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ category }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const categories = useCategory()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                margin: isMobile ? "5vw 0" : "0.5vw 0",
                gap: isMobile ? "5vw" : "",
            }}
        >
            {/* {categories.list.map(category => <CategoryRow key={category.id} category={category} />)} */}
            <CategoryRow />
        </Box>
    )
}
