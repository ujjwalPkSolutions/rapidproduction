import { useEffect } from "react";
import Head from "next/head";
import "../../app/globals.css";

const BlogPost = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  const { title, metaTags, content, pageH1, pageH2, about1, about2 } = blog;

  useEffect(() => {
    if (metaTags && typeof metaTags === "string") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(metaTags, "text/html");
      const metaElements = doc.head.querySelectorAll("meta");

      metaElements.forEach((metaElement) => {
        const metaTag = document.createElement("meta");
        metaTag.name = metaElement.getAttribute("name");
        metaTag.content = metaElement.getAttribute("content");
        document.head.appendChild(metaTag);
      });
    }
  }, [metaTags]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {metaTags && (
          <head dangerouslySetInnerHTML={{ __html: metaTags }} />
        )}
      </Head>

      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {pageH1 || title}
        </h1>
        <h2 className="text-xl font-semibold">{pageH2}</h2>

        {about1 && <div>{about1}</div>}
        {about2 && <div>{about2}</div>}

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:5000/api/blogs/${slug}`);
  const blog = await res.json();

  return {
    props: { blog },
  };
}

export default BlogPost;
