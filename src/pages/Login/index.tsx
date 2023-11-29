import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import background_image from "../../assets/whitelabel-background-startja-login.webp"
import login_logo from "../../assets/whitelabel-logo-startja.webp"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const navigate = useNavigate()
    const io = useIo()
    const [loading, setLoading] = useState(false)
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const storage = useLocalStorage()
    const [rememberLogin, setRememberLogin] = useState(!!storage.get("startja:user"))
    const savedUser = storage.get("startja:user") as LoginValues | undefined | null

    const initialValues: LoginValues = {
        login: "",
        password: ""
    }

    const formik = useFormik({ initialValues, onSubmit: (values) => handleLogin(values) })

    const handleLogin = async (values: LoginValues) => {
        io.emit("user:login", values)
        setLoading(true)
    }

    const saveLoginData = (values: LoginValues) => {
        storage.set("startja:user", values)
    }

    useEffect(() => {
        io.on("admin:login:success", (admin) => {
            console.log("admin login")
            setLoading(false)
            setUser(admin)
            navigate("/")
            snackbar({ severity: "success", text: "Conectado!" })
            rememberLogin ? saveLoginData({ login: admin.email, password: admin.password }) : storage.set("startja:user", null)
        })

        io.on("customer:login:success", (customer) => {
            setLoading(false)
            console.log(customer)
            snackbar({ severity: "success", text: "Conectado!" })
            navigate("/")
            setUser(customer)
            rememberLogin ? saveLoginData({ login: customer.email, password: customer.password }) : storage.set("startja:user", null)
        })

        io.on("user:login:failed", (error) => {
            setLoading(false)
            console.log(error)
            snackbar({ severity: "error", text: "Usuário não encontrado" })
        })

        return () => {
            io.off("admin:login:success")
            io.off("customer:login:success")
            io.off("user:login:failed")
        }
    }, [])

    useEffect(() => {
        if (savedUser) {
            formik.setFieldValue("login", savedUser.login)
            formik.setFieldValue("password", savedUser.password)
        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "60%",
                }}
            >
                <img
                    src={background_image}
                    alt="background_image"
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "0",
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
                    gap: "2vw",
                }}
            >
                <img
                    src={login_logo}
                    alt="login_logo"
                    style={{
                        width: "30vw",
                        objectFit: "contain",
                    }}
                />

                <p
                    style={{
                        fontSize: "1.5rem",
                    }}
                >
                    Levando soluções ao empreendedor do Agro
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: "2vw",
                            width: "30vw",
                        }}
                    >
                        <TextField
                            name="login"
                            label="E-mail"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            sx={{
                                backgroundColor: "white",
                            }}
                        />
                        <TextField
                            type="password"
                            name="password"
                            label="Senha"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            sx={{
                                backgroundColor: "white",
                            }}
                        />
                        <Box
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <FormControlLabel
                                    control={<Checkbox checked={rememberLogin} onChange={(_, checked) => setRememberLogin(checked)} />}
                                    label="Manter conectado"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    borderRadius: "30px",
                                    textTransform: "unset",
                                }}
                            >
                                {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2rem" }} /> : "Entrar"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
