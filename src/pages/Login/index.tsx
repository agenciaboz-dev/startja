import React, { useState } from "react"
import { Box, Button, CircularProgress, TextField } from "@mui/material"
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
        io.emit("client:sync", user)
        io.emit("user:login", values)
        setLoading(true)
    }

    return (
        <Box
            sx={{
                width: "100vw"
            }}
            >
            <Box>
                <img src="https://chbsistemas.contentools.com/api/v1/media/174577/download/" alt="" />
            </Box>
            <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
                {({ values, handleChange }) => (
                    <Form>
                        <Box
                            sx={{
                                flexDirection: "column",
                                margin: "auto"
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
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2vw" }} /> : "Entrar"}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
