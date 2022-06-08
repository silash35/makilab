import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import request from "@/utils/request";

import styles from "./sendMailDialog.module.scss";

interface Props {
  to: string;
  defaultText?: string;
}

export default function SendMailDialog({ to, defaultText }: Props) {
  const [text, setText] = useState(defaultText);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const sendEmail = async (data: unknown, formData: FormData) => {
    const { error } = await request({
      method: "POST",
      url: "/api/private/mail",
      body: formData,
      notJson: true,
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
            <input hidden type="text" value={to} name="to" />
            <TextField
              label="Texto do Email"
              variant="outlined"
              name="text"
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
            <Button variant="outlined" component="label">
              <div className={styles.selectFileText}>
                {selectedFile ? selectedFile.name : "Anexar Arquivo"}
              </div>
              <input
                type="file"
                name="attachment"
                hidden
                onChange={(e) => setSelectedFile(e.target.files?.[0])}
              />
            </Button>
          </>
        ),
        yesButtonText: "Enviar",
        showLoading: true,
        submit: sendEmail,
      }}
    />
  );
}
