import _ from 'lodash'

import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress';
import tabsPlugin from '@snippetors/vuepress-plugin-tabs';
import { feedPlugin } from 'vuepress-plugin-feed2';
import { containerPlugin } from '@vuepress/plugin-container';
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { path } from '@vuepress/utils'
import { openGraphPlugin } from 'vuepress-plugin-open-graph'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { redirectPlugin } from "vuepress-plugin-redirect";
import VitePluginNunjucksMd from './vite-plugin-nunjucks'

// sidebars
import sidebarAdmin from './sidebar-menus/administration'
import sidebarUpgrading from './sidebar-menus/upgrading'
import sidebarUserGuide from './sidebar-menus/user-guide'
import sidebarCommandLineTools from './sidebar-menus/command-line-tools'
import sidebarDeveloper from './sidebar-menus/plugin-development'
import sidebarLearning from './sidebar-menus/learning'
import sidebarHistory from './sidebar-menus/history';
import sidebarAbout from './sidebar-menus/about';

import markdownItInclude from 'markdown-it-include'
import markdownItDeflist from 'markdown-it-deflist'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'

// navbars
import navbarAbout from './navbar-menus/about';
import navbarUserGuide from './navbar-menus/user-guide';
import navbarLearning from './navbar-menus/learning';
import navbarAdmin from './navbar-menus/administration';
import navbarDevelopment from './navbar-menus/development';

//Get setup variables
import setup from './setup';
console.log(setup)

