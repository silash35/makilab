import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import DeleteDialog from "@/components/common/deleteDialog";
import useError from "@/hooks/useError";
import TBudget from "@/types/budget";
import centsToBRL from "@/utils/centsToBRL";
import deleteBudget from "@/utils/mutations/deleteBudget";

interface Props {
  budget: TBudget;
  mutate: () => void;
}

export default function BudgetCard({ budget, mutate }: Props) {
  const { setError } = useError();

  const reais = centsToBRL(budget.total);

  const handleDeleteBudget = async () => {
    const { error } = await deleteBudget(budget.id);

    if (error) {
      setError(error);
      return false;
    } else {
      mutate();
      return true;
    }
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
        <DeleteDialog
          title={`Deletar ${budget.name}`}
          text="Tem certeza que deseja excluir este orçamento? Não será possível recuperar depois."
          buttonProps={{ variant: "text" }}
          submit={handleDeleteBudget}
        />
      </CardActions>
    </Card>
  );
}
