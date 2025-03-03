export const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nie udało się pobrać danych z: ${url}`);
  }
  return response.json();
};

export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Nie udało się dodać danych do: ${url}`);
  }
  return response.json();
};

export const putData = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Nie udało się zaktualizować danych w: ${url}`);
  }
  return response.json();
};

export const deleteData = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Nie udało się usunąć danych z: ${url}`);
  }
  return response.json();
};
