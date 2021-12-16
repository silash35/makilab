import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function SendMail({ equipment }) {
  const [openDialog, setOpenDialog] = useState(false);

  const sendData = () => {
    setOpenDialog(false);
  };

  return (
    <section>
      <Button onClick={() => setOpenDialog(true)}>Enviar Email</Button>
      <p style={{ weight: "50vw" }}>{JSON.stringify(equipment)}</p>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Confirmar Envio do Email para {equipment.owner.email}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Texto do Email aaaaa</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button variant="outlined" color="primary" onClick={sendData}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
