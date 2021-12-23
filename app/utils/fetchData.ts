import { parse } from "csv-parse/sync";

export const waitTimeMapping = {
  "No Wait Time": 0,
  "0-30 Minutes": 1,
  "30-60 Minutes": 2,
  "1-1.5 Hours": 3,
  "1.5-2 Hours": 4,
  "More Than 2 Hours": 5,
  "Not Reported Yet": 6,
};

const fetchData = async (): Promise<WaitTime[]> => {
  const response = await fetch(
    "https://gist.githubusercontent.com/ctbarna/98b660129b01a5a2c050f3bab78aad70/raw/wait.csv"
    // "https://gist.githubusercontent.com/ctbarna/98b660129b01a5a2c050f3bab78aad70/raw/1d2291be64a304bf6fce7535b6fbbdf22b3079e5/wait.csv"
  );
  const rawData = await response.text();
  const data: WaitTime[] = parse(rawData, {
    columns: true,
    onRecord: (record: WaitTime) => {
      const cleanedWaitTime = record.wait_time.replace(
        /\*/g,
        ""
      ) as WaitTimeValues;
      record.ordinal_wait_time = waitTimeMapping[cleanedWaitTime] || 6;
      return record;
    },
  });
  return data;
};

export default fetchData;
