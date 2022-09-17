import { WalletCollectionInterface, WalletInterface } from "consts/wallets";

export function useWalletsDb() {
  function initializeUserWallet({ userId }: {userId: string}) {
    const wallets: WalletCollectionInterface = JSON.parse(localStorage.getItem("wallets") || "{}");

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

  function getUserWallet({userId}: {userId: string}) {
    const wallets: WalletCollectionInterface = JSON.parse(localStorage.getItem("wallets") || "{}");
    return wallets[userId];
  }

  function setUserWallet({ userId, newWallet }: { userId: string, newWallet: WalletInterface }) {
    const wallets: WalletCollectionInterface = JSON.parse(localStorage.getItem("wallets") || "{}");
    wallets[userId] = newWallet;
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  return { initializeUserWallet, getUserWallet, setUserWallet };
}
