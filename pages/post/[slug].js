import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Layout from "../../components/layout";
import RecentPosts from "../../components/recentPosts";
import Link from "next/link";
import reactMarkdown from "react-markdown";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  specialChar,
  dateFormat,
  addBlogTags,
  sanitize,
} from "../../lib/utils/miscellaneous";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "next-share";

const Post = ({ post, categories }) => {
  const url = "https://www.theperfectneighbor.com/post/" + post.attributes.slug;
  useEffect(() => {
    (async () => {
      try {
        await getUserData();
        const getInChecklist = await axios
          .get("/api/getPostExistsInChecklist", {
            params: {
              userData: userData,
              post: post,
            },
          })
          .then((resp) => {
            console.warn("resp", resp);
            setAddToChecklist(resp.data);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [userData, setUserData] = useState();
  const [addToCheckList, setAddToChecklist] = useState();

  const getUserData = async () => {
    return await axios
      .get("/api/auth/user", {})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Layout categories={categories} userData={userData}>
      <div className="page-content bg-white">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{post.attributes.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li key={post.attributes.category.id}>
                {post.attributes.category.data.attributes.name}
              </li>
              <li key={post.id}>{post.attributes.title}</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-xl-8">
                  <div className="recent-news blog-lg">
                    <div className="action-box blog-lg">
                      <img
                        src={post.attributes.FeaturedImage.data.attributes.url}
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="info-bx">
                      <ul className="media-post">
                        <li>
                          <a href="#">
                            <i className="fa fa-calendar"></i>
                            {dateFormat(post.attributes.publishedAt)}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-user"></i> By{" "}
                            {post.attributes.author.data.attributes.FirstName}{" "}
                            {post.attributes.author.data.attributes.LastName}
                          </a>
                        </li>
                      </ul>
                      <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square"></i>
                      </div>
                      <h6>SHARE </h6>
                      <ul className="list-inline contact-social-bx">
                        <FacebookShareButton url={url}>
                          <li>
                            <a className="btn outline radius-xl">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                        </FacebookShareButton>
                        <li>
                          <TwitterShareButton url={url}>
                            <a className="btn outline radius-xl">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </TwitterShareButton>
                        </li>
                        <li>
                          <LinkedinShareButton url={url}>
                            <a className="btn outline radius-xl">
                              <i className="fa fa-linkedin"></i>
                            </a>
                          </LinkedinShareButton>
                        </li>
                      </ul>
                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-xl-4">
                  <aside className="side-bar sticky-top">
                    <div className="widget">
                      <h6 className="widget-title">Search</h6>
                      <div className="search-bx style-1">
                        <form role="search" action="/search">
                          <div className="input-group">
                            <input
                              name="search"
                              className="form-control"
                              placeholder="Enter your keywords..."
                              type="text"
                            />
                            <span className="input-group-btn">
                              <button
                                type="submit"
                                className="fa fa-search text-primary"
                              ></button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                    <RecentPosts />
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const postsRes = await fetchAPI("/posts", { "fields[0]": ["slug"] });

  return {
    paths: postsRes.data.map((post) => ({
      params: {
        slug: post.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsRes = await fetchAPI("/posts", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  });
  const categoriesRes = await fetchAPI("/categories", { populate: "*" });

  return {
    props: { post: postsRes.data[0], categories: categoriesRes.data },
    revalidate: 1,
  };
}

export default Post;
