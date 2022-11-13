import { AnkiField } from "models/AnkiField";
import { ankiQuery } from "./ankiQuery"

interface AssetParams {
  url: string,
  filename: string,
  skipHash: string,
  fields: string[],
}

interface AddNoteParams {
  note: {
    deckName: string,
    modelName: string,
    fields: object,
    options?: {
      allowDuplicate?: boolean,
      duplicateScope?: string,
      duplicateScopeOptions?: {
        deckName?: string,
        checkChildren?: boolean,
        checkAllModels?: boolean,
      }
    },
    tags?: string[],
    audio?: AssetParams[],
    video?: AssetParams[],
    picture?: AssetParams[],
  }
}

export const addNote = async (params: AddNoteParams) => {
  try {
    const res = await ankiQuery<AddNoteParams, string>({
      action: 'addNote',
      version: 6,
      params,
    });
    if (res.error) throw new Error(res.error);
    return res.result;

  } catch (error) {
    throw error;
  }
}