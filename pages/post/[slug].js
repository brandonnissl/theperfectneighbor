import { fetchAPI } from "../../lib/api";
import { getStrapiMedia} from "../../lib/media"
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


const Post = ({ post, categories }) => {

  const padding_60 = {
    paddingTop: 60,
  };

  useEffect(()=> {
    getUserData();
    
  }, [])

  const [userData, setUserData] = useState();

  const getUserData = () => {
    return axios
      .get('/api/auth/user', {
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err))

  }

  const headerColor = "dark";
  return (
    <Layout categories={categories} userData={userData}>

<div class="page-content bg-white">
        <div class="page-banner ovbl-dark" style={{backgroundImage:'url(assets/images/banner/banner2.jpg)'}}>
            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">{post.attributes.title}</h1>
				</div>
            </div>
        </div>
		<div class="breadcrumb-row">
			<div class="container">
				<ul class="list-inline">
					<li key={post.attributes.category.id}><Link href="#">
                            <a>{post.attributes.category.data.attributes.name}</a>
                          </Link></li>
					<li key={post.id}>{post.attributes.title}</li>
				</ul>
			</div>
		</div>
        <div class="content-block">
			<div class="section-area section-sp1">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 col-xl-8">
							<div class="recent-news blog-lg">
								<div class="action-box blog-lg">
                <img
                    src={post.attributes.featuredImage}
                    className="img-fluid"
                  ></img>
								</div>
								<div class="info-bx">
									<ul class="media-post">
										<li><a href="#"><i class="fa fa-calendar"></i>{dateFormat(post.attributes.publishedAt)}</a></li>
                    <li><a href="#"><i class="fa fa-user"></i> By {post.attributes.author.data.attributes.FirstName}{" "}
                            {post.attributes.author.data.attributes.LastName}</a></li>
									</ul>
									<ReactMarkdown>{post.attributes.content}</ReactMarkdown>
									<div class="ttr-divider bg-gray"><i class="icon-dot c-square"></i></div>
										<h6>SHARE </h6>
										<ul class="list-inline contact-social-bx">
											<li><a href="#" class="btn outline radius-xl"><i class="fa fa-facebook"></i></a></li>
											<li><a href="#" class="btn outline radius-xl"><i class="fa fa-twitter"></i></a></li>
											<li><a href="#" class="btn outline radius-xl"><i class="fa fa-linkedin"></i></a></li>
											<li><a href="#" class="btn outline radius-xl"><i class="fa fa-google-plus"></i></a></li>
										</ul>
									<div class="ttr-divider bg-gray"><i class="icon-dot c-square"></i></div>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-xl-4">
							<aside  class="side-bar sticky-top">
								<div class="widget">
									<h6 class="widget-title">Search</h6>
									<div class="search-bx style-1">
										<form role="search" action="/search">
											<div class="input-group">
												<input name="search" class="form-control" placeholder="Enter your keywords..." type="text"/>
												<span class="input-group-btn">
													<button type="submit" class="fa fa-search text-primary"></button>
												</span> 
											</div>
										</form>
									</div>
								</div>
								<div class="widget recent-posts-entry">
									<h6 class="widget-title">Recent Posts</h6>
									<div class="widget-post-bx">
										<div class="widget-post clearfix">
											<div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic1.jpg" width="200" height="143" alt=""/> </div>
											<div class="ttr-post-info">
												<div class="ttr-post-header">
													<h6 class="post-title"><a href="blog-details.html">This Story Behind Education Will Haunt You Forever.</a></h6>
												</div>
												<ul class="media-post">
													<li><a href="#"><i class="fa fa-calendar"></i>Oct 23 2019</a></li>
													<li><a href="#"><i class="fa fa-comments-o"></i>15 Comment</a></li>
												</ul>
											</div>
										</div>
										<div class="widget-post clearfix">
											<div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic2.jpg" width="200" height="160" alt=""/> </div>
											<div class="ttr-post-info">
												<div class="ttr-post-header">
													<h6 class="post-title"><a href="blog-details.html">What Will Education Be Like In The Next 50 Years?</a></h6>
												</div>
												<ul class="media-post">
													<li><a href="#"><i class="fa fa-calendar"></i>May 14 2019</a></li>
													<li><a href="#"><i class="fa fa-comments-o"></i>23 Comment</a></li>
												</ul>
											</div>
										</div>
										<div class="widget-post clearfix">
											<div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic3.jpg" width="200" height="160" alt=""/> </div>
											<div class="ttr-post-info">
												<div class="ttr-post-header">
													<h6 class="post-title"><a href="blog-details.html">Eliminate Your Fears And Doubts About Education.</a></h6>
												</div>
												<ul class="media-post">
													<li><a href="#"><i class="fa fa-calendar"></i>June 12 2019</a></li>
													<li><a href="#"><i class="fa fa-comments-o"></i>27 Comment</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								
								
								
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
  const postsRes = await fetchAPI("/posts", { 'fields[0]': ["slug"] });

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
