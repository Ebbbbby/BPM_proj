export const FormatCurrency = (amount, currency) => {
  const value = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
  }).format(amount || 0);
  return value;
};
