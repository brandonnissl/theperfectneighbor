import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Layout from "../../components/layout";
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
import Image from "next/image";

const Catagory = ({ posts, categories, category }) => {


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

  return (
    <Layout categories={categories} userData={userData}>
      <div class="page-content bg-white">
        <div
          class="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}
        >
          <div class="container">
            <div class="page-banner-entry">
              <h1 class="text-white">{category.attributes.name}</h1>
            </div>
          </div>
        </div>
        <div class="breadcrumb-row">
          <div class="container">
            <ul class="list-inline">
              <li>
                <a href="#">Home</a>
              </li>
              <li key={category.id}>{category.attributes.name}</li>
            </ul>
          </div>
        </div>
        <div class="content-block">
          <div class="section-area section-sp1">
            <div class="container">
              <div class="ttr-blog-grid-3 row" id="masonry">
                {posts.map((post) => (
                  <div
                    class="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40"
                    key={post.id}
                  >
                    <div class="recent-news">
                      <div class="action-box">
                        <img src={post.attributes.FeaturedImage.data.attributes.formats.medium.url} alt="" />
                      </div>
                      <div class="info-bx">
                        <ul class="media-post">
                          <li>
                            <Link href={`/post/${post.attributes.slug}`}>
                              
                                <i class="fa fa-calendar"></i>
                                {dateFormat(post.attributes.publishedAt)}
                            
                            </Link>
                          </li>
                          <li>
                            <Link href={`/post/${post.attributes.slug}`}>
                              
                                <i class="fa fa-user"></i>By{" "}
                                {
                                  post.attributes.author.data.attributes
                                    .FirstName
                                }{" "}
                                {
                                  post.attributes.author.data.attributes
                                    .LastName
                                }
                              
                            </Link>
                          </li>
                        </ul>
                        <h5 class="post-title">
                        <Link href={`/post/${post.attributes.slug}`}>
                          {post.attributes.title}
                          </Link>
                        </h5>
                        <p>{getWordStr(post.attributes.content)}...</p>
                        <div class="post-extra">
                          <Link href={`/post/${post.attributes.slug}`}  class="btn-link">
                            READ MORE
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div class="pagination-bx rounded-sm gray clearfix">
                <ul class="pagination">
                  <li class="previous">
                    <a href="#">
                      <i class="ti-arrow-left"></i> Prev
                    </a>
                  </li>
                  <li class="active">
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li class="next">
                    <a href="#">
                      Next <i class="ti-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categoryRes = await fetchAPI("/categories", { "fields[0]": ["slug"] });

  return {
    paths: categoryRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsRes = await fetchAPI("/posts", {
    filters: {
      category: {
        slug: {
          $eq: params.slug,
        },
      },
    },
    populate: "*",
  });
  const categoryRes = await fetchAPI("/categories", {
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
    populate: "*",
  });

  const categoriesRes = await fetchAPI("/categories", { populate: "*" });

  return {
    props: {
      posts: postsRes.data,
      categories: categoriesRes.data,
      category: categoryRes.data[0],
    },
    revalidate: 1,
  };
}

export default Catagory;
