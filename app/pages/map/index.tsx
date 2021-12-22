import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Map from "../../components/Map";
import LocationStore from "../../components/LocationStore";
import fetchData from "../../utils/fetchData";

type Props = {
  locations: WaitTime[];
};

const SiteMap: NextPage<Props> = ({ locations }) => {
  return (
    <LocationStore initialLocations={locations}>
      <Head>
        <title>Where are nyc testing sites?</title>
        <meta name="og:title" content={`Where are nyc testing sites?`} />
        <meta
          name="og:description"
          content={`Map of NYC's public COVID testing sites.`}
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Link href="/" passHref>
        <a className="underline text-blue-600 hover:text-blue-500 mb-2">Home</a>
      </Link>
      <Header>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Map of City-Run Testing Locations
        </h1>
        <p>
          NYC H&H Testing locations that include wait times. This list is not
          exhaustive; there are more locations listed without wait times. Check{" "}
          <a
            className="underline text-blue-600 hover:text-blue-500"
            href="https://www.nychealthandhospitals.org/covid-19-testing-sites/"
            target="_blank"
            rel="noreferrer"
          >
            the NYC H&H testing sites webpage
          </a>{" "}
          for more details.
        </p>
      </Header>
      <div className="mt-4 md:mt-8">
        <Map />
      </div>
    </LocationStore>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await fetchData();

  return {
    props: { locations: data },
  };
};

export default SiteMap;
