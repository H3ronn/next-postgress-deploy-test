import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Post from "../components/Post";
import prisma from "../lib/prisma";
import type Prisma from "@prisma/client";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  let drafts = null;
  if (session.user) {
    drafts = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        // published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  }
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: Prisma.Post[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <Link key={post.id} href={`/p/${post.id}`}>
              <div className="post">
                <Post post={post} />
              </div>
            </Link>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
          margin: 20px 0;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Drafts;
