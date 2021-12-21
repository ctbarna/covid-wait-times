import Head from "next/head";
import Link from "next/link";
import slugify from "../../utils/slugify";
import fetchData from "../../utils/fetchData";

const Location = ({ location }: { location: WaitTime }) => {
  return (
    <>
      <Head>
        <title>
          How long is the COVID testing wait time at {location.fullname}?
        </title>
      </Head>
      <Link href="/" passHref>
        <a className="underline text-blue-600 hover:text-blue-500 mb-2">Home</a>
      </Link>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        {location.fullname}
      </h1>
      <dl className="mt-4">
        <dt className="font-bold mt-2">Address:</dt>
        <dd>{location.address}</dd>
        <dt className="font-bold mt-2">Borough:</dt>
        <dd>
          <Link href={`/borough/${slugify(location.borough)}`}>
            <a className="text-blue-600 hover:text-blue-500 underline">
              {location.borough}
            </a>
          </Link>
        </dd>
        <dt className="font-bold mt-2">Wait Time:</dt>
        <dd>{location.wait_time}</dd>
        {location.wait_time !== "Not Reported Yet" && (
          <>
            <dt className="font-bold mt-2">Last Reported:</dt>
            <dd>{location.last_reported}</dd>
          </>
        )}
      </dl>
    </>
  );
};

export default Location;

export async function getServerSideProps({
  query,
}: {
  query: { location: string };
}) {
  const { location: queryLocation } = query;

  const data = await fetchData();
  const location = data.find(
    (location) => slugify(location.location) === slugify(queryLocation)
  );

  if (!location) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      location,
    },
  };
}
