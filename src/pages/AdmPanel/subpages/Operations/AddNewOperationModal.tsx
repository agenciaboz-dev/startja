import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { OperationsListHeader } from "../../../../components/OperationsList/OperationsListHeader";
import { OperationsList } from "../../../../components/OperationsList";

interface AddNewOperationModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewOperationModal: React.FC<AddNewOperationModalProps> = ({ open, onClose }) => {
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
          <Box
            sx={{
              gap: "1rem",
              width: "100%"
            }}
          >
            <TextField placeholder="Operação"
              sx={{
                flex: 1
              }}
            />
            <TextField placeholder="Tipo"
              sx={{
                flex: 1
              }}
            />
            <TextField placeholder="Finalidade"
              sx={{
                flex: 1
              }}
            />
          </Box>
          <Box>
            <TextField placeholder="Natureza da operação (motivo)"
              sx={{
                flex: 1
              }}
            />
          </Box>
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
