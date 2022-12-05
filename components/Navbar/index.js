import Link from "next/link";

const Navbar = () => (
  <nav className="w-full flex justify-center shadow-lg">
    <div className="w-full max-w-[1440px] flex justify-between items-center p-4">
      <div>
        <p className="font-bold">BooKantin</p>
      </div>
      <div className="flex gap-x-4">
        {/* use Link and a to redirect to /login */}
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
