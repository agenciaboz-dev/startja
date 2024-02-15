import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, MenuItem, TextField } from "@mui/material"
import { TaxRulesForm } from "../definitions/TaxRulesForm"
import { FormikErrors } from "formik"
import { unmaskCurrency } from "../tools/unmaskNumber"
import { colors } from "../style/colors"

interface TaxFormik {
    values: TaxRulesForm
    handleChange: (e: React.ChangeEvent<any>) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<TaxRulesForm>>
}

interface ProductFormik {
    values: InvoiceProduct
    handleChange: (e: React.ChangeEvent<any>) => void
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<InvoiceProduct>>
}

interface TaxFieldProps {
    item: CustomTaxFields
    formik: TaxFormik
    product_formik?: ProductFormik
}

const extractFieldsFromFormula = (formula: string) => {
    const regex = /\{(formik\.values|product_formik\.values)\.([^\}]+)\}/g
    let match
    const fields = []

    while ((match = regex.exec(formula)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === regex.lastIndex) {
            regex.lastIndex++
        }

        // The full match will be match[0], the group (formik.values or product_formik.values) will be match[1], and the actual field name will be match[2]
        fields.push(match[1] + "." + match[2])
    }

    return fields
}

export const TaxField: React.FC<TaxFieldProps> = ({ item, formik, product_formik }) => {
    const [value, setValue] = useState(
        // @ts-ignore
        formik.values[item.field] != undefined
            ? // @ts-ignore
              formik.values[item.field]
            : item.type == "number"
            ? 0
            : ""
    )

    const formulaFields = item.formula ? extractFieldsFromFormula(item.formula) : []

    const evaluateFormula = (formula: string, formik: TaxFormik, product_formik: ProductFormik) => {
        let _formik: TaxFormik | ProductFormik = formik

        const replacedFormula =
            item.formula?.replace(/\{([^}]+)\}/g, (_, key) => {
                let value
                if (key.startsWith("formik.")) {
                    const actualKey = key.slice("formik.values.".length)
                    value = actualKey.split(".").reduce((acc: string, k: number) => acc[k] || 0, formik.values)
                } else if (key.startsWith("product_formik.")) {
                    const actualKey = key.slice("product_formik.values.".length)
                    value = actualKey.split(".").reduce((acc: string, k: number) => acc[k] || 0, product_formik?.values)
                    _formik = product_formik
                } else {
                    value = 0 // Default fallback value
                }
                return unmaskCurrency(value).toString()
            }) || "0"

        try {
            const value = eval(replacedFormula)
            _formik.setFieldValue(item.field, value)
            return value
        } catch (error) {
            console.error("Error evaluating formula:", error)
            return 0
        }
    }

    useEffect(() => {
        if (item.formula && product_formik) {
            evaluateFormula(item.formula, formik, product_formik)
        }
        setValue(
            // @ts-ignore
            formik.values[item.field] != undefined
                ? // @ts-ignore
                  formik.values[item.field]
                : item.type == "number"
                ? 0
                : ""
        )
    }, [
        // @ts-ignore
        formik.values[item.field],
        ...formulaFields.map((field) => {
            const [source, _, key] = field.split(".")
            // @ts-ignore
            if (source === "formik") return formik.values[key] // @ts-ignore
            if (source === "product_formik") return product_formik.values[key]
        }),
    ])

    useEffect(() => {}, [])

    return (
        <Grid item xs={item.xs || 12}>
            <TextField
                fullWidth
                label={item.label}
                value={value}
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
    )
}
