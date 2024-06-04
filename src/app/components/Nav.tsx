"use client";

import { KindePermissions } from "@kinde-oss/kinde-auth-nextjs/types";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
  {
    name: "Anasayfa",
    path: "/",
    requiredPermissions: [],
  },
  {
    name: "Admin",
    path: "/admin-area",
    requiredPermissions: ["admin:dashboard"],
  },

  {
    name: "İletişim",
    path: "/",
    requiredPermissions: [],
  },
];

const Nav = ({
  isUserAuthenticated,
  permissions,
}: {
  isUserAuthenticated: boolean;
  permissions: KindePermissions | null;
}) => {
  const pathName = usePathname();
  console.log(permissions?.permissions);
  permissions?.permissions?.map((a) => console.log(a));
  return (
    <nav>
      <ul className="flex flex-col lg:flex-row gap-6">
        {links.map(({ name, path, requiredPermissions }) => {
          if (
            !requiredPermissions ||
            requiredPermissions.every((p) =>
              permissions?.permissions?.includes(p)
            )
          ) {
            return (
              <li key={name}>
                <Link
                  href={path}
                  className="font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all"
                >
                  {name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      {!isUserAuthenticated && pathName === "/dashboard" && redirect("/")}
    </nav>
  );
};

export default Nav;
