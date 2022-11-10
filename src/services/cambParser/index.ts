import axios from "axios"
export { searchWord } from "./searchWord";

export const cambParser = axios.create({
  baseURL: 'http://camp-parser.somee.com/v1/parser'
});
