import axios from "axios";

export const cambridgeDictionary = axios.create({
  baseURL: 'https://dictionary.cambridge.org'
});
