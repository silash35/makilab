import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type Client from "@/types/client";
import request from "@/utils/request";

interface Props {
  client: Client;
  email?: string;
}

export default function SendMailDialog({ client, email }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [text, setText] = useState(email);

  const sendData = async () => {
    if (
      (await request("/api/admin/sendMail", "POST", { to: client.email, text: text })) != "ERROR"
    ) {
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Enviar Email
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Confirmar Envio do Email para {client.email}
        </DialogTitle>
        <DialogContent>
          {text && (
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
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="outlined" onClick={sendData}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
