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
      {Object.entries(userHistory).map((entry) => {
        const title: string = entry[0];
        const values = entry[1] as Array<HistoryEntryInterface>;
        return(
          <TransactionsTable
            key={`${title}-transactions-table`}
            title={title}
            values={values}
          />
        );})}
    </div>
  );
}
