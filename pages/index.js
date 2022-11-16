import Head from "next/head";
import styles from "../styles/Home.module.css";
import ContainerBlock from "../components/ContainerBlock";
import FavouriteProjects from "../components/FavouriteProjects";
import LatestCode from "../components/LatestCode";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import { useEffect } from "react";

export default function Home({ repositories }) {
  useEffect(() => {
    fetch("https://uatapi.getinvoice.net/eTax/api/process?key=U0XmmGB5VA7GFk4PbdkpniTXFH5uSW4okXeNm7N4")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      );
  },[]);
  return (
    <ContainerBlock
      title="Guy Thongtrachoo - Web Dev, App Dev, Backend"
      description="Meticulous self-taught programmer."
    >
      <Hero />
      <FavouriteProjects />
      <LatestCode repositories={repositories} />
      {/* <div></div> */}
    </ContainerBlock>
  );
}

export const getServerSideProps = async () => {
  console.log("sdsd", process.env.GITHUB_AUTH_TOKEN);
  let token = process.env.GITHUB_AUTH_TOKEN;

  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
    },
  };
};
