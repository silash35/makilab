import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { ConfirmationDialogButton } from "@/components/common/dialogs/confirmationDialog";
import TBudget from "@/types/budget";
import centsToBRL from "@/utils/centsToBRL";
import deleteBudget from "@/utils/mutations/deleteBudget";

interface Props {
  budget: TBudget;
  mutate: () => void;
}

export default function BudgetCard({ budget, mutate }: Props) {
  const reais = centsToBRL(budget.total);

  const handleDeleteBudget = async () => {
    const { error } = await deleteBudget(budget.id);
    mutate();
    return error;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {budget.name}
        </Typography>
        <Typography variant="h6" component="div">
          {reais}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/admin/budget/${budget.id}`} passHref>
          <Button component="a">Ver mais</Button>
        </Link>

        <ConfirmationDialogButton
          buttonText="Deletar"
          buttonProps={{ variant: "text" }}
          confirmationDialogProps={{
            title: `Deletar ${budget.name}`,
            text: "Tem certeza que deseja excluir este orçamento? Não será possível recuperar depois.",
            yesButtonText: "Deletar",
            showLoading: true,
            submit: handleDeleteBudget,
          }}
        />
      </CardActions>
    </Card>
  );
}
