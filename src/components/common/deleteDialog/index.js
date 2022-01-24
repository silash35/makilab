import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function DeleteDialog({ id, title, text, URL, reload }) {
  const [openDialog, setOpenDialog] = useState(false);

  const sendData = async () => {
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    const res = await fetch(URL, request);

    if (res.status === 200) {
      setOpenDialog(false);
      reload();
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
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
