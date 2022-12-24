import { WordType } from "models/WordType";
import { cambParser } from ".";

export interface SearchWordReqType {
  word: string;
}

export interface SearchWordResType {
  wordData?: WordType[];
  wordSuggestions?: string[];
}

export const searchWord = async ({ word }: SearchWordReqType) => {
  try {
    const res = await cambParser.get("/parse-by-html", {
      params: {
        word,
      },
    });
    return res.data as SearchWordResType;
  } catch (error) {
    throw error;
  }
};
