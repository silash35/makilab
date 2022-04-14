import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

import request from "@/utils/frontend/request";

interface Props {
  id: string;
  title: string;
  text: string;
  url: string;
}

export default function DeleteDialog({ id, title, text, URL }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const sendData = async () => {
    if ((await request(URL, "DELETE", { id })) != "ERROR") {
      setOpenDialog(false);
      reload();
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
          <Button variant="outlined" onClick={sendData}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
