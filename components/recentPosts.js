import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { dateFormat } from "../lib/utils/miscellaneous";

const RecentPosts = ({}) => {
  const [posts, setPostsData] = useState([]);

  useEffect(() => {
    fetch(
      "https://clownfish-app-5whtn.ondigitalocean.app/api/posts?populate=%2A&sort=publishedAt:desc&pagination[pageSize]=3"
    )
      .then((response) => response.json())
      .then((res) => setPostsData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="widget recent-posts-entry">
      <h6 className="widget-title">Recent Posts</h6>
      <div className="widget-post-bx">
        {posts.map((post) => (
          <div className="widget-post clearfix" key={post.id}>
            <div className="ttr-post-media">
              {" "}
              <img
                src={post.attributes.FeaturedImage.data.attributes.formats.small.url}
                width="200"
                height="143"
                alt=""
              />{" "}
            </div>
            <div className="ttr-post-info">
              <div className="ttr-post-header">
                <h6 className="post-title">
                <Link href={`/post/${post.attributes.slug}`}>
                {post.attributes.title}
                  </Link>
                </h6>
              </div>
              <ul className="media-post">
                <li>
                  <Link href={`/post/${post.attributes.slug}`}>
                    
                      <i className="fa fa-calendar"></i>
                      {dateFormat(post.attributes.publishedAt)}
                    
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
