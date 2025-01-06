export const currencyFormat = (amount: number) =>
  new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    amount
  );
