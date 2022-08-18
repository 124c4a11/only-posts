import axios from "axios";
import type { NextPage } from "next";
import { useFilters } from "../hooks/useFilters";

import styles from "../styles/Home.module.css";
import { IPost } from "../types/IPost";

interface HomeProps {
  posts: IPost[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { result } = useFilters(posts, {
    sort: "ASC",
    filter: { name: "", value: "" },
  });

  return (
    <div className={styles.container}>
      {result.length ? (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {result.map(({ id, title, description }) => (
            <li key={id}>
              <h2>
                {id}. {title}
              </h2>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>List is empty!</h2>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const posts = await axios.get<IPost[]>(`${process.env.API_HOST}/posts`);

  return {
    props: { posts: posts.data }, // will be passed to the page component as props
  };
}

export default Home;
