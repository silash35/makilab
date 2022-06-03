import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import styles from "./budgets.module.scss";

// import useBudgets from "@/hooks/useBudgets";

interface Props {
  id: string;
}

export default function Budgets({ id }: Props) {
  // const { budgets, mutate } = useBudgets(id);
  /*
  if (!serviceOrder) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  */

  return (
    <div className={styles.container}>
      <h1>Orçamentos da OS {id}</h1>
      <div className={styles.budgets}>
        <div className={styles.addCard}>
          <Card>
            <CardActionArea>
              <div className={styles.buttonContent}>
                <AddIcon fontSize="large" />
                <Typography variant="body1" component="p">
                  Novo Orçamento
                </Typography>
              </div>
            </CardActionArea>
          </Card>
        </div>

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <BudgetCard key={i} />
        ))}
      </div>
    </div>
  );
}

const BudgetCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Orçamento #1
        </Typography>
        <Typography variant="h6" component="div">
          R$ 532,00
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Deletar</Button>
        <Button size="small">Ver mais</Button>
      </CardActions>
    </Card>
  );
};
