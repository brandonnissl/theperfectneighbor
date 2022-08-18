import Link from 'next/link';
import client from '../src/apollo/client';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import { GET_MENUS } from '../src/queries/get-menus';

function Error404({ data }) {
	const { header, footer, headerMenus, footerMenus } = data || {};
	return (
		<>
			<Header header={header} headerMenus={headerMenus?.edges} />
			<div className="pt-60 md:pt-80 lg:pt-100 pb-60 md:pb-80 lg:pb-100">
				<div className="container">
					<div className="text-center">
						<img src="/assets/img/error.png" className="inline-block mb-10" alt="error-image" />
						<h3 className="font-bold text-18px md:text-20px lg:text-24px mb-15 lg:mb-18">Oops! That page can&apos;t be found</h3>
						<p className="md:max-w-[510px] md:ml-auto md:mr-auto leading-7 md:leading-8 text-optional-color mb-10 md:mb-15 text-13px md:text-15px lg:text-16px">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
						<Link href="/">
							<a className="inline-block font-semibold text-13px md:text-14px lg:text-15px mt-10 rounded-sm text-white pt-17 pb-13 pl-35 pr-35 bg-secondary-gradient-color shadow-custom-box-shadow hover:shadow-secondary-btn ease-in duration-300">Back to Home</a>
					
						</Link>
					</div>
				</div>
			</div>
			<Footer footer={footer} footerMenus={footerMenus?.edges} />
		</>
	);
}

export default Error404;

export async function getStaticProps() {

	const { data } = await client.query({
		query: GET_MENUS,
	});

	return {
		props: {
			data: data || {}
		},
	};
}
