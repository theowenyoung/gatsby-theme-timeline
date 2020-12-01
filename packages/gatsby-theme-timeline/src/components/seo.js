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
import path from "path"
function SEO({
  description,
  lang,
  meta,
  title,
  imageSource,
  imageAlt,
  location,
  pageType,
  item,
}) {
  const { site, avatar } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
          childImageSharp {
            fixed(width: 48, height: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  const { locale } = useLocalization()
  const metaDescription = description || site.siteMetadata.description
  const author = site.siteMetadata.author
  const siteUrl = site.siteMetadata.siteUrl
  const avatarImage = avatar.childImageSharp.fixed.src
  const getImagePath = (imageURI) => {
    if (
      !imageURI.match(
        `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
      )
    )
      return path.join(siteUrl, withPrefix(imageURI))

    return imageURI
  }
  const image = imageSource ? getImagePath(imageSource) : null
  const imageAltText = imageAlt || metaDescription
  const siteTitle = site.siteMetadata.title
  const pageTitle = `${title} - ${siteTitle}`
  const authorJSONLD = {
    "@type": `Person`,
    name: author,
  }

  const logoJSONLD = {
    "@type": `ImageObject`,
    url: getImagePath(avatarImage),
    "@id": path.join(siteUrl, withPrefix(`#logo`)),
    caption: `${siteTitle} Logo`,
  }

  const schemaOrgJSONLD = [
    {
      "@context": `http://schema.org`,
      "@type": `WebSite`,
      "@id": path.join(siteUrl, withPrefix(`#website`)),
      url: withPrefix(siteUrl),
      name: siteTitle,
      image: logoJSONLD,
    },
  ]
  if (pageType === `detail`) {
    const postURL = path.join(siteUrl, location.pathname)
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
              name: title,
              image,
            },
          },
        ],
      },
      {
        "@context": `http://schema.org`,
        "@type": `BlogPosting`,
        url: postURL,
        name: title,
        headline: title,
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
          property: `og:title`,
          content: title,
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
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          imageSource
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
