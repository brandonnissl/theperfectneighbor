const path = require( 'path' );
const allowedImageWordPressDomain = new URL( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ).hostname;

module.exports = {
  trailingSlash: true,
  
  sassOptions: {
    includePaths: [ path.join( __dirname, 'styles' ) ],
  },
  /**
   * We specify which domains are allowed to be optimized.
   * This is needed to ensure that external urls can't be abused.
   * @see https://nextjs.org/docs/basic-features/image-optimization#domains
   */
  images: {
    domains: [ allowedImageWordPressDomain, 'http://45.32.171.186', "45.32.171.186/wp-content" ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
