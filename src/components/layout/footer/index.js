import {isEmpty, isArray} from 'lodash';
import {sanitize} from '../../../utils/miscellaneous';
import Link from 'next/link';
import {getIconComponentByName} from '../../../utils/icons-map';
import NewsletterSubscribe from './NewsletterSubscribe';

const Footer = ( {footer, footerMenus} ) => {
	return (

		<footer>
<div className="footer-row1">
<div className="container">
  <div className="row">
    <div className="col-lg-6">
      <div className="email-subs">
        <h3>Get New Tips Weekly</h3>
        <p>Keep your home in top condition with our monthly tips.</p>
      </div>
    </div>
    <div className="col-lg-6 v-center">
      <div className="email-subs-form">
        <form>
          <input type="email" placeholder="Email Your Address" name="emails"/>
          <button type="submit" name="submit" className="lnk btn-main bg-btn">Subscribe <i className="fas fa-chevron-right fa-icon"></i><span className="circle"></span></button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>


<div className="footer-row3">
<div className="copyright">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        
		{ ! isEmpty( footer?.socialLinks ) && isArray( footer?.socialLinks ) ? (
						<div className="footer-social-media-icons">
							{ footer.socialLinks.map( socialLink => (
								<li key={ socialLink?.iconName } classNameName="ml-4">
									<a href={socialLink?.iconUrl}>
										{ getIconComponentByName( socialLink?.iconName ) }
									</a>
								</li>
							) ) }
						</div>
					) : 
					<div>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-facebook"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-twitter"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-instagram"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-linkedin"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-youtube"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-pinterest-p"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-vimeo-v"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-dribbble"></i></a>
					<a href="javascript:void(0)" target="blank"><i className="fab fa-behance"></i></a>
					</div>
					}

        </div>
        <div className="footer-">
          <p>© 2020-2022. All Rights Reserved By <a href="https://theperfectneighbor.com" target="blank">The Perfect Neighbor</a></p>
        </div>
      </div>
    </div>
  </div>
</div>
</footer>

		
	);
};

export default Footer;


