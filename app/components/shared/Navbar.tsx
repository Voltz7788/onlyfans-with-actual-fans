"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import demoImage from "../../../public/yannis-image-demo.jpg";
import DesktopNav from "./navbar-parts/DesktopNav";
import MobileNav from "./navbar-parts/MobileNav";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type NavbarProps = {
  session: Session | null;
};

export default function Navbar({ session }: NavbarProps) {
  const loggedIn = true;

  const pathname = usePathname();

  const linkStyles =
    "flex items-center gap-5 font-medium max-w-[250px] lg:w-full rounded-full p-2 xl:py-2 xl:px-3 mt-3 hover:text-onlyfans-blue hover:bg-sky-50 focus:text-onlyfans-blue focus:bg-sky-50 focus:outline-onlyfans-blue transition-colors duration-100";

  return (
    <>
      <DesktopNav
        linkStyles={linkStyles}
        profilePic={session?.user?.image || demoImage}
        pathname={pathname}
      />
      <MobileNav
        linkStyles={linkStyles}
        profilePic={session?.user?.image || demoImage}
        pathname={pathname}
      />
    </>
  );
}
