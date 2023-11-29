import React from "react"
import { Box } from "@mui/material"
import { CategoryRow } from "./CategoryRow"
import { useCategory } from "../../hooks/useCategory"

interface CategoriesListProps {
    // category : Category
}

export const CategoriesList: React.FC<CategoriesListProps> = ({category}) => {
    const categories = useCategory()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                margin: "0.5vw 0",
            }}
        >
            {/* {categories.list.map(category => <CategoryRow key={category.id} category={category} />)} */}
            <CategoryRow />
        </Box>
    )
}