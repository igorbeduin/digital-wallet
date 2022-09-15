export function useWalletsDb() {
  function initializeUserWallet({ userId }) {
    const wallets = JSON.parse(localStorage.getItem("wallets"));

    wallets[userId] = {
      currencies: {
        BRL: {
          name: "real",
          id: "BRL",
          credit: 100000,
        },
        BTC: {
          name: "bitcoin",
          id: "BTC",
          credit: 0,
        },
        BUSD: {
          name: "binance usd",
          id: "BUSD",
          credit: 0,
        },
      },
    };
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  function getUserWallet(userId) {
    const wallets = JSON.parse(localStorage.getItem("wallets"));
    return wallets[userId];
  }

  function setUserWallet({ userId, newWallet }) {
    const wallets = JSON.parse(localStorage.getItem("wallets"));
    wallets[userId] = newWallet;
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  return { initializeUserWallet, getUserWallet, setUserWallet };
}
