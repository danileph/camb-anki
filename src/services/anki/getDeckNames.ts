import { ankiQuery } from "./ankiQuery"

export const getDeckNames = async () => {
  try {
    const res = await ankiQuery<void, string[]>({
      action: 'deckNames',
      version: 6,
    });
    if (res.error) throw new Error(res.error);
    return res.result;

  } catch (error) {
    throw error;
  }
}