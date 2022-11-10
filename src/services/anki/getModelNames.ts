import { ankiQuery } from "./ankiQuery"


export const getModelNames = async () => {
  try {
    console.log('getModelNames has been invoked!')
    const res = await ankiQuery<void, string[]>({
      action: 'modelNames',
      version: 6,
    });
    if (res.error) throw new Error(res.error);
    return res.result;

  } catch (error) {
    throw error;
  }
}