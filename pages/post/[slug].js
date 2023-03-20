import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Layout from "../../components/layout";
import RecentPosts from "../../components/recentPosts";
import Link from "next/link";
import reactMarkdown from "react-markdown";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";
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
import Seo from "../../components/frontend/seo";
import { getCookie, hasCookie, getCookies } from "cookies-next";

const Post = ({ post, categories }) => {
  const url = "https://www.theperfectneighbor.com/post/" + post.attributes.slug;
  const [userData, setUserData] = useState();
  const [taskData, setTaskData] = useState();
  const [addToCheckList, setAddToChecklist] = useState(0);
  const [addToCheckListStartDate, setaddToCheckListStartDate] = useState();
  const [completeTaskText, setCompleteTaskText] = useState()
  
  const [isLoading, setIsLoading] = useState(false);

  //Close Task if available
  const closeTask = async () => {
    try {
      console.warn("data", taskData)
      const response = await fetch('/api/closetask', {
        method: "POST",
        body: JSON.stringify({
          userTask:taskData,
          userId: userData.id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if(!response.ok){
        throw new Error(`Error! status: ${response.status}`)
      }

      const result = await response.json();
      window.location.reload(false);
    } catch (err){
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  
  
  
  useEffect(() => {
    (async () => {
      try {
        const getUserData = await axios.get("/api/auth/user", {});
        if (getUserData.status === 200) {
          setUserData(getUserData.data);
          const getInChecklist = await axios
            .get("/api/getPostExistsInChecklist", {
              params: {
                userId: getUserData.data.id,
                postId: post.id,
              },
            })
            .then((resp) => {
              try {
                if (resp.data.data[0].id) {
                  setAddToChecklist(resp.data.data[0].id);
                  setaddToCheckListStartDate(resp.data.data[0].attributes.StartDate)
                  setCompleteTaskText("Due: "+dateFormat(resp.data.data[0].attributes.StartDate))
                  setTaskData(resp.data.data[0])
                }
              } catch (error) {
                setAddToChecklist(-1);
              }
            })
            .catch((err) => console.error(err));
        } 
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const metaTitle = post.attributes.Seo.metaTitle;
  const metaDescription = post.attributes.Seo.metaDescription;
  const keywords = post.attributes.Seo.keywords;
  const preventIndexing = post.attributes.Seo.preventIndexing;
  return (
    <Layout categories={categories} userData={userData}>
      <Seo seo={post.attributes.Seo} />
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
                      <div className="completeTaskMain">
                        {addToCheckList > 0 && (
                          <Button 
                          onMouseEnter={()=> {setCompleteTaskText("Complete")}}
                          onMouseLeave={()=> { setCompleteTaskText("Due: "+dateFormat(addToCheckListStartDate))}}
                          onClick={closeTask}
                          
                          color="primary" style={{width:"100%"}} >
                            {completeTaskText}
                          </Button>
                        )}
                        {addToCheckList == 0 && (
                          <Button color="#ff7800" style={{width:"100%"}} onClick={event =>  window.location.href='/register'}>Sign Up for a custom checklist</Button>
                        )}
                        {/*addToCheckList < 0 && (
                          <Button color="primary" style={{width:"100%"}}>Add to Checklist</Button>
                        )*/}
                      </div>

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
                    <div className="completeTaskSide">
                        {addToCheckList > 0 && (
                          <Button 
                          onMouseEnter={()=> {setCompleteTaskText("Complete")}}
                          onMouseLeave={()=> { setCompleteTaskText("Due: "+dateFormat(addToCheckListStartDate))}}
                          onClick={closeTask}
                          
                          color="primary" style={{width:"100%"}} >
                            {completeTaskText}
                          </Button>
                        )}
                        {addToCheckList == 0 && (
                          <Button color="#ff7800" style={{width:"100%"}} onClick={event =>  window.location.href='/register'}>Sign Up for a custom checklist</Button>
                        )}
                        {/*{addToCheckList < 0 && (
                          <Button 
                          color="primary" style={{width:"100%"}}>Add to Checklist</Button>
                        )}*/}
                      </div>
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
