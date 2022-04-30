import Options from "./options";
import Pdf from "./pdf";
import styles from "./so.module.scss";

interface Props {
  id: string;
}

export default function Container({ id }: Props) {
  return (
    <>
      <Options id={id} />
      <div className={styles.pdfContainer}>
        <Pdf id={id} />
      </div>
    </>
  );
}
