module.exports = {
    siteMetadata: {
        title: `Torrentz2 Search Engine - Torrentz Is Back | Torrentz3`,
        description: `Torrentz2 Search Engine is on Torrentz2.eu but now it is here in 2019 - You Can Download All Games, Movies, Software, Plugins Etc. Torrentz2 2019 | Note: we are not forcing you - Tamilrockers, Torrentz.`,
        author: `@TorrentZ`,
        siteUrl: `https://www.torrentz2.link`,
        keywords: `Torrentz2, Torrentz, Torrentz3, Torrentz2 search engine, Torrentz2 Proxy, Torrent search, Piratebay alternative, Torrentz2 link, extratorrents alternative, torrentz2eu, torrentz2.eu, Kickass alternative`,
        image: "scr/images/torrentz_logo.png",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-T4W3B6G",

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                // Defaults to null
                defaultDataLayer: { platform: "gatsby" },

                // Specify optional GTM environment details.
                // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
                // dataLayerName: "YOUR_DATA_LAYER_NAME",
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-152861076-1",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                optimizeId: "GTM-56TMHXD",
                // Enables Google Optimize Experiment ID
                // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Any additional optional fields
                // sampleRate: 5,
                // siteSpeedSampleRate: 10,
                // cookieDomain: "example.com",
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
            }
        },

        {
            resolve: "gatsby-plugin-verify-bing",
            options: {
              userIds: ["FC2FD2972AEA6E7DCE558732C9D379CF"],
              xmlFileName: "BingSiteAuth.xml" // optional
            }
          
        },

    

        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/search/*`] },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sitemap`,
        'gatsby-plugin-robots-txt',
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `Torrentz2`,
            description: `Torrentz2 is meta serach engines to download a movies, games, documents,etc. in torrent world.`,
            lang: `en`,
            short_name: `Torrentz2`,
            start_url: `/`,
            background_color: `#3C6995`,
            theme_color: `#3C6995`,
            display: `minimal-ui`,
            icon: `src/images/torrentz_logo.png`, // This path is relative to the root of the site.
          },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
