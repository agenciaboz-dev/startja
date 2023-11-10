import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Grid } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { OperationsListHeader } from "../../../../components/OperationsList/OperationsListHeader";
import { OperationsList } from "../../../../components/OperationsList";
import AddNewTaxationRuleModal from "./AddNewTaxationRuleModal";

interface AddNewOperationModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewOperationModal: React.FC<AddNewOperationModalProps> = ({ open, onClose }) => {
  const [isAddNewTaxationRuleModalOpen, setAddNewTaxationRuleModalOpen] = useState(false);
  const openNewTaxationRuleModal = () => {
    setAddNewTaxationRuleModalOpen(true)
  }

  return (
    <Dialog open={open} onClose={onClose}
        sx={{
          justifyContent: "center",
        }}
        PaperProps={{
            sx: {
              borderRadius: "30px",
              paddingTop: "1rem",
              minWidth: "60vw",
              width: "fit-content"
            }
        }}
    >
      <DialogTitle>Adicionar natureza da operação</DialogTitle>
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
            width: "100%",
            gap: "2rem"
          }}
        >

          <Grid container spacing={2} >
            <Grid item xs={4}>
              <TextField label="Operação" fullWidth/>
            </Grid>
            <Grid item xs={4}>
              <TextField label="Tipo" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Finalidade" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Natureza da operação (motivo)" placeholder="Busque pelo nome do produto ou NCM" fullWidth />
            </Grid>
          </Grid>

          <Box
            sx={{
              justifyContent: "space-between"
            }}
          >
            <p>Regras de tributação adicionadas</p>
            <Button variant="contained"
              sx={{
                borderRadius: "30px",
                textTransform: "unset"
              }}
              onClick={openNewTaxationRuleModal}
            >
              Adicionar Regra
            </Button>
          </Box>

          <Box
            sx={{
                flex: 1,
                padding: "1rem 1.5rem 1rem 0.5rem",
                boxShadow: "0 2px 2px 2px #d1d1d1",
                backgroundColor: "white",
                borderRadius: "30px",
                flexDirection: "column",
                width: "100%",
            }}
            >
            <OperationsListHeader />
            <OperationsList />
        </Box>

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
      <AddNewTaxationRuleModal open={isAddNewTaxationRuleModalOpen} onClose={() => setAddNewTaxationRuleModalOpen(false)} />
    </Dialog>
  );
};

export default AddNewOperationModal;
