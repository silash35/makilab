import { ProcessedSO } from "@/types/serviceOrder";

import Options from "./options";
import Pdf from "./pdf";
import styles from "./so.module.scss";

interface Props {
  serviceOrder: ProcessedSO;
}

export default function Container({ serviceOrder }: Props) {
  return (
    <>
      <Options serviceOrder={serviceOrder} />
      <div className={styles.pdfContainer}>
        <Pdf serviceOrder={serviceOrder} />
      </div>
    </>
  );
}
