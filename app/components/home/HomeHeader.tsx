"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "./home-content";
import styles from "./home.module.css";

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo} aria-label="Factory home">
        <span className={styles.logoMark} aria-hidden="true">
          f
        </span>
        factory<span className={styles.logoDot}>.</span>
      </a>
      <button
        ref={toggle}
        className={styles.menuToggle}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="home-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="home-navigation"
        aria-label="Main navigation"
        className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}
      >
        {navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          className={styles.headerCta}
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
