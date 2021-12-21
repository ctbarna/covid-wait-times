import Link from "next/link";
import slugify from "../utils/slugify";

const Table = ({ locations }: { locations: WaitTime[] }) => {
  return (
    <table className="table-auto w-full">
      <thead className="font-bold bg-slate-300 border-b border-b-black">
        <td className="p-2">Location</td>
        <td className="p-2">Wait Time</td>
        <td className="p-2">Last Reported</td>
        <td className="p-2">Borough</td>
        <td className="p-2 hidden md:table-cell">Address</td>
      </thead>
      <tbody>
        {locations.map((location, i) => (
          <tr key={location.fullname}>
            <td className="p-2">
              <Link href={`/location/${slugify(location.location)}`} passHref>
                <a className="font-bold text-blue-600 hover:text-blue-500">
                  {location.fullname}
                </a>
              </Link>
            </td>
            <td className="p-2">{location.wait_time}</td>
            <td className="p-2">{location.last_reported}</td>
            <td className="p-2">
              <Link href={`/borough/${slugify(location.borough)}`} passHref>
                <a className="text-blue-600 hover:text-blue-500 underline">
                  {location.borough}
                </a>
              </Link>
            </td>
            <td className="p-2 hidden md:table-cell">{location.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
