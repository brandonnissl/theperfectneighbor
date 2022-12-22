import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";
//import styles from "../styles/Home.module.css";
import { strapiImage } from "../lib/utils/miscellaneous";
import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";

const Home = ({ posts, categories, homepage }) => {
  const [userData, setUserData] = useState();


  const getUserData = () => {
    return axios
      .get("/api/auth/user", {})
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Layout categories={categories} userData={userData}></Layout>
      <div className="page-content bg-white">
        <div className="section-area section-sp1 ovpr-dark bg-fix online-cours">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-white">
                <h2>
                  {homepage.attributes.HeadingSpan1}{" "}
                  {homepage.attributes.HeadingSpan2}{" "}
                  {homepage.attributes.HeadingSpan3}
                </h2>
                <h4>{homepage.attributes.HeadingText}</h4>
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
            <div className="mw800 m-auto">
              <div className="row">
                {homepage.attributes.HomeCards.map((card) => (
                 
                  <div className="item col-md-4 col-sm-6" key={card.id}>
                    <div className="cours-bx">
                      <div className="action-box">
                        <Link href={card.Link}>
                          
                        <img src={card.CardImage.data.attributes.url} alt="" />
                        </Link>
                        <Link href={card.Link} className="btn">
                        
                          Read More
                        
                        </Link>
                      </div>
                      <div className="info-bx text-center">
                        <h5>
                          <Link  href={card.Link}>
                          
                          <span>{card.CardSpanTitle}</span> {card.Title}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="content-block">
        <div className="section-area section-sp2 popular-courses-bx">
                <div className="container">
					<div className="row">
						<div className="col-md-12 heading-bx style1 text-center">
							<h2 className="title-head">Home maintenance made easy - one stop for all your home needs!</h2>
							<p>With The Perfect Neighbor, you can rest assured that all of your home maintenance needs are taken care of!</p>
						</div>
					</div>
					<div className="row m-b50">
						<div className="col-lg-4 col-md-6">
							<div className="services-bx text-left m-b30">
								<div className="feature-lg text-white m-b30">
									<span className="icon-cell"><i className="flaticon-books"></i></span> 
								</div>
								<div className="icon-content">
									<h5 className="ttr-tilte">DIY Home Maintenance</h5>
									<p>Let us take the stress out of managing your home with our comprehensive knowledge base and tools. The Perfect Neighbor offers answers to all your home maintenance questions, as well as helpful how-to guides and checklists to make sure you don’t miss a beat.</p>
								</div>
								<div className="service-no">01</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="services-bx text-left m-b30">
								<div className="feature-lg text-white m-b30">
									<span className="icon-cell"><i className="flaticon-abacus"></i></span> 
								</div>
								<div className="icon-content">
									<h5 className="ttr-tilte">Right Tool for the Job</h5>
									<p>The Perfect Neighbor is the perfect solution for homeowners looking to find the ideal products for their DIY home maintenance needs. This convenient service helps save time and energy and allows them to find the right products for their specific project.<br/>&nbsp;</p>
									
								</div>
								<div className="service-no">02</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-12">
							<div className="services-bx text-left m-b30">
								<div className="feature-lg text-white m-b30">
									<span className="icon-cell"><i className="flaticon-ink"></i></span> 
								</div>
								<div className="icon-content">
									<h5 className="ttr-tilte">Partners</h5>
									<p> We provided high quality contractors that are dependable and trustworthy. We understand the importance of having a reliable contractor on your side, so we work hard to identify experienced professionals who can get the job done right.<br/>&nbsp;</p>
								</div>
								<div className="service-no">03</div>
							</div>
						</div>
					</div>
				</div>
			
			</div>
        

        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const [categoriesRes, homepageRes] = await Promise.all([
    //fetchAPI("/posts", { populate: ["featuredImage", "category"] }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/home-page", {
      populate: ["*", "HomeCards", "HomeCards.CardImage"],
    }),
    /*fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),*/
  ]);

  const [categories, homepage] = await Promise.all([
    categoriesRes.data,
    homepageRes.data,
  ]);

  return {
    props: {
      categories,
      homepage,
    },
    revalidate: 1,
  };
}

export default Home;
