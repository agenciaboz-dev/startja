import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface AddNewTaxationRuleModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewTaxationRuleModal: React.FC<AddNewTaxationRuleModalProps> = ({ open, onClose }) => {

  return (
    <Dialog open={open} onClose={onClose}
        sx={{
          justifyContent: "center",
        }}
        PaperProps={{
            sx: {
              borderRadius: "30px",
              paddingTop: "1rem",
              minWidth: "50vw",
              width: "fit-content"
            }
        }}
    >
      <DialogTitle>Adicionar Regra de Tributação</DialogTitle>
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
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            width: "100%"
          }}
        >
          <Box>
            <p>Quando sair de</p>
            <TextField select label="UF" />
            <p>para</p>
            <TextField select label="UF" />
            <p>, e quando for</p>
            <TextField select label="Produto" />
            <p>:</p>
          </Box>
          
          <p>Use a regra de tributação a seguir:</p>
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
            textTransform: "unset",
        }}
        >
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary" variant="contained"
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
  );
};

export default AddNewTaxationRuleModal;
