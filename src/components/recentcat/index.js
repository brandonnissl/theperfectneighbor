import client from '../../apollo/client';
import Link from 'next/link';
import { dateFormat } from '../../utils/miscellaneous';

const RecentAndCategories = ({data}) => {
    return (
        <div className="col-lg-4">
            <div className="sidebar">
                <div className="offer-image">
                    <img src="/assets/images/blog/strategy-guide.jpg" alt="offer" className="img-fluid" />
                </div>
                <div className="recent-post widgets mt60">
                    <h3 className="mb30">Recent Posts</h3>

                    {data?.posts?.edges?.map(post => (
                        <div className="media" key={post?.node?.uri}>
                            <div className="post-image bdr-radius">
                            <Link key={post?.node?.uri} href={post?.node?.uri}>
                            <img src={post?.node?.featuredImage?.node?.sourceUrl} alt={post?.node?.featuredImage?.node?.altText} className="img-fluid" />
                                    </Link>
                                
                            </div>
                            <div className="media-body post-info">
                                <h5>
                                    <Link key={post?.node?.uri} href={post?.node?.uri}>
                                    <a>{post?.node?.title}</a>
                                    </Link>
                                </h5>
                                <p>{dateFormat(post?.node?.date)}</p>
                            </div>
                        </div>

                    ))}


                </div>
                <div className="recent-post widgets mt60">
                    <h3 className="mb30">Categories</h3>
                    <div className="blog-categories">

                        <ul>
                            {data?.categories?.edges?.map(category => (
                                <li key={category?.node?.uri}>
                                    <Link key={category?.node?.uri} href={category?.node?.uri}>
                                        <a>{category?.node?.name}<span className="categories-number">({category?.node?.count})</span></a>
                                    </Link>
                                </li>

                            ))}


                        </ul>
                    </div>
                </div>
                <div className="offer-image mt60">
                    <img src="/assets/images/blog/sidebar-image.jpg" alt="offer" className="img-fluid" />
                </div>
            </div>
        </div>
    )

}

export default RecentAndCategories;