export function useWalletsDb() {
  function initializeUserWallet({ userId }) {
    const wallets = JSON.parse(localStorage.getItem("wallets"));

    wallets[userId] = {
      credit: 100000000,
      currency: "R$",
      cryptoCurrencies: {
        bitcoins: {
          credit: 0,
        },
        busd: {
          credit: 0,
        },
      },
    };
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  return { initializeUserWallet };
}
