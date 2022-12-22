import {cambParser} from "../cambParser";
import {AutocompleteSearchType} from "../../models/AutocompleteSearchType";
import {cambridgeDictionary} from "./index";

export type AutocompleteSearchQueryType = {
  query: string;
}

export const autocompleteSearch = async ({ query }: AutocompleteSearchQueryType) => {
  try {
    const res = await cambridgeDictionary.get('/autocomplete/amp', {
      params: {
        dataset: 'english',
        __amp_source_origin: 'https://dictionary.cambridge.org',
        q: query,
      }
    });
    return res.data as AutocompleteSearchType[];
  } catch (error) {
    throw error;
  }
}