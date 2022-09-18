export interface WalletInterface {
  currencies: {
    [currencyId: string]: {
      name: string
      id: string
      credit: number
    }
  }
}
export interface WalletCollectionInterface {
  [userId: string]: WalletInterface
}

const wallets: WalletCollectionInterface = {
  admin: {
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
  },
};

export default wallets;
