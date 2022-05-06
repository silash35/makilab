import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

interface Props {
  title: string;
  text: string;
  submit: () => Promise<boolean>;
}

export default function DeleteDialog({ title, text, submit }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async () => {
    if (await submit()) {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Deletar
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
