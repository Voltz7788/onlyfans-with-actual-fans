import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import Navbar from "../components/shared/Navbar";
import { auth } from "../utilities/getServerSessionHelper";
import "react-tooltip/dist/react-tooltip.css";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "OnlyFans (not really)",
  description:
    "This project is a full-stack website that allows users to create accounts and subscribe to creators so they can access photos and videos of fans (the type you would use to cool yourself down on a hot summers day ☀️).",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex">
      <Navbar session={session} />
      {children}
    </div>
  );
}
