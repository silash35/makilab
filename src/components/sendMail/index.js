import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function SendMail({ equipment, email = null }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [text, setText] = useState(email === null ? equipment.defaultEmail : email);

  const sendData = async () => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: equipment.owner.email, text: text }),
    };
    const res = await fetch("/api/admin/sendMail", request);

    if (res.status === 200) {
      setOpenDialog(false);
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
    }
  };

  return (
    <section>
      <Button onClick={() => setOpenDialog(true)}>Enviar Email</Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Confirmar Envio do Email para {equipment.owner.email}
        </DialogTitle>
        <DialogContent>
          {text === null && (
            <Alert severity="warning">
              O status atual do equipamento não requer envio de email. Você realmente deseja enviar
              uma mensagem ao cliente?
            </Alert>
          )}
          <DialogContentText>
            <TextField
              label="Texto do Email"
              variant="outlined"
              margin="normal"
              minRows={5}
              fullWidth
              multiline
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </DialogContentText>
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
