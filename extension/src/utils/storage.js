
export const saveHistory = (entry) => {
  const history = JSON.parse(localStorage.getItem("skillsnap-history") || "[]");
  history.unshift(entry);
  localStorage.setItem("skillsnap-history", JSON.stringify(history));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem("skillsnap-history") || "[]");
};

export const clearHistory = () => {
  localStorage.removeItem("skillsnap-history");
};
