export const makeAsync =
    <T>(p: Promise<T>) => p.then(res => [null, res] as [Error | null, T]).catch((err: Error) => [err]);
