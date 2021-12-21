import Link from "next/link";
import slugify from "../utils/slugify";

const Table = ({ locations }: { locations: WaitTime[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm">
        <thead className="font-bold bg-slate-300 border-b border-b-black">
          <td className="p-2">Location</td>
          <td className="p-2">Wait Time</td>
          <td className="p-2">Last Reported</td>
          <td className="p-2">Borough</td>
          <td className="p-2">Address</td>
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
              <td className="p-2">{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
