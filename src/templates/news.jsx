import React from "react";
import { Link, graphql } from "gatsby";

//Components
import Layout from "../components/layout";
import TitledContainer from "../components/titledContainer";
import RRenderer from "../components/richtextRenderer";

//Assets
import "./news.scss";
import Seo from "../components/seo";

const News = ({ data, pageContext }) => {
  const { title, date, content, author } = data.news;
  const { edges } = data.otherNews;

  const generateDate = (theDate) => {
    const rDate = new Date(theDate);

    const mapMonth = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov","Dec"
    ];

    return `${
      mapMonth[rDate.getMonth()]
    } ${rDate.getDate()}, ${rDate.getFullYear()}`;
  };

  const genereateSideList = () => {
    return edges.map(({ node: { title, ctaLink } }) => ({
      title,
      ctaLink: `${pageContext.locale}/${ctaLink}`,
    }));
  };

  return (
    <Layout inverted>
      <Seo title={title} />
      <div className="mt-16 lg:mt-10" />
      <TitledContainer sideList={genereateSideList()} title="News Release">
        <div className="px-6 py-8 bg-primary rounded-lg">
          <h4 className="text-primary mb-2">{title}</h4>
          <span className="text-text font-xs block uppercase">
            {generateDate(date)}
          </span>
          {author && (
            <span className="text-text font-xs block uppercase mt-2">
              {author}
            </span>
          )}
        </div>
        <div className="pt-4 lg:pt-8 px-2 lg:px-8">
          <RRenderer
            data={content}
            config={{
              p: "text-text",
            }}
          />
          <div className="pt-4">
            <Link
              to={`/${pageContext.locale}/news`}
              className="text-secondary underline uppercase font-xs"
            >
              {"<"} Back to Articles
            </Link>
          </div>
        </div>
      </TitledContainer>
    </Layout>
  );
};

export const query = graphql`
  query SingleNewsPageQuery($slug: String) {
    news: contentfulNews(ctaLink: { eq: $slug }) {
      author
      ctaLink
      ctaText
      title
      date
      content {
        raw
      }
    }

    otherNews: allContentfulNews(
      filter: { ctaLink: { ne: $slug }, node_locale: { eq: "en-US" } }
      limit: 3
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          title
          ctaLink
        }
      }
    }
  }
`;

export default News;
