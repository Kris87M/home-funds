export const formatToTwoDecimalPlaces = (value) => {
  if (value % 1 === 0) {
    return value.toString();
  } else {
    return value.toFixed(2);
  }
};