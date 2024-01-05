import React from "react"
import { useUser } from "./hooks/useUser"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { AdmPanel } from "./pages/AdmPanel"
import { Login } from "./pages/Login"
import { CompanySelection } from "./pages/CompanySelection"
import { Panel } from "./pages/Panel/"
import { getUserType } from "./tools/getUserType"
import { CustomerPanelWrapper } from "./pages/AdmPanel/CustomerPanelWrapper"
import { CompanySelectWrapper } from "./pages/AdmPanel/CompanySelectWrapper"
// import { Signup } from './pages/Signup';

interface RoutesProps {}

const UserRoutes: React.FC<{ user: User }> = ({ user }) => {
    console.log({ customer: user })
    return (
        <ReactRoutes>
            <Route index element={<Panel user={user} />} />
            <Route path="/painel/*" element={<Panel user={user} />} />
        </ReactRoutes>
    )
}

const AdminRoutes: React.FC<{ admin: Admin }> = ({ admin }) => {
    return (
        <ReactRoutes>
            <Route index element={<AdmPanel user={admin} />} />
            {/* <Route path="*" element={<AdmPanel user={user} />} /> */}
            <Route path="/adm/*" element={<AdmPanel user={admin} />} />
            <Route path="/painel/:customerId/*" element={<CustomerPanelWrapper />} />
        </ReactRoutes>
    )
}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user, admin } = useUser()

    return admin ? (
        <AdminRoutes admin={admin} />
    ) : user ? (
        <UserRoutes user={user} />
    ) : (
        <ReactRoutes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </ReactRoutes>
    )
}
