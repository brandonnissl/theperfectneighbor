import client from '../src/apollo/client';
import { GET_PAGES_URI } from '../src/queries/pages/get-pages';
import { isEmpty } from 'lodash';
import { GET_PAGE } from '../src/queries/pages/get-page';
import { useRouter } from 'next/router';
import Layout from '../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from '../src/utils/slug';
import { sanitize, addBlogTags, specialChar, dateFormat } from '../src/utils/miscellaneous';
import Link from 'next/link';
import RecentAndCategories from '../src/components/recentcat';

const Page = ({ data }) => {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return (
			<div className="preloader-area text-center left-0 right-0 top-0 bottom-0 bg-white fixed z-9999">
				<div className="preloader absolute -mt-20 left-0 right-0 top-1/2 m-auto -translate-y-2/4">
					<div className="waviy font-bold text-50px">
						<span className="text-black-color inline-block relative">The</span>
						<span className="text-primary-color inline-block relative">Perfect</span>
						<span className="text-black-color inline-block relative">Neighbor</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Layout data={data}>

			<div>

				<section className="breadcrumb-area banner-2">
					<div className="text-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 v-center">
									<div className="bread-inner">
										<div className="bread-menu">
											{data?.page?.seo?.breadcrumbs.length ? (
												<ul>
												{data?.page?.seo?.breadcrumbs.map(breadcrumb=> {
													return (
														<li key={breadcrumb.url}>
															<Link href={breadcrumb.url}>
																<a>{specialChar(breadcrumb.text)}</a>
															</Link>
														</li>
														
													)
												})}
											</ul>

											):<></>}
											
										</div>
										<div className="bread-title">
											<h2>{specialChar(data?.page?.seo?.breadcrumbs[data?.page?.seo?.breadcrumbs.length - 2].text)}</h2>
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
									<h1>{specialChar(data?.page?.title)}</h1>
									<div className="row mt20 mb20">
										<div className="col-md-8 col-9">
											<div className="media">
												<div className="user-image bdr-radius"><img src="/assets/images/user-thumb/girl.jpg" alt="girl" className="img-fluid" /></div>
												<div className="media-body user-info">
													<h5>By {data?.page?.author?.node?.firstName} {data?.page?.author?.node?.lastName}</h5>
													<p>{dateFormat(data?.page?.date)}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="image-set"><img src={data?.page?.featuredImage?.node?.sourceUrl} className="img-fluid"></img></div>
				
								
								<div className="blog-content mt30" dangerouslySetInnerHTML={{ __html: addBlogTags(sanitize(data?.page?.content ?? {})) }} />
						


							</div>
							
							
						</div>
					</div>
				</section>


			</div>

		</Layout>
	);
};

export default Page;




export async function getStaticProps({ params }) {
	const { data, errors } = await client.query({
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join('/'),
		},
	});
	

	const defaultProps = {
		props: {
			data: data || {},

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

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
	const { data } = await client.query({
		query: GET_PAGES_URI
	});

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map(page => {
		if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
			const slugs = page?.uri?.split('/').filter(pageSlug => pageSlug);
			pathsData.push({ params: { slug: slugs } });
		}
	});

	return {
		paths: pathsData,
		fallback: FALLBACK
	};
}
