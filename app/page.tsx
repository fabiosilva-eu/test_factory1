import type { Metadata } from "next";
import HomeHeader from "./components/home/HomeHeader";
import HomeSections from "./components/home/HomeSections";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Factory — Your next chapter, built with technology",
  description:
    "A fresh approach to digital products, internal platforms, and AI. Turn your next big idea into software that works for your business.",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <HomeHeader />
      <main id="main">
        <HomeSections />
      </main>
    </div>
  );
}
