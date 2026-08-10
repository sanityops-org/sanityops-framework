import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SanityOps',
  description: 'AI Agent Continuous Governance Framework',
  lang: 'en-US',
  lastUpdated: true,

  sitemap: {
    hostname: 'https://www.sanityops.org',
  },

  vite: {
    server: {
      allowedHosts: true,
      watch: {
        ignored: ['**/.git/**', '**/*.crdownload'],
      },
      fs: {
        deny: ['.git'],
      },
    },
    plugins: [
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

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SanityOps — AI Agent Continuous Governance Framework' }],
    ['meta', { property: 'og:description', content: 'An open, vendor-neutral framework for AI agent governance. Built on logical-artifact defect inspection, extending into Risk scan and Quality assessment.' }],
    ['meta', { property: 'og:image', content: 'https://www.sanityops.org/sanityops-logo.png' }],
    ['meta', { property: 'og:url', content: 'https://www.sanityops.org' }],
    ['meta', { property: 'og:site_name', content: 'SanityOps' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'SanityOps — AI Agent Continuous Governance Framework' }],
    ['meta', { name: 'twitter:description', content: 'An open, vendor-neutral framework for AI agent governance. Built on logical-artifact defect inspection, extending into Risk scan and Quality assessment.' }],
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
          { text: 'Overview', link: '/framework/overview-v1.0' },
          { text: 'Core', link: '/framework/core-v1.0' },
          { text: 'Relevance', link: '/framework/relevance-v1.0' },
        ],
      },
      {
        text: 'Inspect',
        items: [
          { text: 'Prompt', link: '/inspect/prompt-v1.0' },
          { text: 'Skill', link: '/inspect/skill-v1.0' },
          { text: 'Tool', link: '/inspect/tool-v1.0' },
          { text: 'Cross', link: '/inspect/cross-v1.0' },
        ],
      },
      {
        text: 'Risk',
        items: [
          { text: 'Explicit', link: '/risk/explicit-v1.0' },
          { text: 'Implicit', link: '/risk/implicit-v1.0' },
        ],
      },
      {
        text: 'Quality',
        items: [
          { text: 'RAG-Agent', link: '/quality/rag-agent-v1.0' },
          { text: 'Tool-Agent', link: '/quality/tool-agent-v1.0' },
        ],
      },
      { text: 'About', link: '/about' },
      { text: 'Community', link: 'https://github.com/sanityops-org/sanityops-framework/discussions' },
    ],

    sidebar: {
      '/framework/': [
        {
          text: 'Framework',
          items: [
            { text: 'Read the Framework', link: '/framework/read-the-framework' },
            { text: 'Try the Tools', link: '/framework/try-the-tools' },
            { text: 'Overview v1.0', link: '/framework/overview-v1.0' },
            { text: 'Core v1.0', link: '/framework/core-v1.0' },
            { text: 'Relevance v1.0', link: '/framework/relevance-v1.0' },
          ],
        },
      ],
      '/quality/': [
        {
          text: 'Quality',
          items: [
            { text: 'Overview', link: '/quality/' },
            { text: 'RAG-Agent v1.0', link: '/quality/rag-agent-v1.0' },
            { text: 'Tool-Agent v1.0', link: '/quality/tool-agent-v1.0' },
          ],
        },
      ],
      '/risk/': [
        {
          text: 'Risk',
          items: [
            { text: 'Overview', link: '/risk/' },
            { text: 'Explicit Risk v1.0', link: '/risk/explicit-v1.0' },
            { text: 'Implicit Risk v1.0', link: '/risk/implicit-v1.0' },
          ],
        },
      ],
      '/inspect/': [
        {
          text: 'Inspect',
          items: [
            { text: 'Overview', link: '/inspect/' },
            { text: 'Prompt v1.0', link: '/inspect/prompt-v1.0' },
            { text: 'Skill v1.0', link: '/inspect/skill-v1.0' },
            { text: 'Tool v1.0', link: '/inspect/tool-v1.0' },
            { text: 'Cross v1.0', link: '/inspect/cross-v1.0' },
          ],
        },
      ],
      '/compare/': [
        {
          text: 'Comparison',
          items: [
            { text: 'Compare with Promptfoo', link: '/compare/compare-with-promptfoo' },
            { text: 'Compare with RAGAS', link: '/compare/compare-with-ragas' },
            { text: 'Compare with Skillspector', link: '/compare/compare-with-skillspector' },
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
      message: '<a href="/legal/privacy-policy">Privacy Policy</a> · <a href="/legal/terms-of-service">Terms of Service</a> · <a href="/legal/cookie-policy">Cookie Policy</a> · <a href="/legal/security-statement">Security</a> · <span id="cc-footer-preferences">Cookie Preferences</span>',
      copyright: 'Copyright © 2026 Sanity AI Labs · v1.0 · Licensed under CC BY-SA 4.0',
    },

    editLink: {
      pattern: '',
      text: '',
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
