const postData = async (url: string, data: {}): Promise<void> => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getCards = async (url: string) => {
  const result = await fetch(url);

  if (!result.ok)
    throw new Error(`could not fetch ${url}, status: ${result.status}`); //result.status - возвращает номер ошибки
  return await result.json();
};

export { postData, getCards };
