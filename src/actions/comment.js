const snap = navigator.userAgent === "ReactSnap";

export const getData = (type, page) => dispatch => {
  if (snap) return;
  fetch(`/api/${type}?page=${page}`)
    .then(res => res.json())
    .then(data => {
      dispatch(receiveData(`${type.toUpperCase()}_LIST`, data));
    });
};

export const getItem = id => dispatch => {
  if (snap) return;
  fetch(`/api/item/${id}`)
    .then(res => res.json())
    .then(data => {
      dispatch(receiveData("STORY", data));
    });
};

const receiveData = (type, data) => {
  return {
    type,
    data
  };
};
