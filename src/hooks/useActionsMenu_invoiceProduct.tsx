import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

export const useActionsMenu_invoiceProduct = () => {
    const list = [
        {
            id: 1,
            title: "Remover",
            icon: <RemoveCircleOutlineIcon />,
            onClick: () => {},
        },
    ]

    return { list }
}
