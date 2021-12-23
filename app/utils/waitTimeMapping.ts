// I'm not 100% sure why but there is a circular import issue when this constant
// is included in fetchData.
const waitTimeMapping = {
  "No Wait Time": 0,
  "0-30 Minutes": 1,
  "30-60 Minutes": 2,
  "1-1.5 Hours": 3,
  "1.5-2 Hours": 4,
  "More Than 2 Hours": 5,
  "Not Reported Yet": 6,
};

export default waitTimeMapping;
