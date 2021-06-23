/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import urlJoin from "url-join"

function SEO({
  description,
  lang,
  meta,
  title,
  author: itemAuthor,
  authorImage,
  imageSource,
  imageAlt,
  location,
  pageType,
  item,
  siteMetadata,
}) {
  if (!siteMetadata) {
    const queryData = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              title
              description
              defaultSocialImageUrl
              author
              siteUrl
              keywords
              telegram
              iconUrl
            }
          }
        }
      `
    )
    siteMetadata = queryData.site.siteMetadata
  }

  const { locale } = useLocalization()
  const metaDescription = description || siteMetadata.description
  const author = itemAuthor || siteMetadata.author
  const siteUrl = siteMetadata.siteUrl
  const keywords = siteMetadata.keywords || []
  const avatarImage = authorImage || siteMetadata.iconUrl
  const getImagePath = (imageURI) => {
    if (
      !imageURI.match(
        `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
      )
    )
      return urlJoin(siteUrl, withPrefix(imageURI))

    return imageURI
  }

  const image = imageSource
    ? getImagePath(imageSource)
    : siteMetadata.defaultSocialImageUrl

  const imageAltText = imageAlt || metaDescription
  const siteTitle = siteMetadata.title
  const telegram = siteMetadata.telegram
  const pageTitle = `${title} - ${siteTitle}`
  const authorJSONLD = {
    "@type": `Person`,
    name: author,
  }

  const logoJSONLD = {
    "@type": `ImageObject`,
    url: avatarImage ? getImagePath(avatarImage) : null,
    "@id": urlJoin(siteUrl, withPrefix(`#logo`)),
    caption: `${siteTitle} Logo`,
  }

  const schemaOrgJSONLD = [
    {
      "@context": `http://schema.org`,
      "@type": `WebSite`,
      "@id": urlJoin(siteUrl, withPrefix(`#website`)),
      url: withPrefix(siteUrl),
      name: siteTitle,
      image: logoJSONLD,
    },
  ]
  if (pageType === `detail`) {
    const postURL = urlJoin(siteUrl, location.pathname)
    const datePublished = new Date(item.date)
    schemaOrgJSONLD.push(
      {
        "@context": `http://schema.org`,
        "@type": `BreadcrumbList`,
        itemListElement: [
          {
            "@type": `ListItem`,
            position: 1,
            item: {
              "@id": postURL,
              name: pageTitle,
              image,
            },
          },
        ],
      },
      {
        "@context": `http://schema.org`,
        "@type": `BlogPosting`,
        url: postURL,
        name: pageTitle,
        headline: pageTitle,
        image: { "@type": `ImageObject`, url: image },
        author: authorJSONLD,
        publisher: {
          ...authorJSONLD,
          "@type": `Organization`,
          logo: logoJSONLD,
        },
        datePublished,
        description: metaDescription,
      }
    )
  }
  return (
    <Helmet
      htmlAttributes={{
        lang: lang || locale,
      }}
      title={pageTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords.join(`,`),
        },
        {
          property: `og:site_name`,
          content: siteTitle,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          image
            ? [
                {
                  name: `og:image`,
                  content: image,
                },
                {
                  name: `og:image:alt`,
                  content: imageAltText,
                },
                {
                  name: `twitter:image`,
                  content: image,
                },
                {
                  name: `twitter:image:alt`,
                  content: imageAltText,
                },
                {
                  name: `twitter:card`,
                  content: `summary_large_image`,
                },
              ]
            : [
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
              ]
        )
        .concat(
          telegram
            ? [
                {
                  name: `telegram:channel`,
                  content: telegram,
                },
              ]
            : []
        )
        .concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.string,
}

export default SEO
