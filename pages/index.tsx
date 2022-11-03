import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";
import styles from "../styles/Home.module.css";

export default function Home() {
  function sendPost(value: string) {
    console.log(value);
    let data = { content: value };
    axios
      .post("/api/sendpost", value)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://nextjs.org">Next.js with railway with postgress</a>
        </h1>
        <button onClick={() => sendPost("jakis kontent no siema siema")}>
          Siema
        </button>
        <style jsx>{`
          .posts {
            margin-top: 3vmin;
            padding: 3vmin;
            border: 2px grey solid;
          }
        `}</style>
      </main>
    </div>
  );
}
