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

const CustomerRoutes: React.FC<{ user: Customer }> = ({ user }) => {
    console.log({ customer: user })
    return (
        <ReactRoutes>
            <Route index element={<CompanySelection user={user} />} />
            <Route path="/selecionar-empresa/" element={<CompanySelection user={user} />} />
            <Route path="/painel/:companyId/*" element={<Panel user={user} />} />
        </ReactRoutes>
    )
}

const AdminRoutes: React.FC<{ user: Admin }> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route index element={<AdmPanel user={user} />} />
            {/* <Route path="*" element={<AdmPanel user={user} />} /> */}
            <Route path="/adm/*" element={<AdmPanel user={user} />} />
            <Route path="/selecionar-empresa/:customerId/" element={<CompanySelectWrapper />} />
            <Route path="/painel/:customerId/*" element={<CustomerPanelWrapper />} />
        </ReactRoutes>
    )
}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        getUserType(user) == "admin" ? (
            <AdminRoutes user={user as Admin} />
        ) : (
            <CustomerRoutes user={user as Customer} />
        )
    ) : (
        <ReactRoutes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </ReactRoutes>
    )
}
