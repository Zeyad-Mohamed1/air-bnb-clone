import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import UserNav from "./UserNav";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Airbnb Logo"
            className="w-32 hidden lg:block"
          />
          <Image
            src={MobileLogo}
            alt="Airbnb Logo"
            className="w-12 block lg:hidden"
          />
        </Link>

        <Searchbar />

        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
