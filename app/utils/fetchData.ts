import { parse } from "csv-parse/sync";
import waitTimeMapping from "./waitTimeMapping";

const fetchData = async (): Promise<WaitTime[]> => {
  const response = await fetch(
    "https://gist.githubusercontent.com/ctbarna/98b660129b01a5a2c050f3bab78aad70/raw/wait.csv"
    // "https://gist.githubusercontent.com/ctbarna/98b660129b01a5a2c050f3bab78aad70/raw/eb76b870932e56e2b95e963c561f55acfb7b0d1e/wait.csv"
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
