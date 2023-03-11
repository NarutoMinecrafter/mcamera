const DevPath = "localhost:3000/api";
const ProdPath = "localhost:3000/api";

export const getBasePath = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://${DevPath}`;
  }
  return `http://${ProdPath}`;
};

export const wsPath = () => {
  if (process.env.NODE_ENV === "development") {
    return `ws://${DevPath}`;
  }
  return `ws://${ProdPath}`;
};
