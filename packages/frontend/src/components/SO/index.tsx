import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import useServiceOrder from "@/hooks/useServiceOrder";

import Options from "./options";
import Pdf from "./pdf";
import styles from "./so.module.scss";

interface Props {
  id: string;
}

export default function Container({ id }: Props) {
  const { serviceOrder, mutate } = useServiceOrder(id);

  if (!serviceOrder) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Options serviceOrder={serviceOrder} mutate={mutate} />
      <div className={styles.pdfContainer}>
        <Pdf serviceOrder={serviceOrder} />
      </div>
    </>
  );
}
