import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';

import Nav from './nav';

const Header = ( {header, headerMenus, slug} ) => {

	if ( isEmpty( headerMenus ) ) {
		return null;
	}

	return (
		
			<Nav header={header} headerMenus={headerMenus} slug={slug}/>
		
	);
};

Header.propTypes = {
  header: PropTypes.object,
  headerMenus: PropTypes.array,
  slug: PropTypes.string
};

Header.defaultProps = {
  header: {},
  headerMenus: [],
  slug: ''
};

export default Header;
