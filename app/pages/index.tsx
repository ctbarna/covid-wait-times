import { useContext } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Table from "../components/Table";
import LocationStore, { LocationContext } from "../components/LocationStore";
import fetchData from "../utils/fetchData";
import Head from "next/head";

type Props = {
  locations: WaitTime[];
};

const FilteredTable = () => {
  const { selector } = useContext(LocationContext);
  const locations = selector((state) => {
    const search = state.search.toLowerCase();
    return state.locations.filter(
      (location) =>
        location.fullname.toLowerCase().includes(search) ||
        location.address.toLowerCase().includes(search) ||
        location.borough.toLowerCase().includes(search)
    );
  });

  return <Table locations={locations} />;
};

const Home: NextPage<Props> = ({ locations }) => {
  return (
    <LocationStore initialLocations={locations}>
      <Head>
        <title>NYC COVID Testing Wait Time</title>
      </Head>
      <Header>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          COVID Testing Wait Times
        </h1>
        <p>NYC H&amp;H Testing wait times</p>
      </Header>
      <div className="mt-4 md:mt-8">
        <FilteredTable />
      </div>
    </LocationStore>
  );
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  return {
    props: { locations: await fetchData() },
  };
}

export default Home;
