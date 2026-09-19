// Readability probe: text overlaps, fonts under 13px, clipped/offscreen text, horizontal overflow — per page × viewport.
// Usage: node scripts/readability-probe.mjs <out.json> [baseUrl=http://localhost:3217] [pages=/,/about,...]
// Prints one line per page×viewport; "!!" means issues. Ignores .sr-only and the dev-only Kit placeholder note.
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
const puppeteer = createRequire('/Users/marcostalon/Developer/grow-reference-tools/package.json')('puppeteer')
const base = process.argv[3] || 'http://localhost:3217'
const browser = await puppeteer.launch({ headless: true })
const report = {}
const PAGES = (process.argv[4] ? process.argv[4].split(',') : ['/', '/about', '/brain-test', '/privacy', '/terms', '/subscription-terms'])
const VIEWS = [[1440, 900], [1024, 768], [768, 1024], [390, 844], [375, 667], [320, 568]]
for (const path of PAGES) {
  for (const [w, h] of VIEWS) {
    const page = await browser.newPage()
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
    await page.goto(base + path, { waitUntil: 'networkidle0' })
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important} nextjs-portal{display:none!important}' })
    // force every reveal visible + hover state off
    await page.evaluate(() => { document.querySelectorAll('[data-reveal],[style]').forEach(()=>{}); })
    // scroll through to fire reveals, then settle
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y <= H; y += Math.round(h * 0.5)) { await page.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 90)) }
    await page.evaluate(() => scrollTo(0, 0)); await new Promise(r => setTimeout(r, 800))
    // also open hover hints: mark every sector label as on
    await page.evaluate(() => document.querySelectorAll('.sector-label').forEach(l => l.setAttribute('data-on', '')))
    await new Promise(r => setTimeout(r, 400))
    const res = await page.evaluate(() => {
      const isVisible = (el) => { const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.05) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 }
      // leaf text boxes: elements whose direct text nodes have content
      const boxes = []
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      let n
      while ((n = walker.nextNode())) {
        const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue
        const el = n.parentElement; if (!el || el.closest('script,style,nextjs-portal,[aria-hidden="true"] svg text') ) continue
        if (el.closest('.sr-only, .skip-link, p.font-mono')) continue
        if (!isVisible(el)) continue
        const range = document.createRange(); range.selectNodeContents(n)
        const rects = [...range.getClientRects()].filter(r => r.width > 1 && r.height > 1)
        if (!rects.length) continue
        const cs = getComputedStyle(el)
        for (const r of rects) boxes.push({ t: t.slice(0, 40), el, sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''), x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, fs: parseFloat(cs.fontSize), lh: cs.lineHeight, ff: cs.fontFamily.split(',')[0], fw: cs.fontWeight, color: cs.color })
      }
      const overlaps = []
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j]
        if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue
        const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
        if (ix > 2 && iy > 2) overlaps.push({ a: a.t, aSel: a.sel, b: b.t, bSel: b.sel, ix: Math.round(ix), iy: Math.round(iy), y: Math.round(a.y) })
      }
      const tiny = boxes.filter(b => b.fs < 13 && !b.el.closest('[data-probe-ignore]')).map(b => ({ t: b.t, sel: b.sel, fs: b.fs })).filter((v, i, arr) => arr.findIndex(x => x.sel === v.sel && x.fs === v.fs) === i)
      const fonts = {}; boxes.forEach(b => { const k = b.ff + '/' + b.fw; fonts[k] = (fonts[k] || 0) + 1 })
      // clipped: elements with text that overflow their box while overflow hidden/clip
      const clipped = []
      document.querySelectorAll('body *').forEach(el => { const cs = getComputedStyle(el); if (!/hidden|clip/.test(cs.overflowX) && !/hidden|clip/.test(cs.overflow)) return; if (el.scrollWidth > el.clientWidth + 2 && el.innerText && el.innerText.trim() && !el.matches('.band,.hero,main,body,.hero-brain-layer,.phone-screen,.ladder-bar-wrap,.sr-only,label')) clipped.push({ sel: el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : ''), sw: el.scrollWidth, cw: el.clientWidth }) })
      // text wider than viewport
      const offscreen = boxes.filter(b => b.x < -1 || b.x + b.w > innerWidth + 1).map(b => ({ t: b.t, sel: b.sel, x: Math.round(b.x), right: Math.round(b.x + b.w) }))
      return { overlaps: overlaps.slice(0, 40), tiny, fonts, clipped: clipped.slice(0, 20), offscreen: offscreen.slice(0, 20), scrollWidth: document.documentElement.scrollWidth, textBoxes: boxes.length }
    })
    report[`${path} @${w}`] = res
    const flag = (res.overlaps.length || res.tiny.length || res.clipped.length || res.offscreen.length || res.scrollWidth > w) ? '!!' : 'ok'
    console.log(flag, path, w, `overlaps=${res.overlaps.length} tiny=${res.tiny.length} clipped=${res.clipped.length} offscreen=${res.offscreen.length} sw=${res.scrollWidth}`)
    await page.close()
  }
}
writeFileSync(process.argv[2], JSON.stringify(report, null, 1))
await browser.close()
