import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { ComponentProps, FormEvent, ReactNode, useState } from "react";

import useError from "@/hooks/useError";

import styles from "./formDialog.module.scss";

interface FormDialogProps {
  title?: string;
  children: ReactNode;
  yesButtonText: string;
  showLoading: boolean;

  submit: (data: unknown) => Promise<string | undefined>;

  open: boolean;
  setOpen: (open: boolean) => void;
}

const FormDialog = (props: FormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useError();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    setIsLoading(true);
    const error = await props.submit(data);

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
      aria-labelledby="form-dialog-title"
    >
      {props.title && (
        <DialogTitle id="form-dialog-title" className={styles.title}>
          {props.title}
        </DialogTitle>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <DialogContent className={props.title ? styles.content : undefined}>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
          <Button variant="outlined" type="submit">
            {props.yesButtonText}
          </Button>
        </DialogActions>
      </form>
      {isLoading && props.showLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
    </Dialog>
  );
};

interface FormDialogButtonProps {
  buttonText?: string;
  buttonProps?: ComponentProps<typeof Button>;
  button?: (props: ComponentProps<typeof Button>) => ReactNode;

  formDialogProps: Omit<FormDialogProps, "open" | "setOpen">;
}

const FormDialogButton = (props: FormDialogButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.button ? (
        props.button({ onClick: () => setOpen(true) })
      ) : (
        <Button onClick={() => setOpen(true)} {...props.buttonProps}>
          {props.buttonText}
        </Button>
      )}
      <FormDialog {...props.formDialogProps} open={open} setOpen={setOpen} />
    </>
  );
};

export default FormDialog;
export { FormDialog, FormDialogButton };
