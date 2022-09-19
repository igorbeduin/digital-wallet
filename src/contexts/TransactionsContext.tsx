import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuthenticationContext } from "./AuthenticationContext";
import { useHistoryDb } from "hooks/useHistoryDb";
 
interface TransactionsContextInterface {
    maxBrlValueLength: number,
    maxBtcValueLength: number,
    maxBusdValueLength: number,
    bitcoinPrice: string,
    busdPrice: string,
    buyBitcoins: (_value: string) => void | (() => void),
    buyBusd: (_value: string) => void | (() => void),
    sellBitcoins: (_value: string) => void | (() => void),
    sellBusd: (_value: string) => void | (() => void),
    exchangeBtcToBusd: (_value: string) => void | (() => void),
    exchangeBusdToBtc: (_value: string) => void | (() => void),
    negotiate: ({ transactionId , inputValue }: { transactionId: string , inputValue: string }) => void | (() => void),
  }

const initialContext: TransactionsContextInterface = {
  maxBrlValueLength: 0,
  maxBtcValueLength: 0,
  maxBusdValueLength: 0,
  bitcoinPrice: "",
  busdPrice: "",
  buyBitcoins: () => {},
  buyBusd: () => {},
  sellBitcoins: () => {},
  sellBusd: () => {},
  exchangeBtcToBusd: () => {},
  exchangeBusdToBtc: () => {},
  negotiate: () => {},
};
const TransactionsContext = createContext(initialContext);

