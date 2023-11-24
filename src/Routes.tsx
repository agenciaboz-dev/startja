import React from "react"
import { useUser } from "./hooks/useUser"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { AdmPanel } from "./pages/AdmPanel"
import { Login } from "./pages/Login"
import { CompanySelection } from "./pages/CompanySelection"
import { Panel } from "./pages/Panel/"
// import { Signup } from './pages/Signup';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        <ReactRoutes>
            <Route index element={<AdmPanel user={user} />} />
            {/* <Route path="*" element={<AdmPanel user={user} />} /> */}
            <Route path="/adm/*" element={<AdmPanel user={user} />} />
            <Route path="/selecionar-empresa/" element={<CompanySelection user={user} />} />
            <Route path="/painel/*" element={<Panel user={user} />} />
        </ReactRoutes>
    ) : (
        <ReactRoutes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </ReactRoutes>
    )
}
