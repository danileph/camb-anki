import { ankiQuery } from "./ankiQuery"

export const getModelFieldNames = async (modelName: string) => {
  try {
    const res = await ankiQuery<{modelName: string}, string[]>({
      action: 'modelFieldNames',
      version: 6,
      params: {
        modelName
      }
    });
    if (res.error) throw new Error(res.error);
    return res.result;

  } catch (error) {
    throw error;
  }
}