export const formatBalance = (balance: number, options: Intl.NumberFormatOptions = {}) => {
  return balance.toLocaleString('en-US', options);
};
