import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface UserContextValue {
    user?: User
    setUser: (user: User | undefined) => void

    list: User[]
    setList: (users: User[]) => void

    admin?: Admin
    setAdmin: (admin: Admin | undefined) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()

    const [user, setUser] = useState<User>()
    const [list, setList] = useState<User[]>([])
    const [admin, setAdmin] = useState<Admin>()

    useEffect(() => {
        console.log({ user })
        if (user) {
            io.on("connect", () => {
                console.log("connected")
            })

            io.on("user:update", (updatedUser: User) => setUser(updatedUser))

            io.on("nota:update", (invoice: notaFiscal) => {
                const current_invoice = user.notas.find((item) => item.id == invoice.id)
                if (current_invoice) {
                    setUser({ ...user, notas: [...user.notas.filter((item) => item.id != invoice.id), invoice] })
                    if (invoice.status == "erro_autorizacao") {
                        snackbar({ severity: "error", text: `erro ao autorizar nota: ${invoice.mensagem_sefaz}` })
                    }

                    if (invoice.status == "autorizado") {
                        snackbar({ severity: "success", text: `${invoice.mensagem_sefaz}` || "nota autorizada" })
                    }
                }
            })

            return () => {
                io.off("connect")
                io.off("user:update")
            }
        }
    }, [user])

    useEffect(() => {
        io.on("user:list", (data) => {
            setList(data)
        })

        return () => {
            io.off("user:list")
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser, admin, setAdmin, list, setList }}>{children}</UserContext.Provider>
}
