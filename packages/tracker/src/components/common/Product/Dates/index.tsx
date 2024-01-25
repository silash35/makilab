import { format } from "date-fns/format";
import { useRouter } from "next/router";

import type { Product } from "@/utils/getProduct";

import styles from "./dates.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";

interface Props {
  product: Product;
}

const Dates = ({ product }: Props) => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

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

  return <ul className={styles.list}>{dates}</ul>;
};

export default Dates;

interface DateItemProps {
  text: string;
  date: string;
}

const DateItem = ({ text, date }: DateItemProps) => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <li className={styles.item}>
      <p>{format(new Date(date), t.dateFormat, { locale: t.dateLocale })}</p>

      <div className={styles.flex}>
        <p className={styles.time}>{format(new Date(date), "hh:mm a", { locale: t.dateLocale })}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
};
