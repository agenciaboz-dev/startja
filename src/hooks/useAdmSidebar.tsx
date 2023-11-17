import { useNavigate } from "react-router-dom"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined"

export const useAdmSidebar = () => {
    const navigate = useNavigate()

    const admSidebar: SidebarItem[] = [
        {
            id: 1,
            name: "Clientes",
            path: "/",
            icon: <PeopleOutlinedIcon />,
            onClick: () => navigate("/adm/clientes"),
        },
        {
            id: 2,
            name: "Produtos",
            path: "/products",
            icon: <FilterVintageOutlinedIcon />,
            onClick: () => navigate("/adm/produtos"),
        },
        {
            id: 3,
            name: "Naturezas de Operação",
            path: "/zap",
            icon: <DescriptionOutlinedIcon />,
            onClick: () => navigate("/adm/naturezas-de-operacao"),
        },
        {
            id: 4,
            name: "Categorias",
            path: "/categorias",
            icon: <SnippetFolderOutlinedIcon />,
            onClick: () => navigate("/adm/categorias"),
            admin: true,
        },
    ]

    return admSidebar
}
