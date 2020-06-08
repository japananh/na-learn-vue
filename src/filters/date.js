// Create global filters
export default value => {
  const date = new Date(value);
  return date.toLocaleString(["en-Us"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
