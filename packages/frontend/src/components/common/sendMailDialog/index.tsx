import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { FormEvent, useEffect, useState } from "react";

import useError from "@/hooks/useError";
import request from "@/utils/request";

import styles from "./sendMailDialog.module.scss";

interface Props {
  to: string;
  defaultText?: string;
}

export default function SendMailDialog({ to, defaultText }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(defaultText);

  const { setError } = useError();

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await request({
      method: "POST",
      url: "/api/private/mail",
      body: { to, text },
    });

    if (!error) {
      setOpenDialog(false);
    } else {
      setError(String(error));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Enviar Email
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="mail-dialog-title"
      >
        <form style={{ display: "contents" }} onSubmit={sendData}>
          <DialogTitle id="mail-dialog-title">Confirmar Envio do Email para {to}</DialogTitle>

          <DialogContent>
            {text === undefined && (
              <Alert severity="warning">
                O status atual do equipamento não requer envio de email. Você realmente deseja
                enviar uma mensagem ao cliente?
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
                required
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="outlined" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
        {isLoading ? <LinearProgress /> : <div className={styles.space} />}
      </Dialog>
    </>
  );
}
