function persistData(data) {
  const persistData = JSON.stringify({
    data
  });
  localStorage.setItem("myToDoHistoric", persistData);
}

function getData() {
  const serializedData = localStorage.getItem("myToDoHistoric");
  if (!serializedData) {
    return [];
  }
  const { data } = JSON.parse(serializedData);
  return data;
}

const persistList = { persistData, getData }
export default persistList;
