import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const socials = [
  { icon: <FaYoutube />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaFacebook />, href: "#" },
];

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import Dropdown from "./Dropdown";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

const Header = async () => {
  const { isAuthenticated, getUser, getPermissions, getRoles } =
    getKindeServerSession();
  const permissions = await getPermissions();
  const roles = await getRoles();
  console.log(permissions);
  console.log(roles);
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex items-center gap-5 justify-center xl:w-max">
            <Link href="/">
              <Image
                src="/assets/logo-yeni.png"
                width={160}
                height={160}
                alt=""
              />
            </Link>
            <div className="w-[1px] h-[40px] bg-gray-300"></div>
            <div className="flex gap-2">
              {socials.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className="bg-accent text-white hover:bg-[#455FB5] text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all"
                  >
                    {item.icon}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between px-5 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0 gap-8 xl:w-max">
            <div className="flex items-center gap-2 xl:order-2">
              {isUserAuthenticated ? (
                <Dropdown user={user} />
              ) : (
                <div className="flex gap-2">
                  <LoginLink>
                    <Button variant="primary">Giriş</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button>Kayıt ol</Button>
                  </RegisterLink>
                </div>
              )}
            </div>

            {/* mobile menu */}
            <div className="xl:hidden">
              <MobileNav />
            </div>

            {/* desktop menu */}
            <div className="hidden xl:flex">
              <Nav
                isUserAuthenticated={isUserAuthenticated}
                permissions={permissions}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
