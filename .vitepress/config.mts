import { defineConfig, type HeadConfig } from 'vitepress'

const hostname = 'https://www.sanityops.org'

// Map a source file (e.g. `framework/index.md`) to its public URL.
function pageUrl(relativePath: string): string {
  const path = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '.html')
  return `${hostname}/${path}`
}

// Shared Community sidebar — referenced by the /community/ route prefix
// so the left navigation stays identical on every Community page.
const communitySidebar = [
  {
    text: 'Community',
    link: '/community/',
    items: [
      { text: 'Try the Tools', link: '/framework/try-the-tools' },
      { text: 'Samples', link: '/samples/' },
      { text: 'FAQ', link: '/framework/FAQ' },
      { text: 'Discussions', link: 'https://github.com/sanityops-org/sanityops-framework/discussions' },
      { text: 'About SanityOps', link: '/community/about' },
      { text: 'Partnership', link: '/community/partnership' },
      { text: 'Contact', link: '/community/about#contact' },
    ],
  },
]

export default defineConfig({
  title: 'SanityOps',
  description: 'AI Agent Continuous Governance Framework',
  lang: 'en-US',
  lastUpdated: true,

  // Default to dark appearance (the toggle stays available)
  appearance: 'dark',

  // GitHub-facing and internal files, not part of the website
  srcExclude: [
    'README.md',
    'AGENTS.md',
    'RELEASE-NOTE-v1.0.md',
    'RELEASE-NOTE-v1.1.md',
    'RELEASE-NOTE-v1.2.md',
    'inspect-skill/_process/**', // fetch workspace + drafting logs, not website content
  ],

  sitemap: {
    hostname,
  },

  transformHead({ pageData }) {
    const url = pageUrl(pageData.relativePath)
    const siteDescription =
      'An open, vendor-neutral framework for AI agent governance. Built on logical-artifact defect inspection, extending into Risk scan and Quality assessment.'
    const title =
      pageData.title && !pageData.title.includes('SanityOps')
        ? `${pageData.title} — SanityOps`
        : (pageData.title || 'SanityOps — AI Agent Continuous Governance Framework')
    const description = pageData.description || siteDescription

    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]

    // Home page only: Organization + WebSite structured data.
    if (pageData.relativePath === 'index.md') {
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${hostname}/#organization`,
              name: 'Sanity AI Labs',
              alternateName: 'SanityOps',
              url: `${hostname}/`,
              logo: `${hostname}/sanityops-logo.png`,
              sameAs: ['https://github.com/sanityops-org/sanityops-framework'],
            },
            {
              '@type': 'WebSite',
              '@id': `${hostname}/#website`,
              url: `${hostname}/`,
              name: 'SanityOps',
              description: 'AI Agent Continuous Governance Framework',
              inLanguage: 'en-US',
              publisher: { '@id': `${hostname}/#organization` },
            },
          ],
        }),
      ])
    }

    return head
  },

  vite: {
    server: {
      allowedHosts: true,
      watch: {
        ignored: (file: string) => file.includes('/.git/') || file.includes('\\.git\\') || file.endsWith('.crdownload'),
      },
      fs: {
        deny: ['.git'],
      },
    },
    plugins: [
      {
        name: 'exclude-dotgit',
        enforce: 'pre',
        resolveId(id) {
          if (id.includes('/.git/') || id.includes('\\.git\\')) {
            return { id, external: true }
          }
        },
        load(id) {
          if (id.includes('/.git/') || id.includes('\\.git\\')) {
            return ''
          }
        },
      },
      {
        name: 'fix-decode-uri',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            try {
              if (req.url) decodeURI(req.url)
            } catch {
              res.statusCode = 400
              res.end()
              return
            }
            next()
          })
        },
      },
    ],
  },

  head: [
    ['link', { rel: 'icon', href: '/sanityops-logo-github-favicon.png' }],
    ['link', { rel: 'stylesheet', href: '/cookie-consent.css' }],
    ['script', { src: '/cookie-consent.js' }],

    // Open Graph (static fields; title/description/url are set per-page in transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://www.sanityops.org/sanityops-logo.png' }],
    ['meta', { property: 'og:site_name', content: 'SanityOps' }],

    // Twitter Card (static fields; title/description are set per-page in transformHead)
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: 'https://www.sanityops.org/sanityops-logo.png' }],
  ],

  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },
    siteTitle: false,

    nav: [
      {
        text: 'Framework',
        items: [
          { text: 'Overview', link: '/framework/overview' },
          { text: 'Core', link: '/framework/core' },
          { text: 'Relevance', link: '/framework/relevance' },
        ],
      },
      {
        text: 'Inspect',
        items: [
          { text: 'Prompt', link: '/inspect/prompt' },
          { text: 'Skill', link: '/inspect/skill' },
          { text: 'Tool', link: '/inspect/tool' },
          { text: 'Cross', link: '/inspect/cross' },
          { text: 'Permission', link: '/inspect/permission' },
        ],
      },
      {
        text: 'Risk',
        items: [
          { text: 'Explicit', link: '/risk/explicit' },
          { text: 'Implicit', link: '/risk/implicit' },
        ],
      },
      {
        text: 'Quality',
        items: [
          { text: 'RAG-Agent', link: '/quality/rag-agent' },
          { text: 'Tool-Agent', link: '/quality/tool-agent' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Positioning', link: '/compare/sanityops-positioning' },
          { text: 'SanityOps and FDE', link: '/compare/sanityops-and-fde' },
          { text: 'SanityOps and Harness', link: '/compare/sanityops-and-harness' },
          { text: 'vs. Promptfoo', link: '/compare/compare-with-promptfoo' },
          { text: 'vs. RAGAS', link: '/compare/compare-with-ragas' },
          { text: 'vs. SkillSpector', link: '/compare/compare-with-skillspector' },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'Try the Tools', link: '/framework/try-the-tools' },
          { text: 'Samples', link: '/samples/' },
          { text: 'FAQ', link: '/framework/FAQ' },
          { text: 'Discussions', link: 'https://github.com/sanityops-org/sanityops-framework/discussions' },
          { text: 'About', link: '/community/about' },
          { text: 'Partnership', link: '/community/partnership' },
          { text: 'Contact', link: '/community/about#contact' },
        ],
      },
    ],

    sidebar: {
      '/framework/': [
        {
          text: 'Framework',
          link: '/framework/',
          items: [
            { text: 'Overview', link: '/framework/overview' },
            { text: 'Core', link: '/framework/core' },
            { text: 'Relevance', link: '/framework/relevance' },
          ],
        },
      ],
      '/quality/': [
        {
          text: 'Quality',
          link: '/quality/',
          items: [
            { text: 'RAG-Agent', link: '/quality/rag-agent' },
            { text: 'Tool-Agent', link: '/quality/tool-agent' },
          ],
        },
      ],
      '/risk/': [
        {
          text: 'Risk',
          link: '/risk/',
          items: [
            { text: 'Explicit Risk', link: '/risk/explicit' },
            { text: 'Implicit Risk', link: '/risk/implicit' },
          ],
        },
      ],
      '/inspect/': [
        {
          text: 'Inspect',
          link: '/inspect/',
          items: [
            { text: 'Prompt', link: '/inspect/prompt' },
            { text: 'Skill', link: '/inspect/skill' },
            { text: 'Tool', link: '/inspect/tool' },
            { text: 'Cross', link: '/inspect/cross' },
            { text: 'Permission', link: '/inspect/permission' },
          ],
        },
      ],
      '/compare/': [
        {
          text: 'Ecosystem',
          link: '/compare/',
          items: [
            { text: 'Positioning', link: '/compare/sanityops-positioning' },
            { text: 'SanityOps and FDE', link: '/compare/sanityops-and-fde' },
            { text: 'SanityOps and Harness', link: '/compare/sanityops-and-harness' },
            { text: 'vs. Promptfoo', link: '/compare/compare-with-promptfoo' },
            { text: 'vs. RAGAS', link: '/compare/compare-with-ragas' },
            { text: 'vs. SkillSpector', link: '/compare/compare-with-skillspector' },
          ],
        },
      ],
      '/community/': communitySidebar,
      '/samples/': [
        {
          text: 'Samples',
          link: '/samples/',
          items: [
            { text: 'Medication Information Assistant', link: '/samples/cases/medication-information-assistant' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sanityops-org/sanityops-framework' },
    ],

    footer: {
      message: '<a href="/legal/privacy-policy">Privacy Policy</a> · <a href="/legal/terms-of-service">Terms of Service</a> · <a href="/legal/cookie-policy">Cookie Policy</a> · <a href="/legal/responsible-disclosure-policy">Responsible Disclosure</a> · <a href="/legal/security-statement">Security</a> · <span id="cc-footer-preferences">Cookie Preferences</span> · <a href="mailto:hello@sanityops.org">Contact: hello@sanityops.org</a>',
      copyright: 'Copyright © 2026 Sanity AI Labs · v1.0 · Licensed under CC BY-SA 4.0',
    },

    outline: {
      level: 'deep',
      label: 'On This Page',
    },

    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
  },
})
