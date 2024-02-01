import React from "react"
import { Autocomplete, Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import icms_situacao_tributaria_values from "./Modals/AddInvoiceModal/icms_situacao_tributaria"
import pis_situacao_tributaria_values from "./Modals/AddInvoiceModal/pis_situacao_tributaria"
import cofins_situacao_tributaria_values from "./Modals/AddInvoiceModal/cofins_situacao_tributaria"
import { TaxRulesForm } from "../definitions/TaxRulesForm"
import { FormikErrors } from "formik"
import cfop_values from "./Modals/AddTaxationRuleModal/cfop_values"
import { colors } from "../style/colors"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface TaxValuesProps {
    formik: {
        values: TaxRulesForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<TaxRulesForm>>
    }
    isInvoice?: boolean
    product_formik?: {
        values: InvoiceProduct
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<InvoiceProduct>>
    }
}

export const TaxValues: React.FC<TaxValuesProps> = ({ formik, isInvoice, product_formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [expanded, setExpanded] = React.useState<string | false>(false)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
            }}
        >
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>CFOP</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={cfop_values}
                                getOptionLabel={(option) => `${option.value} - ${option.label}`}
                                getOptionDisabled={(option) => option.value.toString().length != 4}
                                renderInput={(params) => <TextField {...params} label="CFOP" variant="outlined" name="cfop" />}
                                value={cfop_values.find((cfop) => cfop.value == formik.values.cfop) || cfop_values[0]}
                                onChange={(_, value) => {
                                    formik.setFieldValue("cfop", value?.value || "")
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>ICMS</h3>
                </AccordionSummary>
                <AccordionDetails
                    sx={
                        {
                            // maxHeight: "10vw",
                            // overflowY: "auto",
                        }
                    }
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Situação Tributária do ICMS"
                                value={formik.values.icms_situacao_tributaria}
                                name="icms_situacao_tributaria"
                                onChange={formik.handleChange}
                                select
                            >
                                {icms_situacao_tributaria_values.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {icms_situacao_tributaria_values
                            .find((item) => item.value == formik.values.icms_situacao_tributaria)
                            ?.fields?.filter((item) => (isInvoice ? item : !item.disabled))
                            .map((item) => (
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
                                        disabled={item.disabled}
                                        sx={{
                                            backgroundColor: item.disabled ? colors.background2 : "",
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>PIS</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Situação tributária do PIS"
                                value={formik.values.pis_situacao_tributaria}
                                name="pis_situacao_tributaria"
                                onChange={formik.handleChange}
                                select
                            >
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
                                <Grid item xs={item.xs || 12} key={item.field}>
                                    <TextField
                                        fullWidth
                                        label={item.label}
                                        // @ts-ignore
                                        value={formik.values[item.field] != undefined ? formik.values[item.field] : item.type == "number" ? 0 : ""}
                                        name={item.field}
                                        onChange={formik.handleChange}
                                        type={item.type}
                                        required
                                        disabled={item.disabled}
                                        sx={{
                                            backgroundColor: item.disabled ? colors.background2 : "",
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3>COFINS</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Situação tributária do COFINS"
                                select
                                value={formik.values.cofins_situacao_tributaria}
                                name="cofins_situacao_tributaria"
                                onChange={formik.handleChange}
                            >
                                {cofins_situacao_tributaria_values.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.value} - {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {cofins_situacao_tributaria_values
                            .find((item) => item.value == formik.values.cofins_situacao_tributaria)
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
                                        required
                                        disabled={item.disabled}
                                        sx={{
                                            backgroundColor: item.disabled ? colors.background2 : "",
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
