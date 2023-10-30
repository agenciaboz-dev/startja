import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useLocalStorage } from "../../hooks/useLocalStorage"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const navigate = useNavigate()
    const io = useIo()
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUser()
    const { snackbar } = useSnackbar()
    const storage = useLocalStorage()

    const initialValues: LoginValues = {
        email: "",
        password: "",
    }

    const handleLogin = async (values: LoginValues) => {
        io.emit("user:login", values)
        setLoading(true)
    }

    const saveLoginData = (values: LoginValues) => {
        storage.set('startja:user', values)
    }

    useEffect(() => {
        io.on("login:admin", (admin) => {
            setLoading(false)
            setUser(admin)
            navigate('/adm')
            console.log(admin)
            snackbar({ severity: "success", text: "Conectado!" })
            saveLoginData({email: admin.email, password: admin.password})
        })

        io.on("login:customer", (customer) => {
            setLoading(false)
            console.log(customer)
            snackbar({ severity: "success", text: "Conectado!" })
            saveLoginData({email: customer.email, password: customer.password})
        })

        io.on("login:error", (error) => {
            setLoading(false)
            console.log(error)
            snackbar({ severity: "error", text: "Usuário não encontrado" })
        })

        return () => {
            io.off('login:admin')
            io.off('login:customer')
            io.off('login:error')
        }   
    }, [])

    return (
        <Box
            sx={{
                width: "100%"
            }}
            >
            <Box
                sx={{
                    width: "60%",
                }}
                >
                <img src="/src/assets/whitelabel-background-startja-login.webp" alt=""
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "0"
                    }}
                />
            </Box>
            <Box
                sx={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem"
                }}
            >
                <img src="/src/assets/whitelabel-logo-startja.webp" alt=""
                    style={{
                        width: "30rem",
                        objectFit: "contain"
                    }}
                />

                <p
                    style={{
                        fontSize: "1.3rem"
                    }}
                >
                    Levando soluções ao empreendedor do Agro
                </p>
                <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
                    {({ values, handleChange }) => (
                        <Form>
                            <Box
                                sx={{
                                    flexDirection: "column",
                                    gap: "2rem",
                                    width: "30rem"
                                }}
                            >
                                <TextField
                                    name="email"
                                    label="E-mail"
                                    value={values.email}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: "white"
                                    }}
                                />
                                <TextField
                                    type="password"
                                    name="password"
                                    label="Senha"
                                    value={values.password}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: "white"
                                    }}
                                />
                                <Box
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            gap: "1rem"
                                        }}
                                    >
                                        <Checkbox
                                            sx={{
                                                padding: 0
                                            }}
                                        />
                                        <p>
                                            Manter conectado
                                        </p>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            borderRadius: "4rem",
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2rem" }} /> : "Entrar"}
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
