import client from '../src/apollo/client';
import Layout from '../src/components/layout';
import { sanitize } from '../src/utils/miscellaneous';
import { GET_PAGE } from '../src/queries/pages/get-page';
import { handleRedirectsAndReturnData } from '../src/utils/slug';
import Image from 'next/image';

export default function Home({ data }) {

	const padding_60 = {
		paddingTop: 60,
	}
   
   

   const wp_loader = ({src, width, quality}) =>{
      return `http://45.32.171.186/wp-content/uploads/`
   }
	return (
		<Layout data={data}>
		<section className="hero-card-web bg-gradient12 shape-bg3">
         <div className="hero-main-rp container-fluid">
            <div className="row">
               <div className="col-lg-5">
                  <div className="hero-heading-sec"style={padding_60}>
                     <h2 className="wow fadeIn" data-wow-delay="0.3s" ><span>We&apos;re</span> <span>The Perfect</span> <span>Neighbor.</span></h2>
                     <p className="wow fadeIn" data-wow-delay="0.6s">We love taking care of your home – and making sure you have the tools and knowledge to do it yourself.</p>
                     <a href="case-study.html" className="niwax-btn2 wow fadeIn"  data-wow-delay="0.8s">Explore Guides and Tips <i className="fas fa-chevron-right fa-ani"></i></a>
                     
                  </div>
               </div>
               <div className="col-lg-7">
                  
                  <div className="hero-right-scmm">
                     <div className="hero-service-cards wow fadeInRight" data-wow-duration="2s">
                        <div className="owl-carousel service-card-prb">
                           <div className="service-slide card-bg-a" data-tilt data-tilt-max="10" data-tilt-speed="1000">
                              <a href="#">
                                 <div className="service-card-hh">
                                    <div className="image-sr-mm">
                                       <img alt="custom-sport" src="/assets/img/hero/1.png" />
                                    </div>
                                    <div className="title-serv-c"><span>Summer 2022</span> Checklist</div>
                                 </div>
                              </a>
                           </div>
                           <div className="service-slide card-bg-b" data-tilt data-tilt-max="10" data-tilt-speed="1000">
                              <a href="#">
                                 <div className="service-card-hh">
                                    <div className="image-sr-mm">
                                       <img alt="custom-sport" src="/assets/img/hero/2.png" />
                                    </div>
                                    <div className="title-serv-c"><span>First Home</span>Buyer Checklist</div>
                                 </div>
                              </a>
                           </div>
                           <div className="service-slide card-bg-c" data-tilt data-tilt-max="10" data-tilt-speed="1000">
                              <a href="#">
                                 <div className="service-card-hh">
                                    <div className="image-sr-mm">
                                       <img src="/assets/img/hero/3.png" alt="custom-sport" />
                                    </div>
                                    <div className="title-serv-c"><span>Finding</span> A Handyman</div>
                                 </div>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>	

	  <section className="about-sec-rpb pad-tb">
         <div className="container">
            <div className="row justify-content-center text-center">
               <div className="col-lg-10">
                  <div className="common-heading">
                     <span>Your one-stop shop for home maintenance information.</span>
                     <h1 className="mb30"><span className="text-second">Top-rated</span> Advice and Tips</h1>
                     <p>Home maintenance is important for a number of reasons. First, it helps to protect your investment. Regular upkeep can increase the lifespan of your home and improve its resale value. Second, maintenance can help to prevent small problems from becoming big ones. By addressing issues early on, you can avoid costly repairs down the road. Third, routine maintenance can improve the comfort and safety of your home. Taking care of tasks like changing air filters and checking Smoke detectors can help you and your family stay safe and comfortable. Finally, regular home maintenance can simply make your life easier. By keeping on top of things, you can avoid the hassle of last-minute repairs and emergencies. If you&apos;re looking for help getting started with home maintenance, The Perfect Neighbor is your one-stop shop for guides and tips. From creating a cleaning schedule to finding a reputable contractor, we have everything you need to get started. So why wait? Start taking care of your home today!
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
	  <section className="work-category">
         <div className="container">
            <div className="row">
               <div className="col-lg-4 v-center">
                  <div className="common-heading text-l">
                     <span>Get to Know you Home</span>
                     <h2>Tips for all aspects of your home</h2>
                     <p>Successfully delivered digital products Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="work-card-set">
                     <div  className="icon-set wow fadeIn" data-wow-delay=".2s">
                        <div className="work-card cd1">
                           <div className="icon-bg"><img src="/assets/img/work-cards/appliances.png" alt="Industries" /></div>
                           <p>Appliances</p>
                        </div>
                     </div>
                     <div  className="icon-set wow fadeIn" data-wow-delay=".4s">
                        <div className="work-card cd2">
                           <div className="icon-bg"><img src="/assets/img/work-cards/bath.png" alt="Industries" /></div>
                           <p>Bath</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay=".6s">
                        <div className="work-card cd3">
                           <div className="icon-bg"><img src="/assets/img/work-cards/general.png" alt="Industries" /></div>
                           <p>General Maintenace</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay=".8s">
                        <div className="work-card cd4">
                           <div className="icon-bg"><img src="/assets/img/work-cards/guides.png" alt="Industries" /></div>
                           <p>Guides</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay="1s">
                        <div className="work-card cd5">
                           <div className="icon-bg"><img src="/assets/img/work-cards/heating.png" alt="Industries" /></div>
                           <p>Heating & Cooling</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay="1.2s">
                        <div className="work-card cd6">
                           <div className="icon-bg"><img src="/assets/img/work-cards/kitchen.png" alt="Industries" /></div>
                           <p>Kitchen</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay="1.4s">
                        <div className="work-card cd7">
                           <div className="icon-bg"><img src="/assets/img/work-cards/lawn.png" alt="Industries" /></div>
                           <p>Lawn & Garden</p>
                        </div>
                     </div>
                     <div className="icon-set wow fadeIn" data-wow-delay="1.6s">
                        <div className="work-card cd8">
                           <div className="icon-bg"><img src="/assets/img/work-cards/light.png" alt="Industries" /></div>
                           <p>Lighting & Ceiling Fans</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>






		</Layout>
	);
}

export async function getStaticProps(context) {

	const { data, errors } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: '/',
		},
	});

	const defaultProps = {
		props: {
			data: data || {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};

	return handleRedirectsAndReturnData(defaultProps, data, errors, 'page');
}