export default defineUserConfig({
  debug: true,
  title: '',
  description: '',
  shouldPrefetch: false,
  base: `/${setup.base ? setup.base + '/' : ''}`,
  head: [
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5QNBBN6');
    `],
    ['script', { src: '/js/gtm.js', defer: true }]
  ],
  extendMarkdown: md => {
    md.use(markdownItInclude, {
      root: path.resolve(__dirname, "../")
    });
    md.use(markdownItDeflist);
    md.use(markdownItImplicitFigures, {
      figcaption: true
    });
  },
  define: {
    API_VERSION: setup.apiVersion,
    API_DEP_VERSION: setup.apiDepVersion,
    API_DEP_RELEASE: setup.apiDepRelease,
    API_MIN_VERSION: setup.apiMinVersion,
    VERSION: setup.rundeckVersion,
    VERSION_FULL: setup.rundeckVersionFull,
    CLI_VERSION: setup.rundeckCLIVersion
  },


  bundler: viteBundler({
    // vite bundler options here
    viteOptions: {
      plugins:[VitePluginNunjucksMd()]
    }
  }),

  //Plugins Config
  plugins: [
    registerComponentsPlugin({
        components: {
            RundeckSwaggerUi: path.resolve(__dirname, './components/RundeckSwaggerUi.vue'),
          },
      }),
    pwaPlugin({
        skipWaiting: false,
    }),
    pwaPopupPlugin({
    locales: {
        '/': {
            message: 'New content is available.',
            buttonText: 'Refresh',
        },
    }
    }),
    tabsPlugin([""]),
    redirectPlugin({
        config: {
            '/manual/01-introduction.html' : '/introduction/introduction.html',
            '/manual/03-getting-started.html' : '/learning/index.html',
            '/manual/02-getting-help.html' : '/introduction/getting-help.html',
            '/administration/configuration/license.html' : '/administration/license.html',
            '/manual/servicenow-app.html' : '/manual/integrations/servicenow-app.html',
            '/administration/security/key-storage.html' : '/manual/key-storage/key-storage.html',
            '/administration/key-storage/key-storage.html' : '/manual/key-storage/key-storage.html',
            '/administration/security/storage-plugins.html' : '/manual/key-storage/key-plugins.html',
            '/administration/key-storage/storage-plugins.html' : '/manual/key-storage/key-plugins.html',
            '/administration/security/storage-plugins/cyberark-storage.html' : '/manual/key-storage/storage-plugins/cyberark-storage.html',
            '/administration/key-storage/storage-plugins/cyberark-storage.html' : '/manual/key-storage/storage-plugins/cyberark-storage.html',
            '/administration/security/storage-plugins/thycotic-storage.html' : '/manual/key-storage/storage-plugins/thycotic-storage.html',
            '/administration/key-storage/storage-plugins/thycotic-storage.html' : '/manual/key-storage/storage-plugins/thycotic-storage.html',
            '/administration/security/storage-plugins/vault.html' : '/manual/key-storage/storage-plugins/vault.html',
            '/manual/command-line-tools/index.html' : '/rd-cli/index.html',
            '/manual/command-line-tools/rd.html' : '/rd-cli/index.html',
            '/manual/command-line-tools/rd-acl.html' : '/rd-cli/rd-ext-acl.html',
            '/history/cves/' : '/history/CVEs/',
            '/introduction/introduction.html' : '/about/introduction.html',
            '/introduction/getting-help.html' : '/about/getting-help.html',
            '/administration/architecture-and-deployment/system-architecture.html' : '/about/enterprise/index.html',
            '/administration/architecture-and-deployment/aws.html' : '/administration/install/aws.html',
            '/administration/projects/' : '/manual/projects/',
            '/manual/12-webhooks.html' : '/manual/webhooks.html',
            '/history/4_0_x/version-4.0.0.html' : '/history/4_x/version-4.0.0.html',
            '/manual/workflow-steps/aws-athena' : '/manual/workflow-steps/amazon-athena.html',
            '/enterprise/quickstart.html' : '/enterprise/index.html'
        }
      }),
    feedPlugin({
        hostname: 'https://docs.rundeck.com',
        rss: true,
        json: true,
        filter: ({ frontmatter }: Page): boolean =>
            frontmatter.feed !== undefined,
        sort: ({ frontmatter }: Page): number => _.reverse(_.sortBy(entries, frontmatter.date))
    }),
    openGraphPlugin({
       host: 'https://docs.rundeck.com',
       twitterSite: 'rundeck',
      }),
    containerPlugin(
        {
            type: 'deprecated',
            locales: {
                '/': {
                    defaultInfo: 'Deprecation Warning',
                }
            }
        }
    ),
    containerPlugin(
        {
            type: 'enterprise',
            locales: {
                '/': {
                    defaultInfo: 'Available in PagerDuty Process Automation Commercial products.',
                }
            }
        }
    ),
    containerPlugin(
        {
            type: 'tutorial',
            locales: {
                '/': {
                    defaultInfo: 'This tutorial is based on example code in the Welcome Projects.',
                }
            }
        },
    ),
    containerPlugin(
        {
            type: 'incubating',
            locales: {
                '/': {
                    defaultInfo: 'Incubating: This feature or API is new! We may still have a few bugs or change some functionality in the future.',
                }
            }
        }
    ),
    containerPlugin(
        {
            type: 'betafeature',
            locales: {
                '/': {
                    defaultInfo: 'BETA FEATURE',
                }
            }
        }
    ),
    copyCodePlugin({
        locales: {
            "/": {
              copy: "Copy Code",
            },
        }
    }),
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
    }),
    docsearchPlugin({
        locales: {
            '/': {
                placeholder: 'Search Documentation',
                translations: {
                button: {
                    buttonText: 'Search Documentation',
                },
                },
            }
        },
        appId: 'GRSXNRCDRG',
        apiKey: 'c463f74d6f36a5af808650e0f69aadfa',
        indexName: 'prod_rundeck_docs',
        searchParameters: {
            hitsPerPage: 10,
            facetFilters: [ `version:${setup.base}` ]
        },
    })
  ],

  //Theme Config
  theme: defaultTheme({
    logo: 'https://www.rundeck.com/hubfs/Pager%20Duty%20Branding/RundeckbyPagerDuty.svg',
    repo: 'rundeck/docs',
    docsDir: 'docs',
    docsBranch: setup.branch,
    colorMode: 'light',
    colorModeSwitch: false,
    lastUpdated: true,
    contributors: false,
    themePlugins: {
      activeHeaderLinks: true,
      externalLinkIcon: true,
    },
    navbar: [
      {
        text: 'About',
        children: navbarAbout
      },
      {
        text: 'User Guide',
        children: navbarUserGuide
      },
      {
        text: 'Administration',
        children: navbarAdmin
      },
      {
        text: 'Learning',
        children: navbarLearning
      },
      {
        text: 'Development',
        children: navbarDevelopment
      }
    ],
    sidebarDepth: 2,
    sidebar: {
       '/about/': sidebarAbout,
       '/administration/': sidebarAdmin,
       '/upgrading/': sidebarUpgrading,
       '/rd-cli/': sidebarCommandLineTools,
       '/manual/': sidebarUserGuide,
       '/learning/': sidebarLearning,
       '/developer/': sidebarDeveloper,
       '/history/': sidebarHistory,
       '/api/': [
        '/api/rundeck-api-versions.md',
        '/api/rundeck-api.md'
      ],
      '/': [
        ''
      ]
    }
    // }
  })
})
