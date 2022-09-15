export function useHistoryDb() {
  function initializeUserHistory({ userId }) {
    const history = JSON.parse(localStorage.getItem("history"));
    history[userId] = {
      BRL: [],
      BTC: [],
      BUSD: [],
    };
    localStorage.setItem("history", JSON.stringify(history));
  }

  function getUserHistory(userId) {
    const history = JSON.parse(localStorage.getItem("history"));
    return history[userId];
  }

  function setUserNewEntry({
    userId,
    currency,
    operation,
    value,
    description,
  }) {
    console.log("input", {
      userId,
      currency,
      operation,
      value,
      description,
    });
    const history = JSON.parse(localStorage.getItem("history"));
    history[userId][currency] = [
      ...history[userId][currency],
      {
        operation,
        value,
        description: description || "",
        date: new Date().toISOString(),
      },
    ];
    localStorage.setItem("history", JSON.stringify(history));
  }
  return { initializeUserHistory, getUserHistory, setUserNewEntry };
}
