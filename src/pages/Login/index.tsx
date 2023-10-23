import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"

interface LoginProps {}

interface LoginValues {
    email: string
    password: string
}

export const Login: React.FC<LoginProps> = ({}) => {
    const navigate = useNavigate()
    const io = useIo()
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    const initialValues: LoginValues = {
        email: "",
        password: "",
    }

    const handleLogin = async (values: LoginValues) => {
        io.emit("user:login", values)
        setLoading(true)
    }

    useEffect(() => {
        io.on("login:admin", (admin) => {
            setLoading(false)
            // navigate('/panel')
            console.log(admin)
        })

        io.on("login:customer", (customer) => {
            setLoading(false)
            // navigate('/panel')
            console.log(customer)
        })

        io.on("login:error", (error) => {
            setLoading(false)
            console.log(error)
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
                // width: "100vw"
            }}
            >
            <Box>
                <img src="/src/assets/whitelabel-background-startja-login.webp" alt=""
                    style={{
                        height: "100vh",
                        width: "60vw",
                        objectFit: "cover",
                        objectPosition: "0"
                    }}
                />
            </Box>
            <Box
                sx={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    width: "40vw",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2vw"
                }}
            >
                <img src="/src/assets/whitelabel-logo-startja.webp" alt=""
                    style={{
                        width: "30vw",
                        objectFit: "contain"
                    }}
                />

                <p
                    style={{
                        color: "black",
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
                                    gap: "2vw",
                                    width: "30vw"
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
                                            gap: "1vw"
                                        }}
                                    >
                                        <Checkbox
                                            sx={{
                                                padding: 0
                                            }}
                                        />
                                        <p
                                            style={{
                                                color: "black"
                                            }}
                                        >
                                            Manter conectado
                                        </p>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            borderRadius: "4vw",
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2vw" }} /> : "Entrar"}
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
