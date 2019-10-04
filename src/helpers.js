export const checkIfArrayEquals = (arr1, arr2) => {
  for (let i = 0; i <= arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}

export const handleNewWord = async () => {
  const apiKey = "07dcb06ec7msh4bac7eab1a6edc2p18a2d1jsna30d60c1654b";

  const response = await fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    }
  });
  const data = await response.json();
  return data
}