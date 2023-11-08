import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface AddNewOperationModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewOperationModal: React.FC<AddNewOperationModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}
        sx={{
            justifyContent: "center"
        }}
        PaperProps={{
            sx: {
              borderRadius: "30px",
              height: "50rem",
            }
        }}
    >
      <DialogTitle>Adicionar natureza da operação</DialogTitle>
      <CloseOutlinedIcon
        sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer"
        }}
        onClick={onClose}
      />

      <DialogContent>
        
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

export default AddNewOperationModal;
