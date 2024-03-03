import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

import { FormDialogButton } from "@/components/dialogs/FormDialog";
import TextInput from "@/components/inputs/fields/Text";
import type { TBudgetInput } from "@/types/budget";
import addBudget from "@/utils/mutations/addBudget";

import styles from "./newBudgetCard.module.scss";

interface Props {
  serviceOrderId: string;
  number: number;
  mutate: () => void;
}

const NewBudgetCard = ({ serviceOrderId, number, mutate }: Props) => {
  const newBudget = async (data: unknown) => {
    const { error } = await addBudget(Number(serviceOrderId), data as TBudgetInput);
    mutate();
    return error;
  };

  return (
    <div className={styles.addCard}>
      <Card>
        <FormDialogButton
          button={(props) => (
            <CardActionArea {...props}>
              <div className={styles.buttonContent}>
                <AddIcon fontSize="large" />
                <Typography component="p" variant="body1">
                  Novo Orçamento
                </Typography>
              </div>
            </CardActionArea>
          )}
          formDialogProps={{
            title: "Criar Novo Orçamento",
            children: (
              <TextInput
                textFieldProps={{
                  name: "name",
                  label: "Nome do novo orçamento",
                  required: true,
                  fullWidth: true,
                  margin: "normal",
                }}
                defaultValue={`Novo Orçamento #${number}`}
              />
            ),
            yesButtonText: "Enviar",
            showLoading: true,
            submit: newBudget,
          }}
        />
      </Card>
    </div>
  );
};

export default NewBudgetCard;
