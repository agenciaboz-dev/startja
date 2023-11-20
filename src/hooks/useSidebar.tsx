import { useNavigate } from "react-router-dom"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import BookOutlinedIcon from "@mui/icons-material/BookOutlined"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"

export const useSidebar = () => {
    const navigate = useNavigate()
    const iconStyle = {
        height: "3rem",
        width: "3rem",
    }

    const sidebar: SidebarItem[] = [
        {
            id: 1,
            name: "Visão geral",
            path: "/visao-geral",
            icon: <GridViewOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/visao-geral"),
        },
        {
            id: 2,
            name: "Emissão de nota fiscal",
            path: "/notas-fiscais",
            icon: <ReceiptOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/notas-fiscais"),
        },
        {
            id: 3,
            name: "Livro-caixa",
            path: "/livro-caixa",
            icon: <BookOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/livro-caixa"),
        },
        {
            id: 4,
            name: "Cadastros gerais",
            path: "/cadastros-gerais",
            icon: <ListAltOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/cadastros-gerais"),
            admin: true,
        },
    ]

    return sidebar
}
