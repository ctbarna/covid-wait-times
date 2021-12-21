import { parse } from "csv-parse/sync";

const fetchData = async (): WaitTime[] => {
  const response = await fetch(
    "https://gist.githubusercontent.com/ctbarna/98b660129b01a5a2c050f3bab78aad70/raw/1d2291be64a304bf6fce7535b6fbbdf22b3079e5/wait.csv"
  );
  const rawData = await response.text();
  const data: WaitTime[] = parse(rawData, { columns: true });
  return data;
};

export default fetchData;
