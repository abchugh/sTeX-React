import Link from "next/link";
import { getMMTCustomId } from "@stex-react/utils";

const Home = () => {
  return (
    <div className="px-3">
      <h1 className="mb-4 text-center">{getMMTCustomId('sdsd')}</h1>

      <Link href="/donate" className="btn btn-success mt-2">
        Donate
      </Link>
    </div>
  );
};

export default Home;
