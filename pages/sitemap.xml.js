import React from "react";
import { globby } from "globby";
import { fetchAPI } from "../lib/api";

const Sitemap = ({}) => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = process.env.NEXTAUTH_URL;
  const pages = await globby([
    "pages/**",
    "!pages/api",
    "!_app",
    "!_document",
    "!pages/checklist",
    "!pages/user",
    "!pages/post",
    "!pages/categories"
  ]);

  const currentDate = new Date().toISOString();

  const blogPostsRes = await fetchAPI("/posts", { "fields[0]": ["slug"] });
  const blogPosts = blogPostsRes.data.map((post) => post.attributes.slug);

  const categoryRes = await fetchAPI("/categories", { "fields[0]": ["slug"] });
  const categories = categoryRes.data.map((category) => category.attributes.slug);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map((page) => {
         const path = page
           .replace("pages", "")
           .replace(".js", "")
           .replace(".tsx", "")
           .replace(".md", "");
         const route = path === "/index" ? "" : path;
         return `
         <url>
           <loc>${BASE_URL}${route}</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>1.0</priority>
         </url>
         
         
       `;
       })
       .join("")}
       ${blogPosts
        .map((route) => {
          return `
           <url>
             <loc>${`${BASE_URL}/post/${route}`}</loc>
             <lastmod>${currentDate}</lastmod>
             <changefreq>monthly</changefreq>
             <priority>1.0</priority>
           </url>
         `;
        })
        .join("")}
        ${categories
            .map((route) => {
              return `
               <url>
                 <loc>${`${BASE_URL}/categories/${route}`}</loc>
                 <lastmod>${currentDate}</lastmod>
                 <changefreq>monthly</changefreq>
                 <priority>1.0</priority>
               </url>
             `;
            })
            .join("")}

        

  </urlset>
`;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
