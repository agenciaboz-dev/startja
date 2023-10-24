import React from 'react';
import { useUser } from './hooks/useUser';
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { AdmPanel } from './pages/AdmPanel';
import { Login } from './pages/Login';
// import { Signup } from './pages/Signup';

interface RoutesProps {}

export const Routes:React.FC<RoutesProps> = ({  }) => {
    const { user } = useUser()
    
        return user ? (
            <ReactRoutes>
                <Route index element={<AdmPanel user={user} />} />
                {/* <Route path="*" element={<AdmPanel user={user} />} /> */}
                <Route path="/admpanel" element={<AdmPanel user={user} />} />
            </ReactRoutes>
        ) : (
            <ReactRoutes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
            </ReactRoutes>
        )
}