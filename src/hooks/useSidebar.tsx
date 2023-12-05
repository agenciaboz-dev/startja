import { useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import startjaIcon from "../../src/assets/startja_icon.svg"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined"
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined"
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined"
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined"
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined"
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined"
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import BookOutlinedIcon from "@mui/icons-material/BookOutlined"

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
                    icon: <PersonOutlinedIcon />,
                    name: "Minha conta",
                    path: "/minha-conta",
                    onClick: () => navigate("/painel/configuracoes/minha-conta/"),
                },
                {
                    id: 2,
                    icon: <PeopleOutlinedIcon />,
                    name: "Usuários",
                    path: "/usuarios",
                    onClick: () => navigate("/painel/configuracoes/usuarios/"),
                },
                {
                    id: 3,
                    icon: <SummarizeOutlinedIcon />,
                    name: "Opções",
                    path: "/opcoes",
                    onClick: () => navigate("/painel/configuracoes/opcoes/"),
                },
                {
                    id: 4,
                    icon: <MonitorWeightOutlinedIcon />,
                    name: "Integrações",
                    path: "/integracoes",
                    onClick: () => navigate("/painel/configuracoes/integracoes/"),
                },
                {
                    id: 5,
                    icon: <FileDownloadOutlinedIcon />,
                    name: "Exportar LCDPR",
                    path: "/exportar-lcdpr",
                    onClick: () => navigate("/painel/configuracoes/exportar-lcdpr/"),
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
        {
            id: 5,
            name: "Relatórios",
            path: "/relatorios",
            icon: <EqualizerOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/painel/relatorios"),
            subItens: [
                {
                    id: 1,
                    icon: <ReceiptLongOutlinedIcon />,
                    name: "Notas fiscais emitidas",
                    path: "/notas-fiscais-emitidas",
                    onClick: () => navigate("/painel/relatorios/notas-fiscais-emitidas/"),
                },
                {
                    id: 2,
                    icon: <LocalMallOutlinedIcon />,
                    name: "Produtos vendidos",
                    path: "/produtos-vendidos",
                    onClick: () => navigate("/painel/relatorios/produtos-vendidos/"),
                },
                {
                    id: 3,
                    icon: <CollectionsBookmarkOutlinedIcon />,
                    name: "Livro-caixa",
                    path: "/livro-caixa",
                    onClick: () => navigate("/painel/relatorios/livro-caixa/"),
                },
                {
                    id: 4,
                    icon: <AssignmentOutlinedIcon />,
                    name: "Plano de contas",
                    path: "/plano-de-contas",
                    onClick: () => navigate("/painel/relatorios/plano-de-contas/"),
                },
            ],
        },
        // {
        //     id: ,
        //     name: "Livro-caixa",
        //     path: "/livro-caixa",
        //     icon: <BookOutlinedIcon sx={iconStyle} />,
        //     onClick: () => navigate("/painel/livro-caixa"),
        // },
    ]

    return sidebar
}
