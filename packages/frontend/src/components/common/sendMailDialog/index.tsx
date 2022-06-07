import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import { FormDialogButton } from "@/components/common/dialogs/formDialog";
import request from "@/utils/request";

interface Props {
  to: string;
  defaultText?: string;
}

export default function SendMailDialog({ to, defaultText }: Props) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const sendEmail = async () => {
    const { error } = await request({
      method: "POST",
      url: "/api/private/mail",
      body: { to, text },
    });
    return error;
  };

  return (
    <FormDialogButton
      buttonText="Enviar Email"
      formDialogProps={{
        title: `Confirmar Envio do Email para ${to}`,
        children: (
          <>
            {text === undefined && (
              <Alert severity="warning">
                O status atual do equipamento não requer envio de email. Você realmente deseja
                enviar uma mensagem ao cliente?
              </Alert>
            )}
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
          </>
        ),
        yesButtonText: "Enviar",
        showLoading: true,
        submit: sendEmail,
      }}
    />
  );
}
