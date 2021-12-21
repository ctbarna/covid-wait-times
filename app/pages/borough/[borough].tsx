import Link from "next/link";
import Header from "../../components/Header";
import LocationStore, { LocationContext } from "../../components/LocationStore";
import Table from "../../components/Table";
import fetchData from "../../utils/fetchData";
import slugify from "../../utils/slugify";

const Borough = ({
  locations,
  borough,
}: {
  locations: WaitTime[];
  borough: string;
}) => {
  return (
    <LocationStore initialLocations={locations}>
      <Link href="/" passHref>
        <a className="underline text-blue-600 hover:text-blue-500 mb-2">Home</a>
      </Link>
      <Header>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          COVID Testing Wait Time in {borough}
        </h1>
      </Header>
      <div className="mt-4 md:mt-8">
        <Table locations={locations} />
      </div>
    </LocationStore>
  );
};

export async function getServerSideProps({
  query: { borough },
}: {
  query: { borough: string };
}) {
  const data = await fetchData();

  const dataByBorough = data.filter(({ borough: b }) => slugify(b) === borough);

  if (!dataByBorough.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { locations: dataByBorough, borough: dataByBorough[0].borough },
  };
}

export default Borough;
