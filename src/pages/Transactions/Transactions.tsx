import React, { useState, useEffect } from "react";
import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { useHistoryDb } from "hooks/useHistoryDb";
import { TransactionsTable } from "components/TransactionsTable";

export function Transactions() {
  const { getUserHistory } = useHistoryDb();
  const [userHistory, setUserHistory] = useState({});
  const { user } = useAuthenticationContext();

  useEffect(() => {
    const history = getUserHistory({userId: user.username});
    setUserHistory(history);
  }, []);

  interface HistoryEntryInterface {
    date: string
    description: string
    value: string
    operation: string
  }

  return (
    <div className="h-fit">
      <p className="text-2xl mb-1 text-gray-800 font-semibold">Histórico de transações</p>
      <p className="text-sm mb-1 text-gray-800">Aqui você pode navegar em seus extratos.</p>
      <p className="text-sm mb-1 text-gray-800">As transações de cada moeda estão separadas em tabelas diferentes.</p>
      <p className="text-sm mb-4 text-gray-800">É possível filtrar cada tabela por tipo de transação.</p>
      {Object.entries(userHistory).map((entry) => {
        const currencyId: string = entry[0];
        const values = entry[1] as Array<HistoryEntryInterface>;
        return(
          <TransactionsTable
            key={`${currencyId}-transactions-table`}
            title={currencyId}
            values={values}
          />
        );
      })}
    </div>
  );
}
