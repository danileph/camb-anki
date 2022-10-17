import { useState } from "react";
import { FunctionLike, FunctionLikeDeclaration } from "typescript";

export const useAxios = <ArgsT extends {}, ReturnT>(request: (args: ArgsT) => Promise<ReturnT>) => {
  type requestReturnedType = ReturnType<typeof request>;
  type requestArgsType = Parameters<typeof request>;

  const [data, setData] = useState<ReturnT | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const withProcessingRequest = async (args: ArgsT) => {
    let data: ReturnT | undefined;
    setData(undefined);
    setError(undefined);
    setLoading(true);
    await request(args)
    .then((res) => {
      setData(res);
      data = res;
    })
    .catch((error) => {
      setError(error);
    })
    // try {
    //   data = request(...args);
    //   setData(data);
    // } catch (error) {
    //   setError(error as Error);
    // }
    setLoading(false);
    return data;
  }

  return (
    [
      withProcessingRequest, 
      {data, loading, error}
    ] as [(args: ArgsT) => Promise<ReturnT>, {data: ReturnT | undefined, loading: boolean, error: Error | undefined}]
  );
}



