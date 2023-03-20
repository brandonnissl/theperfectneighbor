import Head from "next/head";

const CanonicalTag = ({ path }) => {
   
    const canonicalUrl = `{process.env.NEXTAUTH_URL}\{path}`
    return (
      <Head>
        <link rel="canonical" href={canonicalUrl}/>
      </Head>
    );
  };
  
  export default CanonicalTag;