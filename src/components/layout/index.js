import Header from './header';
import Footer from './footer';
import Head from 'next/head';
import Seo from '../seo';
import { isEmpty } from 'lodash';
import { sanitize } from '../../utils/miscellaneous';
import PropTypes from 'prop-types';

const Layout = ({ data, isPost, children }) => {
	const { page, post, posts, header, footer, headerMenus, footerMenus } = data || {};


	var titlebardark = "nav-bg-w main-header navfix fixed-top menu-white";
	if(page.uri =='/'){
		titlebardark = "nav-bg-b main-header navfix fixed-top menu-white";
	}
	// If it does not have either post or page.
	if (isEmpty(page) && isEmpty(post) && isEmpty(posts)) {
		return null;
	}

	const seo = isPost ? (post?.seo ?? {}) : (page?.seo ?? {});
	const uri = isPost ? (post?.uri ?? {}) : (page?.uri ?? {});

	return (
		<div>
			<Seo seo={seo} uri={uri} />
			<Head lang="en" className="no-js">
				<link rel="shortcut icon" href={header?.favicon} />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
				<meta name="theme-color" content="#2e2a8f"></meta>
				{seo?.schemaDetails ? (
					<script
						type='application/ld+json'
						className='yoast-schema-graph'
						key='yoastSchema'
						dangerouslySetInnerHTML={{ __html: sanitize(seo.schemaDetails) }}
					/>
				) : null}
				<body>
					<header className={titlebardark}>
						
					</header>
						
					{children}
						
					
			
					
				</body>
			</Head>

			
		</div>
	);
};
//<Header header={header} headerMenus={headerMenus?.edges} />
//<Footer footer={footer} footerMenus={footerMenus?.edges} />
Layout.propTypes = {
	data: PropTypes.object,
	isPost: PropTypes.bool,
	children: PropTypes.object
};

Layout.defaultProps = {
	data: {},
	isPost: false,
	children: {}
};

export default Layout;

