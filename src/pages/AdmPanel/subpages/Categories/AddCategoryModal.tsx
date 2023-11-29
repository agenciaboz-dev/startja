import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

interface AddCategoryModalProps {
    open: boolean
    onClose: () => void
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "30px",
                    minWidth: "60vw",
                },
            }}
        >
            <DialogTitle>Nova conta</DialogTitle>
            <CloseOutlinedIcon
                sx={{
                    position: "absolute",
                    top: "1vw",
                    right: "1vw",
                    cursor: "pointer",
                }}
                onClick={onClose}
            />

            <DialogContent></DialogContent>

            <DialogActions
                sx={{
                    margin: "0.5vw",
                }}
            >
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: "30px",
                        color: "white",
                        textTransform: "unset",
                    }}
                >
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCategoryModal
