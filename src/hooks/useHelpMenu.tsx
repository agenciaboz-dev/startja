import WhatsAppIcon from "@mui/icons-material/WhatsApp"

export const useHelpMenu = () => {
    const list = [
        {
            id: 1,
            title: "Whatsapp",
            icon: <WhatsAppIcon />,
            onClick: () => {},
        },
    ]

    return { list }
}
