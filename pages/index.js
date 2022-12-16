import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";
//import styles from "../styles/Home.module.css";
import { strapiImage } from "../lib/utils/miscellaneous";
import React, { useEffect, useContext, useState } from "react";

const Home = ({ posts, categories, homepage }) => {
  const [userData, setUserData] = useState();


  const getUserData = () => {
    return axios
      .get("/api/auth/user", {})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Layout categories={categories} userData={userData}></Layout>
      <div className="page-content bg-white">
        <div className="section-area section-sp1 ovpr-dark bg-fix online-cours">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-white">
                <h2>
                  {homepage.attributes.HeadingSpan1}{" "}
                  {homepage.attributes.HeadingSpan2}
                  {homepage.attributes.HeadingSpan3}
                </h2>
                <h4>{homepage.attributes.HeadingText}</h4>
                <form className="cours-search" action="/search">
                  <div className="input-group">
                    <input
                      name="search"
                      type="text"
                      className="form-control"
                      placeholder="What do you want to learn today?	"
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="mw800 m-auto">
              <div className="row">
                {homepage.attributes.HomeCards.map((card) => (
                  <div class="item col-md-4 col-sm-6" key={card.id}>
                    <div class="cours-bx">
                      <div class="action-box">
                        <img src={strapiImage(card.CardImage.data.attributes.url)} alt="" />
                        <a href={card.Link} class="btn">
                          Read More
                        </a>
                      </div>
                      <div class="info-bx text-center">
                        <h5>
                          <a href={card.Link}>
                          <span>{card.CardSpanTitle}</span> {card.Title}
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const [categoriesRes, homepageRes] = await Promise.all([
    //fetchAPI("/posts", { populate: ["featuredImage", "category"] }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/home-page", {
      populate: ["*", "HomeCards", "HomeCards.CardImage"],
    }),
    /*fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),*/
  ]);

  const [categories, homepage] = await Promise.all([
    categoriesRes.data,
    homepageRes.data,
  ]);

  return {
    props: {
      categories,
      homepage,
    },
    revalidate: 1,
  };
}

export default Home;
