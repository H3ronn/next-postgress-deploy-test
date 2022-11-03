import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import prisma from "../lib/prisma";
import styles from "../styles/Home.module.css";
import type Prisma from "@prisma/client";

type HomeProps = {
  posts: Prisma.Post[];
};

export default function Home({ posts }: HomeProps) {
  console.log(posts);
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
        {posts.map((post) => (
          <div className="posts" key={post.id}>
            <div>{post.id}</div>
            <div>{post.authorId}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.published}</div>
          </div>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const posts2 = await prisma.post.findMany({
    where: { published: true },
  });
  const posts3 = await prisma.post.findMany();
  return {
    props: { posts, posts2, posts3 },
  };
};
