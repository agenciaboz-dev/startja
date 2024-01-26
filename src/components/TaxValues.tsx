import React from "react"
import { Autocomplete, Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import icms_situacao_tributaria_values from "./Modals/AddInvoiceModal/icms_situacao_tributaria"
import pis_situacao_tributaria_values from "./Modals/AddInvoiceModal/pis_situacao_tributaria"
import cofins_situacao_tributaria_values from "./Modals/AddInvoiceModal/cofins_situacao_tributaria"
import { TaxRulesForm } from "../definitions/TaxRulesForm"
import { FormikErrors } from "formik"
import cfop_values from "./Modals/AddTaxationRuleModal/cfop_values"

interface TaxValuesProps {
    formik: {
        values: TaxRulesForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<TaxRulesForm>>
    }
}

export const TaxValues: React.FC<TaxValuesProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        disablePortal
                        options={cfop_values}
                        getOptionLabel={(option) => `${option.value} - ${option.label}`}
                        getOptionDisabled={(option) => option.value.toString().length != 4}
                        renderInput={(params) => <TextField {...params} label="CFOP" variant="standard" name="cfop" />}
                        value={cfop_values.find((cfop) => cfop.value == formik.values.cfop) || cfop_values[0]}
                        onChange={(_, value) => {
                            formik.setFieldValue("cfop", value?.value || "")
                        }}
                    />
                </Grid>
            </Grid>

            <h3>ICMS</h3>
            <Grid container spacing={2}>
                {/* <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Modalidade para base de cálculo do ICMS"
                        value={formik.values.icms_modalidade_base_calculo}
                        name="icms_modalidade_base_calculo"
                        onChange={formik.handleChange}
                        select>
                        <MenuItem value={0}>0 - margem de valor agregado (%)</MenuItem>
                        <MenuItem value={1}>1 - pauta (valor)</MenuItem>
                        <MenuItem value={2}>2 - preço tabelado máximo (valor)</MenuItem>
                        <MenuItem value={3}>3 - valor da operação</MenuItem>
                    </TextField>
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Situação Tributária do ICMS"
                        value={formik.values.icms_situacao_tributaria}
                        name="icms_situacao_tributaria"
                        onChange={formik.handleChange}
                        select>
                        {icms_situacao_tributaria_values.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {icms_situacao_tributaria_values
                    .find((item) => item.value == formik.values.icms_situacao_tributaria)
                    ?.fields?.map((item) => (
                        <Grid item xs={item.xs || 12} key={item.field}>
                            <TextField
                                fullWidth
                                label={item.label}
                                // @ts-ignore
                                value={formik.values[item.field] != undefined ? formik.values[item.field] : item.type == "number" ? 0 : ""}
                                name={item.field}
                                onChange={formik.handleChange}
                                type={item.type}
                                select={item.select}
                                children={item.options?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value} - {option.label}
                                    </MenuItem>
                                ))}
                                required
                            />
                        </Grid>
                    ))}
            </Grid>

            <h3>PIS</h3>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Situação tributária do PIS"
                        value={formik.values.pis_situacao_tributaria}
                        name="pis_situacao_tributaria"
                        onChange={formik.handleChange}
                        select>
                        {pis_situacao_tributaria_values.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {pis_situacao_tributaria_values
                    .find((item) => item.value == formik.values.pis_situacao_tributaria)
                    ?.fields?.map((item) => (
                        <Grid item xs={12} key={item.field}>
                            <TextField
                                fullWidth
                                label={item.label}
                                // @ts-ignore
                                value={formik.values[item.field] != undefined ? formik.values[item.field] : item.type == "number" ? 0 : ""}
                                name={item.field}
                                onChange={formik.handleChange}
                                type={item.type}
                                required
                            />
                        </Grid>
                    ))}
            </Grid>

            <h3>COFINS</h3>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Situação tributária do COFINS"
                        select
                        value={formik.values.cofins_situacao_tributaria}
                        name="cofins_situacao_tributaria"
                        onChange={formik.handleChange}>
                        {cofins_situacao_tributaria_values.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.value} - {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {pis_situacao_tributaria_values
                    .find((item) => item.value == formik.values.cofins_situacao_tributaria)
                    ?.fields?.map((item) => (
                        <Grid item xs={12} key={item.field}>
                            <TextField
                                fullWidth
                                label={item.label}
                                // @ts-ignore
                                value={formik.values[item.field] != undefined ? formik.values[item.field] : item.type == "number" ? 0 : ""}
                                name={item.field}
                                onChange={formik.handleChange}
                                type={item.type}
                                required
                            />
                        </Grid>
                    ))}
            </Grid>
        </>
    )
}
