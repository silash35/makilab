import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createContext, useState } from "react";

interface ErrorContextType {
  setError: (error: string) => void;
}

export const ErrorContext = createContext({} as ErrorContextType);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const setError = (error: string) => {
    setErrorText(error);
    setIsOpen(true);
  };

  const handleClose = async () => {
    setIsOpen(false);
  };

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
      <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          <p style={{ margin: "0" }}>{errorText}</p>
          <small>Tente novamente mais tarde, recarregue a pagina ou procure ajuda</small>
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
}
