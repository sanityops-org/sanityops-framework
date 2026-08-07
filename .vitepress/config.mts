import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SanityOps',
  description: 'AI Agent Continuous Governance Framework',
  lastUpdated: true,

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  head: [
    // TODO: SVG favicon may not be supported by all browsers; replace with .ico or .png when available
    ['link', { rel: 'icon', href: '/sanityops-logo.svg' }],
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
            { text: 'Get Started', link: '/framework/get-started' },
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
            { text: 'Compare with Promptfoo', link: '/compare/with-promptfoo' },
            { text: 'Compare with RAGAS', link: '/compare/with-ragas' },
            { text: 'Compare with Skillspector', link: '/compare/with-skillspector' },
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
      message: 'v1.0 · Licensed under CC BY 4.0',
      copyright: 'Copyright © 2026 SanityOps',
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
