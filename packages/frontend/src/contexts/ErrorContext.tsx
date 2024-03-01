"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createContext, useState } from "react";
import { SWRConfig } from "swr";

interface ErrorContextType {
  setError: (error: string) => void;
}

export const ErrorContext = createContext({} as ErrorContextType);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
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
      <SWRConfig
        value={{
          onError: (error) => {
            setError(String(error));
          },
        }}
      >
        {children}
      </SWRConfig>
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={isOpen}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
          <p style={{ margin: "0" }}>{errorText}</p>
          <small>Tente novamente mais tarde, recarregue a pagina ou procure ajuda</small>
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};
