import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface AddNewInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewInvoiceModal: React.FC<AddNewInvoiceModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}
        sx={{
            justifyContent: "center"
        }}
        PaperProps={{
            sx: {
              borderRadius: "30px",
              paddingTop: "1rem",
              minWidth: "60vw"
            }
        }}
    >
      <DialogTitle>Preencha os dados da nota de saída</DialogTitle>
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

        <Grid container spacing={2} >
          <Grid item xs={12}>
            <TextField label="Nome do produto" fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="NCM - Classificação" fullWidth />
          </Grid>
        </Grid>

      </DialogContent>
      
      <DialogActions
        sx={{
            margin: "0.5rem",
            justifyContent: "space-between"
        }}
      >
        <Button onClick={onClose} color="secondary" variant="contained"
        sx={{
            borderRadius: "30px",
            color: "white",
            textTransform: "unset",
        }}
        >
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary" variant="outlined"
        sx={{
            borderRadius: "30px",
            textTransform: "unset",
        }}
        >
          Adicionar informações
        </Button>
        <Button onClick={onClose} color="secondary" variant="contained"
        sx={{
            borderRadius: "30px",
            color: "white",
            textTransform: "unset",
        }}
        >
          Salvar e visualizar
        </Button>
        <Button onClick={onClose} color="primary" variant="contained"
        sx={{
            borderRadius: "30px",
            color: "white",
            textTransform: "unset",
        }}
        >
          Simular imposto de renda
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewInvoiceModal;
