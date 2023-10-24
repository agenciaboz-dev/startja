import React, { useEffect } from 'react';
import { useUser } from './hooks/useUser';
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { AdmPanel } from './pages/AdmPanel';
import { Login } from './pages/Login';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useIo } from './hooks/useIo';
// import { Signup } from './pages/Signup';

interface RoutesProps {}

export const Routes:React.FC<RoutesProps> = ({  }) => {
    const { user, setUser } = useUser()
    const storage = useLocalStorage()
    const io = useIo()

    const saveLoginData = (values: LoginValues) => {
        storage.set('startja:user', values)
    }

    useEffect(() => {
        const savedUserLogin = storage.get('startja:user')
        if (savedUserLogin) {
            io.emit('user:login', savedUserLogin)
            
                    io.on("login:admin", (admin) => {
                        setUser(admin)
                        saveLoginData({email: admin.email, password: admin.password})
                    })
            
                    io.on("login:customer", (customer) => {
                        saveLoginData({email: customer.email, password: customer.password})
                    })
            
                    return () => {
                        io.off('login:admin')
                        io.off('login:customer')
                    }  
        }
    }, [])
    
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
                <Route path="*" element={<Login />} />
            </ReactRoutes>
        )
}