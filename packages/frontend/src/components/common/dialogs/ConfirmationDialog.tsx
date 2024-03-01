"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { ComponentProps, ReactNode, useId, useState } from "react";

import useError from "@/hooks/useError";

interface ConfirmationDialogProps {
  title: string;
  text: string;
  yesButtonText: string;
  showLoading: boolean;

  submit: () => Promise<string | void>;

  open: boolean;
  setOpen: (open: boolean) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useError();
  const id = useId();

  const handleSubmit = async () => {
    setIsLoading(true);
    const error = await props.submit();

    if (error) {
      setError(error);
    } else {
      props.setOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <Dialog aria-labelledby={id} onClose={() => props.setOpen(false)} open={props.open}>
      <DialogTitle id={id}>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="outlined">
          {props.yesButtonText}
        </Button>
      </DialogActions>
      {isLoading && props.showLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
    </Dialog>
  );
};

export default ConfirmationDialog;

interface ConfirmationDialogButtonProps {
  buttonText?: string;
  buttonProps?: ComponentProps<typeof Button>;
  button?: (props: ComponentProps<typeof Button>) => ReactNode;

  confirmationDialogProps: Omit<ConfirmationDialogProps, "open" | "setOpen">;
}

export const ConfirmationDialogButton = (props: ConfirmationDialogButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.button ? (
        props.button({ onClick: () => setOpen(true) })
      ) : (
        <Button onClick={() => setOpen(true)} variant="outlined" {...props.buttonProps}>
          {props.buttonText}
        </Button>
      )}
      <ConfirmationDialog {...props.confirmationDialogProps} open={open} setOpen={setOpen} />
    </>
  );
};
