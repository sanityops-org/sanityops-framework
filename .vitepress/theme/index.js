import DefaultTheme from 'vitepress/theme'
import { h, onMounted, nextTick } from 'vue'
import { useRouter } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(FrameNavPatcher),
      'home-features-after': () => h(DmcBanner),
    })
  },
}

// DMC preview banner — home page, below the features cards
const DmcBanner = () =>
  h('div', { class: 'dmc-banner' }, [
    h('span', { class: 'dmc-banner-badge' }, 'New · Preview'),
    h('span', { class: 'dmc-banner-text' }, 'Tops the charts. Fails in prod. Real-world deployability scoring for derivative models.'),
    h('a', { class: 'dmc-banner-link', href: '/DMC/DMC-v1.4.html' }, 'Explore DMC →'),
  ])

// Internal component that patches nav group buttons with landing page links
const FrameNavPatcher = {
  setup() {
    const router = useRouter()
    let observer = null

    // Map nav button text (prefix match) → landing page route
    const LANDING_MAP = {
      Framework: '/framework/read-the-framework',
      Inspect: '/inspect/',
      Risk: '/risk/',
      Quality: '/quality/',
      Ecosystem: '/compare/',
      Community: '/about/',
    }

    function patch() {
      const groups = document.querySelectorAll('.VPNavBarMenuGroup')
      groups.forEach((group) => {
        if (group.dataset.patched === '1') return
        const btn = group.querySelector('button')
        if (!btn) return
        const text = (btn.textContent || '').trim().replace(/\s+/g, ' ')
        const route = Object.entries(LANDING_MAP).find(([key]) => text.startsWith(key))
        if (!route) return
        group.dataset.patched = '1'
        btn.addEventListener('click', (e) => {
          if (window.innerWidth < 960) return
          e.stopPropagation()
          e.preventDefault()
          router.go(route[1])
        })
      })
    }

    onMounted(() => {
      nextTick(() => {
        patch()
        observer = new MutationObserver(patch)
        observer.observe(document.body, { childList: true, subtree: true })
      })
    })

    return () => null
  },
}
