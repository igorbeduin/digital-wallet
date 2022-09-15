import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useAuthenticationContext } from "./AuthenticationContext";
import { useHistoryDb } from "hooks/useHistoryDb";

const TransactionContext = createContext({});

// eslint-disable-next-line react/prop-types
export function TransactionContextProvider({ children }) {
  const { user, updateUserWallet } = useAuthenticationContext();
  const [bitcoinPrice, setBitcoinPrice] = useState("");
  const [busdPrice, setBusdPrice] = useState("");
  const intervalTime = 10000;
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

  function buyBitcoins(payingValue) {
    if (Number(payingValue) <= user.wallet.currencies["BRL"].credit) {
      const newWallet = { ...user.wallet };
      const bitcoinValue = Math.floor((payingValue / bitcoinPrice) * 100) / 100;

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
        description: "Compra de bitcoins",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "addition",
        value: bitcoinValue,
        description: "Compra de bitcoins",
      });
      toast.success("Compra feita com sucesso!");
    } else {
      toast.error("Ops! Saldo insuficiente");
      throw new Error("Saldo insuficiente para operação");
    }
  }

  function buyBusd(payingValue) {
    if (Number(payingValue) <= user.wallet.currencies["BRL"].credit) {
      const newWallet = { ...user.wallet };
      const busdValue = Math.floor((payingValue / busdPrice) * 100) / 100;

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
        description: "Compra de busd",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "addition",
        value: busdValue,
        description: "Compra de busd",
      });
      toast.success("Compra feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function sellBitcoins(sellingAmount) {
    if (Number(sellingAmount) <= user.wallet.currencies["BTC"].credit) {
      const newWallet = { ...user.wallet };
      const receivingValue =
        Math.floor(sellingAmount * bitcoinPrice * 100) / 100;

      newWallet.currencies["BTC"].credit =
        Number(user.wallet.currencies["BTC"].credit) - Number(sellingAmount);
      newWallet.currencies["BRL"].credit =
        receivingValue + newWallet.currencies["BRL"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "addition",
        value: receivingValue,
        description: "Venda de bitcoins",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "subtraction",
        value: sellingAmount,
        description: "Venda de bitcoins",
      });
      toast.success("Venda feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function sellBusd(sellingAmount) {
    if (Number(sellingAmount) <= user.wallet.currencies["BUSD"].credit) {
      const newWallet = { ...user.wallet };
      const receivingValue = Math.floor(sellingAmount * busdPrice * 100) / 100;

      newWallet.currencies["BUSD"].credit =
        Number(user.wallet.currencies["BUSD"].credit) - Number(sellingAmount);
      newWallet.currencies["BRL"].credit =
        receivingValue + newWallet.currencies["BRL"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BRL",
        operation: "addition",
        value: receivingValue,
        description: "Venda de busd",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "subtraction",
        value: sellingAmount,
        description: "Venda de busd",
      });
      toast.success("Venda feita com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function exchangeBtcToBusd(btcValue) {
    console.log("btcValue", btcValue);
    if (Number(btcValue) <= user.wallet.currencies["BTC"].credit) {
      const newWallet = { ...user.wallet };
      const btcToBusdPrice = bitcoinPrice / busdPrice;
      const receivingValue = Math.floor(btcValue * btcToBusdPrice * 100) / 100;

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
        value: receivingValue,
        description: "Cambio de bitcoin para busd",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "subtraction",
        value: btcValue,
        description: "Cambio de bitcoin para busd",
      });
      toast.success("Cambio feito com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }
  function exchangeBusdToBtc(busdValue) {
    if (Number(busdValue) <= user.wallet.currencies["BUSD"].credit) {
      const newWallet = { ...user.wallet };
      const busdToBtcPrice = busdPrice / bitcoinPrice;
      const receivingValue = Math.floor(busdValue * busdToBtcPrice * 100) / 100;

      newWallet.currencies["BUSD"].credit =
        Number(user.wallet.currencies["BUSD"].credit) - Number(busdValue);
      newWallet.currencies["BTC"].credit =
        receivingValue + newWallet.currencies["BTC"].credit;
      updateUserWallet(newWallet);
      setUserNewEntry({
        userId: user.username,
        currency: "BTC",
        operation: "addition",
        value: receivingValue,
        description: "Cambio de busd para bitcoin",
      });
      setUserNewEntry({
        userId: user.username,
        currency: "BUSD",
        operation: "subtraction",
        value: busdValue,
        description: "Cambio de busd para bitcoin",
      });
      toast.success("Cambio feito com sucesso!");
    } else toast.error("Ops! Saldo insuficiente");
  }

  function negotiate({ transactionId, inputValue }) {
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
      <TransactionContext.Provider value={contextValue}>
        {children}
      </TransactionContext.Provider>
    </>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}