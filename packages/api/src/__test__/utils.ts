export const getError = async <TResult, TError>(
  call: () => TResult | Promise<TResult>,
): Promise<TResult | TError> => {
  try {
    return await call();
  } catch (error: unknown) {
    return error as TError;
  }
};
