import { useNavigate } from "react-router-dom"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import FilterVintageOutlinedIcon from "@mui/icons-material/FilterVintageOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined"

export const useAdmSidebar = () => {
    const navigate = useNavigate()
    const iconStyle = {
        height: "2vw",
        width: "2vw",
    }

    const admSidebar: SidebarItem[] = [
        {
            id: 1,
            name: "Clientes",
            path: "/clientes",
            icon: <PeopleOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/adm/clientes"),
        },
        {
            id: 2,
            name: "Produtos",
            path: "/produtos",
            icon: <FilterVintageOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/adm/produtos"),
        },
        {
            id: 3,
            name: "Naturezas de Operação",
            path: "/naturezas-de-operacao",
            icon: <DescriptionOutlinedIcon sx={iconStyle} />,
            onClick: () => navigate("/adm/naturezas-de-operacao"),
        },
        // {
        //     id: 4,
        //     name: "Categorias",
        //     path: "/categorias",
        //     icon: <SnippetFolderOutlinedIcon sx={iconStyle} />,
        //     onClick: () => navigate("/adm/categorias"),
        //     admin: true,
        // },
    ]

    return admSidebar
}
