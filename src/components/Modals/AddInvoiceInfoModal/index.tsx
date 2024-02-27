import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, useMediaQuery, Radio, Tabs, Tab } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { tabStyles } from "../../../style/tabStyles"
import { TransportBox } from "./TransportBox"
import { PaymentBox } from "./PaymentBox"
import { FormikErrors } from "formik"
import { GeneralInfoBox } from "./GeneralInfoBox"

interface AddInvoiceInfoModalProps {
    open: boolean
    onClose: () => void
    focusNFEInvoiceFormik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

const AddInvoiceInfoModal: React.FC<AddInvoiceInfoModalProps> = ({ open, onClose, focusNFEInvoiceFormik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    const [infoTabDisplay, setInfoTabDisplay] = useState("generalInfo")

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "80vw",
                    width: "fit-content",
                    height: "80vh",
                },
            }}
        >
            <DialogTitle>Adicionar informações</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: isMobile ? "5vw" : "1vw",
                    right: isMobile ? "5vw" : "1vw",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        flexDirection: isMobile ? "column" : "",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: "column",
                            gap: isMobile ? "5vw" : "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Tabs
                                variant="fullWidth"
                                textColor="primary"
                                indicatorColor="primary"
                                sx={{ width: "100%" }}
                                onChange={(_, value) => setInfoTabDisplay(value)}
                                value={infoTabDisplay}
                            >
                                <Tab
                                    value={"generalInfo"}
                                    label={
                                        <Box sx={tabStyles.label}>
                                            {!isMobile && <Radio checked={infoTabDisplay === "generalInfo"} />}
                                            <p>Informações gerais</p>
                                        </Box>
                                    }
                                    sx={infoTabDisplay === "generalInfo" ? tabStyles.active : tabStyles.inactive}
                                />
                                <Tab
                                    value={"transportInfo"}
                                    label={
                                        <Box sx={tabStyles.label}>
                                            {!isMobile && <Radio checked={infoTabDisplay === "transportInfo"} />}
                                            <p>Transporte</p>
                                        </Box>
                                    }
                                    sx={infoTabDisplay === "transportInfo" ? tabStyles.active : tabStyles.inactive}
                                />
                                <Tab
                                    value={"paymentInfo"}
                                    label={
                                        <Box sx={tabStyles.label}>
                                            {!isMobile && <Radio checked={infoTabDisplay === "paymentInfo"} />}
                                            <p>Pagamento</p>
                                        </Box>
                                    }
                                    sx={infoTabDisplay === "paymentInfo" ? tabStyles.active : tabStyles.inactive}
                                />
                            </Tabs>
                        </Box>
                        {infoTabDisplay === "generalInfo" && <GeneralInfoBox formik={focusNFEInvoiceFormik} />}
                        {infoTabDisplay === "transportInfo" && <TransportBox formik={focusNFEInvoiceFormik} />}
                        {infoTabDisplay === "paymentInfo" && <PaymentBox formik={focusNFEInvoiceFormik} />}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    margin: isMobile ? "0" : "0.5vw",
                    padding: isMobile ? "5vw" : "",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        color: "white",
                        textTransform: "unset",
                        marginRight: isMobile ? "" : "auto",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "20px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddInvoiceInfoModal
