import { anki } from ".";

export interface AnkiQueryReqType<T> {
  action: string,
  version: number,
  params?: T,
}

export interface AnkiQueryResType<T> {
  result: T | undefined,
  error: string | undefined,
}

export const ankiQuery = async <TReq extends (object | void), TRes>(body: AnkiQueryReqType<TReq>) => {
  try {
    const { data } = await anki.post<AnkiQueryResType<TRes>>('', body);
    return data;

  } catch (error) {
    console.error(error);
    throw error
  }
}