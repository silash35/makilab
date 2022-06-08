import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { ComponentProps, ReactNode, useState } from "react";

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

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useError();

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
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
        <Button variant="outlined" onClick={handleSubmit}>
          {props.yesButtonText}
        </Button>
      </DialogActions>
      {isLoading && props.showLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
    </Dialog>
  );
}

interface ConfirmationDialogButtonProps {
  buttonText?: string;
  buttonProps?: ComponentProps<typeof Button>;
  button?: (props: ComponentProps<typeof Button>) => ReactNode;

  confirmationDialogProps: Omit<ConfirmationDialogProps, "open" | "setOpen">;
}

export function ConfirmationDialogButton(props: ConfirmationDialogButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.button ? (
        props.button({ onClick: () => setOpen(true) })
      ) : (
        <Button variant="outlined" onClick={() => setOpen(true)} {...props.buttonProps}>
          {props.buttonText}
        </Button>
      )}
      <ConfirmationDialog {...props.confirmationDialogProps} open={open} setOpen={setOpen} />
    </>
  );
}
