import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SanityOps Framework',
  description: 'AI Agent Continuous Governance Framework',
  lastUpdated: true,

  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: '/sanityops-logo.svg' }],
  ],

  themeConfig: {
    logo: '/sanityops-logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/overview-v1.0' },
      { text: 'Quality', link: '/quality/relevance-v1.0' },
      { text: 'Risk', link: '/risk/risk-explicit-v1.0' },
      { text: 'Inspect', link: '/inspect/inspect-prompt-v1.0' },
      { text: 'Appendix', link: '/appendix/compare-with-promptfoo' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview v1.0', link: '/guide/overview-v1.0' },
            { text: 'Core v1.0', link: '/guide/core-v1.0' },
            { text: 'Knowledge Router', link: '/guide/knowledge-router' },
          ],
        },
      ],
      '/quality/': [
        {
          text: 'Quality Dimensions',
          items: [
            { text: 'Relevance v1.0', link: '/quality/relevance-v1.0' },
            { text: 'RAG-Agent v1.0', link: '/quality/quality-rag-agent-v1.0' },
            { text: 'Tool-Agent v1.0', link: '/quality/quality-tool-agent-v1.0' },
          ],
        },
      ],
      '/risk/': [
        {
          text: 'Security & Risk',
          items: [
            { text: 'Explicit Risk v1.0', link: '/risk/risk-explicit-v1.0' },
            { text: 'Implicit Risk v1.0', link: '/risk/risk-implicit-v1.0' },
          ],
        },
      ],
      '/inspect/': [
        {
          text: 'Inspect Specifications',
          items: [
            { text: 'Prompt v1.0', link: '/inspect/inspect-prompt-v1.0' },
            { text: 'Skill v1.0', link: '/inspect/inspect-skill-v1.0' },
            { text: 'Tool v1.0', link: '/inspect/inspect-tool-v1.0' },
            { text: 'Cross v1.0', link: '/inspect/inspect-cross-v1.0' },
          ],
        },
      ],
      '/appendix/': [
        {
          text: 'Appendix',
          items: [
            { text: 'Compare with Promptfoo', link: '/appendix/compare-with-promptfoo' },
            { text: 'Compare with RAGAS', link: '/appendix/compare-with-ragas' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
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
