import React, { useState, useEffect } from "react";
import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { useHistoryDb } from "hooks/useHistoryDb";
import { TransactionsTable } from "components/TransactionsTable";

export function Transactions() {
  const { getUserHistory } = useHistoryDb();
  const [userHistory, setUserHistory] = useState({});
  const { user } = useAuthenticationContext();

  useEffect(() => {
    const history = getUserHistory(user.username);
    setUserHistory(history);
  }, []);

  console.log("userHistory", userHistory);

  return (
    <div className="h-fit">
      {Object.entries(userHistory).map(([key, values]) => (
        <TransactionsTable
          key={`${key}-transactions-table`}
          title={key}
          values={values}
        />
      ))}
    </div>
  );
}
