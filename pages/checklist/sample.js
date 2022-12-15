import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Layout from "../../components/layout";
import Link from "next/link";
import {
  specialChar,
  dateFormat,
  addBlogTags,
  sanitize,
} from "../../lib/utils/miscellaneous";

const Checklist = ({ categories }) => {
  console.warn("categories post", categories);
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
                    <div className="bread-title">
                      <h2>Summer 2022 Checklist</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="missionvision dark-bg4 pad-tb bg-gradient3">
          <div className="container">
            <div className="row">
              <div class="inbox">
                <div class="item">
                  <input type="checkbox" />
                  <p>Change airfilter</p>
                </div>
                <div class="item">
                  <input type="checkbox" />
                  <p>Cover Air Condition Unit</p>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const categoriesRes = await fetchAPI("/categories", { populate: "*" });

  return {
    props: { categories: categoriesRes.data },
    revalidate: 1,
  };
}

export default Checklist;
