const FAIL = Symbol();
export async function asyncFilter<T>(array: T[], asyncFilterFunc): Promise<T[]> {
 return (await Promise.all(
    array
      .map(async (item) => (await asyncFilterFunc(item)) ? item : FAIL),
  )).filter((item) => item !== FAIL) as T[];
}
