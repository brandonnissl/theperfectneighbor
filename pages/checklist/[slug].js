import { fetchAPI } from "../../lib/api";
import { getStrapiMedia} from "../../lib/media"
import Layout from "../../components/layout";
import Link from "next/link";
import {
  specialChar,
  dateFormat,
  addBlogTags,
  sanitize,
} from "../../lib/utils/miscellaneous";


const Post = ({ post, categories }) => {

  console.warn("categories post", categories)
  const padding_60 = {
    paddingTop: 60,
  };

  const headerColor = "dark";
  return (
    <Layout categories={categories}>
      <div>
        <section className="breadcrumb-area banner-2">
          <div className="text-block">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 v-center">
                  <div className="bread-inner">
                    <div className="bread-menu">
                      <ul>
                        <li key={post.attributes.category.id}>
                          <Link href="#">
                            <a>{post.attributes.category.data.attributes.name}</a>
                          </Link>
                        </li>
                        <li key={post.id}>
                          <Link href="#">
                            <a>{post.attributes.name}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="bread-title">
                      <h2>{post.attributes.category.data.attributes.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-page pad-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-header">
                  <h1>{post.attributes.title}</h1>
                  <div className="row mt20 mb20">
                    <div className="col-md-8 col-9">
                      <div className="media">
                        <div className="user-image bdr-radius">
                          <img
                            src="/assets/images/user-thumb/girl.jpg"
                            alt="girl"
                            className="img-fluid"
                          />
                        </div>
                        <div className="media-body user-info">
                          <h5>
                            By {post.attributes.author.data.attributes.FirstName}{" "}
                            {post.attributes.author.data.attributes.LastName}
                          </h5>
                          <p>{dateFormat(post.attributes.publishedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image-set">
                  <img
                    src={post.attributes.featuredImage}
                    className="img-fluid"
                  ></img>
                </div>

                <div
                  className="blog-content mt30"
                  dangerouslySetInnerHTML={{
                    __html: addBlogTags(
                      sanitize(post.attributes.content ?? {})
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const postsRes = await fetchAPI("/posts", { 'fields[0]': ["slug"] });

  console.warn("posts", postsRes);
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
