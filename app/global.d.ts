type WaitTimeValues =
  | "No Wait Time"
  | "0-30 Minutes"
  | "30-60 Minutes"
  | "1-1.5 Hours"
  | "1.5-2 Hours"
  | "More Than 2 Hours"
  | "Not Reported Yet";

declare interface WaitTime {
  fullname: string;
  ordinal_wait_time: number;
  wait_time: WaitTimeValues | `${WaitTimeValues}*`;
  last_reported: string;
  address: string;
  borough: string;
  location: string;
}
