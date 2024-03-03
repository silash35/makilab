"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import useServiceOrder from "@/hooks/useServiceOrder";

import Options from "./Options";
import Pdf from "./Pdf";
import styles from "./so.module.scss";

interface Props {
  id: string;
}

const ServiceOrder = ({ id }: Props) => {
  const { serviceOrder, mutate } = useServiceOrder(id);

  if (!serviceOrder) {
    return (
      <Stack alignItems="center" height="100%" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Options mutate={mutate} serviceOrder={serviceOrder} />
      <div className={styles.pdfContainer}>
        <Pdf serviceOrder={serviceOrder} />
      </div>
    </>
  );
};

export default ServiceOrder;
