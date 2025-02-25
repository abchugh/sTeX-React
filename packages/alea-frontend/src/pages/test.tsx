import { MyCompo } from "@/components/MyCompo";
import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { SomeCompo } from "@stex-react/stex-react-renderer";
import { getMMTCustomId } from "../../../utils/src/index.ts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyCompo />
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        {getMMTCustomId("sdds")}
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <SomeCompo />
        </main>
      </div>
    </>
  );
}
