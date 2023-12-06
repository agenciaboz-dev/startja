import React from "react"
import { Box, Button, Grid, MenuItem, Paper, SxProps, TextField } from "@mui/material"
import { useFormik } from "formik"
import { SectionTitle } from "../../../../components/SectionTitle"

interface TaxSimulatorProps {
    company: Company
}

export const TaxSimulator: React.FC<TaxSimulatorProps> = ({ company }) => {
    const formik = useFormik({
        initialValues: {
            producer: 0,
            year: "2023",
            income: {
                received: "",
                to_receive: "",
                simulated: ""
            },
            expenses: {
                dependents: "",
                to_pay: "",
                simulated: ""
            },
            others: {
                other_income: "",
                deductible_expenses: "",
                previous_losses: ""
            }
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const columnBoxStyle: SxProps = { flexDirection: "column", gap: "1vw" }
    const inputAdornmentStyle: SxProps = { startAdornment: "R$", sx: { gap: "0.5vw" } }

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: "contents" }}>
            <Box sx={{ flex: "0.5", gap: "1vw", flexDirection: "column" }}>
                <Box sx={{ justifyContent: "space-between" }}>
                    <SectionTitle>Simulador de Imposto de Renda</SectionTitle>
                    <Button variant="contained" sx={{ borderRadius: "30px", textTransform: "unset" }}>
                        Simular Imposto de Renda
                    </Button>
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        flex: 1,
                        flexDirection: "column",
                        padding: "1vw",
                    }}
                >
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Box sx={{ gap: "1vw" }}>
                            <TextField
                                label="Selecione o produtor"
                                select
                                fullWidth
                                value={formik.values.producer}
                                name="producer"
                                onChange={formik.handleChange}
                            >
                                <MenuItem sx={{ display: "none" }} value={0}></MenuItem>
                                <MenuItem value={1}>Todos os produtores</MenuItem>
                            </TextField>

                            <TextField label="Selecione o ano" select fullWidth value={formik.values.year} name="year" onChange={formik.handleChange}>
                                <MenuItem sx={{ display: "none" }} value={""}></MenuItem>
                                <MenuItem value={"2023"}>2023</MenuItem>
                            </TextField>
                        </Box>

                        <Grid container spacing={1.5} columns={3}>
                            <Grid item xs={1}>
                                <Box sx={columnBoxStyle}>
                                    Receitas da atividade rural
                                    <TextField
                                        label={"Recebidas"}
                                        value={formik.values.income.received}
                                        name="income.received"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                    <TextField
                                        label={"À Receber"}
                                        value={formik.values.income.to_receive}
                                        name="income.to_receive"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                    <TextField
                                        label={"Simulado"}
                                        value={formik.values.income.simulated}
                                        name="income.simulated"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={columnBoxStyle}>
                                    Despesas da atividade rural
                                    <TextField
                                        label={"Outras fontes de renda"}
                                        placeholder="Número de dependentes"
                                        value={formik.values.expenses.dependents}
                                        name=".expenses.dependents"
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        label={"À pagar"}
                                        value={formik.values.expenses.to_pay}
                                        name=".expenses.to_pay"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                    <TextField
                                        label={"Simulado"}
                                        value={formik.values.expenses.simulated}
                                        name=".expenses.simulated"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={columnBoxStyle}>
                                    Outros valores
                                    <TextField
                                        label={"Outras fontes de renda"}
                                        placeholder="Número de dependentes"
                                        value={formik.values.others.other_income}
                                        name=".others.other_income"
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        label={"Despesas dedutíveis"}
                                        value={formik.values.others.deductible_expenses}
                                        name="others.deductible_expenses"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                    <TextField
                                        label={"Prejuízo do exercício anterior"}
                                        value={formik.values.others.previous_losses}
                                        name="others.previous_losses"
                                        onChange={formik.handleChange}
                                        InputProps={inputAdornmentStyle}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </form>
    )
}
