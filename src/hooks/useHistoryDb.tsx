export function useHistoryDb() {

  interface UserNewEntryInterface {
    userId: string,
    currency: string,
    operation: string,
    value: string,
    description: string,
  }
  function initializeUserHistory({ userId }: {userId: string}) {
    const history = JSON.parse(localStorage.getItem("history") || "{}");
    history[userId] = {
      BRL: [],
      BTC: [],
      BUSD: [],
    };
    localStorage.setItem("history", JSON.stringify(history));
  }

  function getUserHistory({userId}: {userId: string}) {
    const history = JSON.parse(localStorage.getItem("history") || "{}");
    return history[userId];
  }

  function setUserNewEntry({
    userId,
    currency,
    operation,
    value,
    description,
  }: UserNewEntryInterface) {
    console.log("input", {
      userId,
      currency,
      operation,
      value,
      description,
    });
    const history = JSON.parse(localStorage.getItem("history") || "{}");
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
