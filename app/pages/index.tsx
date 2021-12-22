import type { GetServerSideProps, NextPage } from "next";
import Header from "../components/Header";
import Table from "../components/Table";
import LocationStore from "../components/LocationStore";
import fetchData from "../utils/fetchData";
import Head from "next/head";

type Props = {
  locations: WaitTime[];
};

const Home: NextPage<Props> = ({ locations }) => {
  return (
    <LocationStore initialLocations={locations}>
      <Head>
        <title>How long is the COVID testing line in NYC?</title>
        <meta
          name="og:title"
          content="How long is the COVID testing line in NYC?"
        />
        <meta
          name="description"
          content="Live updates on the wait time for New York's public COVID testing sites."
        />
        <meta
          name="og:description"
          content="Live updates on the wait time for New York's public COVID testing sites."
        />
      </Head>
      <Header>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          COVID Testing Wait Times
        </h1>
        <p>NYC H&amp;H Testing wait times</p>
      </Header>
      <div className="mt-4 md:mt-8">
        <Table />
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

export default Home;
