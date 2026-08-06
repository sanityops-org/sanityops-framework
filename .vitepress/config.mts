import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SanityOps',
  description: 'AI Agent Continuous Governance Framework',
  lastUpdated: true,

  appearance: 'dark',

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/sanityops-logo.svg' }],
  ],

  themeConfig: {
    logo: {
      light: '/sanityops-logo.svg',
      dark: '/sanityops-logo.svg',
    },
    logoText: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview/v1.0' },
      { text: 'Core', link: '/core/v1.0' },
      { text: 'Relevance', link: '/relevance/v1.0' },
      { text: 'Risk', link: '/risk/explicit-v1.0' },
      { text: 'Inspect', link: '/inspect/prompt-v1.0' },
      { text: 'Compare', link: '/compare/with-promptfoo' },
    ],

    sidebar: {
      '/overview/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview v1.0', link: '/overview/v1.0' },
          ],
        },
      ],
      '/core/': [
        {
          text: 'Core',
          items: [
            { text: 'Core v1.0', link: '/core/v1.0' },
          ],
        },
      ],
      '/relevance/': [
        {
          text: 'Relevance',
          items: [
            { text: 'Relevance v1.0', link: '/relevance/v1.0' },
          ],
        },
      ],
      '/quality/': [
        {
          text: 'Quality Dimensions',
          items: [
            { text: 'RAG-Agent v1.0', link: '/quality/rag-agent-v1.0' },
            { text: 'Tool-Agent v1.0', link: '/quality/tool-agent-v1.0' },
          ],
        },
      ],
      '/risk/': [
        {
          text: 'Security & Risk',
          items: [
            { text: 'Explicit Risk v1.0', link: '/risk/explicit-v1.0' },
            { text: 'Implicit Risk v1.0', link: '/risk/implicit-v1.0' },
          ],
        },
      ],
      '/inspect/': [
        {
          text: 'Inspect Specifications',
          items: [
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
      message: 'Released under the CC BY 4.0 License.',
      copyright: 'Copyright © 2026 SanityOps Working Group',
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
