import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { format } from "date-fns/format";

import useLocale from "@/hooks/useLocale";
import type { Product } from "@/utils/getProduct";

import en from "./locales/en";
import pt from "./locales/pt";

interface Props {
  product: Product;
}

const Ul = styled("ul")({ padding: 0, listStyle: "none", margin: 0 });
const P = styled("p")({ margin: 0 });

const Dates = ({ product }: Props) => {
  const { t } = useLocale({ en, pt });

  const dates = [];

  if (product.createdAt != null) {
    dates.push(<DateItem date={product.createdAt} key={1} text={t.arrived} />);
  }
  if (product.budgetedAt != null) {
    dates.push(<DateItem date={product.budgetedAt} key={2} text={t.budgeted} />);
  }
  if (product.budgetAnsweredAt != null) {
    dates.push(<DateItem date={product.budgetAnsweredAt} key={3} text={t.budgetAnswered} />);
  }
  if (product.repairedAt != null) {
    dates.push(<DateItem date={product.repairedAt} key={4} text={t.repaired} />);
  }
  if (product.deliveredToCustomerAt != null) {
    dates.push(
      <DateItem date={product.deliveredToCustomerAt} key={5} text={t.deliveredToCustomer} />,
    );
  }

  return <Ul>{dates}</Ul>;
};

export default Dates;

interface DateItemProps {
  text: string;
  date: Date;
}

const DateItem = ({ text, date }: DateItemProps) => {
  const { t } = useLocale({ en, pt });

  return (
    <li>
      <P>{format(date, t.dateFormat, { locale: t.dateLocale })}</P>

      <Box display="flex" gap={2} marginBottom={2} marginTop={0.5}>
        <P>{format(date, "hh:mm a", { locale: t.dateLocale })}</P>
        <Divider orientation="vertical" sx={{ backgroundColor: "#00000038" }} flexItem />
        <P>{text}</P>
      </Box>
    </li>
  );
};
