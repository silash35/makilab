"use client";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import { FormDialogButton } from "@/components/dialogs/FormDialog";
import request from "@/utils/request";

import styles from "./sendMailDialog.module.scss";

interface Props {
  to: string;
  defaultText?: string;
}

const SendMailDialog = ({ to, defaultText }: Props) => {
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
            <input name="to" type="hidden" value={to} />
            <TextField
              onChange={(event) => {
                setText(event.target.value);
              }}
              label="Texto do Email"
              margin="normal"
              minRows={5}
              name="text"
              value={text}
              variant="outlined"
              fullWidth
              multiline
              required
            />
            <Button component="label" variant="outlined">
              <div className={styles.selectFileText}>
                {selectedFile ? selectedFile.name : "Anexar Arquivo"}
              </div>
              <input
                name="attachment"
                onChange={(e) => setSelectedFile(e.target.files?.[0])}
                type="file"
                hidden
              />
            </Button>
          </>
        ),
        yesButtonText: "Enviar",
        showLoading: true,
        submit: sendEmail,
      }}
      buttonText="Enviar Email"
    />
  );
};

export default SendMailDialog;
