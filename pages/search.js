import MeiliSearch from "meilisearch";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Layout from "../components/layout";
import Link from "next/link";
import reactMarkdown from "react-markdown";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import {
  specialChar,
  dateFormat,
  addBlogTags,
  sanitize,
} from "../lib/utils/miscellaneous";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_URL,
  headers: {
    Authorization: `Bearer ${process.env.MEILI_API}`,
    "Content-Type": "application/json",
  },
});

const Search = ({ posts, categories, homepage }) => {
  useEffect(() => {
    getUserData();
  }, []);

  const [userData, setUserData] = useState();

  const getUserData = () => {
    return axios
      .get("/api/auth/user", {})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  };

  function getWordStr(str) {
    return str.split(/\s+/).slice(0, 12).join(" ");
  }

  const headerColor = "dark";
  return (
    <Layout categories={categories} userData={userData}>
      { posts.length > 0 ? 

      <div className="page-content bg-white">
        <div className="page-banner ovbl-dark">
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Search Results</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="#">Home</a>
              </li>
              <li>Search</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="ttr-blog-grid-3 row">
                {posts.map((post) => (
                  <div className="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40" key={post.id}>
                    <div className="recent-news">
                      <div className="action-box">
                        <img src={post.featuredImage} alt="" />
                      </div>
                      <div className="info-bx">
                        <ul className="media-post">
                          <li>
                            <a href={`/post/${post.slug}`}>
                              <i className="fa fa-calendar"></i>
                              {dateFormat(post.publishedAt)}
                            </a>
                          </li>
                          <li>
                            <a href={`/post/${post.slug}`}>
                              <i className="fa fa-user"></i>By{" "}
                              {post.author.FirstName} {post.author.LastName}
                            </a>
                          </li>
                        </ul>
                        <h5 className="post-title">
                          <a href={`/post/${post.slug}`}>{post.title}</a>
                        </h5>
                        <p>{getWordStr(post.content)}...</p>
                        <div className="post-extra">
                          <a href={`/post/${post.slug}`} className="btn-link">
                            READ MORE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination-bx rounded-sm gray clearfix">
                <ul className="pagination">
                  <li className="previous">
                    <a href="#">
                      <i className="ti-arrow-left"></i> Prev
                    </a>
                  </li>
                  <li className="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li className="next">
                    <a href="#">
                      Next <i className="ti-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="section-area section-sp1 ovpr-dark bg-fix online-cours">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-white">
                <h2>
                  {homepage.attributes.HeadingSpan1}{" "}
                  {homepage.attributes.HeadingSpan2}
                  {homepage.attributes.HeadingSpan3}
                </h2>
                <h4>Opps! We didn&apos;t find anything in your search.</h4>
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
          </div>
        </div>
      }
    </Layout>
  );
};

 

export async function getServerSideProps({ query }) {
  const postIndex = await client.getIndex("post");
  const postsRes = await postIndex.search(query.search);
  const homepageRes = await fetchAPI("/home-page", {populate: "*"});
  
  const categoriesRes = await fetchAPI("/categories", { populate: "*" });
  return {
    props: {
      posts: postsRes.hits,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
  };
}

export default Search;
