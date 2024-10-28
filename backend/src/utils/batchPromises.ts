export async function runPromisesInBatches<T>(tasks: Array<() => Promise<T>>, batchSize: number): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);

    const batchResults = await Promise.all(batch.map((task) => task()));

    results.push(...batchResults);
  }

  return results;
}
