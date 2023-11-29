import { useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import startjaIcon from "../../src/assets/startja_icon.svg"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import BookOutlinedIcon from "@mui/icons-material/BookOutlined"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined"
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined"
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined"
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined"
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined"

export const useSidebar = () => {
    const navigate = useNavigate()
    const iconStyle = {
        height: "2vw",
        width: "2vw",
    }

    const sidebar: SidebarItem[] = [
        {
            id: 1,
            name: "",
            path: "/configuracoes",
            icon: <ReactSVG src={startjaIcon} />,
            onClick: () => navigate("/painel/configuracoes"),
            subItens: [
                {
                    id: 1,
                    icon: <DomainAddOutlinedIcon />,
                    name: "Minha conta",
                    path: "/pessoas-e-empresas",
                    onClick: () => navigate("/painel/cadastros-gerais/pessoas-e-empresas/"),
                },
                {
                    id: 2,
                    icon: <ControlPointDuplicateOutlinedIcon />,
                    name: "Usuários",
                    path: "/produtos",
                    onClick: () => navigate("/painel/cadastros-gerais/produtos/"),
                },
                {
                    id: 3,
                    icon: <NoteAddOutlinedIcon />,
                    name: "Opções",
                    path: "/naturezas-de-operacao",
                    onClick: () => navigate("/painel/cadastros-gerais/naturezas-de-operacao/"),
                },
                {
                    id: 4,
                    icon: <AddLocationAltOutlinedIcon />,
                    name: "Integrações",
                    path: "/propriedades",
                    onClick: () => navigate("/painel/cadastros-gerais/propriedades/"),
                },
                {
                    id: 5,
                    icon: <PersonAddAltOutlinedIcon />,
                    name: "Exportar LCDPR",
                    path: "/contas",
                    onClick: () => navigate("/painel/cadastros-gerais/contas/"),
                },
            ],
        },
        {
            id: 2,
            name: "Visão geral",
            path: "/visao-geral",
            icon: <GridViewOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/visao-geral"),
        },
        {
            id: 3,
            name: "Emissão de nota fiscal",
            path: "/notas-fiscais",
            icon: <ReceiptOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/notas-fiscais"),
        },
        {
            id: 4,
            name: "Livro-caixa",
            path: "/livro-caixa",
            icon: <BookOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/livro-caixa"),
        },
        {
            id: 5,
            name: "Cadastros gerais",
            path: "/cadastros-gerais",
            icon: <ListAltOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/cadastros-gerais"),
            subItens: [
                {
                    id: 1,
                    icon: <DomainAddOutlinedIcon />,
                    name: "Pessoas e empresas",
                    path: "/pessoas-e-empresas",
                    onClick: () => navigate("/painel/cadastros-gerais/pessoas-e-empresas/"),
                },
                {
                    id: 2,
                    icon: <ControlPointDuplicateOutlinedIcon />,
                    name: "Produtos",
                    path: "/produtos",
                    onClick: () => navigate("/painel/cadastros-gerais/produtos/"),
                },
                {
                    id: 3,
                    icon: <NoteAddOutlinedIcon />,
                    name: "Naturezas de operação",
                    path: "/naturezas-de-operacao",
                    onClick: () => navigate("/painel/cadastros-gerais/naturezas-de-operacao/"),
                },
                {
                    id: 4,
                    icon: <AddLocationAltOutlinedIcon />,
                    name: "Propriedades",
                    path: "/propriedades",
                    onClick: () => navigate("/painel/cadastros-gerais/propriedades/"),
                },
                {
                    id: 5,
                    icon: <PersonAddAltOutlinedIcon />,
                    name: "Contas",
                    path: "/contas",
                    onClick: () => navigate("/painel/cadastros-gerais/contas/"),
                },
            ],
        },
    ]

    return sidebar
}
