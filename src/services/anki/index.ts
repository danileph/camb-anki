import axios from "axios";

export const anki = axios.create({
  baseURL: 'http://127.0.0.1:8765'
});
