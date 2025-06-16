export const createRestaurentid = () => {
  const val = Math.floor(Math.random() * 9999);
  const restaurentId = "ResID";

  return restaurentId + val.toString();
};