// eslint-disable-next-line react/prop-types
export function TransactionsContextProvider({ children }: {children: React.ReactNode}) {
  const { user, updateUserWallet } = useAuthenticationContext();
  const [bitcoinPrice, setBitcoinPrice] = useState("");
  const [busdPrice, setBusdPrice] = useState("");
  const intervalTime = 10000; //10s
  const { setUserNewEntry } = useHistoryDb();

  const maxBrlValueLength = 9;
  const maxBtcValueLength = 9;
  const maxBusdValueLength = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://www.mercadobitcoin.net/api/BTC/ticker")
        .then(({ data }) => {
          setBitcoinPrice(data.ticker.last);
        })
        .catch(() => {});
      axios
        .get("https://economia.awesomeapi.com.br/all/USD-BRL")
        .then(({ data }) => {
          setBusdPrice(data["USD"].bid);
        })
        .catch(() => {});
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  function buyBitcoins(payingValue: string) {
    if (Number(payingValue) <= user.wallet.currencies["BRL"].credit) {
      const newWallet = { ...user.wallet };
      const bitcoinValue = Math.floor((Number(payingValue) / Number(bitcoinPrice)) * 100) / 100;

      newWallet.currencies["BRL"].credit =
        Number(user.wallet.currencies["BRL"].credit) - Number(payingValue);
      newWallet.currencies["BTC"].credit =
        bitcoinValue + newWallet.currencies["BTC"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "subtraction",
        value: payingValue,
        description: "BRL -> BTC",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "addition",
        value: String(bitcoinValue),
        description: "BRL -> BTC",
      });
      toast.success("Compra feita com sucesso!");
    } else {
      toast.error("Ops! Saldo insuficiente");
      throw new Error("Saldo insuficiente para operação");
    }
  }

  function buyBusd(payingValue: string) {
    if (Number(payingValue) <= user.wallet.currencies["BRL"].credit) {
      const newWallet = { ...user.wallet };
      const busdValue = Math.floor((Number(payingValue) / Number(busdPrice)) * 100) / 100;

      newWallet.currencies["BRL"].credit =
        Number(user.wallet.currencies["BRL"].credit) - Number(payingValue);
      newWallet.currencies["BUSD"].credit =
        busdValue + newWallet.currencies["BUSD"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "subtraction",
        value: payingValue,
        description: "BRL -> BUSD",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "addition",
        value: String(busdValue),
        description: "BRL -> BUSD",
      });
      toast.success("Compra feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function sellBitcoins(sellingAmount: string) {
    if (Number(sellingAmount) <= user.wallet.currencies["BTC"].credit) {
      const newWallet = { ...user.wallet };
      const receivingValue =
        Math.floor(Number(sellingAmount) * Number(bitcoinPrice) * 100) / 100;

      newWallet.currencies["BTC"].credit =
        Number(user.wallet.currencies["BTC"].credit) - Number(sellingAmount);
      newWallet.currencies["BRL"].credit =
        receivingValue + newWallet.currencies["BRL"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "addition",
        value: String(receivingValue),
        description: "BTC -> BRL",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "subtraction",
        value: sellingAmount,
        description: "BTC -> BRL",
      });
      toast.success("Venda feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function sellBusd(sellingAmount: string) {
    if (Number(sellingAmount) <= user.wallet.currencies["BUSD"].credit) {
      const newWallet = { ...user.wallet };
      const receivingValue = Math.floor(Number(sellingAmount) * Number(busdPrice) * 100) / 100;

      newWallet.currencies["BUSD"].credit =
        Number(user.wallet.currencies["BUSD"].credit) - Number(sellingAmount);
      newWallet.currencies["BRL"].credit =
        receivingValue + newWallet.currencies["BRL"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "addition",
        value: String(receivingValue),
        description: "BUSD -> BRL",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "subtraction",
        value: sellingAmount,
        description: "BUSD -> BRL",
      });
      toast.success("Venda feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function exchangeBtcToBusd(btcValue: string) {
    console.log("btcValue", btcValue);
    if (Number(btcValue) <= user.wallet.currencies["BTC"].credit) {
      const newWallet = { ...user.wallet };
      const btcToBusdPrice = Number(bitcoinPrice) / Number(busdPrice);
      const receivingValue = Math.floor(Number(btcValue) * btcToBusdPrice * 100) / 100;

      newWallet.currencies["BTC"].credit =
        Number(user.wallet.currencies["BTC"].credit) - Number(btcValue);
      newWallet.currencies["BUSD"].credit =
        receivingValue + newWallet.currencies["BUSD"].credit;
      console.log("newWallet", newWallet);
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "addition",
        value: String(receivingValue),
        description: "BTC -> BUSD",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "subtraction",
        value: btcValue,
        description: "BTC -> BUSD",
      });
      toast.success("Cambio feito com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }
  function exchangeBusdToBtc(busdValue: string) {
    if (Number(busdValue) <= user.wallet.currencies["BUSD"].credit) {
      const newWallet = { ...user.wallet };
      const busdToBtcPrice = Number(busdPrice) / Number(bitcoinPrice);
      const receivingValue = Math.floor(Number(busdValue) * busdToBtcPrice * 100) / 100;

      newWallet.currencies["BUSD"].credit =
        Number(user.wallet.currencies["BUSD"].credit) - Number(busdValue);
      newWallet.currencies["BTC"].credit =
        receivingValue + newWallet.currencies["BTC"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "addition",
        value: String(receivingValue),
        description: "BUSD -> BTC",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "subtraction",
        value: busdValue,
        description: "BUSD -> BTC",
      });
      toast.success("Cambio feito com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function negotiate({ transactionId, inputValue }: {transactionId: string, inputValue: string}) {
    switch (transactionId) {
    case "brlToBtc":
      return buyBitcoins(inputValue);
    case "btcToBrl":
      return sellBitcoins(inputValue);
    case "brlToBusd":
      return buyBusd(inputValue);
    case "busdToBrl":
      return sellBusd(inputValue);
    case "btcToBusd":
      return exchangeBtcToBusd(inputValue);
    case "busdToBtc":
      return exchangeBusdToBtc(inputValue);
    }
  }

  const contextValue = {
    maxBrlValueLength,
    maxBtcValueLength,
    maxBusdValueLength,
    bitcoinPrice,
    busdPrice,
    buyBitcoins,
    buyBusd,
    sellBitcoins,
    sellBusd,
    exchangeBtcToBusd,
    exchangeBusdToBtc,
    negotiate,
  };

  return (
    <>
      <TransactionsContext.Provider value={contextValue}>
        {children}
      </TransactionsContext.Provider>
    </>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
