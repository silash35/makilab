import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { ComponentProps, useState } from "react";

interface Props {
  title: string;
  text: string;
  buttonProps?: ComponentProps<typeof Button>;
  submit: () => Promise<boolean>;
}

export default function DeleteDialog({ title, text, buttonProps, submit }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (await submit()) {
      setOpenDialog(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button variant="outlined" {...buttonProps} onClick={() => setOpenDialog(true)}>
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
        {isLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
      </Dialog>
    </>
  );
}
