import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface AddNewProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewProductModal: React.FC<AddNewProductModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}
        sx={{
            justifyContent: "center"
        }}
        PaperProps={{
            sx: {
              borderRadius: "30px",
              paddingTop: "1rem",
            }
        }}
    >
      <DialogTitle>Adicionar Produto</DialogTitle>
      <CloseOutlinedIcon
        sx={{
            position: "absolute",
            top: "2rem",
            right: "1rem",
            cursor: "pointer"
        }}
        onClick={onClose}
      />

      <DialogContent>
        <Box
          sx={{
            flexDirection: "column",
            gap: "1rem",
            width: "30rem",
          }}
        >
          <TextField placeholder="Nome do produto" />
          <TextField placeholder="NCM / Classificação" />
        </Box>
      </DialogContent>
      
      <DialogActions
        sx={{
            margin: "0.5rem"
        }}
      >
        <Button onClick={onClose} color="secondary" variant="contained"
        sx={{
            borderRadius: "30px",
            color: "white",
            textTransform: "capitalize",
        }}
        >
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary" variant="contained"
        sx={{
            borderRadius: "30px",
            color: "white",
            textTransform: "capitalize",
        }}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewProductModal;
