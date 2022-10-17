import { WordType } from "models/WordType";
import { cambParser } from ".";

export interface SearchWordType {
  word: string;
}

export const searchWord = async ({ word }: SearchWordType) => {
  try {
    const res = await cambParser.get('/parse-by-html', {
      params: {
        word
      }
    });
    return res.data as WordType[];
  } catch (error) {
    throw error;
  }
}