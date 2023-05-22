export const getAllProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  const data = await response.json();
  return data;
};
