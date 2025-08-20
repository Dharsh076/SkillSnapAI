export const saveHistory = (data) => {
  localStorage.setItem("skill_snap_history", JSON.stringify(data));
};

export const getHistory = () => {
  const data = localStorage.getItem("skill_snap_history");
  return data ? JSON.parse(data) : [];
};

export const clearHistory = () => {
  localStorage.removeItem("skill_snap_history");
};