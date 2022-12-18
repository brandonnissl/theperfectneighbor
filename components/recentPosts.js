import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { dateFormat } from "../lib/utils/miscellaneous";

const RecentPosts = ({}) => {
  const [posts, setPostsData] = useState([]);

  useEffect(() => {
    fetch(
      "https://clownfish-app-5whtn.ondigitalocean.app/api/posts?sort=publishedAt:desc&pagination[pageSize]=3"
    )
      .then((response) => response.json())
      .then((res) => setPostsData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div class="widget recent-posts-entry">
      <h6 class="widget-title">Recent Posts</h6>
      <div class="widget-post-bx">
        {posts.map((post) => (
          <div class="widget-post clearfix" key={post.id}>
            <div class="ttr-post-media">
              {" "}
              <img
                src={post.attributes.featuredImage}
                width="200"
                height="143"
                alt=""
              />{" "}
            </div>
            <div class="ttr-post-info">
              <div class="ttr-post-header">
                <h6 class="post-title">
                  <a href="blog-details.html">{post.attributes.title}</a>
                </h6>
              </div>
              <ul class="media-post">
                <li>
                  <Link href={`/post/${post.attributes.slug}`}>
                    <a>
                      <i class="fa fa-calendar"></i>
                      {dateFormat(post.attributes.publishedAt)}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
