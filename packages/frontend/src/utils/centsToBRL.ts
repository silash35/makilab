function centsToBRL(cents: number): string {
  const value = cents / 100;
  const valueString = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueString;
}

export default centsToBRL;
