import * as __m43476 from 'react/jsx-runtime'
import * as __m71645 from 'react'
import * as __m47167 from './m47167.js'
;('use strict')
let e, i, s
var n,
  r = __m43476,
  a = __m71645
let o = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  l = new Set([...o, 'pathRotation']),
  h = (t, e, i) => (i > e ? e : i < t ? t : i),
  c = { test: (t) => 'number' == typeof t, parse: parseFloat, transform: (t) => t },
  u = { ...c, transform: (t) => h(0, 1, t) },
  d = { ...c, default: 1 },
  p = (t) => Math.round(1e5 * t) / 1e5,
  m = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
  f =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  x = (t, e) => (i) =>
    !!(
      ('string' == typeof i && f.test(i) && i.startsWith(t)) ||
      (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
    ),
  g = (t, e, i) => (s) => {
    if ('string' != typeof s) return s
    let [n, r, a, o] = s.match(m)
    return {
      [t]: parseFloat(n),
      [e]: parseFloat(r),
      [i]: parseFloat(a),
      alpha: void 0 !== o ? parseFloat(o) : 1,
    }
  },
  y = { ...c, transform: (t) => Math.round(h(0, 255, t)) },
  v = {
    test: x('rgb', 'red'),
    parse: g('red', 'green', 'blue'),
    transform: ({ red: t, green: e, blue: i, alpha: s = 1 }) =>
      'rgba(' +
      y.transform(t) +
      ', ' +
      y.transform(e) +
      ', ' +
      y.transform(i) +
      ', ' +
      p(u.transform(s)) +
      ')',
  },
  b = {
    test: x('#'),
    parse: function (t) {
      let e = '',
        i = '',
        s = '',
        n = ''
      return (
        t.length > 5
          ? ((e = t.substring(1, 3)),
            (i = t.substring(3, 5)),
            (s = t.substring(5, 7)),
            (n = t.substring(7, 9)))
          : ((e = t.substring(1, 2)),
            (i = t.substring(2, 3)),
            (s = t.substring(3, 4)),
            (n = t.substring(4, 5)),
            (e += e),
            (i += i),
            (s += s),
            (n += n)),
        {
          red: parseInt(e, 16),
          green: parseInt(i, 16),
          blue: parseInt(s, 16),
          alpha: n ? parseInt(n, 16) / 255 : 1,
        }
      )
    },
    transform: v.transform,
  },
  w = (t) => ({
    test: (e) => 'string' == typeof e && e.endsWith(t) && 1 === e.split(' ').length,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  A = w('deg'),
  j = w('%'),
  M = w('px'),
  T = w('vh'),
  S = w('vw'),
  C = { ...j, parse: (t) => j.parse(t) / 100, transform: (t) => j.transform(100 * t) },
  k = {
    test: x('hsl', 'hue'),
    parse: g('hue', 'saturation', 'lightness'),
    transform: ({ hue: t, saturation: e, lightness: i, alpha: s = 1 }) =>
      'hsla(' +
      Math.round(t) +
      ', ' +
      j.transform(p(e)) +
      ', ' +
      j.transform(p(i)) +
      ', ' +
      p(u.transform(s)) +
      ')',
  },
  E = {
    test: (t) => v.test(t) || b.test(t) || k.test(t),
    parse: (t) => (v.test(t) ? v.parse(t) : k.test(t) ? k.parse(t) : b.parse(t)),
    transform: (t) => ('string' == typeof t ? t : t.hasOwnProperty('red') ? v.transform(t) : k.transform(t)),
    getAnimatableNone: (t) => {
      let e = E.parse(t)
      return ((e.alpha = 0), E.transform(e))
    },
  },
  P =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
  N = 'number',
  B = 'color',
  D =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function F(t) {
  let e = t.toString(),
    i = [],
    s = { color: [], number: [], var: [] },
    n = [],
    r = 0,
    a = e
      .replace(
        D,
        (t) => (
          E.test(t)
            ? (s.color.push(r), n.push(B), i.push(E.parse(t)))
            : t.startsWith('var(')
              ? (s.var.push(r), n.push('var'), i.push(t))
              : (s.number.push(r), n.push(N), i.push(parseFloat(t))),
          ++r,
          '${}'
        ),
      )
      .split('${}')
  return { values: i, split: a, indexes: s, types: n }
}
function V({ split: t, types: e }) {
  let i = t.length
  return (s) => {
    let n = ''
    for (let r = 0; r < i; r++)
      if (((n += t[r]), void 0 !== s[r])) {
        let t = e[r]
        t === N ? (n += p(s[r])) : t === B ? (n += E.transform(s[r])) : (n += s[r])
      }
    return n
  }
}
let R = {
    test: function (t) {
      return isNaN(t) && 'string' == typeof t && (t.match(m)?.length || 0) + (t.match(P)?.length || 0) > 0
    },
    parse: function (t) {
      return F(t).values
    },
    createTransformer: function (t) {
      return V(F(t))
    },
    getAnimatableNone: function (t) {
      let e = F(t)
      return V(e)(
        e.values.map((t, i) =>
          ((t, e) =>
            'number' == typeof t
              ? e?.trim().endsWith('/')
                ? t
                : 0
              : 'number' == typeof t
                ? 0
                : E.test(t)
                  ? E.getAnimatableNone(t)
                  : t)(t, e.split[i]),
        ),
      )
    },
  },
  L = new Set(['brightness', 'contrast', 'saturate', 'opacity'])
function I(t) {
  let [e, i] = t.slice(0, -1).split('(')
  if ('drop-shadow' === e) return t
  let [s] = i.match(m) || []
  if (!s) return t
  let n = i.replace(s, ''),
    r = +!!L.has(e)
  return (s !== i && (r *= 100), e + '(' + r + n + ')')
}
let O = /\b([a-z-]*)\(.*?\)/gu,
  U = {
    ...R,
    getAnimatableNone: (t) => {
      let e = t.match(O)
      return e ? e.map(I).join(' ') : t
    },
  },
  W = {
    ...R,
    getAnimatableNone: (t) => {
      let e = R.parse(t)
      return R.createTransformer(t)(
        e.map((t) => ('number' == typeof t ? 0 : 'object' == typeof t ? { ...t, alpha: 1 } : t)),
      )
    },
  },
  z = { ...c, transform: Math.round },
  $ = {
    borderWidth: M,
    borderTopWidth: M,
    borderRightWidth: M,
    borderBottomWidth: M,
    borderLeftWidth: M,
    borderRadius: M,
    borderTopLeftRadius: M,
    borderTopRightRadius: M,
    borderBottomRightRadius: M,
    borderBottomLeftRadius: M,
    width: M,
    maxWidth: M,
    height: M,
    maxHeight: M,
    top: M,
    right: M,
    bottom: M,
    left: M,
    inset: M,
    insetBlock: M,
    insetBlockStart: M,
    insetBlockEnd: M,
    insetInline: M,
    insetInlineStart: M,
    insetInlineEnd: M,
    padding: M,
    paddingTop: M,
    paddingRight: M,
    paddingBottom: M,
    paddingLeft: M,
    paddingBlock: M,
    paddingBlockStart: M,
    paddingBlockEnd: M,
    paddingInline: M,
    paddingInlineStart: M,
    paddingInlineEnd: M,
    margin: M,
    marginTop: M,
    marginRight: M,
    marginBottom: M,
    marginLeft: M,
    marginBlock: M,
    marginBlockStart: M,
    marginBlockEnd: M,
    marginInline: M,
    marginInlineStart: M,
    marginInlineEnd: M,
    fontSize: M,
    backgroundPositionX: M,
    backgroundPositionY: M,
    rotate: A,
    pathRotation: A,
    rotateX: A,
    rotateY: A,
    rotateZ: A,
    scale: d,
    scaleX: d,
    scaleY: d,
    scaleZ: d,
    skew: A,
    skewX: A,
    skewY: A,
    distance: M,
    translateX: M,
    translateY: M,
    translateZ: M,
    x: M,
    y: M,
    z: M,
    perspective: M,
    transformPerspective: M,
    opacity: u,
    originX: C,
    originY: C,
    originZ: M,
    zIndex: z,
    fillOpacity: u,
    strokeOpacity: u,
    numOctaves: z,
  },
  H = {
    ...$,
    color: E,
    backgroundColor: E,
    outlineColor: E,
    fill: E,
    stroke: E,
    borderColor: E,
    borderTopColor: E,
    borderRightColor: E,
    borderBottomColor: E,
    borderLeftColor: E,
    filter: U,
    WebkitFilter: U,
    mask: W,
    WebkitMask: W,
  },
  Y = (t) => H[t],
  q = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  X = () => ({ x: q(), y: q() }),
  G = () => ({ min: 0, max: 0 }),
  Z = () => ({ x: G(), y: G() }),
  _ = (t) => !!(t && t.getVelocity),
  K = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...o]),
  J = (t) => (e) => e.test(t),
  Q = [c, M, j, A, S, T, { test: (t) => 'auto' === t, parse: (t) => t }],
  tt = (t) => Q.find(J(t))
var te = __m47167
let ti = () => {},
  ts = () => {}
te.default
let tn = (t) => (e) => 'string' == typeof e && e.startsWith(t),
  tr = tn('--'),
  ta = tn('var(--'),
  to = (t) => !!ta(t) && tl.test(t.split('/*')[0].trim()),
  tl = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu
function th(t) {
  return 'string' == typeof t && t.split('/*')[0].includes('var(--')
}
let tc = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
  tu = (t) => (180 * t) / Math.PI,
  td = (t) => tm(tu(Math.atan2(t[1], t[0]))),
  tp = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
    rotate: td,
    rotateZ: td,
    skewX: (t) => tu(Math.atan(t[1])),
    skewY: (t) => tu(Math.atan(t[2])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
  },
  tm = (t) => ((t %= 360) < 0 && (t += 360), t),
  tf = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
  tx = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
  tg = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: tf,
    scaleY: tx,
    scale: (t) => (tf(t) + tx(t)) / 2,
    rotateX: (t) => tm(tu(Math.atan2(t[6], t[5]))),
    rotateY: (t) => tm(tu(Math.atan2(-t[2], t[0]))),
    rotateZ: td,
    rotate: td,
    skewX: (t) => tu(Math.atan(t[4])),
    skewY: (t) => tu(Math.atan(t[1])),
    skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
  }
function ty(t) {
  return +!!t.includes('scale')
}
function tv(t, e) {
  let i, s
  if (!t || 'none' === t) return ty(e)
  let n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u)
  if (n) ((i = tg), (s = n))
  else {
    let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u)
    ;((i = tp), (s = e))
  }
  if (!s) return ty(e)
  let r = i[e],
    a = s[1].split(',').map(tb)
  return 'function' == typeof r ? r(a) : a[r]
}
function tb(t) {
  return parseFloat(t.trim())
}
let tw = (t) => t === c || t === M,
  tA = new Set(['x', 'y', 'z']),
  tj = o.filter((t) => !tA.has(t)),
  tM = {
    width: ({ x: t }, { paddingLeft: e = '0', paddingRight: i = '0', boxSizing: s }) => {
      let n = t.max - t.min
      return 'border-box' === s ? n : n - parseFloat(e) - parseFloat(i)
    },
    height: ({ y: t }, { paddingTop: e = '0', paddingBottom: i = '0', boxSizing: s }) => {
      let n = t.max - t.min
      return 'border-box' === s ? n : n - parseFloat(e) - parseFloat(i)
    },
    top: (t, { top: e }) => parseFloat(e),
    left: (t, { left: e }) => parseFloat(e),
    bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
    right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
    x: (t, { transform: e }) => tv(e, 'x'),
    y: (t, { transform: e }) => tv(e, 'y'),
  }
;((tM.translateX = tM.x), (tM.translateY = tM.y))
let tT = (t) => t,
  tS = {},
  tC = ['setup', 'read', 'resolveKeyframes', 'preUpdate', 'update', 'preRender', 'render', 'postRender']
function tk(t, e) {
  let i = !1,
    s = !0,
    n = { delta: 0, timestamp: 0, isProcessing: !1 },
    r = () => (i = !0),
    a = tC.reduce(
      (t, e) => (
        (t[e] = (function (t) {
          let e = new Set(),
            i = new Set(),
            s = !1,
            n = !1,
            r = new WeakSet(),
            a = { delta: 0, timestamp: 0, isProcessing: !1 }
          function o(e) {
            ;(r.has(e) && (l.schedule(e), t()), e(a))
          }
          let l = {
            schedule: (t, n = !1, a = !1) => {
              let o = a && s ? e : i
              return (n && r.add(t), o.add(t), t)
            },
            cancel: (t) => {
              ;(i.delete(t), r.delete(t))
            },
            process: (t) => {
              if (((a = t), s)) {
                n = !0
                return
              }
              s = !0
              let r = e
              ;((e = i), (i = r), e.forEach(o), e.clear(), (s = !1), n && ((n = !1), l.process(t)))
            },
          }
          return l
        })(r)),
        t
      ),
      {},
    ),
    {
      setup: o,
      read: l,
      resolveKeyframes: h,
      preUpdate: c,
      update: u,
      preRender: d,
      render: p,
      postRender: m,
    } = a,
    f = () => {
      let r = tS.useManualTiming,
        a = r ? n.timestamp : performance.now()
      ;((i = !1),
        r || (n.delta = s ? 1e3 / 60 : Math.max(Math.min(a - n.timestamp, 40), 1)),
        (n.timestamp = a),
        (n.isProcessing = !0),
        o.process(n),
        l.process(n),
        h.process(n),
        c.process(n),
        u.process(n),
        d.process(n),
        p.process(n),
        m.process(n),
        (n.isProcessing = !1),
        i && e && ((s = !1), t(f)))
    }
  return {
    schedule: tC.reduce((e, r) => {
      let o = a[r]
      return (
        (e[r] = (e, r = !1, a = !1) => (
          !i && ((i = !0), (s = !0), n.isProcessing || t(f)),
          o.schedule(e, r, a)
        )),
        e
      )
    }, {}),
    cancel: (t) => {
      for (let e = 0; e < tC.length; e++) a[tC[e]].cancel(t)
    },
    state: n,
    steps: a,
  }
}
let {
    schedule: tE,
    cancel: tP,
    state: tN,
    steps: tB,
  } = tk('u' > typeof requestAnimationFrame ? requestAnimationFrame : tT, !0),
  tD = new Set(),
  tF = !1,
  tV = !1,
  tR = !1
function tL() {
  if (tV) {
    let t = Array.from(tD).filter((t) => t.needsMeasurement),
      e = new Set(t.map((t) => t.element)),
      i = new Map()
    ;(e.forEach((t) => {
      let e,
        s =
          ((e = []),
          tj.forEach((i) => {
            let s = t.getValue(i)
            void 0 !== s && (e.push([i, s.get()]), s.set(+!!i.startsWith('scale')))
          }),
          e)
      s.length && (i.set(t, s), t.render())
    }),
      t.forEach((t) => t.measureInitialState()),
      e.forEach((t) => {
        t.render()
        let e = i.get(t)
        e &&
          e.forEach(([e, i]) => {
            t.getValue(e)?.set(i)
          })
      }),
      t.forEach((t) => t.measureEndState()),
      t.forEach((t) => {
        void 0 !== t.suspendedScrollY && window.scrollTo(0, t.suspendedScrollY)
      }))
  }
  ;((tV = !1), (tF = !1), tD.forEach((t) => t.complete(tR)), tD.clear())
}
function tI() {
  tD.forEach((t) => {
    ;(t.readKeyframes(), t.needsMeasurement && (tV = !0))
  })
}
class tO {
  constructor(t, e, i, s, n, r = !1) {
    ;((this.state = 'pending'),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = e),
      (this.name = i),
      (this.motionValue = s),
      (this.element = n),
      (this.isAsync = r))
  }
  scheduleResolve() {
    ;((this.state = 'scheduled'),
      this.isAsync
        ? (tD.add(this), tF || ((tF = !0), tE.read(tI), tE.resolveKeyframes(tL)))
        : (this.readKeyframes(), this.complete()))
  }
  readKeyframes() {
    let { unresolvedKeyframes: t, name: e, element: i, motionValue: s } = this
    if (null === t[0]) {
      let n = s?.get(),
        r = t[t.length - 1]
      if (void 0 !== n) t[0] = n
      else if (i && e) {
        let s = i.readValue(e, r)
        null != s && (t[0] = s)
      }
      ;(void 0 === t[0] && (t[0] = r), s && void 0 === n && s.set(t[0]))
    }
    for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1])
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(t = !1) {
    ;((this.state = 'complete'),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
      tD.delete(this))
  }
  cancel() {
    'scheduled' === this.state && (tD.delete(this), (this.state = 'pending'))
  }
  resume() {
    'pending' === this.state && this.scheduleResolve()
  }
}
let tU = new Set([U, W])
function tW(t, e) {
  let i = Y(t)
  return (tU.has(i) || (i = R), i.getAnimatableNone ? i.getAnimatableNone(e) : void 0)
}
let tz = new Set(['auto', 'none', '0'])
class t$ extends tO {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n, !0)
  }
  readKeyframes() {
    let { unresolvedKeyframes: t, element: e, name: i } = this
    if (!e || !e.current) return
    super.readKeyframes()
    for (let i = 0; i < t.length; i++) {
      let s = t[i]
      if ('string' == typeof s && to((s = s.trim()))) {
        let n = (function t(e, i, s = 1) {
          ts(
            s <= 4,
            `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
            'max-css-var-depth',
          )
          let [n, r] = (function (t) {
            let e = tc.exec(t)
            if (!e) return [,]
            let [, i, s, n] = e
            return [`--${i ?? s}`, n]
          })(e)
          if (!n) return
          let a = window.getComputedStyle(i).getPropertyValue(n)
          if (a) {
            let t = a.trim()
            return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t) ? parseFloat(t) : t
          }
          return to(r) ? t(r, i, s + 1) : r
        })(s, e.current)
        ;(void 0 !== n && (t[i] = n), i === t.length - 1 && (this.finalKeyframe = s))
      }
    }
    if ((this.resolveNoneKeyframes(), !K.has(i) || 2 !== t.length)) return
    let [s, n] = t,
      r = tt(s),
      a = tt(n)
    if (th(s) !== th(n) && tM[i]) {
      this.needsMeasurement = !0
      return
    }
    if (r !== a)
      if (tw(r) && tw(a))
        for (let e = 0; e < t.length; e++) {
          let i = t[e]
          'string' == typeof i && (t[e] = parseFloat(i))
        }
      else tM[i] && (this.needsMeasurement = !0)
  }
  resolveNoneKeyframes() {
    let { unresolvedKeyframes: t, name: e } = this,
      i = []
    for (let e = 0; e < t.length; e++)
      (null === t[e] ||
        (function (t) {
          if ('number' == typeof t) return 0 === t
          if (null === t) return !0
          return 'none' === t || '0' === t || /^0[^.\s]+$/u.test(t)
        })(t[e])) &&
        i.push(e)
    i.length &&
      (function (t, e, i) {
        let s,
          n = 0
        for (; n < t.length && !s;) {
          let e = t[n]
          ;('string' == typeof e && !tz.has(e) && F(e).values.length && (s = t[n]), n++)
        }
        if (s && i) for (let n of e) t[n] = tW(i, s)
      })(t, i, e)
  }
  measureInitialState() {
    let { element: t, unresolvedKeyframes: e, name: i } = this
    if (!t || !t.current) return
    ;('height' === i && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = tM[i](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (e[0] = this.measuredOrigin))
    let s = e[e.length - 1]
    void 0 !== s && t.getValue(i, s).jump(s, !1)
  }
  measureEndState() {
    let { element: t, name: e, unresolvedKeyframes: i } = this
    if (!t || !t.current) return
    let s = t.getValue(e)
    s && s.jump(this.measuredOrigin, !1)
    let n = i.length - 1,
      r = i[n]
    ;((i[n] = tM[e](t.measureViewportBox(), window.getComputedStyle(t.current))),
      null !== r && void 0 === this.finalKeyframe && (this.finalKeyframe = r),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([e, i]) => {
          t.getValue(e).set(i)
        }),
      this.resolveNoneKeyframes())
  }
}
let tH = (t) => 1e3 * t
function tY(t, e) {
  ;-1 === t.indexOf(e) && t.push(e)
}
function tq(t, e) {
  let i = t.indexOf(e)
  i > -1 && t.splice(i, 1)
}
class tX {
  constructor() {
    this.subscriptions = []
  }
  add(t) {
    return (tY(this.subscriptions, t), () => tq(this.subscriptions, t))
  }
  notify(t, e, i) {
    let s = this.subscriptions.length
    if (s)
      if (1 === s) this.subscriptions[0](t, e, i)
      else
        for (let n = 0; n < s; n++) {
          let s = this.subscriptions[n]
          s && s(t, e, i)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}
function tG(t, e, i) {
  e.startsWith('--') ? t.style.setProperty(e, i) : (t.style[e] = i)
}
function tZ(t) {
  let e
  return () => (void 0 === e && (e = t()), e)
}
let t_ = {}
function tK(t, e) {
  let i = tZ(t)
  return () => t_[e] ?? i()
}
let tJ = tK(() => void 0 !== window.ScrollTimeline, 'scrollTimeline'),
  tQ = (t) => null !== t
function t0(t, { repeat: e, repeatType: i = 'loop' }, s, n = 1) {
  let r = t.filter(tQ),
    a = n < 0 || (e && 'loop' !== i && e % 2 == 1) ? 0 : r.length - 1
  return a && void 0 !== s ? s : r[a]
}
class t1 {
  constructor() {
    this.updateFinished()
  }
  get finished() {
    return this._finished
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t
    })
  }
  notifyFinished() {
    this.resolve()
  }
  then(t, e) {
    return this.finished.then(t, e)
  }
}
let t2 = (t) => Array.isArray(t) && 'number' == typeof t[0],
  t5 = tK(() => {
    try {
      document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' })
    } catch (t) {
      return !1
    }
    return !0
  }, 'linearEasing'),
  t4 = (t, e, i = 10) => {
    let s = '',
      n = Math.max(Math.round(e / i), 2)
    for (let e = 0; e < n; e++) s += Math.round(1e4 * t(e / (n - 1))) / 1e4 + ', '
    return `linear(${s.substring(0, s.length - 2)})`
  },
  t3 = ([t, e, i, s]) => `cubic-bezier(${t}, ${e}, ${i}, ${s})`,
  t6 = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: t3([0, 0.65, 0.55, 1]),
    circOut: t3([0.55, 0, 1, 0.45]),
    backIn: t3([0.31, 0.01, 0.66, -0.59]),
    backOut: t3([0.33, 1.53, 0.69, 0.99]),
  }
function t8(t) {
  return 'function' == typeof t && 'applyToOptions' in t
}
class t7 extends t1 {
  constructor(t) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), (this.manualStartTime = null), !t))
      return
    const {
      element: e,
      name: i,
      keyframes: s,
      pseudoElement: n,
      allowFlatten: r = !1,
      finalKeyframe: a,
      onComplete: o,
    } = t
    ;((this.isPseudoElement = !!n),
      (this.allowFlatten = r),
      (this.options = t),
      ts('string' != typeof t.type, 'Mini animate() doesn\'t support "type" as a string.', 'mini-spring'))
    const l = (function ({ type: t, ...e }) {
      return t8(t) && t5()
        ? t.applyToOptions(e)
        : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = 'easeOut'), e)
    })(t)
    ;((this.animation = (function (
      t,
      e,
      i,
      {
        delay: s = 0,
        duration: n = 300,
        repeat: r = 0,
        repeatType: a = 'loop',
        ease: o = 'easeOut',
        times: l,
      } = {},
      h,
    ) {
      let c = { [e]: i }
      l && (c.offset = l)
      let u = (function t(e, i) {
        if (e)
          return 'function' == typeof e
            ? t5()
              ? t4(e, i)
              : 'ease-out'
            : t2(e)
              ? t3(e)
              : Array.isArray(e)
                ? e.map((e) => t(e, i) || t6.easeOut)
                : t6[e]
      })(o, n)
      Array.isArray(u) && (c.easing = u)
      let d = {
        delay: s,
        duration: n,
        easing: Array.isArray(u) ? 'linear' : u,
        fill: 'both',
        iterations: r + 1,
        direction: 'reverse' === a ? 'alternate' : 'normal',
      }
      return (h && (d.pseudoElement = h), t.animate(c, d))
    })(e, i, s, l, n)),
      !1 === l.autoplay && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !n)) {
          let t = t0(s, this.options, a, this.speed)
          ;(this.updateMotionValue && this.updateMotionValue(t), tG(e, i, t), this.animation.cancel())
        }
        ;(o?.(), this.notifyFinished())
      }))
  }
  play() {
    this.isStopped ||
      ((this.manualStartTime = null),
      this.animation.play(),
      'finished' === this.state && this.updateFinished())
  }
  pause() {
    this.animation.pause()
  }
  complete() {
    this.animation.finish?.()
  }
  cancel() {
    try {
      this.animation.cancel()
    } catch (t) {}
  }
  stop() {
    if (this.isStopped) return
    this.isStopped = !0
    let { state: t } = this
    'idle' !== t &&
      'finished' !== t &&
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel())
  }
  commitStyles() {
    let t = this.options?.element
    !this.isPseudoElement && t?.isConnected && this.animation.commitStyles?.()
  }
  get duration() {
    return Number(this.animation.effect?.getComputedTiming?.().duration || 0) / 1e3
  }
  get iterationDuration() {
    let { delay: t = 0 } = this.options || {}
    return this.duration + t / 1e3
  }
  get time() {
    return (Number(this.animation.currentTime) || 0) / 1e3
  }
  set time(t) {
    let e = null !== this.finishedTime
    ;((this.manualStartTime = null),
      (this.finishedTime = null),
      (this.animation.currentTime = tH(t)),
      e && this.animation.pause())
  }
  get speed() {
    return this.animation.playbackRate
  }
  set speed(t) {
    ;(t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t))
  }
  get state() {
    return null !== this.finishedTime ? 'finished' : this.animation.playState
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime)
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t
  }
  attachTimeline({ timeline: t, rangeStart: e, rangeEnd: i, observe: s }) {
    return (this.allowFlatten && this.animation.effect?.updateTiming({ easing: 'linear' }),
    (this.animation.onfinish = null),
    t && tJ())
      ? ((this.animation.timeline = t),
        e && (this.animation.rangeStart = e),
        i && (this.animation.rangeEnd = i),
        tT)
      : s(this)
  }
}
let t9 = new Set(['opacity', 'clipPath', 'filter', 'transform']),
  { schedule: et } = tk(queueMicrotask, !1)
function ee() {
  e = void 0
}
let ei = {
    now: () => (
      void 0 === e && ei.set(tN.isProcessing || tS.useManualTiming ? tN.timestamp : performance.now()),
      e
    ),
    set: (t) => {
      ;((e = t), queueMicrotask(ee))
    },
  },
  es = (t, e) => (e ? (1e3 / e) * t : 0),
  en
class er {
  constructor(t, e = {}) {
    ;((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (t) => {
        let e = ei.now()
        if (
          (this.updatedAt !== e && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(t),
          this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        )
          for (let t of this.dependents) t.dirty()
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = e.owner))
  }
  setCurrent(t) {
    ;((this.current = t),
      (this.updatedAt = ei.now()),
      null === this.canTrackVelocity &&
        void 0 !== t &&
        (this.canTrackVelocity = !isNaN(parseFloat(this.current))))
  }
  setPrevFrameValue(t = this.current) {
    ;((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt))
  }
  onChange(t) {
    return this.on('change', t)
  }
  on(t, e) {
    this.events[t] || (this.events[t] = new tX())
    let i = this.events[t].add(e)
    return 'change' === t
      ? () => {
          ;(i(),
            tE.read(() => {
              this.events.change.getSize() || this.stop()
            }))
        }
      : i
  }
  clearListeners() {
    for (let t in this.events) this.events[t].clear()
  }
  attach(t, e) {
    ;((this.passiveEffect = t), (this.stopPassiveEffect = e))
  }
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t)
  }
  setWithVelocity(t, e, i) {
    ;(this.set(e), (this.prev = void 0), (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt - i))
  }
  jump(t, e = !0) {
    ;(this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      e && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
  dirty() {
    this.events.change?.notify(this.current)
  }
  addDependent(t) {
    ;(this.dependents || (this.dependents = new Set()), this.dependents.add(t))
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t)
  }
  get() {
    return (en && en.push(this), this.current)
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    let t = ei.now()
    if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t - this.updatedAt > 30) return 0
    let e = Math.min(this.updatedAt - this.prevUpdatedAt, 30)
    return es(parseFloat(this.current) - parseFloat(this.prevFrameValue), e)
  }
  start(t) {
    return (
      this.stop(),
      new Promise((e) => {
        ;((this.hasAnimated = !0),
          (this.animation = t(e)),
          this.events.animationStart && this.events.animationStart.notify())
      }).then(() => {
        ;(this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation())
      })
    )
  }
  stop() {
    ;(this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation())
  }
  isAnimating() {
    return !!this.animation
  }
  clearAnimation() {
    delete this.animation
  }
  destroy() {
    ;(this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
}
function ea(t, e) {
  return new er(t, e)
}
let eo = [...Q, E, R],
  el = new WeakMap()
function eh(t) {
  return null !== t && 'object' == typeof t && 'function' == typeof t.start
}
function ec(t) {
  return 'string' == typeof t || Array.isArray(t)
}
let eu = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  ed = ['initial', ...eu]
function ep(t) {
  return eh(t.animate) || ed.some((e) => ec(t[e]))
}
function em(t) {
  return !!(ep(t) || t.variants)
}
let ef = { current: null },
  ex = { current: !1 },
  eg = 'u' > typeof window
function ey(t) {
  let e = [{}, {}]
  return (
    t?.values.forEach((t, i) => {
      ;((e[0][i] = t.get()), (e[1][i] = t.getVelocity()))
    }),
    e
  )
}
function ev(t, e, i, s) {
  if ('function' == typeof e) {
    let [n, r] = ey(s)
    e = e(void 0 !== i ? i : t.custom, n, r)
  }
  if (('string' == typeof e && (e = t.variants && t.variants[e]), 'function' == typeof e)) {
    let [n, r] = ey(s)
    e = e(void 0 !== i ? i : t.custom, n, r)
  }
  return e
}
let eb = [
    'AnimationStart',
    'AnimationComplete',
    'Update',
    'BeforeLayoutMeasure',
    'LayoutMeasure',
    'LayoutAnimationStart',
    'LayoutAnimationComplete',
  ],
  ew = {}
class eA {
  scrapeMotionValuesFromProps(t, e, i) {
    return {}
  }
  constructor(
    {
      parent: t,
      props: e,
      presenceContext: i,
      reducedMotionConfig: s,
      skipAnimations: n,
      blockInitialAnimation: r,
      visualState: a,
    },
    o = {},
  ) {
    ;((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.shouldSkipAnimations = !1),
      (this.values = new Map()),
      (this.KeyframeResolver = tO),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.hasBeenMounted = !1),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        let t = ei.now()
        this.renderScheduledAt < t && ((this.renderScheduledAt = t), tE.render(this.render, !1, !0))
      }))
    const { latestValues: l, renderState: h } = a
    ;((this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = e.initial ? { ...l } : {}),
      (this.renderState = h),
      (this.parent = t),
      (this.props = e),
      (this.presenceContext = i),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = s),
      (this.skipAnimationsConfig = n),
      (this.options = o),
      (this.blockInitialAnimation = !!r),
      (this.isControllingVariants = ep(e)),
      (this.isVariantNode = em(e)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)))
    const { willChange: c, ...u } = this.scrapeMotionValuesFromProps(e, {}, this)
    for (const t in u) {
      const e = u[t]
      void 0 !== l[t] && _(e) && e.set(l[t])
    }
  }
  mount(t) {
    if (this.hasBeenMounted)
      for (let t in this.initialValues)
        (this.values.get(t)?.jump(this.initialValues[t]), (this.latestValues[t] = this.initialValues[t]))
    ;((this.current = t),
      el.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
      'never' === this.reducedMotionConfig
        ? (this.shouldReduceMotion = !1)
        : 'always' === this.reducedMotionConfig
          ? (this.shouldReduceMotion = !0)
          : (ex.current ||
              (function () {
                if (((ex.current = !0), eg))
                  if (window.matchMedia) {
                    let t = window.matchMedia('(prefers-reduced-motion)'),
                      e = () => (ef.current = t.matches)
                    ;(t.addEventListener('change', e), e())
                  } else ef.current = !1
              })(),
            (this.shouldReduceMotion = ef.current)),
      (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext),
      (this.hasBeenMounted = !0))
  }
  unmount() {
    for (let t in (this.projection && this.projection.unmount(),
    tP(this.notifyUpdate),
    tP(this.render),
    this.valueSubscriptions.forEach((t) => t()),
    this.valueSubscriptions.clear(),
    this.removeFromVariantTree && this.removeFromVariantTree(),
    this.parent?.removeChild(this),
    this.events))
      this.events[t].clear()
    for (let t in this.features) {
      let e = this.features[t]
      e && (e.unmount(), (e.isMounted = !1))
    }
    this.current = null
  }
  addChild(t) {
    ;(this.children.add(t),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(t))
  }
  removeChild(t) {
    ;(this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t))
  }
  bindToMotionValue(t, e) {
    let i
    if (
      (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(),
      e.accelerate && t9.has(t) && this.current instanceof HTMLElement)
    ) {
      let { factory: i, keyframes: s, times: n, ease: r, duration: a } = e.accelerate,
        o = new t7({ element: this.current, name: t, keyframes: s, times: n, ease: r, duration: tH(a) }),
        l = i(o)
      this.valueSubscriptions.set(t, () => {
        ;(l(), o.cancel())
      })
      return
    }
    let s = l.has(t)
    s && this.onBindTransform && this.onBindTransform()
    let n = e.on('change', (e) => {
      ;((this.latestValues[t] = e),
        this.props.onUpdate && tE.preRender(this.notifyUpdate),
        s && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender())
    })
    ;('u' > typeof window && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, e)),
      this.valueSubscriptions.set(t, () => {
        ;(n(), i && i())
      }))
  }
  sortNodePosition(t) {
    return this.current && this.sortInstanceNodePosition && this.type === t.type
      ? this.sortInstanceNodePosition(this.current, t.current)
      : 0
  }
  updateFeatures() {
    let t = 'animation'
    for (t in ew) {
      let e = ew[t]
      if (!e) continue
      let { isEnabled: i, Feature: s } = e
      if ((!this.features[t] && s && i(this.props) && (this.features[t] = new s(this)), this.features[t])) {
        let e = this.features[t]
        e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0))
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Z()
  }
  getStaticValue(t) {
    return this.latestValues[t]
  }
  setStaticValue(t, e) {
    this.latestValues[t] = e
  }
  update(t, e) {
    ;((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = e))
    for (let e = 0; e < eb.length; e++) {
      let i = eb[e]
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i])
      let s = t['on' + i]
      s && (this.propEventSubscriptions[i] = this.on(i, s))
    }
    ;((this.prevMotionValues = (function (t, e, i) {
      for (let s in e) {
        let n = e[s],
          r = i[s]
        if (_(n)) t.addValue(s, n)
        else if (_(r)) t.addValue(s, ea(n, { owner: t }))
        else if (r !== n)
          if (t.hasValue(s)) {
            let e = t.getValue(s)
            !0 === e.liveStyle ? e.jump(n) : e.hasAnimated || e.set(n)
          } else {
            let e = t.getStaticValue(s)
            t.addValue(s, ea(void 0 !== e ? e : n, { owner: t }))
          }
      }
      for (let s in i) void 0 === e[s] && t.removeValue(s)
      return e
    })(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues)),
      this.handleChildMotionValue && this.handleChildMotionValue())
  }
  getProps() {
    return this.props
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0
  }
  getDefaultTransition() {
    return this.props.transition
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
  }
  addVariantChild(t) {
    let e = this.getClosestVariantNode()
    if (e) return (e.variantChildren && e.variantChildren.add(t), () => e.variantChildren.delete(t))
  }
  addValue(t, e) {
    let i = this.values.get(t)
    e !== i &&
      (i && this.removeValue(t),
      this.bindToMotionValue(t, e),
      this.values.set(t, e),
      (this.latestValues[t] = e.get()))
  }
  removeValue(t) {
    this.values.delete(t)
    let e = this.valueSubscriptions.get(t)
    ;(e && (e(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState))
  }
  hasValue(t) {
    return this.values.has(t)
  }
  getValue(t, e) {
    if (this.props.values && this.props.values[t]) return this.props.values[t]
    let i = this.values.get(t)
    return (
      void 0 === i &&
        void 0 !== e &&
        ((i = ea(null === e ? void 0 : e, { owner: this })), this.addValue(t, i)),
      i
    )
  }
  readValue(t, e) {
    let i =
      void 0 === this.latestValues[t] && this.current
        ? (this.getBaseTargetFromProps(this.props, t) ??
          this.readValueFromInstance(this.current, t, this.options))
        : this.latestValues[t]
    if (null != i) {
      let s, n
      if (
        'string' == typeof i &&
        ((s = i), /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s) || ((n = i), /^0[^.\s]+$/u.test(n)))
      )
        i = parseFloat(i)
      else {
        let s
        ;((s = i), !eo.find(J(s)) && R.test(e) && (i = tW(t, e)))
      }
      this.setBaseTarget(t, _(i) ? i.get() : i)
    }
    return _(i) ? i.get() : i
  }
  setBaseTarget(t, e) {
    this.baseTarget[t] = e
  }
  getBaseTarget(t) {
    let e,
      { initial: i } = this.props
    if ('string' == typeof i || 'object' == typeof i) {
      let s = ev(this.props, i, this.presenceContext?.custom)
      s && (e = s[t])
    }
    if (i && void 0 !== e) return e
    let s = this.getBaseTargetFromProps(this.props, t)
    return void 0 === s || _(s)
      ? void 0 !== this.initialValues[t] && void 0 === e
        ? void 0
        : this.baseTarget[t]
      : s
  }
  on(t, e) {
    return (this.events[t] || (this.events[t] = new tX()), this.events[t].add(e))
  }
  notify(t, ...e) {
    this.events[t] && this.events[t].notify(...e)
  }
  scheduleRenderMicrotask() {
    et.render(this.render)
  }
}
class ej extends eA {
  constructor() {
    ;(super(...arguments), (this.KeyframeResolver = t$))
  }
  sortInstanceNodePosition(t, e) {
    return 2 & t.compareDocumentPosition(e) ? 1 : -1
  }
  getBaseTargetFromProps(t, e) {
    let i = t.style
    return i ? i[e] : void 0
  }
  removeValueFromRenderState(t, { vars: e, style: i }) {
    ;(delete e[t], delete i[t])
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription)
    let { children: t } = this.props
    _(t) &&
      (this.childSubscription = t.on('change', (t) => {
        this.current && (this.current.textContent = `${t}`)
      }))
  }
}
function eM(t) {
  return t.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`)
}
let eT = (t, e) => (e && 'number' == typeof t ? e.transform(t) : t),
  eS = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  eC = o.length
function ek(t, e, i) {
  let { style: s, vars: n, transformOrigin: r } = t,
    a = !1,
    h = !1
  for (let t in e) {
    let i = e[t]
    if (l.has(t)) {
      a = !0
      continue
    }
    if (tr(t)) {
      n[t] = i
      continue
    }
    {
      let e = eT(i, $[t])
      t.startsWith('origin') ? ((h = !0), (r[t] = e)) : (s[t] = e)
    }
  }
  if (
    (!e.transform &&
      (a || i
        ? (s.transform = (function (t, e, i) {
            let s = '',
              n = !0
            for (let r = 0; r < eC; r++) {
              let a = o[r],
                l = t[a]
              if (void 0 === l) continue
              let h = !0
              if ('number' == typeof l) h = l === +!!a.startsWith('scale')
              else {
                let t = parseFloat(l)
                h = a.startsWith('scale') ? 1 === t : 0 === t
              }
              if (!h || i) {
                let t = eT(l, $[a])
                if (!h) {
                  n = !1
                  let e = eS[a] || a
                  s += `${e}(${t}) `
                }
                i && (e[a] = t)
              }
            }
            let r = t.pathRotation
            return (
              r && ((n = !1), (s += `rotate(${eT(r, $.pathRotation)}) `)),
              (s = s.trim()),
              i ? (s = i(e, n ? '' : s)) : n && (s = 'none'),
              s
            )
          })(e, t.transform, i))
        : s.transform && (s.transform = 'none')),
    h)
  ) {
    let { originX: t = '50%', originY: e = '50%', originZ: i = 0 } = r
    s.transformOrigin = `${t} ${e} ${i}`
  }
}
let eE = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  eP = { offset: 'strokeDashoffset', array: 'strokeDasharray' },
  eN = ['offsetDistance', 'offsetPath', 'offsetRotate', 'offsetAnchor']
function eB(
  t,
  { attrX: e, attrY: i, attrScale: s, pathLength: n, pathSpacing: r = 1, pathOffset: a = 0, ...o },
  l,
  h,
  c,
) {
  if ((ek(t, o, h), l)) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox)
    return
  }
  ;((t.attrs = t.style), (t.style = {}))
  let { attrs: u, style: d } = t
  for (let t of (u.transform && ((d.transform = u.transform), delete u.transform),
  (d.transform || u.transformOrigin) &&
    ((d.transformOrigin = u.transformOrigin ?? '50% 50%'), delete u.transformOrigin),
  d.transform && ((d.transformBox = c?.transformBox ?? 'fill-box'), delete u.transformBox),
  eN))
    void 0 !== u[t] && ((d[t] = u[t]), delete u[t])
  ;(void 0 !== e && (u.x = e),
    void 0 !== i && (u.y = i),
    void 0 !== s && (u.scale = s),
    void 0 !== n &&
      (function (t, e, i = 1, s = 0, n = !0) {
        t.pathLength = 1
        let r = n ? eE : eP
        ;((t[r.offset] = `${-s}`), (t[r.array] = `${e} ${i}`))
      })(u, n, r, a, !1))
}
let eD = new Set([
    'baseFrequency',
    'diffuseConstant',
    'kernelMatrix',
    'kernelUnitLength',
    'keySplines',
    'keyTimes',
    'limitingConeAngle',
    'markerHeight',
    'markerWidth',
    'numOctaves',
    'targetX',
    'targetY',
    'surfaceScale',
    'specularConstant',
    'specularExponent',
    'stdDeviation',
    'tableValues',
    'viewBox',
    'gradientTransform',
    'pathLength',
    'startOffset',
    'textLength',
    'lengthAdjust',
  ]),
  eF = (t) => 'string' == typeof t && 'svg' === t.toLowerCase()
function eV(t, { style: e, vars: i }, s, n) {
  let r,
    a = t.style
  for (r in e) a[r] = e[r]
  for (r in (n?.applyProjectionStyles(a, s), i)) a.setProperty(r, i[r])
}
let eR = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius']
function eL(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100
}
let eI = {
    correct: (t, e) => {
      if (!e.target) return t
      if ('string' == typeof t)
        if (!M.test(t)) return t
        else t = parseFloat(t)
      let i = eL(t, e.target.x),
        s = eL(t, e.target.y)
      return `${i}% ${s}%`
    },
  },
  eO = (t, e, i) => t + (e - t) * i,
  eU = {
    borderRadius: { ...eI, applyTo: [...eR] },
    borderTopLeftRadius: eI,
    borderTopRightRadius: eI,
    borderBottomLeftRadius: eI,
    borderBottomRightRadius: eI,
    boxShadow: {
      correct: (t, { treeScale: e, projectionDelta: i }) => {
        let s = R.parse(t)
        if (s.length > 5) return t
        let n = R.createTransformer(t),
          r = +('number' != typeof s[0]),
          a = i.x.scale * e.x,
          o = i.y.scale * e.y
        ;((s[0 + r] /= a), (s[1 + r] /= o))
        let l = eO(a, o, 0.5)
        return (
          'number' == typeof s[2 + r] && (s[2 + r] /= l),
          'number' == typeof s[3 + r] && (s[3 + r] /= l),
          n(s)
        )
      },
    },
  }
function eW(t, { layout: e, layoutId: i }) {
  return l.has(t) || t.startsWith('origin') || ((e || void 0 !== i) && (!!eU[t] || 'opacity' === t))
}
function ez(t, e, i) {
  let s = t.style,
    n = e?.style,
    r = {}
  if (!s) return r
  for (let e in s)
    (_(s[e]) || (n && _(n[e])) || eW(e, t) || i?.getValue(e)?.liveStyle !== void 0) && (r[e] = s[e])
  return r
}
function e$(t, e, i) {
  let s = ez(t, e, i)
  for (let i in t)
    (_(t[i]) || _(e[i])) &&
      (s[-1 !== o.indexOf(i) ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1) : i] = t[i])
  return s
}
class eH extends ej {
  constructor() {
    ;(super(...arguments), (this.type = 'svg'), (this.isSVGTag = !1), (this.measureInstanceViewportBox = Z))
  }
  getBaseTargetFromProps(t, e) {
    return t[e]
  }
  readValueFromInstance(t, e) {
    if (l.has(e)) {
      let t = Y(e)
      return (t && t.default) || 0
    }
    return ((e = eD.has(e) ? e : eM(e)), t.getAttribute(e))
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return e$(t, e, i)
  }
  build(t, e, i) {
    eB(t, e, this.isSVGTag, i.transformTemplate, i.style)
  }
  renderInstance(t, e, i, s) {
    for (let i in (eV(t, e, void 0, s), e.attrs)) t.setAttribute(eD.has(i) ? i : eM(i), e.attrs[i])
  }
  mount(t) {
    ;((this.isSVGTag = eF(t.tagName)), super.mount(t))
  }
}
function eY({ top: t, left: e, right: i, bottom: s }) {
  return { x: { min: e, max: i }, y: { min: t, max: s } }
}
function eq(t) {
  return void 0 === t || 1 === t
}
function eX({ scale: t, scaleX: e, scaleY: i }) {
  return !eq(t) || !eq(e) || !eq(i)
}
function eG(t) {
  return eX(t) || eZ(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY
}
function eZ(t) {
  var e, i
  return ((e = t.x) && '0%' !== e) || ((i = t.y) && '0%' !== i)
}
function e_(t, e, i, s, n) {
  return (void 0 !== n && (t = s + n * (t - s)), s + i * (t - s) + e)
}
function eK(t, e = 0, i = 1, s, n) {
  ;((t.min = e_(t.min, e, i, s, n)), (t.max = e_(t.max, e, i, s, n)))
}
function eJ(t, { x: e, y: i }) {
  ;(eK(t.x, e.translate, e.scale, e.originPoint), eK(t.y, i.translate, i.scale, i.originPoint))
}
function eQ(t, e) {
  ;((t.min += e), (t.max += e))
}
function e0(t, e, i, s, n = 0.5) {
  let r = eO(t.min, t.max, n)
  eK(t, e, i, r, s)
}
function e1(t, e) {
  return 'string' == typeof t ? (parseFloat(t) / 100) * (e.max - e.min) : t
}
function e2(t, e, i) {
  let s = i ?? t
  ;(e0(t.x, e1(e.x, s.x), e.scaleX, e.scale, e.originX), e0(t.y, e1(e.y, s.y), e.scaleY, e.scale, e.originY))
}
function e5(t, e) {
  return eY(
    (function (t, e) {
      if (!e) return t
      let i = e({ x: t.left, y: t.top }),
        s = e({ x: t.right, y: t.bottom })
      return { top: i.y, left: i.x, bottom: s.y, right: s.x }
    })(t.getBoundingClientRect(), e),
  )
}
class e4 extends ej {
  constructor() {
    ;(super(...arguments), (this.type = 'html'), (this.renderInstance = eV))
  }
  readValueFromInstance(t, e) {
    if (l.has(e))
      return this.projection?.isProjecting
        ? ty(e)
        : ((t, e) => {
            let { transform: i = 'none' } = getComputedStyle(t)
            return tv(i, e)
          })(t, e)
    {
      let i = window.getComputedStyle(t),
        s = (tr(e) ? i.getPropertyValue(e) : i[e]) || 0
      return 'string' == typeof s ? s.trim() : s
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: e }) {
    return e5(t, e)
  }
  build(t, e, i) {
    ek(t, e, i.transformTemplate)
  }
  scrapeMotionValuesFromProps(t, e, i) {
    return ez(t, e, i)
  }
}
let e3 = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
]
function e6(t) {
  if ('string' != typeof t || t.includes('-'));
  else if (e3.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0
  return !1
}
let e8 = (0, a.createContext)({}),
  e7 = (0, a.createContext)({ strict: !1 }),
  e9 = (0, a.createContext)({ transformPagePoint: (t) => t, isStatic: !1, reducedMotion: 'never' }),
  it = (0, a.createContext)({})
function ie(t) {
  return Array.isArray(t) ? t.join(' ') : t
}
let ii = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} })
function is(t, e, i) {
  for (let s in e) _(e[s]) || eW(s, i) || (t[s] = e[s])
}
let ir = () => ({ ...ii(), attrs: {} }),
  ia = new Set([
    'animate',
    'exit',
    'variants',
    'initial',
    'style',
    'values',
    'variants',
    'transition',
    'transformTemplate',
    'custom',
    'inherit',
    'onBeforeLayoutMeasure',
    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onDragStart',
    'onDrag',
    'onDragEnd',
    'onMeasureDragConstraints',
    'onDirectionLock',
    'onDragTransitionEnd',
    '_dragX',
    '_dragY',
    'onHoverStart',
    'onHoverEnd',
    'onViewportEnter',
    'onViewportLeave',
    'globalTapTarget',
    'propagate',
    'ignoreStrict',
    'viewport',
  ])
function io(t) {
  return (
    t.startsWith('while') ||
    (t.startsWith('drag') && 'draggable' !== t) ||
    t.startsWith('layout') ||
    t.startsWith('onTap') ||
    t.startsWith('onPan') ||
    t.startsWith('onLayout') ||
    ia.has(t)
  )
}
let il = (t) => !io(t)
try {
  ;((n = (() => {
    let t = Error("Cannot find module '@emotion/is-prop-valid'")
    throw ((t.code = 'MODULE_NOT_FOUND'), t)
  })().default),
    'function' == typeof n && (il = (t) => (t.startsWith('on') ? !io(t) : n(t))))
} catch {}
function ih(t) {
  return _(t) ? t.get() : t
}
let ic = (0, a.createContext)(null)
function iu(t) {
  let e = (0, a.useRef)(null)
  return (null === e.current && (e.current = t()), e.current)
}
let id = (t) => (e, i) => {
    let s = (0, a.useContext)(it),
      n = (0, a.useContext)(ic),
      r = () =>
        (function ({ scrapeMotionValuesFromProps: t, createRenderState: e }, i, s, n) {
          return {
            latestValues: (function (t, e, i, s) {
              let n = {},
                r = s(t, {})
              for (let t in r) n[t] = ih(r[t])
              let { initial: a, animate: o } = t,
                l = ep(t),
                h = em(t)
              e &&
                h &&
                !l &&
                !1 !== t.inherit &&
                (void 0 === a && (a = e.initial), void 0 === o && (o = e.animate))
              let c = !!i && !1 === i.initial,
                u = (c = c || !1 === a) ? o : a
              if (u && 'boolean' != typeof u && !eh(u)) {
                let e = Array.isArray(u) ? u : [u]
                for (let i = 0; i < e.length; i++) {
                  let s = ev(t, e[i])
                  if (s) {
                    let { transitionEnd: t, transition: e, ...i } = s
                    for (let t in i) {
                      let e = i[t]
                      if (Array.isArray(e)) {
                        let t = c ? e.length - 1 : 0
                        e = e[t]
                      }
                      null !== e && (n[t] = e)
                    }
                    for (let e in t) n[e] = t[e]
                  }
                }
              }
              return n
            })(i, s, n, t),
            renderState: e(),
          }
        })(t, e, s, n)
    return i ? r() : iu(r)
  },
  ip = id({ scrapeMotionValuesFromProps: ez, createRenderState: ii }),
  im = id({ scrapeMotionValuesFromProps: e$, createRenderState: ir }),
  ix = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  ig = !1
function iy() {
  return (
    !(function () {
      if (ig) return
      let t = {}
      for (let e in ix) t[e] = { isEnabled: (t) => ix[e].some((e) => !!t[e]) }
      ;((ew = t), (ig = !0))
    })(),
    ew
  )
}
let iv = Symbol.for('motionComponentSymbol'),
  ib = 'data-' + eM('framerAppearId'),
  iw = (0, a.createContext)({})
function iA(t) {
  return t && 'object' == typeof t && Object.prototype.hasOwnProperty.call(t, 'current')
}
let ij = 'u' > typeof window ? a.useLayoutEffect : a.useEffect
function iM(t, { forwardMotionProps: e = !1, type: i } = {}, s, n) {
  s &&
    (function (t) {
      let e = iy()
      for (let i in t) e[i] = { ...e[i], ...t[i] }
      ew = e
    })(s)
  let o = i ? 'svg' === i : e6(t),
    l = o ? im : ip
  function h(i, s) {
    var h
    let c,
      u,
      d,
      p = {
        ...(0, a.useContext)(e9),
        ...i,
        layoutId: (function ({ layoutId: t }) {
          let e = (0, a.useContext)(e8).id
          return e && void 0 !== t ? e + '-' + t : t
        })(i),
      },
      { isStatic: m } = p,
      f = (function (t) {
        let { initial: e, animate: i } = (function (t, e) {
          if (ep(t)) {
            let { initial: e, animate: i } = t
            return { initial: !1 === e || ec(e) ? e : void 0, animate: ec(i) ? i : void 0 }
          }
          return !1 !== t.inherit ? e : {}
        })(t, (0, a.useContext)(it))
        return (0, a.useMemo)(() => ({ initial: e, animate: i }), [ie(e), ie(i)])
      })(i),
      x = l(i, m)
    if (!m && 'u' > typeof window) {
      ;(0, a.useContext)(e7).strict
      let e = (function (t) {
        let { drag: e, layout: i } = iy()
        if (!e && !i) return {}
        let s = { ...e, ...i }
        return {
          MeasureLayout: e?.isEnabled(t) || i?.isEnabled(t) ? s.MeasureLayout : void 0,
          ProjectionNode: s.ProjectionNode,
        }
      })(p)
      ;((c = e.MeasureLayout),
        (f.visualElement = (function (t, e, i, s, n, r) {
          let { visualElement: o } = (0, a.useContext)(it),
            l = (0, a.useContext)(e7),
            h = (0, a.useContext)(ic),
            c = (0, a.useContext)(e9),
            u = c.reducedMotion,
            d = c.skipAnimations,
            p = (0, a.useRef)(null),
            m = (0, a.useRef)(!1)
          ;((s = s || l.renderer),
            !p.current &&
              s &&
              ((p.current = s(t, {
                visualState: e,
                parent: o,
                props: i,
                presenceContext: h,
                blockInitialAnimation: !!h && !1 === h.initial,
                reducedMotionConfig: u,
                skipAnimations: d,
                isSVG: r,
              })),
              m.current && p.current && (p.current.manuallyAnimateOnMount = !0)))
          let f = p.current,
            x = (0, a.useContext)(iw)
          f &&
            !f.projection &&
            n &&
            ('html' === f.type || 'svg' === f.type) &&
            (function (t, e, i, s) {
              let {
                layoutId: n,
                layout: r,
                drag: a,
                dragConstraints: o,
                layoutScroll: l,
                layoutRoot: h,
                layoutAnchor: c,
                layoutCrossfade: u,
              } = e
              ;((t.projection = new i(
                t.latestValues,
                e['data-framer-portal-id']
                  ? void 0
                  : (function t(e) {
                      if (e) return !1 !== e.options.allowProjection ? e.projection : t(e.parent)
                    })(t.parent),
              )),
                t.projection.setOptions({
                  layoutId: n,
                  layout: r,
                  alwaysMeasureLayout: !!a || (o && iA(o)),
                  visualElement: t,
                  animationType: 'string' == typeof r ? r : 'both',
                  initialPromotionConfig: s,
                  crossfade: u,
                  layoutScroll: l,
                  layoutRoot: h,
                  layoutAnchor: c,
                }))
            })(p.current, i, n, x)
          let g = (0, a.useRef)(!1)
          ;(0, a.useInsertionEffect)(() => {
            f && g.current && f.update(i, h)
          })
          let y = i[ib],
            v = (0, a.useRef)(
              !!y &&
                'u' > typeof window &&
                !window.MotionHandoffIsComplete?.(y) &&
                window.MotionHasOptimisedAnimation?.(y),
            )
          return (
            ij(() => {
              ;((m.current = !0),
                f &&
                  ((g.current = !0),
                  (window.MotionIsMounted = !0),
                  f.updateFeatures(),
                  f.scheduleRenderMicrotask(),
                  v.current && f.animationState && f.animationState.animateChanges()))
            }),
            (0, a.useEffect)(() => {
              f &&
                (!v.current && f.animationState && f.animationState.animateChanges(),
                v.current &&
                  (queueMicrotask(() => {
                    window.MotionHandoffMarkAsComplete?.(y)
                  }),
                  (v.current = !1)),
                (f.enteringChildren = void 0))
            }),
            f
          )
        })(t, x, p, n, e.ProjectionNode, o)))
    }
    return (0, r.jsxs)(it.Provider, {
      value: f,
      children: [
        c && f.visualElement ? (0, r.jsx)(c, { visualElement: f.visualElement, ...p }) : null,
        (function (t, e, i, { latestValues: s }, n, r = !1, o) {
          let l = (
              (o ?? e6(t))
                ? function (t, e, i, s) {
                    let n = (0, a.useMemo)(() => {
                      let i = ir()
                      return (
                        eB(i, e, eF(s), t.transformTemplate, t.style),
                        { ...i.attrs, style: { ...i.style } }
                      )
                    }, [e])
                    if (t.style) {
                      let e = {}
                      ;(is(e, t.style, t), (n.style = { ...e, ...n.style }))
                    }
                    return n
                  }
                : function (t, e) {
                    let i,
                      s,
                      n = {},
                      r =
                        ((i = t.style || {}),
                        is((s = {}), i, t),
                        Object.assign(
                          s,
                          (function ({ transformTemplate: t }, e) {
                            return (0, a.useMemo)(() => {
                              let i = ii()
                              return (ek(i, e, t), Object.assign({}, i.vars, i.style))
                            }, [e])
                          })(t, e),
                        ),
                        s)
                    return (
                      t.drag &&
                        !1 !== t.dragListener &&
                        ((n.draggable = !1),
                        (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
                        (r.touchAction = !0 === t.drag ? 'none' : `pan-${'x' === t.drag ? 'y' : 'x'}`)),
                      void 0 === t.tabIndex && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0),
                      (n.style = r),
                      n
                    )
                  }
            )(e, s, n, t),
            h = (function (t, e, i) {
              let s = {}
              for (let n in t)
                ('values' !== n || 'object' != typeof t.values) &&
                  !_(t[n]) &&
                  (il(n) ||
                    (!0 === i && io(n)) ||
                    (!e && !io(n)) ||
                    (t.draggable && n.startsWith('onDrag'))) &&
                  (s[n] = t[n])
              return s
            })(e, 'string' == typeof t, r),
            c = t !== a.Fragment ? { ...h, ...l, ref: i } : {},
            { children: u } = e,
            d = (0, a.useMemo)(() => (_(u) ? u.get() : u), [u])
          return (0, a.createElement)(t, { ...c, children: d })
        })(
          t,
          i,
          ((h = f.visualElement),
          (u = (0, a.useRef)(s)),
          (0, a.useInsertionEffect)(() => {
            u.current = s
          }),
          (d = (0, a.useRef)(null)),
          (0, a.useCallback)(
            (t) => {
              ;(t && x.onMount?.(t), h && (t ? h.mount(t) : h.unmount()))
              let e = u.current
              if ('function' == typeof e)
                if (t) {
                  let i = e(t)
                  'function' == typeof i && (d.current = i)
                } else d.current ? (d.current(), (d.current = null)) : e(t)
              else e && (e.current = t)
            },
            [h],
          )),
          x,
          m,
          e,
          o,
        ),
      ],
    })
  }
  h.displayName = `motion.${'string' == typeof t ? t : `create(${t.displayName ?? t.name ?? ''})`}`
  let c = (0, a.forwardRef)(h)
  return ((c[iv] = t), c)
}
class iT {
  constructor(t) {
    ;((this.isMounted = !1), (this.node = t))
  }
  update() {}
}
function iS(t, e, i) {
  let s = t.getProps()
  return ev(s, e, void 0 !== i ? i : s.custom, t)
}
function iC(t, e) {
  if (t?.inherit && e) {
    let { inherit: i, ...s } = t
    return { ...e, ...s }
  }
  return t
}
function ik(t, e) {
  let i = t?.[e] ?? t?.default ?? t
  return i !== t ? iC(i, t) : i
}
let iE = (t) => Array.isArray(t)
function iP(t, e) {
  let i = t.getValue('willChange')
  if (_(i) && i.add) return i.add(e)
  if (!i && tS.WillChange) {
    let i = new tS.WillChange('auto')
    ;(t.addValue('willChange', i), i.add(e))
  }
}
let iN = (...t) => t.reduce((t, e) => (i) => e(t(i)))
function iB(t, e, i) {
  return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
    ? t + (e - t) * 6 * i
    : i < 0.5
      ? e
      : i < 2 / 3
        ? t + (e - t) * (2 / 3 - i) * 6
        : t
}
function iD(t, e) {
  return (i) => (i > 0 ? e : t)
}
let iF = (t, e, i) => {
    let s = t * t,
      n = i * (e * e - s) + s
    return n < 0 ? 0 : Math.sqrt(n)
  },
  iV = [b, v, k]
function iR(t) {
  let e = iV.find((e) => e.test(t))
  if (
    (ti(
      !!e,
      `'${t}' is not an animatable color. Use the equivalent color code instead.`,
      'color-not-animatable',
    ),
    !e)
  )
    return !1
  let i = e.parse(t)
  return (
    e === k &&
      (i = (function ({ hue: t, saturation: e, lightness: i, alpha: s }) {
        ;((t /= 360), (i /= 100))
        let n = 0,
          r = 0,
          a = 0
        if ((e /= 100)) {
          let s = i < 0.5 ? i * (1 + e) : i + e - i * e,
            o = 2 * i - s
          ;((n = iB(o, s, t + 1 / 3)), (r = iB(o, s, t)), (a = iB(o, s, t - 1 / 3)))
        } else n = r = a = i
        return { red: Math.round(255 * n), green: Math.round(255 * r), blue: Math.round(255 * a), alpha: s }
      })(i)),
    i
  )
}
let iL = (t, e) => {
    let i = iR(t),
      s = iR(e)
    if (!i || !s) return iD(t, e)
    let n = { ...i }
    return (t) => (
      (n.red = iF(i.red, s.red, t)),
      (n.green = iF(i.green, s.green, t)),
      (n.blue = iF(i.blue, s.blue, t)),
      (n.alpha = eO(i.alpha, s.alpha, t)),
      v.transform(n)
    )
  },
  iI = new Set(['none', 'hidden'])
function iO(t, e) {
  return (i) => eO(t, e, i)
}
function iU(t) {
  return 'number' == typeof t
    ? iO
    : 'string' == typeof t
      ? to(t)
        ? iD
        : E.test(t)
          ? iL
          : i$
      : Array.isArray(t)
        ? iW
        : 'object' == typeof t
          ? E.test(t)
            ? iL
            : iz
          : iD
}
function iW(t, e) {
  let i = [...t],
    s = i.length,
    n = t.map((t, i) => iU(t)(t, e[i]))
  return (t) => {
    for (let e = 0; e < s; e++) i[e] = n[e](t)
    return i
  }
}
function iz(t, e) {
  let i = { ...t, ...e },
    s = {}
  for (let n in i) void 0 !== t[n] && void 0 !== e[n] && (s[n] = iU(t[n])(t[n], e[n]))
  return (t) => {
    for (let e in s) i[e] = s[e](t)
    return i
  }
}
let i$ = (t, e) => {
  let i = R.createTransformer(e),
    s = F(t),
    n = F(e)
  if (!(
    s.indexes.var.length === n.indexes.var.length &&
    s.indexes.color.length === n.indexes.color.length &&
    s.indexes.number.length >= n.indexes.number.length
  ))
    return (
      ti(
        !0,
        `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
        'complex-values-different',
      ),
      iD(t, e)
    )
  if ((iI.has(t) && !n.values.length) || (iI.has(e) && !s.values.length))
    return iI.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t)
  return iN(
    iW(
      (function (t, e) {
        let i = [],
          s = { color: 0, var: 0, number: 0 }
        for (let n = 0; n < e.values.length; n++) {
          let r = e.types[n],
            a = t.indexes[r][s[r]],
            o = t.values[a] ?? 0
          ;((i[n] = o), s[r]++)
        }
        return i
      })(s, n),
      n.values,
    ),
    i,
  )
}
function iH(t, e, i) {
  return 'number' == typeof t && 'number' == typeof e && 'number' == typeof i ? eO(t, e, i) : iU(t)(t, e)
}
let iY = (t) => {
  let e = ({ timestamp: e }) => t(e)
  return {
    start: (t = !0) => tE.update(e, t),
    stop: () => tP(e),
    now: () => (tN.isProcessing ? tN.timestamp : ei.now()),
  }
}
function iq(t) {
  let e = 0,
    i = t.next(e)
  for (; !i.done && e < 2e4;) ((e += 50), (i = t.next(e)))
  return e >= 2e4 ? 1 / 0 : e
}
let iX = 0.01,
  iG = 2,
  iZ = 0.005,
  i_ = 0.5
function iK(t, e) {
  return t * Math.sqrt(1 - e * e)
}
let iJ = ['duration', 'bounce'],
  iQ = ['stiffness', 'damping', 'mass']
function i0(t, e) {
  return e.some((e) => void 0 !== t[e])
}
function i1(t = 0.3, e = 0.3) {
  let i,
    s,
    n,
    r,
    a,
    o,
    l = 'object' != typeof t ? { visualDuration: t, keyframes: [0, 1], bounce: e } : t,
    { restSpeed: c, restDelta: u } = l,
    d = l.keyframes[0],
    p = l.keyframes[l.keyframes.length - 1],
    m = { done: !1, value: d },
    {
      stiffness: f,
      damping: x,
      mass: g,
      duration: y,
      velocity: v,
      isResolvedFromDuration: b,
    } = (function (t) {
      let e = { velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: !1, ...t }
      if (!i0(t, iQ) && i0(t, iJ))
        if (((e.velocity = 0), t.visualDuration)) {
          let i = (2 * Math.PI) / (1.2 * t.visualDuration),
            s = i * i,
            n = 2 * h(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s)
          e = { ...e, mass: 1, stiffness: s, damping: n }
        } else {
          let i = (function ({ duration: t = 800, bounce: e = 0.3, velocity: i = 0, mass: s = 1 }) {
            let n, r
            ti(t <= tH(10), 'Spring duration must be 10 seconds or less', 'spring-duration-limit')
            let a = 1 - e
            ;((a = h(0.05, 1, a)),
              (t = h(0.01, 10, t / 1e3)),
              a < 1
                ? ((n = (e) => {
                    let s = e * a,
                      n = s * t
                    return 0.001 - ((s - i) / iK(e, a)) * Math.exp(-n)
                  }),
                  (r = (e) => {
                    let s = e * a * t,
                      r = Math.pow(a, 2) * Math.pow(e, 2) * t,
                      o = Math.exp(-s),
                      l = iK(Math.pow(e, 2), a)
                    return ((s * i + i - r) * o * (-n(e) + 0.001 > 0 ? -1 : 1)) / l
                  }))
                : ((n = (e) => -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                  (r = (e) => t * t * (i - e) * Math.exp(-e * t))))
            let o = (function (t, e, i) {
              let s = i
              for (let i = 1; i < 12; i++) s -= t(s) / e(s)
              return s
            })(n, r, 5 / t)
            if (((t = tH(t)), isNaN(o))) return { stiffness: 100, damping: 10, duration: t }
            {
              let e = Math.pow(o, 2) * s
              return { stiffness: e, damping: 2 * a * Math.sqrt(s * e), duration: t }
            }
          })({ ...t, velocity: 0 })
          ;(e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0
        }
      return e
    })({ ...l, velocity: -((l.velocity || 0) / 1e3) }),
    w = v || 0,
    A = x / (2 * Math.sqrt(f * g)),
    j = p - d,
    M = Math.sqrt(f / g) / 1e3,
    T = 5 > Math.abs(j)
  if ((c || (c = T ? iX : iG), u || (u = T ? iZ : i_), A < 1))
    ((n = iK(M, A)),
      (r = (w + A * M * j) / n),
      (i = (t) => p - Math.exp(-A * M * t) * (r * Math.sin(n * t) + j * Math.cos(n * t))),
      (a = A * M * r + j * n),
      (o = A * M * j - r * n),
      (s = (t) => Math.exp(-A * M * t) * (a * Math.sin(n * t) + o * Math.cos(n * t))))
  else if (1 === A) {
    i = (t) => p - Math.exp(-M * t) * (j + (w + M * j) * t)
    let t = w + M * j
    s = (e) => Math.exp(-M * e) * (M * t * e - w)
  } else {
    let t = M * Math.sqrt(A * A - 1)
    i = (e) => {
      let i = Math.exp(-A * M * e),
        s = Math.min(t * e, 300)
      return p - (i * ((w + A * M * j) * Math.sinh(s) + t * j * Math.cosh(s))) / t
    }
    let e = (w + A * M * j) / t,
      n = A * M * e - j * t,
      r = A * M * j - e * t
    s = (e) => {
      let i = Math.exp(-A * M * e),
        s = Math.min(t * e, 300)
      return i * (n * Math.sinh(s) + r * Math.cosh(s))
    }
  }
  let S = {
    calculatedDuration: (b && y) || null,
    velocity: (t) => tH(s(t)),
    next: (t) => {
      if (!b && A < 1) {
        let e = Math.exp(-A * M * t),
          i = Math.sin(n * t),
          s = Math.cos(n * t),
          l = p - e * (r * i + j * s)
        return (
          (m.done = Math.abs(tH(e * (a * i + o * s))) <= c && Math.abs(p - l) <= u),
          (m.value = m.done ? p : l),
          m
        )
      }
      let e = i(t)
      return (
        b ? (m.done = t >= y) : (m.done = Math.abs(tH(s(t))) <= c && Math.abs(p - e) <= u),
        (m.value = m.done ? p : e),
        m
      )
    },
    toString: () => {
      let t = Math.min(iq(S), 2e4),
        e = t4((e) => S.next(t * e).value, t, 30)
      return t + 'ms ' + e
    },
    toTransition: () => {},
  }
  return S
}
function i2(t, e, i) {
  let s = Math.max(e - 5, 0)
  return es(i - t(s), e - s)
}
function i5({
  keyframes: t,
  velocity: e = 0,
  power: i = 0.8,
  timeConstant: s = 325,
  bounceDamping: n = 10,
  bounceStiffness: r = 500,
  modifyTarget: a,
  min: o,
  max: l,
  restDelta: h = 0.5,
  restSpeed: c,
}) {
  let u,
    d,
    p = t[0],
    m = { done: !1, value: p },
    f = i * e,
    x = p + f,
    g = void 0 === a ? x : a(x)
  g !== x && (f = g - p)
  let y = (t) => -f * Math.exp(-t / s),
    v = (t) => g + y(t),
    b = (t) => {
      let e = y(t),
        i = v(t)
      ;((m.done = Math.abs(e) <= h), (m.value = m.done ? g : i))
    },
    w = (t) => {
      let e
      if (((e = m.value), (void 0 !== o && e < o) || (void 0 !== l && e > l))) {
        var i
        ;((u = t),
          (d = i1({
            keyframes: [
              m.value,
              ((i = m.value), void 0 === o ? l : void 0 === l || Math.abs(o - i) < Math.abs(l - i) ? o : l),
            ],
            velocity: i2(v, t, m.value),
            damping: n,
            stiffness: r,
            restDelta: h,
            restSpeed: c,
          })))
      }
    }
  return (
    w(0),
    {
      calculatedDuration: null,
      next: (t) => {
        let e = !1
        return (d || void 0 !== u || ((e = !0), b(t), w(t)), void 0 !== u && t >= u)
          ? d.next(t - u)
          : (e || b(t), m)
      },
    }
  )
}
i1.applyToOptions = (t) => {
  let e = (function (t, e = 100, i) {
    let s = i({ ...t, keyframes: [0, e] }),
      n = Math.min(iq(s), 2e4)
    return { type: 'keyframes', ease: (t) => s.next(n * t).value / e, duration: n / 1e3 }
  })(t, 100, i1)
  return ((t.ease = e.ease), (t.duration = tH(e.duration)), (t.type = 'keyframes'), t)
}
let i4 = (t, e, i) => (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t
function i3(t, e, i, s) {
  return t === e && i === s
    ? tT
    : (n) =>
        0 === n || 1 === n
          ? n
          : i4(
              (function (t, e, i, s, n) {
                let r,
                  a,
                  o = 0
                do (r = i4((a = e + (i - e) / 2), s, n) - t) > 0 ? (i = a) : (e = a)
                while (Math.abs(r) > 1e-7 && ++o < 12)
                return a
              })(n, 0, 1, t, i),
              e,
              s,
            )
}
let i6 = i3(0.42, 0, 1, 1),
  i8 = i3(0, 0, 0.58, 1),
  i7 = i3(0.42, 0, 0.58, 1),
  i9 = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
  st = (t) => (e) => 1 - t(1 - e),
  se = i3(0.33, 1.53, 0.69, 0.99),
  si = st(se),
  ss = i9(si),
  sn = (t) => (t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * si(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))),
  sr = (t) => 1 - Math.sin(Math.acos(t)),
  sa = st(sr),
  so = i9(sr),
  sl = {
    linear: tT,
    easeIn: i6,
    easeInOut: i7,
    easeOut: i8,
    circIn: sr,
    circInOut: so,
    circOut: sa,
    backIn: si,
    backInOut: ss,
    backOut: se,
    anticipate: sn,
  },
  sh = (t) => {
    if (t2(t)) {
      ts(4 === t.length, 'Cubic bezier arrays must contain four numerical values.', 'cubic-bezier-length')
      let [e, i, s, n] = t
      return i3(e, i, s, n)
    }
    return 'string' == typeof t
      ? (ts(void 0 !== sl[t], `Invalid easing type '${t}'`, 'invalid-easing-type'), sl[t])
      : t
  },
  sc = (t, e, i) => {
    let s = e - t
    return s ? (i - t) / s : 1
  }
function su({ duration: t = 300, keyframes: e, times: i, ease: s = 'easeInOut' }) {
  var n
  let r,
    a = Array.isArray(s) && 'number' != typeof s[0] ? s.map(sh) : sh(s),
    o = { done: !1, value: e[0] },
    l = (function (t, e, { clamp: i = !0, ease: s, mixer: n } = {}) {
      let r = t.length
      if (
        (ts(r === e.length, 'Both input and output ranges must be the same length', 'range-length'), 1 === r)
      )
        return () => e[0]
      if (2 === r && e[0] === e[1]) return () => e[1]
      let a = t[0] === t[1]
      t[0] > t[r - 1] && ((t = [...t].reverse()), (e = [...e].reverse()))
      let o = (function (t, e, i) {
          let s = [],
            n = i || tS.mix || iH,
            r = t.length - 1
          for (let i = 0; i < r; i++) {
            let r = n(t[i], t[i + 1])
            ;(e && (r = iN(Array.isArray(e) ? e[i] || tT : e, r)), s.push(r))
          }
          return s
        })(e, s, n),
        l = o.length,
        c = (i) => {
          if (a && i < t[0]) return e[0]
          let s = 0
          if (l > 1) for (; s < t.length - 2 && !(i < t[s + 1]); s++);
          let n = sc(t[s], t[s + 1], i)
          return o[s](n)
        }
      return i ? (e) => c(h(t[0], t[r - 1], e)) : c
    })(
      ((n =
        i && i.length === e.length
          ? i
          : (!(function (t, e) {
              let i = t[t.length - 1]
              for (let s = 1; s <= e; s++) {
                let n = sc(0, e, s)
                t.push(eO(i, 1, n))
              }
            })((r = [0]), e.length - 1),
            r)),
      n.map((e) => e * t)),
      e,
      { ease: Array.isArray(a) ? a : e.map(() => a || i7).splice(0, e.length - 1) },
    )
  return { calculatedDuration: t, next: (e) => ((o.value = l(e)), (o.done = e >= t), o) }
}
let sd = { decay: i5, inertia: i5, tween: su, keyframes: su, spring: i1 }
function sp(t) {
  'string' == typeof t.type && (t.type = sd[t.type])
}
let sm = (t) => t / 100
class sf extends t1 {
  constructor(t) {
    ;(super(),
      (this.state = 'idle'),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.delayState = { done: !1, value: void 0 }),
      (this.stop = () => {
        let { motionValue: t } = this.options
        ;(t && t.updatedAt !== ei.now() && this.tick(ei.now()),
          (this.isStopped = !0),
          'idle' !== this.state && (this.teardown(), this.options.onStop?.()))
      }),
      (this.options = t),
      this.initAnimation(),
      this.play(),
      !1 === t.autoplay && this.pause())
  }
  initAnimation() {
    let { options: t } = this
    sp(t)
    let { type: e = su, repeat: i = 0, repeatDelay: s = 0, repeatType: n, velocity: r = 0 } = t,
      { keyframes: a } = t,
      o = e || su
    o !== su && 'number' != typeof a[0] && ((this.mixKeyframes = iN(sm, iH(a[0], a[1]))), (a = [0, 100]))
    let l = o({ ...t, keyframes: a })
    ;('mirror' === n && (this.mirroredGenerator = o({ ...t, keyframes: [...a].reverse(), velocity: -r })),
      null === l.calculatedDuration && (l.calculatedDuration = iq(l)))
    let { calculatedDuration: h } = l
    ;((this.calculatedDuration = h),
      (this.resolvedDuration = h + s),
      (this.totalDuration = this.resolvedDuration * (i + 1) - s),
      (this.generator = l))
  }
  updateTime(t) {
    let e = Math.round(t - this.startTime) * this.playbackSpeed
    null !== this.holdTime ? (this.currentTime = this.holdTime) : (this.currentTime = e)
  }
  tick(t, e = !1) {
    let i,
      {
        generator: s,
        totalDuration: n,
        mixKeyframes: r,
        mirroredGenerator: a,
        resolvedDuration: o,
        calculatedDuration: l,
      } = this
    if (null === this.startTime) return s.next(0)
    let {
      delay: c = 0,
      keyframes: u,
      repeat: d,
      repeatType: p,
      repeatDelay: m,
      type: f,
      onUpdate: x,
      finalKeyframe: g,
    } = this.options
    ;(this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 && (this.startTime = Math.min(t - n / this.speed, this.startTime)),
      e ? (this.currentTime = t) : this.updateTime(t))
    let y = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
      v = this.playbackSpeed >= 0 ? y < 0 : y > n
    ;((this.currentTime = Math.max(y, 0)),
      'finished' === this.state && null === this.holdTime && (this.currentTime = n))
    let b = this.currentTime,
      w = s
    if (d) {
      let t = Math.min(this.currentTime, n) / o,
        e = Math.floor(t),
        i = t % 1
      ;(!i && t >= 1 && (i = 1),
        1 === i && e--,
        (e = Math.min(e, d + 1)) % 2 &&
          ('reverse' === p ? ((i = 1 - i), m && (i -= m / o)) : 'mirror' === p && (w = a)),
        (b = h(0, 1, i) * o))
    }
    ;(v ? ((this.delayState.value = u[0]), (i = this.delayState)) : (i = w.next(b)),
      r && !v && (i.value = r(i.value)))
    let { done: A } = i
    v || null === l || (A = this.playbackSpeed >= 0 ? this.currentTime >= n : this.currentTime <= 0)
    let j = null === this.holdTime && ('finished' === this.state || ('running' === this.state && A))
    return (
      j && f !== i5 && (i.value = t0(u, this.options, g, this.speed)),
      x && x(i.value),
      j && this.finish(),
      i
    )
  }
  then(t, e) {
    return this.finished.then(t, e)
  }
  get duration() {
    return this.calculatedDuration / 1e3
  }
  get iterationDuration() {
    let { delay: t = 0 } = this.options || {}
    return this.duration + t / 1e3
  }
  get time() {
    return this.currentTime / 1e3
  }
  set time(t) {
    ;((t = tH(t)),
      (this.currentTime = t),
      null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed),
      this.driver
        ? this.driver.start(!1)
        : ((this.startTime = 0), (this.state = 'paused'), (this.holdTime = t), this.tick(t)))
  }
  getGeneratorVelocity() {
    let t = this.currentTime
    if (t <= 0) return this.options.velocity || 0
    if (this.generator.velocity) return this.generator.velocity(t)
    let e = this.generator.next(t).value
    return i2((t) => this.generator.next(t).value, t, e)
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(t) {
    let e = this.playbackSpeed !== t
    ;(e && this.driver && this.updateTime(ei.now()),
      (this.playbackSpeed = t),
      e && this.driver && (this.time = this.currentTime / 1e3))
  }
  play() {
    if (this.isStopped) return
    let { driver: t = iY, startTime: e } = this.options
    ;(this.driver || (this.driver = t((t) => this.tick(t))), this.options.onPlay?.())
    let i = this.driver.now()
    ;('finished' === this.state
      ? (this.updateFinished(), (this.startTime = i))
      : null !== this.holdTime
        ? (this.startTime = i - this.holdTime)
        : this.startTime || (this.startTime = e ?? i),
      'finished' === this.state && this.speed < 0 && (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start())
  }
  pause() {
    ;((this.state = 'paused'), this.updateTime(ei.now()), (this.holdTime = this.currentTime))
  }
  complete() {
    ;('running' !== this.state && this.play(), (this.state = 'finished'), (this.holdTime = null))
  }
  finish() {
    ;(this.notifyFinished(), this.teardown(), (this.state = 'finished'), this.options.onComplete?.())
  }
  cancel() {
    ;((this.holdTime = null), (this.startTime = 0), this.tick(0), this.teardown(), this.options.onCancel?.())
  }
  teardown() {
    ;((this.state = 'idle'), this.stopDriver(), (this.startTime = this.holdTime = null))
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0))
  }
  sample(t) {
    return ((this.startTime = 0), this.tick(t, !0))
  }
  attachTimeline(t) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = 'keyframes'), (this.options.ease = 'linear'), this.initAnimation()),
      this.driver?.stop(),
      t.observe(this)
    )
  }
}
let sx = { anticipate: sn, backInOut: ss, circInOut: so }
class sg extends t7 {
  constructor(t) {
    ;(!(function (t) {
      'string' == typeof t.ease && t.ease in sx && (t.ease = sx[t.ease])
    })(t),
      sp(t),
      super(t),
      void 0 !== t.startTime && !1 !== t.autoplay && (this.startTime = t.startTime),
      (this.options = t))
  }
  updateMotionValue(t) {
    let { motionValue: e, onUpdate: i, onComplete: s, element: n, ...r } = this.options
    if (!e) return
    if (void 0 !== t) return void e.set(t)
    let a = new sf({ ...r, autoplay: !1 }),
      o = Math.max(10, ei.now() - this.startTime),
      l = h(0, 10, o - 10),
      c = a.sample(o).value,
      { name: u } = this.options
    ;(n && u && tG(n, u, c), e.setWithVelocity(a.sample(Math.max(0, o - l)).value, c, l), a.stop())
  }
}
let sy = (t, e) =>
  'zIndex' !== e &&
  !!(
    'number' == typeof t ||
    Array.isArray(t) ||
    ('string' == typeof t && (R.test(t) || '0' === t) && !t.startsWith('url('))
  )
function sv(t) {
  ;((t.duration = 0), (t.type = 'keyframes'))
}
let sb = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/,
  sw = new Set([
    'color',
    'backgroundColor',
    'outlineColor',
    'fill',
    'stroke',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
  ]),
  sA = tZ(() => Object.hasOwnProperty.call(Element.prototype, 'animate'))
class sj extends t1 {
  constructor({
    autoplay: t = !0,
    delay: e = 0,
    type: i = 'keyframes',
    repeat: s = 0,
    repeatDelay: n = 0,
    repeatType: r = 'loop',
    keyframes: a,
    name: o,
    motionValue: l,
    element: h,
    ...c
  }) {
    ;(super(),
      (this.stop = () => {
        ;(this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel())
      }),
      (this.createdAt = ei.now()))
    const u = {
        autoplay: t,
        delay: e,
        type: i,
        repeat: s,
        repeatDelay: n,
        repeatType: r,
        name: o,
        motionValue: l,
        element: h,
        ...c,
      },
      d = h?.KeyframeResolver || tO
    ;((this.keyframeResolver = new d(a, (t, e, i) => this.onKeyframesResolved(t, e, u, !i), o, l, h)),
      this.keyframeResolver?.scheduleResolve())
  }
  onKeyframesResolved(t, e, i, s) {
    let n
    this.keyframeResolver = void 0
    let { name: r, type: a, velocity: o, delay: l, isHandoff: h, onUpdate: c } = i
    this.resolvedAt = ei.now()
    let u = !0
    !(function (t, e, i, s) {
      let n = t[0]
      if (null === n) return !1
      if ('display' === e || 'visibility' === e) return !0
      let r = t[t.length - 1],
        a = sy(n, e),
        o = sy(r, e)
      return (
        ti(
          a === o,
          `You are trying to animate ${e} from "${n}" to "${r}". "${a ? r : n}" is not an animatable value.`,
          'value-not-animatable',
        ),
        !!a &&
          !!o &&
          ((function (t) {
            let e = t[0]
            if (1 === t.length) return !0
            for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0
          })(t) ||
            (('spring' === i || t8(i)) && s))
      )
    })(t, r, a, o) &&
      ((u = !1),
      (tS.instantAnimations || !l) && c?.(t0(t, i, e)),
      (t[0] = t[t.length - 1]),
      sv(i),
      (i.repeat = 0))
    let d = {
        startTime: s
          ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
            ? this.resolvedAt
            : this.createdAt
          : void 0,
        finalKeyframe: e,
        ...i,
        keyframes: t,
      },
      p =
        u &&
        !h &&
        (function (t) {
          let {
            motionValue: e,
            name: i,
            repeatDelay: s,
            repeatType: n,
            damping: r,
            type: a,
            keyframes: o,
          } = t
          if (!(e?.owner?.current instanceof HTMLElement)) return !1
          let { onUpdate: l, transformTemplate: h } = e.owner.getProps()
          return (
            sA() &&
            i &&
            (t9.has(i) ||
              (sw.has(i) &&
                (function (t) {
                  for (let e = 0; e < t.length; e++) if ('string' == typeof t[e] && sb.test(t[e])) return !0
                  return !1
                })(o))) &&
            ('transform' !== i || !h) &&
            !l &&
            !s &&
            'mirror' !== n &&
            0 !== r &&
            'inertia' !== a
          )
        })(d),
      m = d.motionValue?.owner?.current
    if (p)
      try {
        n = new sg({ ...d, element: m })
      } catch {
        n = new sf(d)
      }
    else n = new sf(d)
    ;(n.finished
      .then(() => {
        this.notifyFinished()
      })
      .catch(tT),
      this.pendingTimeline &&
        ((this.stopTimeline = n.attachTimeline(this.pendingTimeline)), (this.pendingTimeline = void 0)),
      (this._animation = n))
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished
  }
  then(t, e) {
    return this.finished.finally(t).then(() => {})
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), (tR = !0), tI(), tL(), (tR = !1)),
      this._animation
    )
  }
  get duration() {
    return this.animation.duration
  }
  get iterationDuration() {
    return this.animation.iterationDuration
  }
  get time() {
    return this.animation.time
  }
  set time(t) {
    this.animation.time = t
  }
  get speed() {
    return this.animation.speed
  }
  get state() {
    return this.animation.state
  }
  set speed(t) {
    this.animation.speed = t
  }
  get startTime() {
    return this.animation.startTime
  }
  attachTimeline(t) {
    return (
      this._animation ? (this.stopTimeline = this.animation.attachTimeline(t)) : (this.pendingTimeline = t),
      () => this.stop()
    )
  }
  play() {
    this.animation.play()
  }
  pause() {
    this.animation.pause()
  }
  complete() {
    this.animation.complete()
  }
  cancel() {
    ;(this._animation && this.animation.cancel(), this.keyframeResolver?.cancel())
  }
}
let sM = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  sT = { type: 'keyframes', duration: 0.8 },
  sS = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  sC = new Set([
    'when',
    'delay',
    'delayChildren',
    'staggerChildren',
    'staggerDirection',
    'repeat',
    'repeatType',
    'repeatDelay',
    'from',
    'elapsed',
  ]),
  sk =
    (t, e, i, s = {}, n, r) =>
    (a) => {
      let o = ik(s, t) || {},
        h = o.delay || s.delay || 0,
        { elapsed: c = 0 } = s
      c -= tH(h)
      let u = {
        keyframes: Array.isArray(i) ? i : [null, i],
        ease: 'easeOut',
        velocity: e.getVelocity(),
        ...o,
        delay: -c,
        onUpdate: (t) => {
          ;(e.set(t), o.onUpdate && o.onUpdate(t))
        },
        onComplete: () => {
          ;(a(), o.onComplete && o.onComplete())
        },
        name: t,
        motionValue: e,
        element: r ? void 0 : n,
      }
      ;(!(function (t) {
        for (let e in t) if (!sC.has(e)) return !0
        return !1
      })(o) &&
        Object.assign(
          u,
          ((t, { keyframes: e }) =>
            e.length > 2
              ? sT
              : l.has(t)
                ? t.startsWith('scale')
                  ? {
                      type: 'spring',
                      stiffness: 550,
                      damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                      restSpeed: 10,
                    }
                  : sM
                : sS)(t, u),
        ),
        u.duration && (u.duration = tH(u.duration)),
        u.repeatDelay && (u.repeatDelay = tH(u.repeatDelay)),
        void 0 !== u.from && (u.keyframes[0] = u.from))
      let d = !1
      if (
        ((!1 !== u.type && (0 !== u.duration || u.repeatDelay)) || (sv(u), 0 === u.delay && (d = !0)),
        (tS.instantAnimations || tS.skipAnimations || n?.shouldSkipAnimations || o.skipAnimations) &&
          ((d = !0), sv(u), (u.delay = 0)),
        (u.allowFlatten = !o.type && !o.ease),
        d && !r && void 0 !== e.get())
      ) {
        let t = t0(u.keyframes, o)
        if (void 0 !== t)
          return void tE.update(() => {
            ;(u.onUpdate(t), u.onComplete())
          })
      }
      return o.isSync ? new sf(u) : new sj(u)
    }
function sE(t, e, { delay: i = 0, transitionOverride: s, type: n } = {}) {
  let { transition: r, transitionEnd: a, ...o } = e,
    l = t.getDefaultTransition()
  r = r ? iC(r, l) : l
  let h = r?.reduceMotion,
    c = r?.skipAnimations
  s && (r = s)
  let u = [],
    d = n && t.animationState && t.animationState.getState()[n],
    p = r?.path
  for (let e in (p && p.animateVisualElement(t, o, r, i, u), o)) {
    let s = t.getValue(e, t.latestValues[e] ?? null),
      n = o[e]
    if (
      void 0 === n ||
      (d &&
        (function ({ protectedKeys: t, needsAnimating: e }, i) {
          let s = t.hasOwnProperty(i) && !0 !== e[i]
          return ((e[i] = !1), s)
        })(d, e))
    )
      continue
    let a = { delay: i, ...ik(r || {}, e) }
    c && (a.skipAnimations = !0)
    let l = s.get()
    if (void 0 !== l && !s.isAnimating() && !Array.isArray(n) && n === l && !a.velocity) {
      tE.update(() => s.set(n))
      continue
    }
    let p = !1
    if (window.MotionHandoffAnimation) {
      let i = t.props[ib]
      if (i) {
        let t = window.MotionHandoffAnimation(i, e, tE)
        null !== t && ((a.startTime = t), (p = !0))
      }
    }
    iP(t, e)
    let m = h ?? t.shouldReduceMotion
    s.start(sk(e, s, n, m && K.has(e) ? { type: !1 } : a, t, p))
    let f = s.animation
    f && u.push(f)
  }
  if (a) {
    let e = () =>
      tE.update(() => {
        a &&
          (function (t, e) {
            let { transitionEnd: i = {}, transition: s = {}, ...n } = iS(t, e) || {}
            for (let e in (n = { ...n, ...i })) {
              var r
              let i = iE((r = n[e])) ? r[r.length - 1] || 0 : r
              t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, ea(i))
            }
          })(t, a)
      })
    u.length ? Promise.all(u).then(e) : e()
  }
  return u
}
function sP(t, e, i, s = 0, n = 1) {
  let r = Array.from(t)
      .sort((t, e) => t.sortNodePosition(e))
      .indexOf(e),
    a = t.size,
    o = (a - 1) * s
  return 'function' == typeof i ? i(r, a) : 1 === n ? r * s : o - r * s
}
function sN(t, e, i = {}) {
  let s = iS(t, e, 'exit' === i.type ? t.presenceContext?.custom : void 0),
    { transition: n = t.getDefaultTransition() || {} } = s || {}
  i.transitionOverride && (n = i.transitionOverride)
  let r = s ? () => Promise.all(sE(t, s, i)) : () => Promise.resolve(),
    a =
      t.variantChildren && t.variantChildren.size
        ? (s = 0) => {
            let { delayChildren: r = 0, staggerChildren: a, staggerDirection: o } = n
            return (function (t, e, i = 0, s = 0, n = 0, r = 1, a) {
              let o = []
              for (let l of t.variantChildren)
                (l.notify('AnimationStart', e),
                  o.push(
                    sN(l, e, {
                      ...a,
                      delay: i + ('function' == typeof s ? 0 : s) + sP(t.variantChildren, l, s, n, r),
                    }).then(() => l.notify('AnimationComplete', e)),
                  ))
              return Promise.all(o)
            })(t, e, s, r, a, o, i)
          }
        : () => Promise.resolve(),
    { when: o } = n
  if (!o) return Promise.all([r(), a(i.delay)])
  {
    let [t, e] = 'beforeChildren' === o ? [r, a] : [a, r]
    return t().then(() => e())
  }
}
let sB = ed.length
function sD(t, e) {
  if (!Array.isArray(e)) return !1
  let i = e.length
  if (i !== t.length) return !1
  for (let s = 0; s < i; s++) if (e[s] !== t[s]) return !1
  return !0
}
let sF = [...eu].reverse(),
  sV = eu.length
function sR(t = !1) {
  return { isActive: t, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} }
}
function sL() {
  return {
    animate: sR(!0),
    whileInView: sR(),
    whileHover: sR(),
    whileTap: sR(),
    whileDrag: sR(),
    whileFocus: sR(),
    exit: sR(),
  }
}
let sI = 0
function sO(t) {
  return [t('x'), t('y')]
}
function sU(t, e, i, s = { passive: !0 }) {
  return (t.addEventListener(e, i, s), () => t.removeEventListener(e, i, s))
}
let sW = { x: !1, y: !1 }
function sz(t) {
  return t.max - t.min
}
function s$(t, e, i, s = 0.5) {
  ;((t.origin = s),
    (t.originPoint = eO(e.min, e.max, t.origin)),
    (t.scale = sz(i) / sz(e)),
    (t.translate = eO(i.min, i.max, t.origin) - t.originPoint),
    ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) && (t.scale = 1),
    ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) && (t.translate = 0))
}
function sH(t, e, i, s) {
  ;(s$(t.x, e.x, i.x, s ? s.originX : void 0), s$(t.y, e.y, i.y, s ? s.originY : void 0))
}
function sY(t, e, i, s = 0) {
  ;((t.min = (s ? eO(i.min, i.max, s) : i.min) + e.min), (t.max = t.min + sz(e)))
}
function sq(t, e, i, s = 0) {
  let n = s ? eO(i.min, i.max, s) : i.min
  ;((t.min = e.min - n), (t.max = t.min + sz(e)))
}
function sX(t, e, i, s) {
  ;(sq(t.x, e.x, i.x, s?.x), sq(t.y, e.y, i.y, s?.y))
}
let sG = (t) => 'object' == typeof t && null !== t
function sZ(t) {
  return sG(t) && 'ownerSVGElement' in t
}
function s_(t, e, i) {
  if (null == t) return []
  if (t instanceof EventTarget) return [t]
  if ('string' == typeof t) {
    let s = document
    e && (s = e.current)
    let n = i?.[t] ?? s.querySelectorAll(t)
    return n ? Array.from(n) : []
  }
  return Array.from(t).filter((t) => null != t)
}
let sK = new WeakMap(),
  sJ = (t, e, i) => (s, n) =>
    n && n[0] ? n[0][t + 'Size'] : sZ(s) && 'getBBox' in s ? s.getBBox()[e] : s[i],
  sQ = sJ('inline', 'width', 'offsetWidth'),
  s0 = sJ('block', 'height', 'offsetHeight')
function s1({ target: t, borderBoxSize: e }) {
  sK.get(t)?.forEach((i) => {
    i(t, {
      get width() {
        return sQ(t, e)
      },
      get height() {
        return s0(t, e)
      },
    })
  })
}
function s2(t) {
  t.forEach(s1)
}
let s5 = new Set()
function s4(t, e) {
  let n
  return 'function' == typeof t
    ? (s5.add(t),
      s ||
        ((s = () => {
          let t = {
            get width() {
              return window.innerWidth
            },
            get height() {
              return window.innerHeight
            },
          }
          s5.forEach((e) => e(t))
        }),
        window.addEventListener('resize', s)),
      () => {
        ;(s5.delete(t),
          s5.size || 'function' != typeof s || (window.removeEventListener('resize', s), (s = void 0)))
      })
    : (!i && 'u' > typeof ResizeObserver && (i = new ResizeObserver(s2)),
      (n = s_(t)).forEach((t) => {
        let s = sK.get(t)
        ;(s || ((s = new Set()), sK.set(t, s)), s.add(e), i?.observe(t))
      }),
      () => {
        n.forEach((t) => {
          let s = sK.get(t)
          ;(s?.delete(e), s?.size || i?.unobserve(t))
        })
      })
}
let s3 = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']),
  s6 = new Set(['INPUT', 'SELECT', 'TEXTAREA']),
  s8 = (t) => ('mouse' === t.pointerType ? 'number' != typeof t.button || t.button <= 0 : !1 !== t.isPrimary)
function s7(t) {
  return { point: { x: t.pageX, y: t.pageY } }
}
function s9(t, e, i, s) {
  return sU(t, e, (t) => s8(t) && i(t, s7(t)), s)
}
let nt = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
  ne = (t, e) => Math.abs(t - e),
  ni = new Set(['auto', 'scroll'])
class ns {
  constructor(
    t,
    e,
    {
      transformPagePoint: i,
      contextWindow: s = window,
      dragSnapToOrigin: n = !1,
      distanceThreshold: r = 3,
      element: a,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.lastRawMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.scrollPositions = new Map()),
      (this.removeScrollListeners = null),
      (this.onElementScroll = (t) => {
        this.handleScroll(t.target)
      }),
      (this.onWindowScroll = () => {
        this.handleScroll(window)
      }),
      (this.updatePoint = () => {
        var t, e
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        this.lastRawMoveEventInfo &&
          (this.lastMoveEventInfo = nn(this.lastRawMoveEventInfo, this.transformPagePoint))
        let i = na(this.lastMoveEventInfo, this.history),
          s = null !== this.startEvent,
          n =
            ((t = i.offset),
            (e = { x: 0, y: 0 }),
            Math.sqrt(ne(t.x, e.x) ** 2 + ne(t.y, e.y) ** 2) >= this.distanceThreshold)
        if (!s && !n) return
        let { point: r } = i,
          { timestamp: a } = tN
        this.history.push({ ...r, timestamp: a })
        let { onStart: o, onMove: l } = this.handlers
        ;(s || (o && o(this.lastMoveEvent, i), (this.startEvent = this.lastMoveEvent)),
          l && l(this.lastMoveEvent, i))
      }),
      (this.handlePointerMove = (t, e) => {
        ;((this.lastMoveEvent = t),
          (this.lastRawMoveEventInfo = e),
          (this.lastMoveEventInfo = nn(e, this.transformPagePoint)),
          tE.update(this.updatePoint, !0))
      }),
      (this.handlePointerUp = (t, e) => {
        this.end()
        let { onEnd: i, onSessionEnd: s, resumeAnimation: n } = this.handlers
        if (
          ((this.dragSnapToOrigin || !this.startEvent) && n && n(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return
        let r = na(
          'pointercancel' === t.type ? this.lastMoveEventInfo : nn(e, this.transformPagePoint),
          this.history,
        )
        ;(this.startEvent && i && i(t, r), s && s(t, r))
      }),
      !s8(t))
    )
      return
    ;((this.dragSnapToOrigin = n),
      (this.handlers = e),
      (this.transformPagePoint = i),
      (this.distanceThreshold = r),
      (this.contextWindow = s || window))
    const o = nn(s7(t), this.transformPagePoint),
      { point: l } = o,
      { timestamp: h } = tN
    this.history = [{ ...l, timestamp: h }]
    const { onSessionStart: c } = e
    c && c(t, na(o, this.history))
    const u = { passive: !0, capture: !0 }
    ;((this.removeListeners = iN(
      s9(this.contextWindow, 'pointermove', this.handlePointerMove, u),
      s9(this.contextWindow, 'pointerup', this.handlePointerUp, u),
      s9(this.contextWindow, 'pointercancel', this.handlePointerUp, u),
    )),
      a && this.startScrollTracking(a))
  }
  startScrollTracking(t) {
    let e = t.parentElement
    for (; e;) {
      let t = getComputedStyle(e)
      ;((ni.has(t.overflowX) || ni.has(t.overflowY)) &&
        this.scrollPositions.set(e, { x: e.scrollLeft, y: e.scrollTop }),
        (e = e.parentElement))
    }
    ;(this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
      window.addEventListener('scroll', this.onElementScroll, { capture: !0 }),
      window.addEventListener('scroll', this.onWindowScroll),
      (this.removeScrollListeners = () => {
        ;(window.removeEventListener('scroll', this.onElementScroll, { capture: !0 }),
          window.removeEventListener('scroll', this.onWindowScroll))
      }))
  }
  handleScroll(t) {
    let e = this.scrollPositions.get(t)
    if (!e) return
    let i = t === window,
      s = i ? { x: window.scrollX, y: window.scrollY } : { x: t.scrollLeft, y: t.scrollTop },
      n = { x: s.x - e.x, y: s.y - e.y }
    ;(0 !== n.x || 0 !== n.y) &&
      (i
        ? this.lastMoveEventInfo &&
          ((this.lastMoveEventInfo.point.x += n.x), (this.lastMoveEventInfo.point.y += n.y))
        : this.history.length > 0 && ((this.history[0].x -= n.x), (this.history[0].y -= n.y)),
      this.scrollPositions.set(t, s),
      tE.update(this.updatePoint, !0))
  }
  updateHandlers(t) {
    this.handlers = t
  }
  end() {
    ;(this.removeListeners && this.removeListeners(),
      this.removeScrollListeners && this.removeScrollListeners(),
      this.scrollPositions.clear(),
      tP(this.updatePoint))
  }
}
function nn(t, e) {
  return e ? { point: e(t.point) } : t
}
function nr(t, e) {
  return { x: t.x - e.x, y: t.y - e.y }
}
function na({ point: t }, e) {
  return {
    point: t,
    delta: nr(t, no(e)),
    offset: nr(t, e[0]),
    velocity: (function (t) {
      if (t.length < 2) return { x: 0, y: 0 }
      let e = t.length - 1,
        i = null,
        s = no(t)
      for (; e >= 0 && ((i = t[e]), !(s.timestamp - i.timestamp > tH(0.1)));) e--
      if (!i) return { x: 0, y: 0 }
      i === t[0] && t.length > 2 && s.timestamp - i.timestamp > 2 * tH(0.1) && (i = t[1])
      let n = (s.timestamp - i.timestamp) / 1e3
      if (0 === n) return { x: 0, y: 0 }
      let r = { x: (s.x - i.x) / n, y: (s.y - i.y) / n }
      return (r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r)
    })(e),
  }
}
function no(t) {
  return t[t.length - 1]
}
function nl(t, e, i) {
  return { min: void 0 !== e ? t.min + e : void 0, max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0 }
}
function nh(t, e) {
  let i = e.min - t.min,
    s = e.max - t.max
  return (e.max - e.min < t.max - t.min && ([i, s] = [s, i]), { min: i, max: s })
}
function nc(t, e, i) {
  return { min: nu(t, e), max: nu(t, i) }
}
function nu(t, e) {
  return 'number' == typeof t ? t : t[e] || 0
}
let nd = new WeakMap()
class np {
  constructor(t) {
    ;((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Z()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = t))
  }
  start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
    let { presenceContext: s } = this.visualElement
    if (s && !1 === s.isPresent) return
    let n = (t) => {
        ;(e && this.snapToCursor(s7(t).point), this.stopAnimation())
      },
      r = (t, e) => {
        let { drag: i, dragPropagation: s, onDragStart: n } = this.getProps()
        if (
          i &&
          !s &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = (function (t) {
            if ('x' === t || 'y' === t)
              if (sW[t]) return null
              else
                return (
                  (sW[t] = !0),
                  () => {
                    sW[t] = !1
                  }
                )
            return sW.x || sW.y
              ? null
              : ((sW.x = sW.y = !0),
                () => {
                  sW.x = sW.y = !1
                })
          })(i)),
          !this.openDragLock)
        )
          return
        ;((this.latestPointerEvent = t),
          (this.latestPanInfo = e),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          sO((t) => {
            let e = this.getAxisMotionValue(t).get() || 0
            if (j.test(e)) {
              let { projection: i } = this.visualElement
              if (i && i.layout) {
                let s = i.layout.layoutBox[t]
                s && (e = sz(s) * (parseFloat(e) / 100))
              }
            }
            this.originPoint[t] = e
          }),
          n && tE.update(() => n(t, e), !1, !0),
          iP(this.visualElement, 'transform'))
        let { animationState: r } = this.visualElement
        r && r.setActive('whileDrag', !0)
      },
      a = (t, e) => {
        ;((this.latestPointerEvent = t), (this.latestPanInfo = e))
        let { dragPropagation: i, dragDirectionLock: s, onDirectionLock: n, onDrag: r } = this.getProps()
        if (!i && !this.openDragLock) return
        let { offset: a } = e
        if (s && null === this.currentDirection) {
          ;((this.currentDirection = (function (t, e = 10) {
            let i = null
            return (Math.abs(t.y) > e ? (i = 'y') : Math.abs(t.x) > e && (i = 'x'), i)
          })(a)),
            null !== this.currentDirection && n && n(this.currentDirection))
          return
        }
        ;(this.updateAxis('x', e.point, a),
          this.updateAxis('y', e.point, a),
          this.visualElement.render(),
          r && tE.update(() => r(t, e), !1, !0))
      },
      o = (t, e) => {
        ;((this.latestPointerEvent = t),
          (this.latestPanInfo = e),
          this.stop(t, e),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null))
      },
      l = () => {
        let { dragSnapToOrigin: t } = this.getProps()
        ;(t || this.constraints) && this.startAnimation({ x: 0, y: 0 })
      },
      { dragSnapToOrigin: h } = this.getProps()
    this.panSession = new ns(
      t,
      { onSessionStart: n, onStart: r, onMove: a, onSessionEnd: o, resumeAnimation: l },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: h,
        distanceThreshold: i,
        contextWindow: nt(this.visualElement),
        element: this.visualElement.current,
      },
    )
  }
  stop(t, e) {
    let i = t || this.latestPointerEvent,
      s = e || this.latestPanInfo,
      n = this.isDragging
    if ((this.cancel(), !n || !s || !i)) return
    let { velocity: r } = s
    this.startAnimation(r)
    let { onDragEnd: a } = this.getProps()
    a && tE.postRender(() => a(i, s))
  }
  cancel() {
    this.isDragging = !1
    let { projection: t, animationState: e } = this.visualElement
    ;(t && (t.isAnimationBlocked = !1), this.endPanSession())
    let { dragPropagation: i } = this.getProps()
    ;(!i && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      e && e.setActive('whileDrag', !1))
  }
  endPanSession() {
    ;(this.panSession && this.panSession.end(), (this.panSession = void 0))
  }
  updateAxis(t, e, i) {
    let { drag: s } = this.getProps()
    if (!i || !nf(t, s, this.currentDirection)) return
    let n = this.getAxisMotionValue(t),
      r = this.originPoint[t] + i[t]
    ;(this.constraints &&
      this.constraints[t] &&
      (r = (function (t, { min: e, max: i }, s) {
        return (
          void 0 !== e && t < e
            ? (t = s ? eO(e, t, s.min) : Math.max(t, e))
            : void 0 !== i && t > i && (t = s ? eO(i, t, s.max) : Math.min(t, i)),
          t
        )
      })(r, this.constraints[t], this.elastic[t])),
      n.set(r))
  }
  resolveConstraints() {
    let { dragConstraints: t, dragElastic: e } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      s = this.constraints
    ;(t && iA(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && i
        ? (this.constraints = (function (t, { top: e, left: i, bottom: s, right: n }) {
            return { x: nl(t.x, i, n), y: nl(t.y, e, s) }
          })(i.layoutBox, t))
        : (this.constraints = !1),
      (this.elastic = (function (t = 0.35) {
        return (
          !1 === t ? (t = 0) : !0 === t && (t = 0.35),
          { x: nc(t, 'left', 'right'), y: nc(t, 'top', 'bottom') }
        )
      })(e)),
      s !== this.constraints &&
        !iA(t) &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        sO((t) => {
          var e, s
          let n
          !1 !== this.constraints &&
            this.getAxisMotionValue(t) &&
            (this.constraints[t] =
              ((e = i.layoutBox[t]),
              (s = this.constraints[t]),
              (n = {}),
              void 0 !== s.min && (n.min = s.min - e.min),
              void 0 !== s.max && (n.max = s.max - e.min),
              n))
        }))
  }
  resolveRefConstraints() {
    var t
    let { dragConstraints: e, onMeasureDragConstraints: i } = this.getProps()
    if (!e || !iA(e)) return !1
    let s = e.current
    ts(
      null !== s,
      "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
      'drag-constraints-ref',
    )
    let { projection: n } = this.visualElement
    if (!n || !n.layout) return !1
    n.root && ((n.root.scroll = void 0), n.root.updateScroll())
    let r = (function (t, e, i) {
        let s = e5(t, i),
          { scroll: n } = e
        return (n && (eQ(s.x, n.offset.x), eQ(s.y, n.offset.y)), s)
      })(s, n.root, this.visualElement.getTransformPagePoint()),
      a = ((t = n.layout.layoutBox), { x: nh(t.x, r.x), y: nh(t.y, r.y) })
    if (i) {
      let t = i(
        (function ({ x: t, y: e }) {
          return { top: e.min, right: t.max, bottom: e.max, left: t.min }
        })(a),
      )
      ;((this.hasMutatedConstraints = !!t), t && (a = eY(t)))
    }
    return a
  }
  startAnimation(t) {
    let {
        drag: e,
        dragMomentum: i,
        dragElastic: s,
        dragTransition: n,
        dragSnapToOrigin: r,
        onDragTransitionEnd: a,
      } = this.getProps(),
      o = this.constraints || {}
    return Promise.all(
      sO((a) => {
        if (!nf(a, e, this.currentDirection)) return
        let l = (o && o[a]) || {}
        ;(!0 === r || r === a) && (l = { min: 0, max: 0 })
        let h = {
          type: 'inertia',
          velocity: i ? t[a] : 0,
          bounceStiffness: s ? 200 : 1e6,
          bounceDamping: s ? 40 : 1e7,
          timeConstant: 750,
          restDelta: 1,
          restSpeed: 10,
          ...n,
          ...l,
        }
        return this.startAxisValueAnimation(a, h)
      }),
    ).then(a)
  }
  startAxisValueAnimation(t, e) {
    let i = this.getAxisMotionValue(t)
    return (iP(this.visualElement, t), i.start(sk(t, i, 0, e, this.visualElement, !1)))
  }
  stopAnimation() {
    sO((t) => this.getAxisMotionValue(t).stop())
  }
  getAxisMotionValue(t) {
    let e = `_drag${t.toUpperCase()}`
    return (
      this.visualElement.getProps()[e] ||
      this.visualElement.getValue(t, this.visualElement.latestValues[t] ?? 0)
    )
  }
  snapToCursor(t) {
    sO((e) => {
      let { drag: i } = this.getProps()
      if (!nf(e, i, this.currentDirection)) return
      let { projection: s } = this.visualElement,
        n = this.getAxisMotionValue(e)
      if (s && s.layout) {
        let { min: i, max: r } = s.layout.layoutBox[e],
          a = n.get() || 0
        n.set(t[e] - eO(i, r, 0.5) + a)
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    let { drag: t, dragConstraints: e } = this.getProps(),
      { projection: i } = this.visualElement
    if (!iA(e) || !i || !this.constraints) return
    this.stopAnimation()
    let s = { x: 0, y: 0 }
    sO((t) => {
      let e = this.getAxisMotionValue(t)
      if (e && !1 !== this.constraints) {
        var i, n
        let r,
          a,
          o,
          l = e.get()
        s[t] =
          ((i = { min: l, max: l }),
          (n = this.constraints[t]),
          (r = 0.5),
          (a = sz(i)),
          (o = sz(n)) > a ? (r = sc(n.min, n.max - a, i.min)) : a > o && (r = sc(i.min, i.max - o, n.min)),
          h(0, 1, r))
      }
    })
    let { transformTemplate: n } = this.visualElement.getProps()
    ;((this.visualElement.current.style.transform = n ? n({}, '') : 'none'),
      i.root && i.root.updateScroll(),
      i.updateLayout(),
      (this.constraints = !1),
      this.resolveConstraints(),
      sO((e) => {
        if (!nf(e, t, null)) return
        let i = this.getAxisMotionValue(e),
          { min: n, max: r } = this.constraints[e]
        i.set(eO(n, r, s[e]))
      }),
      this.visualElement.render())
  }
  addListeners() {
    let t
    if (!this.visualElement.current) return
    nd.set(this.visualElement, this)
    let e = this.visualElement.current,
      i = s9(e, 'pointerdown', (t) => {
        let { drag: i, dragListener: s = !0 } = this.getProps(),
          n = t.target,
          r = n !== e && (s6.has(n.tagName) || !0 === n.isContentEditable)
        i && s && !r && this.start(t)
      }),
      s = () => {
        var i, s, n
        let r,
          a,
          { dragConstraints: o } = this.getProps()
        iA(o) &&
          o.current &&
          ((this.constraints = this.resolveRefConstraints()),
          t ||
            ((i = e),
            (s = o.current),
            (r = s4(i, nm((n = () => this.scalePositionWithinConstraints())))),
            (a = s4(s, nm(n))),
            (t = () => {
              ;(r(), a())
            })))
      },
      { projection: n } = this.visualElement,
      r = n.addEventListener('measure', s)
    ;(n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()), tE.read(s))
    let a = sU(window, 'resize', () => this.scalePositionWithinConstraints()),
      o = n.addEventListener('didUpdate', ({ delta: t, hasLayoutChanged: e }) => {
        this.isDragging &&
          e &&
          (sO((e) => {
            let i = this.getAxisMotionValue(e)
            i && ((this.originPoint[e] += t[e].translate), i.set(i.get() + t[e].translate))
          }),
          this.visualElement.render())
      })
    return () => {
      ;(a(), i(), r(), o && o(), t && t())
    }
  }
  getProps() {
    let t = this.visualElement.getProps(),
      {
        drag: e = !1,
        dragDirectionLock: i = !1,
        dragPropagation: s = !1,
        dragConstraints: n = !1,
        dragElastic: r = 0.35,
        dragMomentum: a = !0,
      } = t
    return {
      ...t,
      drag: e,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: n,
      dragElastic: r,
      dragMomentum: a,
    }
  }
}
function nm(t) {
  let e = !0
  return () => {
    if (e) {
      e = !1
      return
    }
    t()
  }
}
function nf(t, e, i) {
  return (!0 === e || e === t) && (null === i || i === t)
}
let nx = (t) => (e, i) => {
    t && tE.update(() => t(e, i), !1, !0)
  },
  ng = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
var ny = a
function nv(t = !0) {
  let e = (0, a.useContext)(ic)
  if (null === e) return [!0, null]
  let { isPresent: i, onExitComplete: s, register: n } = e,
    r = (0, a.useId)()
  ;(0, a.useEffect)(() => {
    if (t) return n(r)
  }, [t])
  let o = (0, a.useCallback)(() => t && s && s(r), [r, s, t])
  return !i && s ? [!1, o] : [!0]
}
let nb = !1
class nw extends ny.Component {
  componentDidMount() {
    let { visualElement: t, layoutGroup: e, switchLayoutGroup: i, layoutId: s } = this.props,
      { projection: n } = t
    ;(n &&
      (e.group && e.group.add(n),
      i && i.register && s && i.register(n),
      nb && n.root.didUpdate(),
      n.addEventListener('animationComplete', () => {
        this.safeToRemove()
      }),
      n.setOptions({
        ...n.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove(),
      })),
      (ng.hasEverUpdated = !0))
  }
  getSnapshotBeforeUpdate(t) {
    let { layoutDependency: e, visualElement: i, drag: s, isPresent: n } = this.props,
      { projection: r } = i
    return (
      r &&
        ((r.isPresent = n),
        t.layoutDependency !== e && r.setOptions({ ...r.options, layoutDependency: e }),
        (nb = !0),
        s || t.layoutDependency !== e || void 0 === e || t.isPresent !== n
          ? r.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== n &&
          (n
            ? r.promote()
            : r.relegate() ||
              tE.postRender(() => {
                let t = r.getStack()
                ;(t && t.members.length) || this.safeToRemove()
              }))),
      null
    )
  }
  componentDidUpdate() {
    let { visualElement: t, layoutAnchor: e } = this.props,
      { projection: i } = t
    i &&
      ((i.options.layoutAnchor = e),
      i.root.didUpdate(),
      et.postRender(() => {
        !i.currentAnimation && i.isLead() && this.safeToRemove()
      }))
  }
  componentWillUnmount() {
    let { visualElement: t, layoutGroup: e, switchLayoutGroup: i } = this.props,
      { projection: s } = t
    ;((nb = !0),
      s &&
        (s.scheduleCheckAfterUnmount(),
        e && e.group && e.group.remove(s),
        i && i.deregister && i.deregister(s)))
  }
  safeToRemove() {
    let { safeToRemove: t } = this.props
    t && t()
  }
  render() {
    return null
  }
}
function nA(t) {
  let [e, i] = nv(),
    s = (0, ny.useContext)(e8)
  return (0, r.jsx)(nw, {
    ...t,
    layoutGroup: s,
    switchLayoutGroup: (0, ny.useContext)(iw),
    isPresent: e,
    safeToRemove: i,
  })
}
let nj = eR.length,
  nM = (t) => ('string' == typeof t ? parseFloat(t) : t),
  nT = (t) => 'number' == typeof t || M.test(t)
function nS(t, e) {
  return void 0 !== t[e] ? t[e] : t.borderRadius
}
let nC = nE(0, 0.5, sa),
  nk = nE(0.5, 0.95, tT)
function nE(t, e, i) {
  return (s) => (s < t ? 0 : s > e ? 1 : i(sc(t, e, s)))
}
function nP(t, e) {
  ;((t.min = e.min), (t.max = e.max))
}
function nN(t, e) {
  ;(nP(t.x, e.x), nP(t.y, e.y))
}
function nB(t, e) {
  ;((t.translate = e.translate), (t.scale = e.scale), (t.originPoint = e.originPoint), (t.origin = e.origin))
}
function nD(t, e, i, s, n) {
  return ((t -= e), (t = s + (1 / i) * (t - s)), void 0 !== n && (t = s + (1 / n) * (t - s)), t)
}
function nF(t, e, [i, s, n], r, a) {
  !(function (t, e = 0, i = 1, s = 0.5, n, r = t, a = t) {
    if ((j.test(e) && ((e = parseFloat(e)), (e = eO(a.min, a.max, e / 100) - a.min)), 'number' != typeof e))
      return
    let o = eO(r.min, r.max, s)
    ;(t === r && (o -= e), (t.min = nD(t.min, e, i, o, n)), (t.max = nD(t.max, e, i, o, n)))
  })(t, e[i], e[s], e[n], e.scale, r, a)
}
let nV = ['x', 'scaleX', 'originX'],
  nR = ['y', 'scaleY', 'originY']
function nL(t, e, i, s) {
  ;(nF(t.x, e, nV, i ? i.x : void 0, s ? s.x : void 0), nF(t.y, e, nR, i ? i.y : void 0, s ? s.y : void 0))
}
function nI(t) {
  return 0 === t.translate && 1 === t.scale
}
function nO(t) {
  return nI(t.x) && nI(t.y)
}
function nU(t, e) {
  return t.min === e.min && t.max === e.max
}
function nW(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max)
}
function nz(t, e) {
  return nW(t.x, e.x) && nW(t.y, e.y)
}
function n$(t) {
  return sz(t.x) / sz(t.y)
}
function nH(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
}
class nY {
  constructor() {
    this.members = []
  }
  add(t) {
    tY(this.members, t)
    for (let e = this.members.length - 1; e >= 0; e--) {
      let i = this.members[e]
      if (i === t || i === this.lead || i === this.prevLead) continue
      let s = i.instance
      ;(s && !1 !== s.isConnected) || i.snapshot || (tq(this.members, i), i.unmount())
    }
    t.scheduleRender()
  }
  remove(t) {
    if ((tq(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      let t = this.members[this.members.length - 1]
      t && this.promote(t)
    }
  }
  relegate(t) {
    for (let e = this.members.indexOf(t) - 1; e >= 0; e--) {
      let t = this.members[e]
      if (!1 !== t.isPresent && t.instance?.isConnected !== !1) return (this.promote(t), !0)
    }
    return !1
  }
  promote(t, e) {
    let i = this.lead
    if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
      ;(i.updateSnapshot(), t.scheduleRender())
      let { layoutDependency: s } = i.options,
        { layoutDependency: n } = t.options
      ;((void 0 === s || s !== n) &&
        ((t.resumeFrom = i),
        e && (i.preserveOpacity = !0),
        i.snapshot &&
          ((t.snapshot = i.snapshot), (t.snapshot.latestValues = i.animationValues || i.latestValues)),
        t.root?.isUpdating && (t.isLayoutDirty = !0)),
        !1 === t.options.crossfade && i.hide())
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      ;(t.options.onExitComplete?.(), t.resumingFrom?.options.onExitComplete?.())
    })
  }
  scheduleRender() {
    this.members.forEach((t) => t.instance && t.scheduleRender(!1))
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0)
  }
}
let nq = (t, e) => t.depth - e.depth
class nX {
  constructor() {
    ;((this.children = []), (this.isDirty = !1))
  }
  add(t) {
    ;(tY(this.children, t), (this.isDirty = !0))
  }
  remove(t) {
    ;(tq(this.children, t), (this.isDirty = !0))
  }
  forEach(t) {
    ;(this.isDirty && this.children.sort(nq), (this.isDirty = !1), this.children.forEach(t))
  }
}
let nG = ['', 'X', 'Y', 'Z'],
  nZ = 0
function n_(t, e, i, s) {
  let { latestValues: n } = e
  n[t] && ((i[t] = n[t]), e.setStaticValue(t, 0), s && (s[t] = 0))
}
function nK({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: i,
  checkIsScrollRoot: s,
  resetTransform: n,
}) {
  return class {
    constructor(t = {}, i = e?.()) {
      ;((this.id = nZ++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.layoutVersion = 0),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots())
        }),
        (this.updateProjection = () => {
          ;((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(n0),
            this.nodes.forEach(n9),
            this.nodes.forEach(rt),
            this.nodes.forEach(n1))
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.linkedParentVersion = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = t),
        (this.root = i ? i.root || i : this),
        (this.path = i ? [...i.path, i] : []),
        (this.parent = i),
        (this.depth = i ? i.depth + 1 : 0))
      for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0
      this.root === this && (this.nodes = new nX())
    }
    addEventListener(t, e) {
      return (
        this.eventHandlers.has(t) || this.eventHandlers.set(t, new tX()),
        this.eventHandlers.get(t).add(e)
      )
    }
    notifyListeners(t, ...e) {
      let i = this.eventHandlers.get(t)
      i && i.notify(...e)
    }
    hasListeners(t) {
      return this.eventHandlers.has(t)
    }
    mount(e) {
      if (this.instance) return
      ;((this.isSVG = sZ(e) && !(sZ(e) && 'svg' === e.tagName)), (this.instance = e))
      let { layoutId: i, layout: s, visualElement: n } = this.options
      if (
        (n && !n.current && n.mount(e),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (s || i) && (this.isLayoutDirty = !0),
        t)
      ) {
        let i,
          s = 0,
          n = () => (this.root.updateBlockedByResize = !1)
        ;(tE.read(() => {
          s = window.innerWidth
        }),
          t(e, () => {
            let t = window.innerWidth
            if (t !== s) {
              let e, r
              ;((s = t),
                (this.root.updateBlockedByResize = !0),
                i && i(),
                (e = ei.now()),
                (r = ({ timestamp: t }) => {
                  let i = t - e
                  i >= 250 && (tP(r), n(i - 250))
                }),
                tE.setup(r, !0),
                (i = () => tP(r)),
                ng.hasAnimatedSinceResize && ((ng.hasAnimatedSinceResize = !1), this.nodes.forEach(n7)))
            }
          }))
      }
      ;(i && this.root.registerSharedNode(i, this),
        !1 !== this.options.animate &&
          n &&
          (i || s) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: t, hasLayoutChanged: e, hasRelativeLayoutChanged: i, layout: s }) => {
              if (this.isTreeAnimationBlocked()) {
                ;((this.target = void 0), (this.relativeTarget = void 0))
                return
              }
              let r = this.options.transition || n.getDefaultTransition() || ra,
                { onLayoutAnimationStart: a, onLayoutAnimationComplete: o } = n.getProps(),
                l = !this.targetLayout || !nz(this.targetLayout, s),
                h = !e && i
              if (this.options.layoutRoot || this.resumeFrom || h || (e && (l || !this.currentAnimation))) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom), (this.resumingFrom.resumingFrom = void 0))
                let e = { ...ik(r, 'layout'), onPlay: a, onComplete: o }
                ;((n.shouldReduceMotion || this.options.layoutRoot) && ((e.delay = 0), (e.type = !1)),
                  this.startAnimation(e),
                  this.setAnimationOrigin(t, h, e.path))
              } else
                (e || n7(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete())
              this.targetLayout = s
            },
          ))
    }
    unmount() {
      ;(this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this))
      let t = this.getStack()
      ;(t && t.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        tP(this.updateProjection))
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1
    }
    startUpdate() {
      !this.isUpdateBlocked() &&
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(re), this.animationId++)
    }
    getTransformTemplate() {
      let { visualElement: t } = this.options
      return t && t.getProps().transformTemplate
    }
    willUpdate(t = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete()
        return
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          (function t(e) {
            if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return
            let { visualElement: i } = e.options
            if (!i) return
            let s = i.props[ib]
            if (window.MotionHasOptimisedAnimation(s, 'transform')) {
              let { layout: t, layoutId: i } = e.options
              window.MotionCancelOptimisedAnimation(s, 'transform', tE, !(t || i))
            }
            let { parent: n } = e
            n && !n.hasCheckedOptimisedAppear && t(n)
          })(this),
        this.root.isUpdating || this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return
      this.isLayoutDirty = !0
      for (let t = 0; t < this.path.length; t++) {
        let e = this.path[t]
        ;((e.shouldResetTransform = !0),
          ('string' == typeof e.latestValues.x || 'string' == typeof e.latestValues.y) &&
            (e.isLayoutDirty = !0),
          e.updateScroll('snapshot'),
          e.options.layoutRoot && e.willUpdate(!1))
      }
      let { layoutId: e, layout: i } = this.options
      if (void 0 === e && !i) return
      let s = this.getTransformTemplate()
      ;((this.prevTransformTemplateValue = s ? s(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        t && this.notifyListeners('willUpdate'))
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        let t = this.updateBlockedByResize
        ;(this.unblockUpdate(),
          (this.updateBlockedByResize = !1),
          this.clearAllSnapshots(),
          t && this.nodes.forEach(n4),
          this.nodes.forEach(n5))
        return
      }
      if (this.animationId <= this.animationCommitId) return void this.nodes.forEach(n3)
      ;((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(n6),
            this.nodes.forEach(n8),
            this.nodes.forEach(nJ),
            this.nodes.forEach(nQ))
          : this.nodes.forEach(n3),
        this.clearAllSnapshots())
      let t = ei.now()
      ;((tN.delta = h(0, 1e3 / 60, t - tN.timestamp)),
        (tN.timestamp = t),
        (tN.isProcessing = !0),
        tB.update.process(tN),
        tB.preRender.process(tN),
        tB.render.process(tN),
        (tN.isProcessing = !1))
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), et.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      ;(this.nodes.forEach(n2), this.sharedNodes.forEach(ri))
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), tE.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      tE.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
      })
    }
    updateSnapshot() {
      !this.snapshot &&
        this.instance &&
        ((this.snapshot = this.measure()),
        !this.snapshot ||
          sz(this.snapshot.measuredBox.x) ||
          sz(this.snapshot.measuredBox.y) ||
          (this.snapshot = void 0))
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let t = 0; t < this.path.length; t++) this.path[t].updateScroll()
      let t = this.layout
      ;((this.layout = this.measure(!1)),
        this.layoutVersion++,
        this.layoutCorrected || (this.layoutCorrected = Z()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox))
      let { visualElement: e } = this.options
      e && e.notify('LayoutMeasure', this.layout.layoutBox, t ? t.layoutBox : void 0)
    }
    updateScroll(t = 'measure') {
      let e = !!(this.options.layoutScroll && this.instance)
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === t &&
          (e = !1),
        e && this.instance)
      ) {
        let e = s(this.instance)
        this.scroll = {
          animationId: this.root.animationId,
          phase: t,
          isRoot: e,
          offset: i(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : e,
        }
      }
    }
    resetTransform() {
      if (!n) return
      let t = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        e = this.projectionDelta && !nO(this.projectionDelta),
        i = this.getTransformTemplate(),
        s = i ? i(this.latestValues, '') : void 0,
        r = s !== this.prevTransformTemplateValue
      t &&
        this.instance &&
        (e || eG(this.latestValues) || r) &&
        (n(this.instance, s), (this.shouldResetTransform = !1), this.scheduleRender())
    }
    measure(t = !0) {
      var e
      let i = this.measurePageBox(),
        s = this.removeElementScroll(i)
      return (
        t && (s = this.removeTransform(s)),
        rh((e = s).x),
        rh(e.y),
        {
          animationId: this.root.animationId,
          measuredBox: i,
          layoutBox: s,
          latestValues: {},
          source: this.id,
        }
      )
    }
    measurePageBox() {
      let { visualElement: t } = this.options
      if (!t) return Z()
      let e = t.measureViewportBox()
      if (!(this.scroll?.wasRoot || this.path.some(ru))) {
        let { scroll: t } = this.root
        t && (eQ(e.x, t.offset.x), eQ(e.y, t.offset.y))
      }
      return e
    }
    removeElementScroll(t) {
      let e = Z()
      if ((nN(e, t), this.scroll?.wasRoot)) return e
      for (let i = 0; i < this.path.length; i++) {
        let s = this.path[i],
          { scroll: n, options: r } = s
        s !== this.root &&
          n &&
          r.layoutScroll &&
          (n.wasRoot && nN(e, t), eQ(e.x, n.offset.x), eQ(e.y, n.offset.y))
      }
      return e
    }
    applyTransform(t, e = !1, i) {
      let s = i || Z()
      nN(s, t)
      for (let t = 0; t < this.path.length; t++) {
        let i = this.path[t]
        ;(!e &&
          i.options.layoutScroll &&
          i.scroll &&
          i !== i.root &&
          (eQ(s.x, -i.scroll.offset.x), eQ(s.y, -i.scroll.offset.y)),
          eG(i.latestValues) && e2(s, i.latestValues, i.layout?.layoutBox))
      }
      return (eG(this.latestValues) && e2(s, this.latestValues, this.layout?.layoutBox), s)
    }
    removeTransform(t) {
      let e = Z()
      nN(e, t)
      for (let t = 0; t < this.path.length; t++) {
        let i,
          s = this.path[t]
        eG(s.latestValues) &&
          (s.instance && (eX(s.latestValues) && s.updateSnapshot(), nN((i = Z()), s.measurePageBox())),
          nL(e, s.latestValues, s.snapshot?.layoutBox, i))
      }
      return (eG(this.latestValues) && nL(e, this.latestValues), e)
    }
    setTargetDelta(t) {
      ;((this.targetDelta = t), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0))
    }
    setOptions(t) {
      this.options = { ...this.options, ...t, crossfade: void 0 === t.crossfade || t.crossfade }
    }
    clearMeasurements() {
      ;((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1))
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== tN.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(t = !1) {
      let e = this.getLead()
      ;(this.isProjectionDirty || (this.isProjectionDirty = e.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = e.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = e.isSharedProjectionDirty))
      let i = !!this.resumingFrom || this !== e
      if (!(
        t ||
        (i && this.isSharedProjectionDirty) ||
        this.isProjectionDirty ||
        this.parent?.isProjectionDirty ||
        this.attemptToResolveRelativeTarget ||
        this.root.updateBlockedByResize
      ))
        return
      let { layout: s, layoutId: n } = this.options
      if (!this.layout || !(s || n)) return
      this.resolvedRelativeTargetAt = tN.timestamp
      let r = this.getClosestProjectingParent()
      if (
        (r &&
          this.linkedParentVersion !== r.layoutVersion &&
          !r.options.layoutRoot &&
          this.removeRelativeTarget(),
        this.targetDelta ||
          this.relativeTarget ||
          (!1 !== this.options.layoutAnchor && r && r.layout
            ? this.createRelativeTarget(r, this.layout.layoutBox, r.layout.layoutBox)
            : this.removeRelativeTarget()),
        this.relativeTarget || this.targetDelta)
      ) {
        if (
          (this.target || ((this.target = Z()), (this.targetWithTransforms = Z())),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target)
        ) {
          var a, o, l, h
          ;(this.forceRelativeParentToResolveTarget(),
            (a = this.target),
            (o = this.relativeTarget),
            (l = this.relativeParent.target),
            (h = this.options.layoutAnchor || void 0),
            sY(a.x, o.x, l.x, h?.x),
            sY(a.y, o.y, l.y, h?.y))
        } else
          this.targetDelta
            ? (this.resumingFrom
                ? this.applyTransform(this.layout.layoutBox, !1, this.target)
                : nN(this.target, this.layout.layoutBox),
              eJ(this.target, this.targetDelta))
            : nN(this.target, this.layout.layoutBox)
        this.attemptToResolveRelativeTarget &&
          ((this.attemptToResolveRelativeTarget = !1),
          !1 !== this.options.layoutAnchor &&
          r &&
          !!r.resumingFrom == !!this.resumingFrom &&
          !r.options.layoutScroll &&
          r.target &&
          1 !== this.animationProgress
            ? this.createRelativeTarget(r, this.target, r.target)
            : (this.relativeParent = this.relativeTarget = void 0))
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || eX(this.parent.latestValues) || eZ(this.parent.latestValues)))
        if (this.parent.isProjecting()) return this.parent
        else return this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    createRelativeTarget(t, e, i) {
      ;((this.relativeParent = t),
        (this.linkedParentVersion = t.layoutVersion),
        this.forceRelativeParentToResolveTarget(),
        (this.relativeTarget = Z()),
        (this.relativeTargetOrigin = Z()),
        sX(this.relativeTargetOrigin, e, i, this.options.layoutAnchor || void 0),
        nN(this.relativeTarget, this.relativeTargetOrigin))
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0
    }
    calcProjection() {
      let t = this.getLead(),
        e = !!this.resumingFrom || this !== t,
        i = !0
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (i = !1),
        e && (this.isSharedProjectionDirty || this.isTransformDirty) && (i = !1),
        this.resolvedRelativeTargetAt === tN.timestamp && (i = !1),
        i)
      )
        return
      let { layout: s, layoutId: n } = this.options
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(s || n))
      )
        return
      nN(this.layoutCorrected, this.layout.layoutBox)
      let r = this.treeScale.x,
        a = this.treeScale.y
      ;(!(function (t, e, i, s = !1) {
        let n,
          r,
          a = i.length
        if (a) {
          e.x = e.y = 1
          for (let o = 0; o < a; o++) {
            r = (n = i[o]).projectionDelta
            let { visualElement: a } = n.options
            ;(!a || !a.props.style || 'contents' !== a.props.style.display) &&
              (s &&
                n.options.layoutScroll &&
                n.scroll &&
                n !== n.root &&
                (eQ(t.x, -n.scroll.offset.x), eQ(t.y, -n.scroll.offset.y)),
              r && ((e.x *= r.x.scale), (e.y *= r.y.scale), eJ(t, r)),
              s && eG(n.latestValues) && e2(t, n.latestValues, n.layout?.layoutBox))
          }
          ;(e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
            e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1))
        }
      })(this.layoutCorrected, this.treeScale, this.path, e),
        t.layout &&
          !t.target &&
          (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
          ((t.target = t.layout.layoutBox), (t.targetWithTransforms = Z())))
      let { target: o } = t
      if (!o) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      ;(this.projectionDelta && this.prevProjectionDelta
        ? (nB(this.prevProjectionDelta.x, this.projectionDelta.x),
          nB(this.prevProjectionDelta.y, this.projectionDelta.y))
        : this.createProjectionDeltas(),
        sH(this.projectionDelta, this.layoutCorrected, o, this.latestValues),
        (this.treeScale.x === r &&
          this.treeScale.y === a &&
          nH(this.projectionDelta.x, this.prevProjectionDelta.x) &&
          nH(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
          ((this.hasProjected = !0), this.scheduleRender(), this.notifyListeners('projectionUpdate', o)))
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(t = !0) {
      if ((this.options.visualElement?.scheduleRender(), t)) {
        let t = this.getStack()
        t && t.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      ;((this.prevProjectionDelta = X()),
        (this.projectionDelta = X()),
        (this.projectionDeltaWithTransform = X()))
    }
    setAnimationOrigin(t, e = !1, i) {
      let s,
        n = this.snapshot,
        r = n ? n.latestValues : {},
        a = { ...this.latestValues },
        o = X()
      ;((this.relativeParent && this.relativeParent.options.layoutRoot) ||
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !e))
      let l = Z(),
        h = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
        c = this.getStack(),
        u = !c || c.members.length <= 1,
        d = !!(h && !u && !0 === this.options.crossfade && !this.path.some(rr))
      this.animationProgress = 0
      let p = i?.interpolateProjection(t)
      ;((this.mixTargetDelta = (e) => {
        let i = e / 1e3,
          n = p?.(i)
        if (
          (n
            ? ((o.x.translate = n.x),
              (o.x.scale = eO(t.x.scale, 1, i)),
              (o.x.origin = t.x.origin),
              (o.x.originPoint = t.x.originPoint),
              (o.y.translate = n.y),
              (o.y.scale = eO(t.y.scale, 1, i)),
              (o.y.origin = t.y.origin),
              (o.y.originPoint = t.y.originPoint))
            : (rs(o.x, t.x, i), rs(o.y, t.y, i)),
          this.setTargetDelta(o),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout)
        ) {
          var c, m, f, x, g, y
          ;(sX(
            l,
            this.layout.layoutBox,
            this.relativeParent.layout.layoutBox,
            this.options.layoutAnchor || void 0,
          ),
            (f = this.relativeTarget),
            (x = this.relativeTargetOrigin),
            (g = l),
            (y = i),
            rn(f.x, x.x, g.x, y),
            rn(f.y, x.y, g.y, y),
            s &&
              ((c = this.relativeTarget), (m = s), nU(c.x, m.x) && nU(c.y, m.y)) &&
              (this.isProjectionDirty = !1),
            s || (s = Z()),
            nN(s, this.relativeTarget))
        }
        ;(h &&
          ((this.animationValues = a),
          (function (t, e, i, s, n, r) {
            n
              ? ((t.opacity = eO(0, i.opacity ?? 1, nC(s))), (t.opacityExit = eO(e.opacity ?? 1, 0, nk(s))))
              : r && (t.opacity = eO(e.opacity ?? 1, i.opacity ?? 1, s))
            for (let n = 0; n < nj; n++) {
              let r = eR[n],
                a = nS(e, r),
                o = nS(i, r)
              ;(void 0 !== a || void 0 !== o) &&
                (a || (a = 0),
                o || (o = 0),
                0 === a || 0 === o || nT(a) === nT(o)
                  ? ((t[r] = Math.max(eO(nM(a), nM(o), s), 0)), (j.test(o) || j.test(a)) && (t[r] += '%'))
                  : (t[r] = o))
            }
            ;(e.rotate || i.rotate) && (t.rotate = eO(e.rotate || 0, i.rotate || 0, s))
          })(a, r, this.latestValues, i, d, u)),
          n &&
            void 0 !== n.rotate &&
            (this.animationValues || (this.animationValues = a),
            (this.animationValues.pathRotation = n.rotate)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = i))
      }),
        this.mixTargetDelta(1e3 * !!this.options.layoutRoot))
    }
    startAnimation(t) {
      ;(this.notifyListeners('animationStart'),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation && (tP(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = tE.update(() => {
          var e, i, s
          let n
          ;((ng.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = ea(0)),
            this.motionValue.jump(0, !1),
            (this.currentAnimation =
              ((e = this.motionValue),
              (i = [0, 1e3]),
              (s = {
                ...t,
                velocity: 0,
                isSync: !0,
                onUpdate: (e) => {
                  ;(this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e))
                },
                onComplete: () => {
                  ;(t.onComplete && t.onComplete(), this.completeAnimation())
                },
              }),
              (n = _(e) ? e : ea(e)).start(sk('', n, i, s)),
              n.animation)),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0))
        })))
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0), (this.resumingFrom.preserveOpacity = void 0))
      let t = this.getStack()
      ;(t && t.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'))
    }
    finishAnimation() {
      ;(this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()),
        this.completeAnimation())
    }
    applyTransformsToTarget() {
      let t = this.getLead(),
        { targetWithTransforms: e, target: i, layout: s, latestValues: n } = t
      if (e && i && s) {
        if (
          this !== t &&
          this.layout &&
          s &&
          rc(this.options.animationType, this.layout.layoutBox, s.layoutBox)
        ) {
          i = this.target || Z()
          let e = sz(this.layout.layoutBox.x)
          ;((i.x.min = t.target.x.min), (i.x.max = i.x.min + e))
          let s = sz(this.layout.layoutBox.y)
          ;((i.y.min = t.target.y.min), (i.y.max = i.y.min + s))
        }
        ;(nN(e, i), e2(e, n), sH(this.projectionDeltaWithTransform, this.layoutCorrected, e, n))
      }
    }
    registerSharedNode(t, e) {
      ;(this.sharedNodes.has(t) || this.sharedNodes.set(t, new nY()), this.sharedNodes.get(t).add(e))
      let i = e.options.initialPromotionConfig
      e.promote({
        transition: i ? i.transition : void 0,
        preserveFollowOpacity: i && i.shouldPreserveFollowOpacity ? i.shouldPreserveFollowOpacity(e) : void 0,
      })
    }
    isLead() {
      let t = this.getStack()
      return !t || t.lead === this
    }
    getLead() {
      let { layoutId: t } = this.options
      return (t && this.getStack()?.lead) || this
    }
    getPrevLead() {
      let { layoutId: t } = this.options
      return t ? this.getStack()?.prevLead : void 0
    }
    getStack() {
      let { layoutId: t } = this.options
      if (t) return this.root.sharedNodes.get(t)
    }
    promote({ needsReset: t, transition: e, preserveFollowOpacity: i } = {}) {
      let s = this.getStack()
      ;(s && s.promote(this, i),
        t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        e && this.setOptions({ transition: e }))
    }
    relegate() {
      let t = this.getStack()
      return !!t && t.relegate(this)
    }
    resetSkewAndRotation() {
      let { visualElement: t } = this.options
      if (!t) return
      let e = !1,
        { latestValues: i } = t
      if (((i.z || i.rotate || i.rotateX || i.rotateY || i.rotateZ || i.skewX || i.skewY) && (e = !0), !e))
        return
      let s = {}
      i.z && n_('z', t, s, this.animationValues)
      for (let e = 0; e < nG.length; e++)
        (n_(`rotate${nG[e]}`, t, s, this.animationValues), n_(`skew${nG[e]}`, t, s, this.animationValues))
      for (let e in (t.render(), s))
        (t.setStaticValue(e, s[e]), this.animationValues && (this.animationValues[e] = s[e]))
      t.scheduleRender()
    }
    applyProjectionStyles(t, e) {
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) {
        t.visibility = 'hidden'
        return
      }
      let i = this.getTransformTemplate()
      if (this.needsReset) {
        ;((this.needsReset = !1),
          (t.visibility = ''),
          (t.opacity = ''),
          (t.pointerEvents = ih(e?.pointerEvents) || ''),
          (t.transform = i ? i(this.latestValues, '') : 'none'))
        return
      }
      let s = this.getLead()
      if (!this.projectionDelta || !this.layout || !s.target) {
        ;(this.options.layoutId &&
          ((t.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1),
          (t.pointerEvents = ih(e?.pointerEvents) || '')),
          this.hasProjected &&
            !eG(this.latestValues) &&
            ((t.transform = i ? i({}, '') : 'none'), (this.hasProjected = !1)))
        return
      }
      t.visibility = ''
      let n = s.animationValues || s.latestValues
      this.applyTransformsToTarget()
      let r = (function (t, e, i) {
        let s = '',
          n = t.x.translate / e.x,
          r = t.y.translate / e.y,
          a = i?.z || 0
        if (
          ((n || r || a) && (s = `translate3d(${n}px, ${r}px, ${a}px) `),
          (1 !== e.x || 1 !== e.y) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
          i)
        ) {
          let {
            transformPerspective: t,
            rotate: e,
            pathRotation: n,
            rotateX: r,
            rotateY: a,
            skewX: o,
            skewY: l,
          } = i
          ;(t && (s = `perspective(${t}px) ${s}`),
            e && (s += `rotate(${e}deg) `),
            n && (s += `rotate(${n}deg) `),
            r && (s += `rotateX(${r}deg) `),
            a && (s += `rotateY(${a}deg) `),
            o && (s += `skewX(${o}deg) `),
            l && (s += `skewY(${l}deg) `))
        }
        let o = t.x.scale * e.x,
          l = t.y.scale * e.y
        return ((1 !== o || 1 !== l) && (s += `scale(${o}, ${l})`), s || 'none')
      })(this.projectionDeltaWithTransform, this.treeScale, n)
      ;(i && (r = i(n, r)), (t.transform = r))
      let { x: a, y: o } = this.projectionDelta
      for (let e in ((t.transformOrigin = `${100 * a.origin}% ${100 * o.origin}% 0`),
      s.animationValues
        ? (t.opacity =
            s === this
              ? (n.opacity ?? this.latestValues.opacity ?? 1)
              : this.preserveOpacity
                ? this.latestValues.opacity
                : n.opacityExit)
        : (t.opacity =
            s === this
              ? void 0 !== n.opacity
                ? n.opacity
                : ''
              : void 0 !== n.opacityExit
                ? n.opacityExit
                : 0),
      eU)) {
        if (void 0 === n[e]) continue
        let { correct: i, applyTo: a, isCSSVariable: o } = eU[e],
          l = 'none' === r ? n[e] : i(n[e], s)
        if (a) {
          let e = a.length
          for (let i = 0; i < e; i++) t[a[i]] = l
        } else o ? (this.options.visualElement.renderState.vars[e] = l) : (t[e] = l)
      }
      this.options.layoutId && (t.pointerEvents = s === this ? ih(e?.pointerEvents) || '' : 'none')
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      ;(this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
        this.root.nodes.forEach(n5),
        this.root.sharedNodes.clear())
    }
  }
}
function nJ(t) {
  t.updateLayout()
}
function nQ(t) {
  let e = t.resumeFrom?.snapshot || t.snapshot
  if (t.isLead() && t.layout && e && t.hasListeners('didUpdate')) {
    let { layoutBox: i, measuredBox: s } = t.layout,
      { animationType: n } = t.options,
      r = e.source !== t.layout.source
    if ('size' === n)
      sO((t) => {
        let s = r ? e.measuredBox[t] : e.layoutBox[t],
          n = sz(s)
        ;((s.min = i[t].min), (s.max = s.min + n))
      })
    else if ('x' === n || 'y' === n) {
      let t = 'x' === n ? 'y' : 'x'
      nP(r ? e.measuredBox[t] : e.layoutBox[t], i[t])
    } else
      rc(n, e.layoutBox, i) &&
        sO((s) => {
          let n = r ? e.measuredBox[s] : e.layoutBox[s],
            a = sz(i[s])
          ;((n.max = n.min + a),
            t.relativeTarget &&
              !t.currentAnimation &&
              ((t.isProjectionDirty = !0), (t.relativeTarget[s].max = t.relativeTarget[s].min + a)))
        })
    let a = X()
    sH(a, i, e.layoutBox)
    let o = X()
    r ? sH(o, t.applyTransform(s, !0), e.measuredBox) : sH(o, i, e.layoutBox)
    let l = !nO(a),
      h = !1
    if (!t.resumeFrom) {
      let s = t.getClosestProjectingParent()
      if (s && !s.resumeFrom) {
        let { snapshot: n, layout: r } = s
        if (n && r) {
          let a = t.options.layoutAnchor || void 0,
            o = Z()
          sX(o, e.layoutBox, n.layoutBox, a)
          let l = Z()
          ;(sX(l, i, r.layoutBox, a),
            nz(o, l) || (h = !0),
            s.options.layoutRoot &&
              ((t.relativeTarget = l), (t.relativeTargetOrigin = o), (t.relativeParent = s)))
        }
      }
    }
    t.notifyListeners('didUpdate', {
      layout: i,
      snapshot: e,
      delta: o,
      layoutDelta: a,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: h,
    })
  } else if (t.isLead()) {
    let { onExitComplete: e } = t.options
    e && e()
  }
  t.options.transition = void 0
}
function n0(t) {
  t.parent &&
    (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
    t.isSharedProjectionDirty ||
      (t.isSharedProjectionDirty = !!(
        t.isProjectionDirty ||
        t.parent.isProjectionDirty ||
        t.parent.isSharedProjectionDirty
      )),
    t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
}
function n1(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}
function n2(t) {
  t.clearSnapshot()
}
function n5(t) {
  t.clearMeasurements()
}
function n4(t) {
  ;((t.isLayoutDirty = !0), t.updateLayout())
}
function n3(t) {
  t.isLayoutDirty = !1
}
function n6(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && ((t.snapshot = t.layout), (t.isLayoutDirty = !0))
}
function n8(t) {
  let { visualElement: e } = t.options
  ;(e && e.getProps().onBeforeLayoutMeasure && e.notify('BeforeLayoutMeasure'), t.resetTransform())
}
function n7(t) {
  ;(t.finishAnimation(), (t.targetDelta = t.relativeTarget = t.target = void 0), (t.isProjectionDirty = !0))
}
function n9(t) {
  t.resolveTargetDelta()
}
function rt(t) {
  t.calcProjection()
}
function re(t) {
  t.resetSkewAndRotation()
}
function ri(t) {
  t.removeLeadSnapshot()
}
function rs(t, e, i) {
  ;((t.translate = eO(e.translate, 0, i)),
    (t.scale = eO(e.scale, 1, i)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint))
}
function rn(t, e, i, s) {
  ;((t.min = eO(e.min, i.min, s)), (t.max = eO(e.max, i.max, s)))
}
function rr(t) {
  return t.animationValues && void 0 !== t.animationValues.opacityExit
}
let ra = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ro = (t) => 'u' > typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
  rl = ro('applewebkit/') && !ro('chrome/') ? Math.round : tT
function rh(t) {
  ;((t.min = rl(t.min)), (t.max = rl(t.max)))
}
function rc(t, e, i) {
  return 'position' === t || ('preserve-aspect' === t && !(0.2 >= Math.abs(n$(e) - n$(i))))
}
function ru(t) {
  return t !== t.root && t.scroll?.wasRoot
}
let rd = nK({
    attachResizeListener: (t, e) => sU(t, 'resize', e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
      y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
    }),
    checkIsScrollRoot: () => !0,
  }),
  rp = { current: void 0 },
  rm = nK({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!rp.current) {
        let t = new rd({})
        ;(t.mount(window), t.setOptions({ layoutScroll: !0 }), (rp.current = t))
      }
      return rp.current
    },
    resetTransform: (t, e) => {
      t.style.transform = void 0 !== e ? e : 'none'
    },
    checkIsScrollRoot: (t) => 'fixed' === window.getComputedStyle(t).position,
  })
function rf(t, e) {
  let i = s_(t),
    s = new AbortController()
  return [i, { passive: !0, ...e, signal: s.signal }, () => s.abort()]
}
function rx(t, e, i) {
  let { props: s } = t
  t.animationState && s.whileHover && t.animationState.setActive('whileHover', 'Start' === i)
  let n = s['onHover' + i]
  n && tE.postRender(() => n(e, s7(e)))
}
function rg(t) {
  return sG(t) && 'offsetHeight' in t && !('ownerSVGElement' in t)
}
let ry = (t, e) => !!e && (t === e || ry(t, e.parentElement)),
  rv = new WeakSet()
function rb(t) {
  return (e) => {
    'Enter' === e.key && t(e)
  }
}
function rw(t, e) {
  t.dispatchEvent(new PointerEvent('pointer' + e, { isPrimary: !0, bubbles: !0 }))
}
function rA(t) {
  return s8(t) && !(sW.x || sW.y)
}
let rj = new WeakSet()
function rM(t, e, i) {
  let { props: s } = t
  if (t.current instanceof HTMLButtonElement && t.current.disabled) return
  t.animationState && s.whileTap && t.animationState.setActive('whileTap', 'Start' === i)
  let n = s['onTap' + ('End' === i ? '' : i)]
  n && tE.postRender(() => n(e, s7(e)))
}
let rT = new WeakMap(),
  rS = new WeakMap(),
  rC = (t) => {
    let e = rT.get(t.target)
    e && e(t)
  },
  rk = (t) => {
    t.forEach(rC)
  },
  rE = { some: 0, all: 1 },
  rP = (function (t, e) {
    if ('u' < typeof Proxy) return iM
    let i = new Map(),
      s = (i, s) => iM(i, s, t, e)
    return new Proxy((t, e) => s(t, e), {
      get: (n, r) => ('create' === r ? s : (i.has(r) || i.set(r, iM(r, void 0, t, e)), i.get(r))),
    })
  })(
    {
      animation: {
        Feature: class extends iT {
          constructor(t) {
            ;(super(t),
              t.animationState ||
                (t.animationState = (function (t) {
                  let e = (e) =>
                      Promise.all(
                        e.map(({ animation: e, options: i }) =>
                          (function (t, e, i = {}) {
                            let s
                            if ((t.notify('AnimationStart', e), Array.isArray(e)))
                              s = Promise.all(e.map((e) => sN(t, e, i)))
                            else if ('string' == typeof e) s = sN(t, e, i)
                            else {
                              let n = 'function' == typeof e ? iS(t, e, i.custom) : e
                              s = Promise.all(sE(t, n, i))
                            }
                            return s.then(() => {
                              t.notify('AnimationComplete', e)
                            })
                          })(t, e, i),
                        ),
                      ),
                    i = sL(),
                    s = !0,
                    n = !1,
                    r = (e) => (i, s) => {
                      let n = iS(t, s, 'exit' === e ? t.presenceContext?.custom : void 0)
                      if (n) {
                        let { transition: t, transitionEnd: e, ...s } = n
                        i = { ...i, ...s, ...e }
                      }
                      return i
                    }
                  function a(a) {
                    let { props: o } = t,
                      l =
                        (function t(e) {
                          if (!e) return
                          if (!e.isControllingVariants) {
                            let i = (e.parent && t(e.parent)) || {}
                            return (void 0 !== e.props.initial && (i.initial = e.props.initial), i)
                          }
                          let i = {}
                          for (let t = 0; t < sB; t++) {
                            let s = ed[t],
                              n = e.props[s]
                            ;(ec(n) || !1 === n) && (i[s] = n)
                          }
                          return i
                        })(t.parent) || {},
                      h = [],
                      c = new Set(),
                      u = {},
                      d = 1 / 0
                    for (let e = 0; e < sV; e++) {
                      var p, m
                      let f = sF[e],
                        x = i[f],
                        g = void 0 !== o[f] ? o[f] : l[f],
                        y = ec(g),
                        v = f === a ? x.isActive : null
                      !1 === v && (d = e)
                      let b = g === l[f] && g !== o[f] && y
                      if (
                        (b && (s || n) && t.manuallyAnimateOnMount && (b = !1),
                        (x.protectedKeys = { ...u }),
                        (!x.isActive && null === v) || (!g && !x.prevProp) || eh(g) || 'boolean' == typeof g)
                      )
                        continue
                      if ('exit' === f && x.isActive && !0 !== v) {
                        x.prevResolvedValues && (u = { ...u, ...x.prevResolvedValues })
                        continue
                      }
                      let w =
                          ((p = x.prevProp),
                          'string' == typeof (m = g) ? m !== p : !!Array.isArray(m) && !sD(m, p)),
                        A = w || (f === a && x.isActive && !b && y) || (e > d && y),
                        j = !1,
                        M = Array.isArray(g) ? g : [g],
                        T = M.reduce(r(f), {})
                      !1 === v && (T = {})
                      let { prevResolvedValues: S = {} } = x,
                        C = { ...S, ...T },
                        k = (e) => {
                          ;((A = !0), c.has(e) && ((j = !0), c.delete(e)), (x.needsAnimating[e] = !0))
                          let i = t.getValue(e)
                          i && (i.liveStyle = !1)
                        }
                      for (let t in C) {
                        let e = T[t],
                          i = S[t]
                        if (!u.hasOwnProperty(t))
                          (iE(e) && iE(i) ? !sD(e, i) || w : e !== i)
                            ? null != e
                              ? k(t)
                              : c.add(t)
                            : void 0 !== e && c.has(t)
                              ? k(t)
                              : (x.protectedKeys[t] = !0)
                      }
                      ;((x.prevProp = g),
                        (x.prevResolvedValues = T),
                        x.isActive && (u = { ...u, ...T }),
                        (s || n) && t.blockInitialAnimation && (A = !1))
                      let E = b && w,
                        P = !E || j
                      A &&
                        P &&
                        h.push(
                          ...M.map((e) => {
                            let i = { type: f }
                            if (
                              'string' == typeof e &&
                              (s || n) &&
                              !E &&
                              t.manuallyAnimateOnMount &&
                              t.parent
                            ) {
                              let { parent: s } = t,
                                n = iS(s, e)
                              if (s.enteringChildren && n) {
                                let { delayChildren: e } = n.transition || {}
                                i.delay = sP(s.enteringChildren, t, e)
                              }
                            }
                            return { animation: e, options: i }
                          }),
                        )
                    }
                    if (c.size) {
                      let e = {}
                      if ('boolean' != typeof o.initial) {
                        let i = iS(t, Array.isArray(o.initial) ? o.initial[0] : o.initial)
                        i && i.transition && (e.transition = i.transition)
                      }
                      ;(c.forEach((i) => {
                        let s = t.getBaseTarget(i),
                          n = t.getValue(i)
                        ;(n && (n.liveStyle = !0), (e[i] = s ?? null))
                      }),
                        h.push({ animation: e }))
                    }
                    let f = !!h.length
                    return (
                      s &&
                        (!1 === o.initial || o.initial === o.animate) &&
                        !t.manuallyAnimateOnMount &&
                        (f = !1),
                      (s = !1),
                      (n = !1),
                      f ? e(h) : Promise.resolve()
                    )
                  }
                  return {
                    animateChanges: a,
                    setActive: function (e, s) {
                      if (i[e].isActive === s) return Promise.resolve()
                      ;(t.variantChildren?.forEach((t) => t.animationState?.setActive(e, s)),
                        (i[e].isActive = s))
                      let n = a(e)
                      for (let t in i) i[t].protectedKeys = {}
                      return n
                    },
                    setAnimateFunction: function (i) {
                      e = i(t)
                    },
                    getState: () => i,
                    reset: () => {
                      ;((i = sL()), (n = !0))
                    },
                  }
                })(t)))
          }
          updateAnimationControlsSubscription() {
            let { animate: t } = this.node.getProps()
            eh(t) && (this.unmountControls = t.subscribe(this.node))
          }
          mount() {
            this.updateAnimationControlsSubscription()
          }
          update() {
            let { animate: t } = this.node.getProps(),
              { animate: e } = this.node.prevProps || {}
            t !== e && this.updateAnimationControlsSubscription()
          }
          unmount() {
            ;(this.node.animationState.reset(), this.unmountControls?.())
          }
        },
      },
      exit: {
        Feature: class extends iT {
          constructor() {
            ;(super(...arguments), (this.id = sI++), (this.isExitComplete = !1))
          }
          update() {
            if (!this.node.presenceContext) return
            let { isPresent: t, onExitComplete: e } = this.node.presenceContext,
              { isPresent: i } = this.node.prevPresenceContext || {}
            if (!this.node.animationState || t === i) return
            if (t && !1 === i) {
              if (this.isExitComplete) {
                let { initial: t, custom: e } = this.node.getProps()
                if ('string' == typeof t || ('object' == typeof t && null !== t && !Array.isArray(t))) {
                  let i = iS(this.node, t, e)
                  if (i) {
                    let { transition: t, transitionEnd: e, ...s } = i
                    for (let t in s) this.node.getValue(t)?.jump(s[t])
                  }
                }
                ;(this.node.animationState.reset(), this.node.animationState.animateChanges())
              } else this.node.animationState.setActive('exit', !1)
              this.isExitComplete = !1
              return
            }
            let s = this.node.animationState.setActive('exit', !t)
            e &&
              !t &&
              s.then(() => {
                ;((this.isExitComplete = !0), e(this.id))
              })
          }
          mount() {
            let { register: t, onExitComplete: e } = this.node.presenceContext || {}
            ;(e && e(this.id), t && (this.unmount = t(this.id)))
          }
          unmount() {}
        },
      },
      inView: {
        Feature: class extends iT {
          constructor() {
            ;(super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1))
          }
          startObserver() {
            var t
            let e
            this.stopObserver?.()
            let { viewport: i = {} } = this.node.getProps(),
              { root: s, margin: n, amount: r = 'some', once: a } = i,
              o = {
                root: s ? s.current : void 0,
                rootMargin: n,
                threshold: 'number' == typeof r ? r : rE[r],
              },
              l = (t) => {
                let { isIntersecting: e } = t
                if (this.isInView === e || ((this.isInView = e), a && !e && this.hasEnteredView)) return
                ;(e && (this.hasEnteredView = !0),
                  this.node.animationState && this.node.animationState.setActive('whileInView', e))
                let { onViewportEnter: i, onViewportLeave: s } = this.node.getProps(),
                  n = e ? i : s
                n && n(t)
              }
            this.stopObserver =
              ((t = this.node.current),
              (e = (function ({ root: t, ...e }) {
                let i = t || document
                rS.has(i) || rS.set(i, {})
                let s = rS.get(i),
                  n = JSON.stringify(e)
                return (s[n] || (s[n] = new IntersectionObserver(rk, { root: t, ...e })), s[n])
              })(o)),
              rT.set(t, l),
              e.observe(t),
              () => {
                ;(rT.delete(t), e.unobserve(t))
              })
          }
          mount() {
            this.startObserver()
          }
          update() {
            if ('u' < typeof IntersectionObserver) return
            let { props: t, prevProps: e } = this.node
            ;['amount', 'margin', 'root'].some(
              (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
                return (i) => t[i] !== e[i]
              })(t, e),
            ) && this.startObserver()
          }
          unmount() {
            ;(this.stopObserver?.(), (this.hasEnteredView = !1), (this.isInView = !1))
          }
        },
      },
      tap: {
        Feature: class extends iT {
          mount() {
            let { current: t } = this.node
            if (!t) return
            let { globalTapTarget: e, propagate: i } = this.node.props
            this.unmount = (function (t, e, i = {}) {
              let [s, n, r] = rf(t, i),
                a = (t) => {
                  let s = t.currentTarget
                  if (!rA(t) || rj.has(t)) return
                  ;(rv.add(s), i.stopPropagation && rj.add(t))
                  let r = e(s, t),
                    a = { ...n, capture: !0 },
                    o = (t, e) => {
                      ;(window.removeEventListener('pointerup', l, a),
                        window.removeEventListener('pointercancel', h, a),
                        rv.has(s) && rv.delete(s),
                        rA(t) && 'function' == typeof r && r(t, { success: e }))
                    },
                    l = (t) => {
                      o(t, s === window || s === document || i.useGlobalTarget || ry(s, t.target))
                    },
                    h = (t) => {
                      o(t, !1)
                    }
                  ;(window.addEventListener('pointerup', l, a),
                    window.addEventListener('pointercancel', h, a))
                }
              return (
                s.forEach((t) => {
                  ;((i.useGlobalTarget ? window : t).addEventListener('pointerdown', a, n), rg(t)) &&
                    (t.addEventListener('focus', (t) =>
                      ((t, e) => {
                        let i = t.currentTarget
                        if (!i) return
                        let s = rb(() => {
                          if (rv.has(i)) return
                          rw(i, 'down')
                          let t = rb(() => {
                            rw(i, 'up')
                          })
                          ;(i.addEventListener('keyup', t, e),
                            i.addEventListener('blur', () => rw(i, 'cancel'), e))
                        })
                        ;(i.addEventListener('keydown', s, e),
                          i.addEventListener('blur', () => i.removeEventListener('keydown', s), e))
                      })(t, n),
                    ),
                    s3.has(t.tagName) ||
                      !0 === t.isContentEditable ||
                      t.hasAttribute('tabindex') ||
                      (t.tabIndex = 0))
                }),
                r
              )
            })(
              t,
              (t, e) => (
                rM(this.node, e, 'Start'),
                (t, { success: e }) => rM(this.node, t, e ? 'End' : 'Cancel')
              ),
              { useGlobalTarget: e, stopPropagation: i?.tap === !1 },
            )
          }
          unmount() {}
        },
      },
      focus: {
        Feature: class extends iT {
          constructor() {
            ;(super(...arguments), (this.isActive = !1))
          }
          onFocus() {
            let t = !1
            try {
              t = this.node.current.matches(':focus-visible')
            } catch (e) {
              t = !0
            }
            t &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0))
          }
          onBlur() {
            this.isActive &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1))
          }
          mount() {
            this.unmount = iN(
              sU(this.node.current, 'focus', () => this.onFocus()),
              sU(this.node.current, 'blur', () => this.onBlur()),
            )
          }
          unmount() {}
        },
      },
      hover: {
        Feature: class extends iT {
          mount() {
            let { current: t } = this.node
            t &&
              (this.unmount = (function (t, e, i = {}) {
                let [s, n, r] = rf(t, i)
                return (
                  s.forEach((t) => {
                    let i,
                      s = !1,
                      r = !1,
                      a = (e) => {
                        ;(i && (i(e), (i = void 0)), t.removeEventListener('pointerleave', l))
                      },
                      o = (t) => {
                        ;((s = !1),
                          window.removeEventListener('pointerup', o),
                          window.removeEventListener('pointercancel', o),
                          r && ((r = !1), a(t)))
                      },
                      l = (t) => {
                        if ('touch' !== t.pointerType) {
                          if (s) {
                            r = !0
                            return
                          }
                          a(t)
                        }
                      }
                    ;(t.addEventListener(
                      'pointerenter',
                      (s) => {
                        if ('touch' === s.pointerType || sW.x || sW.y) return
                        r = !1
                        let a = e(t, s)
                        'function' == typeof a && ((i = a), t.addEventListener('pointerleave', l, n))
                      },
                      n,
                    ),
                      t.addEventListener(
                        'pointerdown',
                        () => {
                          ;((s = !0),
                            window.addEventListener('pointerup', o, n),
                            window.addEventListener('pointercancel', o, n))
                        },
                        n,
                      ))
                  }),
                  r
                )
              })(t, (t, e) => (rx(this.node, e, 'Start'), (t) => rx(this.node, t, 'End'))))
          }
          unmount() {}
        },
      },
      pan: {
        Feature: class extends iT {
          constructor() {
            ;(super(...arguments), (this.removePointerDownListener = tT))
          }
          onPointerDown(t) {
            this.session = new ns(t, this.createPanHandlers(), {
              transformPagePoint: this.node.getTransformPagePoint(),
              contextWindow: nt(this.node),
            })
          }
          createPanHandlers() {
            let { onPanSessionStart: t, onPanStart: e, onPan: i, onPanEnd: s } = this.node.getProps()
            return {
              onSessionStart: nx(t),
              onStart: nx(e),
              onMove: nx(i),
              onEnd: (t, e) => {
                ;(delete this.session, s && tE.postRender(() => s(t, e)))
              },
            }
          }
          mount() {
            this.removePointerDownListener = s9(this.node.current, 'pointerdown', (t) =>
              this.onPointerDown(t),
            )
          }
          update() {
            this.session && this.session.updateHandlers(this.createPanHandlers())
          }
          unmount() {
            ;(this.removePointerDownListener(), this.session && this.session.end())
          }
        },
      },
      drag: {
        Feature: class extends iT {
          constructor(t) {
            ;(super(t),
              (this.removeGroupControls = tT),
              (this.removeListeners = tT),
              (this.controls = new np(t)))
          }
          mount() {
            let { dragControls: t } = this.node.getProps()
            ;(t && (this.removeGroupControls = t.subscribe(this.controls)),
              (this.removeListeners = this.controls.addListeners() || tT))
          }
          update() {
            let { dragControls: t } = this.node.getProps(),
              { dragControls: e } = this.node.prevProps || {}
            t !== e &&
              (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)))
          }
          unmount() {
            ;(this.removeGroupControls(),
              this.removeListeners(),
              this.controls.isDragging || this.controls.endPanSession())
          }
        },
        ProjectionNode: rm,
        MeasureLayout: nA,
      },
      layout: { ProjectionNode: rm, MeasureLayout: nA },
    },
    (t, e) => ((e.isSVG ?? e6(t)) ? new eH(e) : new e4(e, { allowProjection: t !== a.Fragment })),
  )
var rN = a
function rB(t, e) {
  if ('function' == typeof t) return t(e)
  null != t && (t.current = e)
}
class rD extends rN.Component {
  getSnapshotBeforeUpdate(t) {
    let e = this.props.childRef.current
    if (rg(e) && t.isPresent && !this.props.isPresent && !1 !== this.props.pop) {
      let t = e.offsetParent,
        i = (rg(t) && t.offsetWidth) || 0,
        s = (rg(t) && t.offsetHeight) || 0,
        n = getComputedStyle(e),
        r = this.props.sizeRef.current
      ;((r.height = parseFloat(n.height)),
        (r.width = parseFloat(n.width)),
        (r.top = e.offsetTop),
        (r.left = e.offsetLeft),
        (r.right = i - r.width - r.left),
        (r.bottom = s - r.height - r.top),
        (r.direction = n.direction))
    }
    return null
  }
  componentDidUpdate() {}
  render() {
    return this.props.children
  }
}
function rF({ children: t, isPresent: e, anchorX: i, anchorY: s, root: n, pop: o }) {
  let l = (0, rN.useId)(),
    h = (0, rN.useRef)(null),
    c = (0, rN.useRef)({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, direction: 'ltr' }),
    { nonce: u } = (0, rN.useContext)(e9),
    d = (function (...t) {
      return a.useCallback(
        (function (...t) {
          return (e) => {
            let i = !1,
              s = t.map((t) => {
                let s = rB(t, e)
                return (i || 'function' != typeof s || (i = !0), s)
              })
            if (i)
              return () => {
                for (let e = 0; e < s.length; e++) {
                  let i = s[e]
                  'function' == typeof i ? i() : rB(t[e], null)
                }
              }
          }
        })(...t),
        t,
      )
    })(h, t.props?.ref ?? t?.ref)
  return (
    (0, rN.useInsertionEffect)(() => {
      let { width: t, height: r, top: a, left: d, right: p, bottom: m, direction: f } = c.current
      if (e || !1 === o || !h.current || !t || !r) return
      let x = 'rtl' === f,
        g = 'left' === i ? (x ? `right: ${p}` : `left: ${d}`) : x ? `left: ${d}` : `right: ${p}`,
        y = 'bottom' === s ? `bottom: ${m}` : `top: ${a}`
      h.current.dataset.motionPopId = l
      let v = document.createElement('style')
      u && (v.nonce = u)
      let b = n ?? document.head
      return (
        b.appendChild(v),
        v.sheet &&
          v.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${r}px !important;
            ${g}px !important;
            ${y}px !important;
          }
        `),
        () => {
          ;(h.current?.removeAttribute('data-motion-pop-id'), b.contains(v) && b.removeChild(v))
        }
      )
    }, [e]),
    (0, r.jsx)(rD, {
      isPresent: e,
      childRef: h,
      sizeRef: c,
      pop: o,
      children: !1 === o ? t : rN.cloneElement(t, { ref: d }),
    })
  )
}
let rV = ({
  children: t,
  initial: e,
  isPresent: i,
  onExitComplete: s,
  custom: n,
  presenceAffectsLayout: o,
  mode: l,
  anchorX: h,
  anchorY: c,
  root: u,
}) => {
  let d = iu(rR),
    p = (0, a.useId)(),
    m = (0, a.useRef)(i),
    f = (0, a.useRef)(s)
  ij(() => {
    ;((m.current = i), (f.current = s))
  })
  let x = !0,
    g = (0, a.useMemo)(
      () => (
        (x = !1),
        {
          id: p,
          initial: e,
          isPresent: i,
          custom: n,
          onExitComplete: (t) => {
            for (let e of (d.set(t, !0), d.values())) if (!e) return
            s && s()
          },
          register: (t) => (
            d.set(t, !1),
            () => {
              ;(d.delete(t), m.current || d.size || f.current?.())
            }
          ),
        }
      ),
      [i, d, s],
    )
  return (
    o && x && (g = { ...g }),
    (0, a.useMemo)(() => {
      d.forEach((t, e) => d.set(e, !1))
    }, [i]),
    a.useEffect(() => {
      i || d.size || !s || s()
    }, [i]),
    (t = (0, r.jsx)(rF, {
      pop: 'popLayout' === l,
      isPresent: i,
      anchorX: h,
      anchorY: c,
      root: u,
      children: t,
    })),
    (0, r.jsx)(ic.Provider, { value: g, children: t })
  )
}
function rR() {
  return new Map()
}
let rL = (t) => t.key || ''
function rI(t) {
  let e = []
  return (
    a.Children.forEach(t, (t) => {
      ;(0, a.isValidElement)(t) && e.push(t)
    }),
    e
  )
}
let rO = ({
    children: t,
    custom: e,
    initial: i = !0,
    onExitComplete: s,
    presenceAffectsLayout: n = !0,
    mode: o = 'sync',
    propagate: l = !1,
    anchorX: h = 'left',
    anchorY: c = 'top',
    root: u,
  }) => {
    let [d, p] = nv(l),
      m = (0, a.useMemo)(() => rI(t), [t]),
      f = l && !d ? [] : m.map(rL),
      x = (0, a.useRef)(!0),
      g = (0, a.useRef)(m),
      y = iu(() => new Map()),
      v = (0, a.useRef)(new Set()),
      [b, w] = (0, a.useState)(m),
      [A, j] = (0, a.useState)(m)
    ij(() => {
      ;((x.current = !1), (g.current = m))
      for (let t = 0; t < A.length; t++) {
        let e = rL(A[t])
        f.includes(e) ? (y.delete(e), v.current.delete(e)) : !0 !== y.get(e) && y.set(e, !1)
      }
    }, [A, f.length, f.join('-')])
    let M = []
    if (m !== b) {
      let t = [...m]
      for (let e = 0; e < A.length; e++) {
        let i = A[e],
          s = rL(i)
        f.includes(s) || (t.splice(e, 0, i), M.push(i))
      }
      return ('wait' === o && M.length && (t = M), j(rI(t)), w(m), null)
    }
    let { forceRender: T } = (0, a.useContext)(e8)
    return (0, r.jsx)(r.Fragment, {
      children: A.map((t) => {
        let a = rL(t),
          b = (!l || !!d) && (m === A || f.includes(a))
        return (0, r.jsx)(
          rV,
          {
            isPresent: b,
            initial: (!x.current || !!i) && void 0,
            custom: e,
            presenceAffectsLayout: n,
            mode: o,
            root: u,
            onExitComplete: b
              ? void 0
              : () => {
                  if (v.current.has(a) || !y.has(a)) return
                  ;(v.current.add(a), y.set(a, !0))
                  let t = !0
                  ;(y.forEach((e) => {
                    e || (t = !1)
                  }),
                    t && (T?.(), j(g.current), l && p?.(), s && s()))
                },
            anchorX: h,
            anchorY: c,
            children: t,
          },
          a,
        )
      }),
    })
  },
  rU = (...t) =>
    t
      .filter((t, e, i) => !!t && '' !== t.trim() && i.indexOf(t) === e)
      .join(' ')
      .trim(),
  rW = (t) => {
    let e = t.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, e, i) => (i ? i.toUpperCase() : e.toLowerCase()))
    return e.charAt(0).toUpperCase() + e.slice(1)
  }
var rz = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
let r$ = (0, a.createContext)({}),
  rH = (0, a.forwardRef)(
    (
      {
        color: t,
        size: e,
        strokeWidth: i,
        absoluteStrokeWidth: s,
        className: n = '',
        children: r,
        iconNode: o,
        ...l
      },
      h,
    ) => {
      let {
          size: c = 24,
          strokeWidth: u = 2,
          absoluteStrokeWidth: d = !1,
          color: p = 'currentColor',
          className: m = '',
        } = (0, a.useContext)(r$) ?? {},
        f = (s ?? d) ? (24 * Number(i ?? u)) / Number(e ?? c) : (i ?? u)
      return (0, a.createElement)(
        'svg',
        {
          ref: h,
          ...rz,
          width: e ?? c ?? rz.width,
          height: e ?? c ?? rz.height,
          stroke: t ?? p,
          strokeWidth: f,
          className: rU('lucide', m, n),
          ...(!r &&
            !((t) => {
              for (let e in t) if (e.startsWith('aria-') || 'role' === e || 'title' === e) return !0
              return !1
            })(l) && { 'aria-hidden': 'true' }),
          ...l,
        },
        [...o.map(([t, e]) => (0, a.createElement)(t, e)), ...(Array.isArray(r) ? r : [r])],
      )
    },
  ),
  rY = (t, e) => {
    let i = (0, a.forwardRef)(({ className: i, ...s }, n) =>
      (0, a.createElement)(rH, {
        ref: n,
        iconNode: e,
        className: rU(
          `lucide-${rW(t)
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()}`,
          `lucide-${t}`,
          i,
        ),
        ...s,
      }),
    )
    return ((i.displayName = rW(t)), i)
  },
  rq = rY('sparkles', [
    [
      'path',
      {
        d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
        key: '1s2grr',
      },
    ],
    ['path', { d: 'M20 2v4', key: '1rf3ol' }],
    ['path', { d: 'M22 4h-4', key: 'gwowj6' }],
    ['circle', { cx: '4', cy: '20', r: '2', key: '6kqj1y' }],
  ]),
  rX = rY('heart', [
    [
      'path',
      {
        d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
        key: 'mvr1a0',
      },
    ],
  ]),
  rG = rY('flower-2', [
    [
      'path',
      {
        d: 'M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1',
        key: '3pnvol',
      },
    ],
    ['circle', { cx: '12', cy: '8', r: '2', key: '1822b1' }],
    ['path', { d: 'M12 10v12', key: '6ubwww' }],
    ['path', { d: 'M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z', key: '9hd38g' }],
    ['path', { d: 'M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z', key: 'ufn41s' }],
  ]),
  rZ = rY('music', [
    ['path', { d: 'M9 18V5l12-2v13', key: '1jmyc2' }],
    ['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
    ['circle', { cx: '18', cy: '16', r: '3', key: '1hluhg' }],
  ])
var r_ = {}
!(function t(e, i, s, n) {
  var r,
    a,
    o,
    l,
    h,
    c,
    u,
    d,
    p,
    m,
    f,
    x = !!(
      e.Worker &&
      e.Blob &&
      e.Promise &&
      e.OffscreenCanvas &&
      e.OffscreenCanvasRenderingContext2D &&
      e.HTMLCanvasElement &&
      e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      e.URL &&
      e.URL.createObjectURL
    ),
    g = 'function' == typeof Path2D && 'function' == typeof DOMMatrix
  function y() {}
  function v(t) {
    var s = i.exports.Promise,
      n = void 0 !== s ? s : e.Promise
    return 'function' == typeof n ? new n(t) : (t(y, y), null)
  }
  var b =
      ((r = (function () {
        if (!e.OffscreenCanvas) return !1
        try {
          var t = new OffscreenCanvas(1, 1),
            i = t.getContext('2d')
          i.fillRect(0, 0, 1, 1)
          var s = t.transferToImageBitmap()
          i.createPattern(s, 'no-repeat')
        } catch (t) {
          return !1
        }
        return !0
      })()),
      (a = new Map()),
      {
        transform: function (t) {
          if (r) return t
          if (a.has(t)) return a.get(t)
          var e = new OffscreenCanvas(t.width, t.height)
          return (e.getContext('2d').drawImage(t, 0, 0), a.set(t, e), e)
        },
        clear: function () {
          a.clear()
        },
      }),
    w =
      ((h = Math.floor(1e3 / 60)),
      (c = {}),
      (u = 0),
      'function' == typeof requestAnimationFrame && 'function' == typeof cancelAnimationFrame
        ? ((o = function (t) {
            var e = Math.random()
            return (
              (c[e] = requestAnimationFrame(function i(s) {
                u === s || u + h - 1 < s ? ((u = s), delete c[e], t()) : (c[e] = requestAnimationFrame(i))
              })),
              e
            )
          }),
          (l = function (t) {
            c[t] && cancelAnimationFrame(c[t])
          }))
        : ((o = function (t) {
            return setTimeout(t, h)
          }),
          (l = function (t) {
            return clearTimeout(t)
          })),
      { frame: o, cancel: l }),
    A =
      ((m = {}),
      function () {
        if (d) return d
        if (!s && x) {
          var e = [
            'var CONFETTI, SIZE = {}, module = {};',
            '(' + t.toString() + ')(this, module, true, SIZE);',
            'onmessage = function(msg) {\n  if (msg.data.options) {\n    CONFETTI(msg.data.options).then(function () {\n      if (msg.data.callback) {\n        postMessage({ callback: msg.data.callback });\n      }\n    });\n  } else if (msg.data.reset) {\n    CONFETTI && CONFETTI.reset();\n  } else if (msg.data.resize) {\n    SIZE.width = msg.data.resize.width;\n    SIZE.height = msg.data.resize.height;\n  } else if (msg.data.canvas) {\n    SIZE.width = msg.data.canvas.width;\n    SIZE.height = msg.data.canvas.height;\n    CONFETTI = module.exports.create(msg.data.canvas);\n  }\n}',
          ].join('\n')
          try {
            d = new Worker(URL.createObjectURL(new Blob([e])))
          } catch (t) {
            return (
              'u' > typeof console &&
                'function' == typeof console.warn &&
                console.warn('🎊 Could not load worker', t),
              null
            )
          }
          var i = d
          function n(t, e) {
            i.postMessage({ options: t || {}, callback: e })
          }
          ;((i.init = function (t) {
            var e = t.transferControlToOffscreen()
            i.postMessage({ canvas: e }, [e])
          }),
            (i.fire = function (t, e, s) {
              if (p) return (n(t, null), p)
              var r = Math.random().toString(36).slice(2)
              return (p = v(function (e) {
                function a(t) {
                  t.data.callback === r &&
                    (delete m[r], i.removeEventListener('message', a), (p = null), b.clear(), s(), e())
                }
                ;(i.addEventListener('message', a), n(t, r), (m[r] = a.bind(null, { data: { callback: r } })))
              }))
            }),
            (i.reset = function () {
              for (var t in (i.postMessage({ reset: !0 }), m)) (m[t](), delete m[t])
            }))
        }
        return d
      }),
    j = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ['square', 'circle'],
      zIndex: 100,
      colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
      disableForReducedMotion: !1,
      scalar: 1,
    }
  function M(t, e, i) {
    var s
    return ((s = t && null != t[e] ? t[e] : j[e]), i ? i(s) : s)
  }
  function T(t) {
    return t < 0 ? 0 : Math.floor(t)
  }
  function S(t) {
    return parseInt(t, 16)
  }
  function C(t) {
    return t.map(k)
  }
  function k(t) {
    var e = String(t).replace(/[^0-9a-f]/gi, '')
    return (
      e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
      { r: S(e.substring(0, 2)), g: S(e.substring(2, 4)), b: S(e.substring(4, 6)) }
    )
  }
  function E(t) {
    ;((t.width = document.documentElement.clientWidth), (t.height = document.documentElement.clientHeight))
  }
  function P(t) {
    var e = t.getBoundingClientRect()
    ;((t.width = e.width), (t.height = e.height))
  }
  function N(t, i) {
    var r,
      a = !t,
      o = !!M(i || {}, 'resize'),
      l = !1,
      h = M(i, 'disableForReducedMotion', Boolean),
      c = x && M(i || {}, 'useWorker') ? A() : null,
      u = a ? E : P,
      d = !!t && !!c && !!t.__confetti_initialized,
      p = 'function' == typeof matchMedia && matchMedia('(prefers-reduced-motion)').matches
    function m(i) {
      var m,
        f = h || M(i, 'disableForReducedMotion', Boolean),
        x = M(i, 'zIndex', Number)
      if (f && p)
        return v(function (t) {
          t()
        })
      ;(a && r
        ? (t = r.canvas)
        : a &&
          !t &&
          (((m = document.createElement('canvas')).style.position = 'fixed'),
          (m.style.top = '0px'),
          (m.style.left = '0px'),
          (m.style.pointerEvents = 'none'),
          (m.style.zIndex = x),
          (t = m),
          document.body.appendChild(t)),
        o && !d && u(t))
      var y = { width: t.width, height: t.height }
      function A() {
        if (c) {
          var e = {
            getBoundingClientRect: function () {
              if (!a) return t.getBoundingClientRect()
            },
          }
          ;(u(e), c.postMessage({ resize: { width: e.width, height: e.height } }))
          return
        }
        y.width = y.height = null
      }
      function j() {
        ;((r = null),
          o && ((l = !1), e.removeEventListener('resize', A)),
          a && t && (document.body.contains(t) && document.body.removeChild(t), (t = null), (d = !1)))
      }
      return (c && !d && c.init(t),
      (d = !0),
      c && (t.__confetti_initialized = !0),
      o && !l && ((l = !0), e.addEventListener('resize', A, !1)),
      c)
        ? c.fire(i, y, j)
        : (function (e, i, a) {
            for (
              var o,
                l,
                h,
                c,
                d,
                p,
                m,
                f = M(e, 'particleCount', T),
                x = M(e, 'angle', Number),
                y = M(e, 'spread', Number),
                A = M(e, 'startVelocity', Number),
                j = M(e, 'decay', Number),
                S = M(e, 'gravity', Number),
                k = M(e, 'drift', Number),
                E = M(e, 'colors', C),
                P = M(e, 'ticks', Number),
                N = M(e, 'shapes'),
                B = M(e, 'scalar'),
                D = !!M(e, 'flat'),
                F = (((o = M(e, 'origin', Object)).x = M(o, 'x', Number)), (o.y = M(o, 'y', Number)), o),
                V = f,
                R = [],
                L = t.width * F.x,
                I = t.height * F.y;
              V--;
            )
              R.push(
                (function (t) {
                  var e = t.angle * (Math.PI / 180),
                    i = t.spread * (Math.PI / 180)
                  return {
                    x: t.x,
                    y: t.y,
                    wobble: 10 * Math.random(),
                    wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
                    velocity: 0.5 * t.startVelocity + Math.random() * t.startVelocity,
                    angle2D: -e + (0.5 * i - Math.random() * i),
                    tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
                    color: t.color,
                    shape: t.shape,
                    tick: 0,
                    totalTicks: t.ticks,
                    decay: t.decay,
                    drift: t.drift,
                    random: Math.random() + 2,
                    tiltSin: 0,
                    tiltCos: 0,
                    wobbleX: 0,
                    wobbleY: 0,
                    gravity: 3 * t.gravity,
                    ovalScalar: 0.6,
                    scalar: t.scalar,
                    flat: t.flat,
                  }
                })({
                  x: L,
                  y: I,
                  angle: x,
                  spread: y,
                  startVelocity: A,
                  color: E[V % E.length],
                  shape: N[Math.floor(Math.random() * (N.length - 0)) + 0],
                  ticks: P,
                  decay: j,
                  gravity: S,
                  drift: k,
                  scalar: B,
                  flat: D,
                }),
              )
            return r
              ? r.addFettis(R)
              : ((l = t),
                (d = R.slice()),
                (p = l.getContext('2d')),
                (m = v(function (t) {
                  function e() {
                    ;((h = c = null), p.clearRect(0, 0, i.width, i.height), b.clear(), a(), t())
                  }
                  ;((h = w.frame(function t() {
                    ;(s &&
                      (i.width !== n.width || i.height !== n.height) &&
                      ((i.width = l.width = n.width), (i.height = l.height = n.height)),
                      i.width || i.height || (u(l), (i.width = l.width), (i.height = l.height)),
                      p.clearRect(0, 0, i.width, i.height),
                      (d = d.filter(function (t) {
                        return (function (t, e) {
                          ;((e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
                            (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
                            (e.velocity *= e.decay),
                            e.flat
                              ? ((e.wobble = 0),
                                (e.wobbleX = e.x + 10 * e.scalar),
                                (e.wobbleY = e.y + 10 * e.scalar),
                                (e.tiltSin = 0),
                                (e.tiltCos = 0),
                                (e.random = 1))
                              : ((e.wobble += e.wobbleSpeed),
                                (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
                                (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble)),
                                (e.tiltAngle += 0.1),
                                (e.tiltSin = Math.sin(e.tiltAngle)),
                                (e.tiltCos = Math.cos(e.tiltAngle)),
                                (e.random = Math.random() + 2)))
                          var i,
                            s,
                            n,
                            r,
                            a,
                            o,
                            l,
                            h,
                            c,
                            u,
                            d,
                            p,
                            m,
                            f,
                            x,
                            y,
                            v = e.tick++ / e.totalTicks,
                            w = e.x + e.random * e.tiltCos,
                            A = e.y + e.random * e.tiltSin,
                            j = e.wobbleX + e.random * e.tiltCos,
                            M = e.wobbleY + e.random * e.tiltSin
                          if (
                            ((t.fillStyle =
                              'rgba(' +
                              e.color.r +
                              ', ' +
                              e.color.g +
                              ', ' +
                              e.color.b +
                              ', ' +
                              (1 - v) +
                              ')'),
                            t.beginPath(),
                            g &&
                              'path' === e.shape.type &&
                              'string' == typeof e.shape.path &&
                              Array.isArray(e.shape.matrix))
                          ) {
                            t.fill(
                              ((i = e.shape.path),
                              (s = e.shape.matrix),
                              (n = e.x),
                              (r = e.y),
                              (a = 0.1 * Math.abs(j - w)),
                              (o = 0.1 * Math.abs(M - A)),
                              (l = (Math.PI / 10) * e.wobble),
                              (h = new Path2D(i)),
                              (c = new Path2D()).addPath(h, new DOMMatrix(s)),
                              (u = new Path2D()).addPath(
                                c,
                                new DOMMatrix([
                                  Math.cos(l) * a,
                                  Math.sin(l) * a,
                                  -Math.sin(l) * o,
                                  Math.cos(l) * o,
                                  n,
                                  r,
                                ]),
                              ),
                              u),
                            )
                          } else if ('bitmap' === e.shape.type) {
                            var T = (Math.PI / 10) * e.wobble,
                              S = 0.1 * Math.abs(j - w),
                              C = 0.1 * Math.abs(M - A),
                              k = e.shape.bitmap.width * e.scalar,
                              E = e.shape.bitmap.height * e.scalar,
                              P = new DOMMatrix([
                                Math.cos(T) * S,
                                Math.sin(T) * S,
                                -Math.sin(T) * C,
                                Math.cos(T) * C,
                                e.x,
                                e.y,
                              ])
                            P.multiplySelf(new DOMMatrix(e.shape.matrix))
                            var N = t.createPattern(b.transform(e.shape.bitmap), 'no-repeat')
                            ;(N.setTransform(P),
                              (t.globalAlpha = 1 - v),
                              (t.fillStyle = N),
                              t.fillRect(e.x - k / 2, e.y - E / 2, k, E),
                              (t.globalAlpha = 1))
                          } else if ('circle' === e.shape)
                            t.ellipse
                              ? t.ellipse(
                                  e.x,
                                  e.y,
                                  Math.abs(j - w) * e.ovalScalar,
                                  Math.abs(M - A) * e.ovalScalar,
                                  (Math.PI / 10) * e.wobble,
                                  0,
                                  2 * Math.PI,
                                )
                              : ((d = e.x),
                                (p = e.y),
                                (m = Math.abs(j - w) * e.ovalScalar),
                                (f = Math.abs(M - A) * e.ovalScalar),
                                (x = (Math.PI / 10) * e.wobble),
                                (y = 2 * Math.PI),
                                t.save(),
                                t.translate(d, p),
                                t.rotate(x),
                                t.scale(m, f),
                                t.arc(0, 0, 1, 0, y, void 0),
                                t.restore())
                          else if ('star' === e.shape)
                            for (
                              var B = (Math.PI / 2) * 3,
                                D = 4 * e.scalar,
                                F = 8 * e.scalar,
                                V = e.x,
                                R = e.y,
                                L = 5,
                                I = Math.PI / 5;
                              L--;
                            )
                              ((V = e.x + Math.cos(B) * F),
                                (R = e.y + Math.sin(B) * F),
                                t.lineTo(V, R),
                                (B += I),
                                (V = e.x + Math.cos(B) * D),
                                (R = e.y + Math.sin(B) * D),
                                t.lineTo(V, R),
                                (B += I))
                          else
                            (t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                              t.lineTo(Math.floor(e.wobbleX), Math.floor(A)),
                              t.lineTo(Math.floor(j), Math.floor(M)),
                              t.lineTo(Math.floor(w), Math.floor(e.wobbleY)))
                          return (t.closePath(), t.fill(), e.tick < e.totalTicks)
                        })(p, t)
                      })).length
                        ? (h = w.frame(t))
                        : e())
                  })),
                    (c = e))
                })),
                (r = {
                  addFettis: function (t) {
                    return ((d = d.concat(t)), m)
                  },
                  canvas: l,
                  promise: m,
                  reset: function () {
                    ;(h && w.cancel(h), c && c())
                  },
                }).promise)
          })(i, y, j)
    }
    return (
      (m.reset = function () {
        ;(c && c.reset(), r && r.reset())
      }),
      m
    )
  }
  function B() {
    return (f || (f = N(null, { useWorker: !0, resize: !0 })), f)
  }
  ;((i.exports = function () {
    return B().apply(this, arguments)
  }),
    (i.exports.reset = function () {
      B().reset()
    }),
    (i.exports.create = N),
    (i.exports.shapeFromPath = function (t) {
      if (!g) throw Error('path confetti are not supported in this browser')
      'string' == typeof t ? (s = t) : ((s = t.path), (n = t.matrix))
      var e = new Path2D(s),
        i = document.createElement('canvas').getContext('2d')
      if (!n) {
        for (var s, n, r, a, o = 1e3, l = 1e3, h = 0, c = 0, u = 0; u < 1e3; u += 2)
          for (var d = 0; d < 1e3; d += 2)
            i.isPointInPath(e, u, d, 'nonzero') &&
              ((o = Math.min(o, u)), (l = Math.min(l, d)), (h = Math.max(h, u)), (c = Math.max(c, d)))
        r = h - o
        var p = Math.min(10 / r, 10 / (a = c - l))
        n = [p, 0, 0, p, -Math.round(r / 2 + o) * p, -Math.round(a / 2 + l) * p]
      }
      return { type: 'path', path: s, matrix: n }
    }),
    (i.exports.shapeFromText = function (t) {
      var e,
        i = 1,
        s = '#000000',
        n =
          '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif'
      'string' == typeof t
        ? (e = t)
        : ((e = t.text),
          (i = 'scalar' in t ? t.scalar : i),
          (n = 'fontFamily' in t ? t.fontFamily : n),
          (s = 'color' in t ? t.color : s))
      var r = 10 * i,
        a = '' + r + 'px ' + n,
        o = new OffscreenCanvas(r, r),
        l = o.getContext('2d')
      l.font = a
      var h = l.measureText(e),
        c = Math.ceil(h.actualBoundingBoxRight + h.actualBoundingBoxLeft),
        u = Math.ceil(h.actualBoundingBoxAscent + h.actualBoundingBoxDescent),
        d = h.actualBoundingBoxLeft + 2,
        p = h.actualBoundingBoxAscent + 2
      ;((c += 4),
        (u += 4),
        ((l = (o = new OffscreenCanvas(c, u)).getContext('2d')).font = a),
        (l.fillStyle = s),
        l.fillText(e, d, p))
      var m = 1 / i
      return {
        type: 'bitmap',
        bitmap: o.transferToImageBitmap(),
        matrix: [m, 0, 0, m, (-c * m) / 2, (-u * m) / 2],
      }
    }))
})(
  (function () {
    return 'u' > typeof window ? window : 'u' > typeof self ? self : this || {}
  })(),
  r_,
  !1,
)
let rK = r_.exports
r_.exports.create
let rJ = 'Arshi',
  rQ = 'Arish',
  r0 = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  r1 = [
    {
      id: 'nikah',
      title: 'Nikah Ceremony',
      subtitle: 'Sacred Union',
      date: 'Thursday, 12 November 2026',
      time: 'Between Asar-Magrib',
      location: 'Home',
      address: '',
      description:
        'The formal Islamic marriage ceremony, uniting our souls in the presence of loved ones and the grace of Allah.',
      dressCode: 'Traditional Modest Attire',
      icon: 'Heart',
      mapsUrl: '',
    },
    {
      id: 'mehndi-haldi',
      title: 'Mehndi & Haldi',
      subtitle: 'Colors & Traditions',
      date: 'Friday, 13 November 2026',
      time: '05:00 pm',
      location: 'The GZ Retreat',
      address: 'Bundrkha Sadak, Bhopal, Madhya Pradesh 462036',
      description:
        'An evening of vibrant colors, intricate henna designs, traditional blessings, and joy shared with our closest family and friends.',
      dressCode: '',
      icon: 'Sparkles',
      mapsUrl: 'https://maps.google.com/?q=The+GZ+Retreat+Bhopal',
    },
    {
      id: 'sufi-night',
      title: 'Sufi Night',
      subtitle: 'Soulful Music',
      date: 'Friday, 13 November 2026',
      time: '09:00 pm',
      location: 'The GZ Retreat',
      address: 'Bundrkha Sadak, Bhopal, Madhya Pradesh 462036',
      description: 'Join us for a magical evening of soulful music, dance, and joyous celebrations.',
      dressCode: 'Black Dress Theme',
      icon: 'Sparkles',
      mapsUrl: 'https://maps.google.com/?q=The+GZ+Retreat+Bhopal',
    },
    {
      id: 'wedding',
      title: 'Wedding Celebration',
      subtitle: 'Barat & Main Event',
      date: 'Saturday, 14 November 2026',
      time: '08:00 pm',
      location: 'The GZ Retreat',
      address: 'Bundrkha Sadak, Bhopal, Madhya Pradesh 462036',
      description:
        'Join us for the main wedding celebration and feast as we embark on this beautiful journey together.',
      dressCode: 'Formal/Traditional Attire',
      icon: 'Sparkles',
      mapsUrl: 'https://maps.google.com/?q=The+GZ+Retreat+Bhopal',
    },
    {
      id: 'reception',
      title: 'Waleema',
      subtitle: 'Celebration & Feast',
      date: 'Sunday, 15 November 2026',
      time: '08:00 pm',
      location: 'Talabeer Palace',
      address: 'NIFT Rd, Bhopal, Madhya Pradesh 462030',
      description:
        'Join us for an exquisite evening of joyous celebrations and royal banquets as we celebrate the newlyweds.',
      dressCode: 'Formal Attire',
      icon: 'Sparkles',
      mapsUrl: 'https://maps.google.com/?q=Talabeer+Palace+Bhopal',
    },
  ],
  r2 = ({ onEnter: t }) => {
    let [e, i] = (0, a.useState)(!1),
      [s, n] = (0, a.useState)(!1)
    return (0, r.jsx)(rO, {
      children:
        !e &&
        (0, r.jsxs)(rP.div, {
          initial: { opacity: 1 },
          exit: { opacity: 0, scale: 1.05 },
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
          className:
            'fixed inset-0 z-[100] bg-[#F8F4EF] flex flex-col items-center justify-center p-6 text-center overflow-hidden selection:bg-[#C4A484]',
          children: [
            (0, r.jsx)('div', {
              className:
                'absolute inset-0 bg-[radial-gradient(#E7D7C9_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none',
            }),
            (0, r.jsx)('div', {
              className:
                'absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-[#C4A484]/20 via-[#E7D7C9]/30 to-transparent blur-3xl pointer-events-none animate-pulse-glow',
            }),
            (0, r.jsx)(rP.div, {
              animate: { rotate: 360 },
              transition: { duration: 60, repeat: 1 / 0, ease: 'linear' },
              className:
                'absolute -top-16 -right-16 w-64 h-64 border-[1px] border-[#C4A484]/20 rounded-full border-dashed pointer-events-none flex items-center justify-center',
              children: (0, r.jsx)(rG, { className: 'w-12 h-12 text-[#C4A484]/20 absolute -top-6' }),
            }),
            (0, r.jsx)(rP.div, {
              animate: { rotate: -360 },
              transition: { duration: 70, repeat: 1 / 0, ease: 'linear' },
              className:
                'absolute -bottom-20 -left-20 w-72 h-72 border-[1px] border-[#8B6B4A]/20 rounded-full border-dashed pointer-events-none flex items-center justify-center',
              children: (0, r.jsx)(rG, { className: 'w-14 h-14 text-[#8B6B4A]/20 absolute -bottom-7' }),
            }),
            (0, r.jsxs)('div', {
              className:
                'absolute inset-5 border border-[#C4A484]/40 rounded-[28px] pointer-events-none flex flex-col justify-between p-4 z-10',
              children: [
                (0, r.jsxs)('div', {
                  className:
                    'flex justify-between items-center text-[#8B6B4A]/70 text-[10px] tracking-widest uppercase font-poppins font-medium',
                  children: [
                    (0, r.jsx)('span', { children: 'BISMILLAH' }),
                    (0, r.jsx)('span', { children: '25 • 12 • 2026' }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className:
                    'flex justify-between items-center text-[#8B6B4A]/70 text-[10px] tracking-widest uppercase font-poppins font-medium',
                  children: [
                    (0, r.jsx)('span', { children: 'ROYAL WEDDING' }),
                    (0, r.jsx)('span', { children: 'DUBAI' }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)(rP.div, {
              initial: { scale: 0.88, opacity: 0, y: 15 },
              animate: { scale: 1, opacity: 1, y: 0 },
              transition: { duration: 1.1, ease: 'easeOut' },
              className:
                'relative bg-white/85 border border-[#C4A484]/50 rounded-[32px] p-8 max-w-xs w-full shadow-2xl flex flex-col items-center z-10 overflow-hidden',
              children: [
                (0, r.jsxs)('div', {
                  className: 'absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]',
                  children: [
                    (0, r.jsx)(rP.img, {
                      initial: { opacity: 0, scale: 1.18, filter: 'blur(8px)' },
                      animate: { opacity: 0.88, scale: 1.03, filter: 'blur(0px)' },
                      transition: { duration: 3.2, ease: [0.22, 1, 0.36, 1] },
                      src: '/hero-couple.jpg',
                      alt: 'Couple Background',
                      className: 'w-full h-full object-cover object-[50%_35%]',
                    }),
                    (0, r.jsx)('div', {
                      className:
                        'absolute inset-0 bg-gradient-to-b from-[#F8F4EF]/75 via-[#F8F4EF]/35 to-[#F8F4EF]/85 pointer-events-none',
                    }),
                  ],
                }),
                (0, r.jsxs)('div', {
                  className: 'relative z-10 w-full flex flex-col items-center',
                  children: [
                    (0, r.jsx)('p', {
                      className: 'text-xl font-calligraphy text-[#8B6B4A] mb-3 drop-shadow-sm',
                      children: r0,
                    }),
                    (0, r.jsx)('div', {
                      className:
                        'w-12 h-0.5 bg-gradient-to-r from-transparent via-[#C4A484] to-transparent my-2',
                    }),
                    (0, r.jsx)(rP.div, {
                      animate: { rotate: [0, 8, -8, 0] },
                      transition: { duration: 5, repeat: 1 / 0, ease: 'easeInOut' },
                      className: 'my-3 text-[#C4A484]',
                      children: (0, r.jsx)(rG, {
                        className: 'w-9 h-9 sm:w-10 sm:h-10 text-[#8B6B4A] drop-shadow-md',
                      }),
                    }),
                    (0, r.jsx)('h3', {
                      className:
                        'text-[11px] uppercase tracking-[0.3em] text-[#8B6B4A]/80 font-poppins font-semibold mb-3',
                      children: 'The Wedding Invitation',
                    }),
                    (0, r.jsxs)('div', {
                      className: 'flex flex-col items-center my-3 gap-1',
                      children: [
                        (0, r.jsx)('span', {
                          className: 'text-5xl font-calligraphy text-[#8B6B4A] leading-tight drop-shadow-md',
                          children: rJ,
                        }),
                        (0, r.jsx)(rP.div, {
                          animate: { scale: [1, 1.25, 1] },
                          transition: { duration: 2.5, repeat: 1 / 0 },
                          className: 'text-[#C4A484] my-0.5',
                          children: (0, r.jsx)(rX, { className: 'w-5 h-5 fill-[#C4A484]' }),
                        }),
                        (0, r.jsx)('span', {
                          className: 'text-5xl font-calligraphy text-[#8B6B4A] leading-tight drop-shadow-md',
                          children: rQ,
                        }),
                      ],
                    }),
                    (0, r.jsx)('p', {
                      className: 'text-xs font-playfair italic text-[#8B6B4A] mt-2 mb-6 tracking-wide',
                      children: 'Friday, 25 December 2026',
                    }),
                    (0, r.jsxs)('div', {
                      className:
                        'flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8F4EF]/90 border border-[#C4A484]/40 text-[#8B6B4A] text-[11px] mb-6 font-poppins shadow-sm',
                      children: [
                        (0, r.jsx)(rZ, { className: 'w-3.5 h-3.5 animate-bounce text-[#C4A484]' }),
                        (0, r.jsx)('span', { children: 'Audio Prepared • Tap Below' }),
                      ],
                    }),
                    (0, r.jsxs)(rP.button, {
                      onClick: () => {
                        if (!s) {
                          n(!0)
                          try {
                            rK({
                              particleCount: 140,
                              spread: 90,
                              origin: { y: 0.55 },
                              colors: ['#C4A484', '#8B6B4A', '#F8F4EF', '#D4AF37', '#FFF5C0'],
                            })
                          } catch (t) {
                            console.log('Confetti animation triggered')
                          }
                          setTimeout(() => {
                            ;(i(!0), t())
                          }, 1100)
                        }
                      },
                      disabled: s,
                      whileHover: { scale: 1.04 },
                      whileTap: { scale: 0.96 },
                      className:
                        'group relative w-full py-4 rounded-full bg-gradient-to-r from-[#8B6B4A] via-[#C4A484] to-[#8B6B4A] text-[#F8F4EF] font-semibold text-xs uppercase tracking-[0.25em] shadow-xl shadow-[#8B6B4A]/25 transition-all overflow-hidden border border-white/30 cursor-pointer flex items-center justify-center gap-2',
                      children: [
                        (0, r.jsx)('span', {
                          className:
                            'absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out',
                        }),
                        s
                          ? (0, r.jsxs)('span', {
                              className: 'animate-pulse flex items-center gap-2',
                              children: [
                                (0, r.jsx)(rq, { className: 'w-4 h-4 text-[#FFF5C0] animate-spin' }),
                                'Opening Royal Invitation...',
                              ],
                            })
                          : (0, r.jsxs)(r.Fragment, {
                              children: [
                                (0, r.jsx)(rq, { className: 'w-4 h-4 text-[#FFF5C0]' }),
                                (0, r.jsx)('span', { children: 'Open Invitation' }),
                                (0, r.jsx)(rq, { className: 'w-4 h-4 text-[#FFF5C0]' }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    })
  },
  r5 = () =>
    (0, r.jsxs)('section', {
      id: 'hero',
      className:
        'relative min-h-screen flex flex-col items-center justify-between text-center px-6 pt-10 pb-8 overflow-hidden bg-[#8B6B4A] select-none',
      children: [
        (0, r.jsxs)('div', {
          className: 'absolute inset-0 z-0 pointer-events-none overflow-hidden',
          children: [
            (0, r.jsx)(rP.img, {
              initial: { scale: 1.15, opacity: 0 },
              animate: { scale: 1, opacity: 0.52 },
              transition: { duration: 2.5, ease: 'easeOut' },
              src: '/hero-couple.jpg',
              alt: 'Hero Background',
              className: 'w-full h-full object-cover object-[50%_35%]',
            }),
            (0, r.jsx)('div', {
              className:
                'absolute inset-0 bg-gradient-to-b from-[#8B6B4A]/80 via-[#7F6142]/70 to-[#73573A]/90 pointer-events-none',
            }),
          ],
        }),
        (0, r.jsx)('div', {
          className:
            'absolute inset-0 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0',
        }),
        (0, r.jsx)('div', {
          className: 'absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-25 text-white',
          children: (0, r.jsxs)('svg', {
            viewBox: '0 0 100 100',
            className: 'w-full h-full fill-current',
            children: [
              (0, r.jsx)('path', { d: 'M0,0 C30,10 50,30 60,60 C40,45 25,35 0,30 Z' }),
              (0, r.jsx)('path', { d: 'M0,15 C20,20 35,35 45,55 C30,40 15,30 0,25 Z' }),
              (0, r.jsx)('circle', { cx: '20', cy: '20', r: '2' }),
              (0, r.jsx)('circle', { cx: '35', cy: '15', r: '1.5' }),
              (0, r.jsx)('circle', { cx: '15', cy: '35', r: '1.5' }),
            ],
          }),
        }),
        (0, r.jsx)('div', {
          className:
            'absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-25 text-white transform scale-x-[-1]',
          children: (0, r.jsxs)('svg', {
            viewBox: '0 0 100 100',
            className: 'w-full h-full fill-current',
            children: [
              (0, r.jsx)('path', { d: 'M0,0 C30,10 50,30 60,60 C40,45 25,35 0,30 Z' }),
              (0, r.jsx)('path', { d: 'M0,15 C20,20 35,35 45,55 C30,40 15,30 0,25 Z' }),
              (0, r.jsx)('circle', { cx: '20', cy: '20', r: '2' }),
              (0, r.jsx)('circle', { cx: '35', cy: '15', r: '1.5' }),
              (0, r.jsx)('circle', { cx: '15', cy: '35', r: '1.5' }),
            ],
          }),
        }),
        (0, r.jsx)('div', {
          className:
            'absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-25 text-white transform scale-y-[-1]',
          children: (0, r.jsxs)('svg', {
            viewBox: '0 0 100 100',
            className: 'w-full h-full fill-current',
            children: [
              (0, r.jsx)('path', { d: 'M0,0 C30,10 50,30 60,60 C40,45 25,35 0,30 Z' }),
              (0, r.jsx)('path', { d: 'M0,15 C20,20 35,35 45,55 C30,40 15,30 0,25 Z' }),
              (0, r.jsx)('circle', { cx: '20', cy: '20', r: '2' }),
              (0, r.jsx)('circle', { cx: '35', cy: '15', r: '1.5' }),
              (0, r.jsx)('circle', { cx: '15', cy: '35', r: '1.5' }),
            ],
          }),
        }),
        (0, r.jsx)('div', {
          className:
            'absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-25 text-white transform scale-[-1]',
          children: (0, r.jsxs)('svg', {
            viewBox: '0 0 100 100',
            className: 'w-full h-full fill-current',
            children: [
              (0, r.jsx)('path', { d: 'M0,0 C30,10 50,30 60,60 C40,45 25,35 0,30 Z' }),
              (0, r.jsx)('path', { d: 'M0,15 C20,20 35,35 45,55 C30,40 15,30 0,25 Z' }),
              (0, r.jsx)('circle', { cx: '20', cy: '20', r: '2' }),
              (0, r.jsx)('circle', { cx: '35', cy: '15', r: '1.5' }),
              (0, r.jsx)('circle', { cx: '15', cy: '35', r: '1.5' }),
            ],
          }),
        }),
        (0, r.jsx)(rP.div, {
          initial: { opacity: 0, y: -15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: 'relative z-10 pt-2',
          children: (0, r.jsx)('span', {
            className: 'text-2xl font-calligraphy text-white tracking-widest block',
            children: 'A & A',
          }),
        }),
        (0, r.jsxs)(rP.div, {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 1, delay: 0.2 },
          className: 'relative z-10 my-auto flex flex-col items-center w-full max-w-xs',
          children: [
            (0, r.jsx)('p', {
              className:
                'text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-poppins text-white font-medium mb-8 text-center',
              children: 'BISMILLĀHIR RAḤMĀNIR RAḤĪM',
            }),
            (0, r.jsxs)('div', {
              className: 'flex flex-col items-center my-2',
              children: [
                (0, r.jsx)('h1', {
                  className:
                    'text-4xl sm:text-5xl font-playfair font-normal text-white tracking-wide leading-none drop-shadow-sm my-1',
                  children: rQ || 'Yusuf',
                }),
                (0, r.jsx)('span', {
                  className: 'text-3xl sm:text-4xl font-calligraphy text-white my-3.5 block italic',
                  children: '&',
                }),
                (0, r.jsx)('h1', {
                  className:
                    'text-4xl sm:text-5xl font-playfair font-normal text-white tracking-wide leading-none drop-shadow-sm my-1',
                  children: rJ || 'Amina',
                }),
              ],
            }),
            (0, r.jsx)('p', {
              className: 'text-2xl font-calligraphy text-white tracking-normal mt-5 mb-8',
              children: 'are getting married',
            }),
            (0, r.jsx)('div', {
              className: 'text-sm sm:text-base tracking-[0.35em] text-white font-medium font-poppins mb-2',
              children: '1 4 • 1 1 • 2 0 2 6',
            }),
          ],
        }),
        (0, r.jsxs)(rP.div, {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 1, delay: 0.8 },
          className: 'relative z-10 flex flex-col items-center gap-2 mt-4',
          children: [
            (0, r.jsx)(rP.span, {
              animate: { height: [24, 34, 24], opacity: [0.6, 1, 0.6] },
              transition: { duration: 2, repeat: 1 / 0, ease: 'easeInOut' },
              className: 'w-[1px] bg-gradient-to-b from-white to-transparent',
            }),
            (0, r.jsx)('span', {
              className: 'text-[9px] tracking-[0.35em] uppercase text-white font-poppins font-medium',
              children: 'S C R O L L',
            }),
          ],
        }),
      ],
    }),
  r4 = rY('clock', [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M12 6v6l4 2', key: 'mmk7yg' }],
  ]),
  r3 = () => {
    let [t, e] = (0, a.useState)({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    ;(0, a.useEffect)(() => {
      let t = new Date('2026-11-14T20:00:00+05:30').getTime(),
        i = () => {
          let i = t - new Date().getTime()
          i > 0
            ? e({
                days: Math.floor(i / 864e5),
                hours: Math.floor((i % 864e5) / 36e5),
                minutes: Math.floor((i % 36e5) / 6e4),
                seconds: Math.floor((i % 6e4) / 1e3),
              })
            : e({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      i()
      let s = setInterval(i, 1e3)
      return () => clearInterval(s)
    }, [])
    let i = [
      { label: 'Days', value: t.days },
      { label: 'Hours', value: t.hours },
      { label: 'Mins', value: t.minutes },
      { label: 'Secs', value: t.seconds },
    ]
    return (0, r.jsxs)(r.Fragment, {
      children: [
        (0, r.jsxs)('section', {
          id: 'countdown',
          className: 'pt-16 pb-12 px-5 relative z-10 bg-[transparent]',
          children: [
            (0, r.jsx)(rP.div, {
              initial: { opacity: 0, y: 45, scale: 0.93 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
              viewport: { once: !1, amount: 0.25 },
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
              className: 'w-full max-w-xs mx-auto',
              children: (0, r.jsxs)('div', {
                className:
                  'bg-[#06402B]/60 backdrop-blur-md/95 backdrop-blur-xl border border-[#B78846]/50 rounded-[28px] p-5 shadow-xl text-center',
                children: [
                  (0, r.jsxs)('p', {
                    className:
                      'text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-3.5 flex items-center justify-center gap-1.5 font-poppins',
                    children: [
                      (0, r.jsx)(r4, { className: 'w-3.5 h-3.5 text-[#B78846]' }),
                      (0, r.jsx)('span', { children: 'COUNTDOWN TO OUR UNION' }),
                    ],
                  }),
                  (0, r.jsx)('div', {
                    className: 'grid grid-cols-4 gap-2.5',
                    children: i.map((t) =>
                      (0, r.jsxs)(
                        'div',
                        {
                          className:
                            'bg-[transparent] border border-[rgba(212,175,55,0.3)] rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-inner',
                          children: [
                            (0, r.jsx)('span', {
                              className: 'text-2xl font-playfair font-bold text-[#D4AF37] tabular-nums',
                              children: String(t.value).padStart(2, '0'),
                            }),
                            (0, r.jsx)('span', {
                              className:
                                'text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 font-semibold mt-1 font-poppins',
                              children: t.label,
                            }),
                          ],
                        },
                        t.label,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, r.jsxs)('div', {
              className:
                'w-full max-w-xs mx-auto mt-14 mb-2 flex items-center justify-center gap-3 text-[#B78846]',
              children: [
                (0, r.jsx)('span', {
                  className: 'h-[1px] w-14 bg-gradient-to-r from-transparent to-[#B78846]/60',
                }),
                (0, r.jsx)(rG, { className: 'w-4 h-4 text-[#B78846]' }),
                (0, r.jsx)('span', {
                  className: 'h-[1px] w-14 bg-gradient-to-l from-transparent to-[#B78846]/60',
                }),
              ],
            }),
          ],
        }),
        (0, r.jsx)('section', {
          id: 'greeting',
          className: 'pt-10 pb-20 px-5 relative z-10 bg-[transparent]',
          children: (0, r.jsx)(rP.div, {
            initial: { opacity: 0, y: 50, scale: 0.93 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: !1, amount: 0.25 },
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            className: 'w-full max-w-xs mx-auto',
            children: (0, r.jsxs)('div', {
              className:
                'relative bg-[#06402B]/60 backdrop-blur-md/95 border-2 border-[#B78846]/60 rounded-[28px] p-7 shadow-2xl overflow-hidden text-center flex flex-col items-center',
              children: [
                (0, r.jsx)('div', {
                  className: 'absolute top-2.5 left-2.5 text-[rgba(212,175,55,0.3)] opacity-70',
                  children: (0, r.jsx)(rG, { className: 'w-6 h-6 rotate-45' }),
                }),
                (0, r.jsx)('div', {
                  className: 'absolute top-2.5 right-2.5 text-[rgba(212,175,55,0.3)] opacity-70',
                  children: (0, r.jsx)(rG, { className: 'w-6 h-6 -rotate-45' }),
                }),
                (0, r.jsx)('div', {
                  className: 'absolute bottom-2.5 left-2.5 text-[rgba(212,175,55,0.3)] opacity-70',
                  children: (0, r.jsx)(rG, { className: 'w-6 h-6 -rotate-135' }),
                }),
                (0, r.jsx)('div', {
                  className: 'absolute bottom-2.5 right-2.5 text-[rgba(212,175,55,0.3)] opacity-70',
                  children: (0, r.jsx)(rG, { className: 'w-6 h-6 rotate-135' }),
                }),
                (0, r.jsxs)('div', {
                  className:
                    'inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[transparent] border border-[rgba(212,175,55,0.3)] text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-6 font-poppins',
                  children: [
                    (0, r.jsx)(rq, { className: 'w-3 h-3 text-[#B78846]' }),
                    (0, r.jsx)('span', { children: 'DIVINE BLESSING' }),
                  ],
                }),
                (0, r.jsx)('h2', {
                  className: 'text-2xl font-calligraphy text-[#D4AF37] leading-relaxed drop-shadow-sm mb-1',
                  children: r0,
                }),
                (0, r.jsx)('p', {
                  className:
                    'text-[10px] uppercase tracking-wider text-[#D4AF37]/60 font-poppins mb-6 italic',
                  children: 'Bismillahir Rahmanir Raheem',
                }),
                (0, r.jsx)('div', {
                  className:
                    'w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B78846] to-transparent mb-6',
                }),
                (0, r.jsx)('h3', {
                  className: 'text-sm font-playfair font-bold text-[#D4AF37] mb-3 tracking-wide',
                  children: 'Assalamu Alaikum wa Rahmatullahi wa Barakatuh',
                }),
                (0, r.jsx)('p', {
                  className: 'text-xs text-[#1A1A1A]/80 font-poppins leading-relaxed mb-6 font-light',
                  children:
                    'All praise is due to Allah, who created us in pairs so that we may find tranquility in one another. With the blessings and prayers of our beloved parents, we joyfully invite you to share in our happiness as we unite in holy matrimony.',
                }),
                (0, r.jsxs)('div', {
                  className:
                    'w-full bg-[transparent]/80 border border-[rgba(212,175,55,0.3)] rounded-2xl p-4 mt-1 relative',
                  children: [
                    (0, r.jsx)('p', {
                      className: 'text-sm font-calligraphy text-[#D4AF37] leading-relaxed mb-2',
                      children:
                        'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
                    }),
                    (0, r.jsxs)('p', {
                      className: 'text-[11px] font-playfair italic text-[#1A1A1A]/75 leading-relaxed mb-2',
                      children: [
                        '"',
                        'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
                        '"',
                      ],
                    }),
                    (0, r.jsxs)('span', {
                      className:
                        'text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block font-poppins',
                      children: ['— ', 'Surah Ar-Rum [30:21]'],
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    })
  },
  r6 = () =>
    (0, r.jsx)('section', {
      id: 'couple',
      className: 'py-16 px-4 relative z-10 bg-[transparent] text-center overflow-hidden',
      children: (0, r.jsxs)('div', {
        className: 'w-full max-w-xs mx-auto',
        children: [
          (0, r.jsxs)(rP.div, {
            initial: { opacity: 0, y: 35 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.7, ease: 'easeOut' },
            className: 'mb-6',
            children: [
              (0, r.jsx)('span', {
                className:
                  'text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-1.5 font-poppins',
                children: 'THE BLESSED COUPLE',
              }),
              (0, r.jsx)('h2', {
                className: 'text-3xl font-playfair font-bold text-[#D4AF37] mb-4',
                children: 'Groom & Bride',
              }),
              (0, r.jsxs)('div', {
                className: 'flex items-center justify-center gap-3 text-[#B78846] mb-6',
                children: [
                  (0, r.jsx)('span', {
                    className: 'h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B78846]',
                  }),
                  (0, r.jsx)(rG, { className: 'w-4 h-4 text-[#B78846]' }),
                  (0, r.jsx)('span', {
                    className: 'h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B78846]',
                  }),
                ],
              }),
            ],
          }),
          (0, r.jsx)(rP.div, {
            initial: { opacity: 0, y: 45, scale: 0.9 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: !1, amount: 0.25 },
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            className:
              'w-full max-w-[240px] mx-auto bg-[#FFFDF9] p-2.5 rounded-[28px] border-2 border-[#B78846]/50 shadow-xl mb-5 relative overflow-hidden group',
            children: (0, r.jsxs)('div', {
              className:
                'w-full h-[310px] rounded-[22px] overflow-hidden relative border border-[rgba(212,175,55,0.3)]',
              children: [
                (0, r.jsx)('img', {
                  src: '/couple-section.jpg',
                  alt: 'Amina & Yusuf',
                  className:
                    'w-full h-full object-cover object-[50%_35%] group-hover:scale-105 transition-transform duration-700',
                  loading: 'lazy',
                }),
                (0, r.jsx)('div', {
                  className:
                    'absolute inset-0 bg-gradient-to-t from-[#D4AF37]/30 via-transparent to-transparent pointer-events-none',
                }),
              ],
            }),
          }),
          (0, r.jsx)(rP.div, {
            initial: { opacity: 0, y: 25 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
            className: 'mb-6',
            children: (0, r.jsx)('p', {
              className: 'text-2xl sm:text-3xl font-calligraphy text-[#D4AF37]',
              children: 'Arish & Arshi',
            }),
          }),
          (0, r.jsxs)(rP.div, {
            initial: { opacity: 0, scale: 0.8 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.6 },
            className: 'flex items-center justify-center gap-3 text-[#B78846] mb-8',
            children: [
              (0, r.jsx)('span', {
                className: 'h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B78846]',
              }),
              (0, r.jsx)(rG, { className: 'w-4 h-4 text-[#B78846]' }),
              (0, r.jsx)('span', {
                className: 'h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B78846]',
              }),
            ],
          }),
          (0, r.jsxs)('div', {
            className: 'grid grid-cols-2 gap-3 text-center',
            children: [
              (0, r.jsxs)(rP.div, {
                initial: { opacity: 0, x: -35, y: 25 },
                whileInView: { opacity: 1, x: 0, y: 0 },
                viewport: { once: !1, amount: 0.2 },
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                className:
                  'bg-[#F4ECE6] border border-[rgba(212,175,55,0.3)] rounded-[24px] p-4 shadow-md flex flex-col items-center justify-center',
                children: [
                  (0, r.jsx)('span', {
                    className:
                      'text-[8px] uppercase tracking-[0.2em] text-[#6A859C] font-bold mb-1.5 font-poppins',
                    children: "GROOM'S FAMILY",
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-xl font-calligraphy text-[#D47E84] mb-2',
                    children: 'Arish',
                  }),
                  (0, r.jsx)('span', {
                    className:
                      'text-[7px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold mb-1 font-poppins',
                    children: 'SON OF',
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-[11px] font-playfair text-[#D4AF37] font-medium leading-tight',
                    children: 'Lt. Rafat Aslam Siddiqui',
                  }),
                ],
              }),
              (0, r.jsxs)(rP.div, {
                initial: { opacity: 0, x: 35, y: 25 },
                whileInView: { opacity: 1, x: 0, y: 0 },
                viewport: { once: !1, amount: 0.2 },
                transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                className:
                  'bg-[#F4ECE6] border border-[rgba(212,175,55,0.3)] rounded-[24px] p-4 shadow-md flex flex-col items-center justify-center',
                children: [
                  (0, r.jsx)('span', {
                    className:
                      'text-[8px] uppercase tracking-[0.2em] text-[#6A859C] font-bold mb-1.5 font-poppins',
                    children: "BRIDE'S FAMILY",
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-xl font-calligraphy text-[#D47E84] mb-2',
                    children: 'Arshi',
                  }),
                  (0, r.jsx)('span', {
                    className:
                      'text-[7px] uppercase tracking-widest text-[#D4AF37]/70 font-semibold mb-1 font-poppins',
                    children: 'DAUGHTER OF',
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-[11px] font-playfair text-[#D4AF37] font-medium leading-tight',
                    children: 'Lt. Shahjahan Khan',
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-[10px] text-[#B78846] italic my-0.5',
                    children: '&',
                  }),
                  (0, r.jsx)('span', {
                    className: 'text-[11px] font-playfair text-[#D4AF37] font-medium leading-tight',
                    children: 'Mrs. Jaharan Khan',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  r8 = rY('calendar', [
    ['path', { d: 'M8 2v4', key: '1cmpym' }],
    ['path', { d: 'M16 2v4', key: '4m81vk' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
    ['path', { d: 'M3 10h18', key: '8toen8' }],
  ]),
  r7 = rY('map-pin', [
    [
      'path',
      {
        d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
        key: '1r0f0z',
      },
    ],
    ['circle', { cx: '12', cy: '10', r: '3', key: 'ilqhr7' }],
  ]),
  r9 = rY('navigation', [['polygon', { points: '3 11 22 2 13 21 11 13 3 11', key: '1ltx0t' }]]),
  at = rY('heart-handshake', [
    [
      'path',
      {
        d: 'M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762',
        key: '17lmqv',
      },
    ],
  ]),
  ae = () =>
    (0, r.jsx)('section', {
      id: 'events',
      className: 'py-16 px-5 relative z-10 bg-[#F8F4EF]',
      children: (0, r.jsxs)('div', {
        className: 'w-full max-w-xs mx-auto',
        children: [
          (0, r.jsxs)(rP.div, {
            initial: { opacity: 0, y: 25 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.7, ease: 'easeOut' },
            className: 'text-center mb-10',
            children: [
              (0, r.jsxs)('div', {
                className:
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D7C9] text-[10px] uppercase tracking-widest text-[#8B6B4A] font-semibold mb-2 shadow-sm',
                children: [
                  (0, r.jsx)(rq, { className: 'w-3 h-3 text-[#C4A484]' }),
                  (0, r.jsx)('span', { children: 'SACRED CELEBRATIONS' }),
                ],
              }),
              (0, r.jsx)('h2', {
                className: 'text-3xl font-playfair font-bold text-[#8B6B4A]',
                children: 'Event Details',
              }),
              (0, r.jsx)('p', {
                className: 'text-xs text-[#8B6B4A]/70 font-poppins mt-1',
                children: 'We eagerly await your gracious presence',
              }),
              (0, r.jsx)('div', { className: 'w-12 h-0.5 bg-[#C4A484] mx-auto mt-3' }),
            ],
          }),
          (0, r.jsx)('div', {
            className: 'flex flex-col gap-7',
            children: r1.map((t, e) =>
              (0, r.jsxs)(
                rP.div,
                {
                  initial: { opacity: 0, y: 45, scale: 0.94 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: { once: !1, amount: 0.25 },
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  className:
                    'bg-white border border-[#E7D7C9] rounded-[24px] p-6 shadow-xl relative overflow-hidden group',
                  children: [
                    (0, r.jsx)('div', {
                      className:
                        'absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C4A484] via-[#8B6B4A] to-[#C4A484]',
                    }),
                    (0, r.jsxs)('div', {
                      className: 'flex items-center justify-between mb-4 mt-1',
                      children: [
                        (0, r.jsx)('span', {
                          className:
                            'text-[10px] uppercase tracking-widest text-white px-3 py-1 rounded-full bg-[#8B6B4A] font-semibold',
                          children: t.subtitle || 'Celebration',
                        }),
                        (0, r.jsx)('div', {
                          className:
                            'w-9 h-9 rounded-full bg-[#F8F4EF] border border-[#E7D7C9] flex items-center justify-center text-[#8B6B4A]',
                          children:
                            'HeartHandshake' === t.icon
                              ? (0, r.jsx)(at, { className: 'w-4 h-4' })
                              : (0, r.jsx)(rq, { className: 'w-4 h-4' }),
                        }),
                      ],
                    }),
                    (0, r.jsx)('h3', {
                      className: 'text-xl font-playfair font-bold text-[#8B6B4A] mb-3',
                      children: t.title,
                    }),
                    (0, r.jsxs)('div', {
                      className:
                        'flex flex-col gap-2.5 my-4 bg-[#F8F4EF] p-3.5 rounded-2xl border border-[#E7D7C9]/60',
                      children: [
                        (0, r.jsxs)('div', {
                          className: 'flex items-center gap-3 text-xs font-poppins text-[#1A1A1A]',
                          children: [
                            (0, r.jsx)(r8, { className: 'w-4 h-4 text-[#C4A484] shrink-0' }),
                            (0, r.jsx)('span', { className: 'font-medium', children: t.date }),
                          ],
                        }),
                        (0, r.jsxs)('div', {
                          className: 'flex items-center gap-3 text-xs font-poppins text-[#1A1A1A]',
                          children: [
                            (0, r.jsx)(r4, { className: 'w-4 h-4 text-[#C4A484] shrink-0' }),
                            (0, r.jsx)('span', { className: 'font-medium', children: t.time }),
                          ],
                        }),
                        (0, r.jsxs)('div', {
                          className: 'flex items-start gap-3 text-xs font-poppins text-[#1A1A1A]',
                          children: [
                            (0, r.jsx)(r7, { className: 'w-4 h-4 text-[#C4A484] shrink-0 mt-0.5' }),
                            (0, r.jsxs)('div', {
                              children: [
                                (0, r.jsx)('span', {
                                  className: 'font-semibold block text-[#8B6B4A]',
                                  children: t.location,
                                }),
                                t.address &&
                                  (0, r.jsx)('span', {
                                    className: 'text-[11px] text-[#1A1A1A]/70 leading-relaxed block',
                                    children: t.address,
                                  }),
                              ],
                            }),
                          ],
                        }),
                        t.dressCode &&
                          (0, r.jsxs)('div', {
                            className:
                              'flex items-center gap-3 text-xs font-poppins text-[#1A1A1A] mt-1 pt-2 border-t border-[#E7D7C9]/40',
                            children: [
                              (0, r.jsx)(rq, { className: 'w-4 h-4 text-[#C4A484] shrink-0' }),
                              (0, r.jsxs)('span', {
                                className: 'font-medium text-[#8B6B4A]',
                                children: [
                                  'Dress Code: ',
                                  (0, r.jsx)('span', {
                                    className: 'font-normal text-[#1A1A1A]/80',
                                    children: t.dressCode,
                                  }),
                                ],
                              }),
                            ],
                          }),
                      ],
                    }),
                    (0, r.jsx)('p', {
                      className: 'text-xs text-[#1A1A1A]/75 font-poppins leading-relaxed mb-6 font-light',
                      children: t.description,
                    }),
                    (0, r.jsxs)('a', {
                      href: t.mapsUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className:
                        'w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#8B6B4A] to-[#C4A484] text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all group-hover:scale-[1.01]',
                      children: [
                        (0, r.jsx)(r9, { className: 'w-3.5 h-3.5' }),
                        (0, r.jsx)('span', { children: 'Open in Google Maps' }),
                      ],
                    }),
                  ],
                },
                t.id,
              ),
            ),
          }),
        ],
      }),
    }),
  ai = rY('building-2', [
    ['path', { d: 'M10 12h4', key: 'a56b0p' }],
    ['path', { d: 'M10 8h4', key: '1sr2af' }],
    ['path', { d: 'M14 21v-3a2 2 0 0 0-4 0v3', key: '1rgiei' }],
    [
      'path',
      { d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2', key: 'secmi2' },
    ],
    ['path', { d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', key: '16ra0t' }],
  ]),
  as = [
    {
      id: 'beginning',
      label: 'THE BEGINNING',
      title: 'Two Families, One Dua',
      description:
        'What Allah has decreed shall always come to pass. Two families, bound by faith and love, came together in prayer.',
      icon: 'heart',
      side: 'right',
    },
    {
      id: 'promise',
      label: 'THE PROMISE',
      title: 'Istikhara & Acceptance',
      description: "Guided by Allah's wisdom, both hearts found peace and acceptance in this blessed union.",
      icon: 'ring',
      side: 'left',
    },
    {
      id: 'nikah',
      label: '25 DECEMBER 2026',
      title: 'The Sacred Nikah',
      description:
        'With the words of Allah as their bond and their families as witnesses, Amina and Yusuf begin their forever.',
      icon: 'mosque',
      side: 'right',
    },
  ],
  an = ({ icon: t, side: e }) =>
    (0, r.jsxs)('div', {
      className:
        'w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#B78846] bg-[#06402B]/60 backdrop-blur-md text-[#D4AF37] shrink-0',
      children: [
        'heart' === t && (0, r.jsx)(rX, { className: 'w-5 h-5 fill-[#B78846] text-[#B78846]' }),
        'ring' === t && (0, r.jsx)(rq, { className: 'w-5 h-5 text-[#D4AF37]' }),
        'mosque' === t && (0, r.jsx)(ai, { className: 'w-5 h-5 text-[#D4AF37]' }),
      ],
    }),
  ar = () =>
    (0, r.jsx)('section', {
      id: 'story',
      className: 'py-16 px-5 relative z-10 bg-[transparent]',
      children: (0, r.jsxs)('div', {
        className: 'w-full max-w-xs mx-auto',
        children: [
          (0, r.jsxs)(rP.div, {
            initial: { opacity: 0, y: 35 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.7, ease: 'easeOut' },
            className: 'text-center mb-12',
            children: [
              (0, r.jsxs)('div', {
                className:
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06402B]/60 backdrop-blur-md border border-[rgba(212,175,55,0.3)] text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2 shadow-sm',
                children: [
                  (0, r.jsx)(rq, { className: 'w-3 h-3 text-[#B78846]' }),
                  (0, r.jsx)('span', { children: 'OUR JOURNEY' }),
                ],
              }),
              (0, r.jsx)('h2', {
                className: 'text-3xl font-playfair font-bold text-[#D4AF37]',
                children: 'Our Story',
              }),
              (0, r.jsx)('p', {
                className: 'text-xs text-[#D4AF37]/70 font-poppins mt-1',
                children: 'How Allah brought our paths together',
              }),
              (0, r.jsx)('div', { className: 'w-12 h-0.5 bg-[#B78846] mx-auto mt-3' }),
            ],
          }),
          (0, r.jsxs)('div', {
            className: 'relative',
            children: [
              (0, r.jsx)('div', {
                className: 'absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#B78846]/30',
              }),
              (0, r.jsx)('div', {
                className: 'flex flex-col gap-0',
                children: as.map((t, e) => {
                  let i = 'right' === t.side
                  return (0, r.jsxs)(
                    rP.div,
                    {
                      initial: { opacity: 0, y: 40, scale: 0.94 },
                      whileInView: { opacity: 1, y: 0, scale: 1 },
                      viewport: { once: !1, amount: 0.25 },
                      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                      className: 'relative flex items-start pb-12 last:pb-0',
                      children: [
                        (0, r.jsx)('div', {
                          className: 'flex-1 pr-6 text-right',
                          children:
                            !i &&
                            (0, r.jsxs)('div', {
                              children: [
                                (0, r.jsx)('span', {
                                  className:
                                    'text-[9px] uppercase tracking-[0.2em] text-[#B78846] font-bold font-poppins block mb-1',
                                  children: t.label,
                                }),
                                (0, r.jsx)('h3', {
                                  className:
                                    'text-base font-playfair font-bold text-[#D4AF37] leading-snug mb-1.5',
                                  children: t.title,
                                }),
                                (0, r.jsx)('p', {
                                  className:
                                    'text-[11px] text-[#1A1A1A]/70 font-poppins font-light leading-relaxed',
                                  children: t.description,
                                }),
                              ],
                            }),
                        }),
                        (0, r.jsx)('div', {
                          className: 'relative z-10 shrink-0',
                          children: (0, r.jsx)(an, { icon: t.icon, side: t.side }),
                        }),
                        (0, r.jsx)('div', {
                          className: 'flex-1 pl-6 text-left',
                          children:
                            i &&
                            (0, r.jsxs)('div', {
                              children: [
                                (0, r.jsx)('span', {
                                  className:
                                    'text-[9px] uppercase tracking-[0.2em] text-[#B78846] font-bold font-poppins block mb-1',
                                  children: t.label,
                                }),
                                (0, r.jsx)('h3', {
                                  className:
                                    'text-base font-playfair font-bold text-[#D4AF37] leading-snug mb-1.5',
                                  children: t.title,
                                }),
                                (0, r.jsx)('p', {
                                  className:
                                    'text-[11px] text-[#1A1A1A]/70 font-poppins font-light leading-relaxed',
                                  children: t.description,
                                }),
                              ],
                            }),
                        }),
                      ],
                    },
                    t.id,
                  )
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  aa = rY('message-square-heart', [
    [
      'path',
      {
        d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
        key: '18887p',
      },
    ],
    [
      'path',
      {
        d: 'M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5',
        key: '1faxuh',
      },
    ],
  ]),
  ao = rY('circle-plus', [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M8 12h8', key: '1wcyev' }],
    ['path', { d: 'M12 8v8', key: 'napkw2' }],
  ]),
  al = () => {
    let [t, e] = (0, a.useState)([]),
      [i, s] = (0, a.useState)(''),
      [n, o] = (0, a.useState)('Guest'),
      [l, h] = (0, a.useState)(''),
      [c, u] = (0, a.useState)(!1),
      [d, p] = (0, a.useState)([]),
      [m, f] = (0, a.useState)(!1),
      x = async (r) => {
        if ((r.preventDefault(), !i.trim() || !l.trim() || m)) return
        f(!0)
        let a = i.trim(),
          o = n.trim() || 'Guest',
          c = l.trim(),
          d = encodeURIComponent(`Wedding Wish from ${a} (${o}):

${c}`)
        ;(window.open(`https://wa.me/918075988090?text=${d}`, '_blank'),
          e([
            { id: `w-${Date.now()}`, name: a, relation: o, message: c, timestamp: 'Just now', likes: 1 },
            ...t,
          ]),
          s(''),
          h(''),
          f(!1),
          u(!1))
        try {
          rK({
            particleCount: 130,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#C4A484', '#8B6B4A', '#D4AF37', '#10B981'],
          })
        } catch (t) {
          console.log('Confetti triggered')
        }
      }
    return (0, r.jsx)('section', {
      id: 'wishes',
      className: 'py-16 px-5 relative z-10 bg-[#F8F4EF]',
      children: (0, r.jsxs)('div', {
        className: 'w-full max-w-xs mx-auto',
        children: [
          (0, r.jsxs)(rP.div, {
            initial: { opacity: 0, y: 35 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !1, amount: 0.3 },
            transition: { duration: 0.7, ease: 'easeOut' },
            className: 'text-center mb-8',
            children: [
              (0, r.jsxs)('div', {
                className:
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7D7C9] text-[10px] uppercase tracking-widest text-[#8B6B4A] font-semibold mb-2 shadow-sm',
                children: [
                  (0, r.jsx)(rq, { className: 'w-3 h-3 text-[#C4A484]' }),
                  (0, r.jsx)('span', { children: 'WORDS OF BLESSING' }),
                ],
              }),
              (0, r.jsx)('h2', {
                className: 'text-3xl font-playfair font-bold text-[#8B6B4A]',
                children: 'Guest Wishes',
              }),
              (0, r.jsx)('p', {
                className: 'text-xs text-[#8B6B4A]/70 font-poppins mt-1',
                children: 'Send your heartfelt prayers & wishes',
              }),
              (0, r.jsx)('div', { className: 'w-12 h-0.5 bg-[#C4A484] mx-auto mt-3' }),
            ],
          }),
          (0, r.jsx)('div', {
            className: 'mb-8',
            children: c
              ? (0, r.jsxs)(rP.form, {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.95 },
                  onSubmit: x,
                  className: 'bg-white border-2 border-[#C4A484] rounded-[24px] p-5 shadow-2xl',
                  children: [
                    (0, r.jsx)('h3', {
                      className: 'text-sm font-playfair font-bold text-[#8B6B4A] mb-1 text-center',
                      children: 'Leave Your Blessing',
                    }),
                    (0, r.jsx)('p', {
                      className: 'text-[10px] text-[#8B6B4A]/70 text-center font-poppins mb-3',
                      children: 'Your message will be sent via WhatsApp',
                    }),
                    (0, r.jsx)('input', {
                      type: 'text',
                      placeholder: 'Your Name (e.g. Uncle Rashid)',
                      value: i,
                      onChange: (t) => s(t.target.value),
                      required: !0,
                      disabled: m,
                      className:
                        'w-full text-xs p-2.5 rounded-xl border border-[#E7D7C9] bg-[#F8F4EF] mb-2.5 outline-none focus:border-[#8B6B4A] disabled:opacity-50',
                    }),
                    (0, r.jsxs)('select', {
                      value: n,
                      onChange: (t) => o(t.target.value),
                      disabled: m,
                      className:
                        'w-full text-xs p-2.5 rounded-xl border border-[#E7D7C9] bg-[#F8F4EF] mb-2.5 outline-none focus:border-[#8B6B4A] text-[#8B6B4A] disabled:opacity-50',
                      children: [
                        (0, r.jsx)('option', { value: 'Family', children: 'Family Member' }),
                        (0, r.jsx)('option', { value: 'Close Friend', children: 'Close Friend' }),
                        (0, r.jsx)('option', { value: 'Colleague', children: 'Colleague' }),
                        (0, r.jsx)('option', { value: 'Well Wisher', children: 'Well Wisher' }),
                      ],
                    }),
                    (0, r.jsx)('textarea', {
                      placeholder: 'Write your heartfelt wish or prayer...',
                      value: l,
                      onChange: (t) => h(t.target.value),
                      required: !0,
                      rows: 3,
                      disabled: m,
                      className:
                        'w-full text-xs p-2.5 rounded-xl border border-[#E7D7C9] bg-[#F8F4EF] mb-3 outline-none focus:border-[#8B6B4A] disabled:opacity-50',
                    }),
                    (0, r.jsxs)('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        (0, r.jsx)('button', {
                          type: 'button',
                          onClick: () => u(!1),
                          disabled: m,
                          className:
                            'flex-1 py-2.5 rounded-xl border border-[#E7D7C9] text-[#8B6B4A] text-xs font-semibold cursor-pointer disabled:opacity-50',
                          children: 'Cancel',
                        }),
                        (0, r.jsx)('button', {
                          type: 'submit',
                          disabled: m,
                          className:
                            'flex-1 py-2.5 rounded-xl bg-[#8B6B4A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50',
                          children: m
                            ? (0, r.jsxs)(r.Fragment, {
                                children: [
                                  (0, r.jsx)(rq, { className: 'w-3.5 h-3.5 animate-spin' }),
                                  (0, r.jsx)('span', { children: 'Sending...' }),
                                ],
                              })
                            : (0, r.jsxs)(r.Fragment, {
                                children: [
                                  (0, r.jsx)(aa, { className: 'w-3.5 h-3.5' }),
                                  (0, r.jsx)('span', { children: 'Send via WhatsApp' }),
                                ],
                              }),
                        }),
                      ],
                    }),
                  ],
                })
              : (0, r.jsxs)('button', {
                  onClick: () => u(!0),
                  className:
                    'w-full py-3.5 rounded-full bg-gradient-to-r from-[#8B6B4A] to-[#C4A484] text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer',
                  children: [
                    (0, r.jsx)(ao, { className: 'w-4 h-4' }),
                    (0, r.jsx)('span', { children: 'Send a Blessing' }),
                  ],
                }),
          }),
          (0, r.jsx)('div', {
            className: 'flex flex-col gap-4',
            children: (0, r.jsx)(rO, {
              children: t.map((i, s) =>
                (0, r.jsxs)(
                  rP.div,
                  {
                    initial: { opacity: 0, y: 35, scale: 0.94 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: !1, amount: 0.2 },
                    exit: { opacity: 0, scale: 0.9 },
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                    className:
                      'bg-white border border-[#E7D7C9] rounded-[24px] p-5 shadow-xl relative overflow-hidden',
                    children: [
                      (0, r.jsx)('div', {
                        className:
                          'absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#C4A484] to-[#8B6B4A]',
                      }),
                      (0, r.jsxs)('div', {
                        className: 'flex justify-between items-start mb-2 pl-2',
                        children: [
                          (0, r.jsx)('div', {
                            children: (0, r.jsxs)('h4', {
                              className:
                                'text-sm font-playfair font-bold text-[#8B6B4A] flex items-center gap-1.5',
                              children: [
                                i.name,
                                (0, r.jsx)('span', {
                                  className:
                                    'text-[10px] font-poppins font-normal text-[#C4A484] bg-[#F8F4EF] px-2 py-0.5 rounded-full border border-[#E7D7C9]',
                                  children: i.relation,
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsx)('span', {
                            className: 'text-[10px] font-poppins text-[#8B6B4A]/60',
                            children: i.timestamp,
                          }),
                        ],
                      }),
                      (0, r.jsxs)('p', {
                        className: 'text-xs font-playfair italic text-[#8B6B4A]/90 leading-relaxed pl-2 mb-3',
                        children: ['"', i.message, '"'],
                      }),
                      (0, r.jsx)('div', {
                        className: 'flex justify-end pl-2',
                        children: (0, r.jsxs)('button', {
                          onClick: () => {
                            var s
                            return (
                              (s = i.id),
                              void (d.includes(s)
                                ? (p(d.filter((t) => t !== s)),
                                  e(
                                    t.map((t) =>
                                      t.id === s ? { ...t, likes: Math.max(0, t.likes - 1) } : t,
                                    ),
                                  ))
                                : (p([...d, s]),
                                  e(t.map((t) => (t.id === s ? { ...t, likes: t.likes + 1 } : t)))))
                            )
                          },
                          className: `flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-poppins transition-all cursor-pointer ${d.includes(i.id) ? 'bg-[#8B6B4A] text-white shadow-sm scale-105' : 'bg-[#F8F4EF] text-[#8B6B4A] hover:bg-[#E7D7C9]/40 border border-[#E7D7C9]'}`,
                          children: [
                            (0, r.jsx)(rX, {
                              className: `w-3.5 h-3.5 ${d.includes(i.id) ? 'fill-white text-white' : 'text-[#C4A484]'}`,
                            }),
                            (0, r.jsx)('span', { children: i.likes }),
                          ],
                        }),
                      }),
                    ],
                  },
                  i.id,
                ),
              ),
            }),
          }),
        ],
      }),
    })
  },
  ah = () =>
    (0, r.jsx)('footer', {
      id: 'closing',
      className:
        'py-16 px-5 pb-24 relative z-10 bg-[transparent] text-center border-t border-[rgba(212,175,55,0.3)]/60 overflow-hidden',
      children: (0, r.jsxs)(rP.div, {
        initial: { opacity: 0, y: 40, scale: 0.94 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: !1, amount: 0.25 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        className: 'w-full max-w-xs mx-auto flex flex-col items-center',
        children: [
          (0, r.jsx)(rP.div, {
            animate: { rotate: [0, 8, -8, 0] },
            transition: { duration: 7, repeat: 1 / 0, ease: 'easeInOut' },
            className:
              'w-16 h-16 rounded-full bg-[#06402B]/60 backdrop-blur-md border border-[#B78846]/40 shadow-md flex items-center justify-center mb-6 text-[#D4AF37]',
            children: (0, r.jsx)(rG, { className: 'w-8 h-8' }),
          }),
          (0, r.jsx)('h2', {
            className: 'text-2xl font-playfair font-bold text-[#D4AF37] mb-3',
            children: 'Thank You & Salam',
          }),
          (0, r.jsx)('p', {
            className: 'text-xs text-[#1A1A1A]/80 font-poppins leading-relaxed mb-6 font-light',
            children:
              'We look forward to celebrating this sacred milestone with you. May Allah shower our families with affection, understanding, and eternal peace.',
          }),
          (0, r.jsxs)('div', {
            className:
              'w-full bg-[#06402B]/60 backdrop-blur-md border border-[rgba(212,175,55,0.3)] rounded-[24px] p-5 shadow-lg mb-8 relative',
            children: [
              (0, r.jsx)('span', {
                className:
                  'text-[10px] uppercase tracking-widest text-[#B78846] font-bold block mb-2 font-poppins',
                children: 'A Prayer For The Couple',
              }),
              (0, r.jsx)('p', {
                className: 'text-xs font-playfair italic text-[#D4AF37] leading-relaxed',
                children: '"Barakallahu lakuma wa baraka alaikuma wa jama\'a baynakuma fi khair."',
              }),
              (0, r.jsx)('span', {
                className: 'text-[10px] text-[#1A1A1A]/60 font-poppins mt-2 block',
                children: '(May Allah bless you both and join you together in goodness.)',
              }),
            ],
          }),
          (0, r.jsxs)('div', {
            className: 'flex items-center gap-2 text-[#D4AF37] font-calligraphy text-2xl my-2',
            children: [
              (0, r.jsx)('span', { children: 'Arish' }),
              (0, r.jsx)(rX, { className: 'w-4 h-4 fill-[#B78846] text-[#B78846]' }),
              (0, r.jsx)('span', { children: 'Arshi' }),
            ],
          }),
          (0, r.jsx)('p', {
            className: 'text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 font-poppins mt-2',
            children: '14 NOVEMBER 2026 • BHOPAL',
          }),
        ],
      }),
    }),
  ac = ({ audioUrl: t, hasEntered: e }) => {
    let [i, s] = (0, a.useState)(!1),
      [n, o] = (0, a.useState)(0),
      l = (0, a.useRef)(null)
    return ((0, a.useEffect)(() => {
      {
        let e = new Audio(t)
        ;((e.loop = !0),
          (e.volume = 0.5),
          (e.onerror = () => {
            e.src.includes('.m4a')
              ? (e.src = '/wedding-muhammad-al-muqit.mp3')
              : e.src.includes('/wedding-muhammad-al-muqit.wav') || (e.src = '/wedding-muhammad-al-muqit.wav')
          }),
          (l.current = e))
      }
      return () => {
        l.current && l.current.pause()
      }
    }, [t]),
    (0, a.useEffect)(() => {
      e &&
        l.current &&
        l.current.paused &&
        !i &&
        l.current
          .play()
          .then(() => s(!0))
          .catch(() => {
            console.log('Audio autoplay prevented by browser policy')
          })
    }, [e, i]),
    (0, a.useEffect)(() => {
      let t = () => {
        let t = document.documentElement.scrollHeight - window.innerHeight
        t > 0 && o((window.scrollY / t) * 100)
      }
      return (window.addEventListener('scroll', t), () => window.removeEventListener('scroll', t))
    }, []),
    e)
      ? (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)('div', {
              className:
                'sticky top-0 left-0 right-0 z-50 h-1.5 w-full bg-[#E7D7C9]/40 backdrop-blur-sm overflow-hidden',
              children: (0, r.jsx)('div', {
                className:
                  'h-full bg-gradient-to-r from-[#C4A484] via-[#8B6B4A] to-[#D4AF37] transition-all duration-150 ease-out',
                style: { width: `${n}%` },
              }),
            }),
            (0, r.jsx)('div', {
              className: 'fixed bottom-6 right-6 z-40 flex items-center pointer-events-auto',
              children: (0, r.jsx)('button', {
                onClick: (t) => {
                  ;(t.stopPropagation(),
                    l.current &&
                      (i
                        ? (l.current.pause(), s(!1))
                        : l.current
                            .play()
                            .then(() => s(!0))
                            .catch((t) => console.error('Playback error:', t))))
                },
                'aria-label': i ? 'Mute Background Music' : 'Play Background Music',
                title: i ? 'Music Playing (Click to mute)' : 'Click to play Arabic music',
                className: `w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border-2 active:scale-90 cursor-pointer ${i ? 'bg-[#8B6B4A] border-[#EAD0B1] shadow-[#8B6B4A]/50 ring-4 ring-[#C4A484]/30 scale-105' : 'bg-[#8B6B4A]/90 border-[#C4A484]/60 hover:bg-[#8B6B4A] opacity-90'}`,
                style: { width: '52px', height: '52px' },
                children: i
                  ? (0, r.jsx)('div', {
                      className: 'relative flex items-center justify-center',
                      children: (0, r.jsx)(rZ, { className: 'w-6 h-6 text-[#EAD0B1] animate-pulse' }),
                    })
                  : (0, r.jsxs)('div', {
                      className: 'relative flex items-center justify-center',
                      children: [
                        (0, r.jsx)(rZ, { className: 'w-6 h-6 text-[#EAD0B1]/60' }),
                        (0, r.jsx)('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: (0, r.jsx)('span', {
                            className: 'w-7 h-[2px] bg-[#EAD0B1] rotate-45 rounded-full',
                          }),
                        }),
                      ],
                    }),
              }),
            }),
          ],
        })
      : null
  }
export default function () {
  let [t, e] = (0, a.useState)(!1)
  return (0, r.jsx)('main', {
    className: 'w-full min-h-screen bg-[#11100F] flex items-center justify-center py-0 sm:py-6 sm:px-4',
    children: (0, r.jsxs)('div', {
      className:
        'mobile-invitation-container min-h-screen sm:min-h-[844px] sm:max-h-[94vh] sm:rounded-[36px] sm:overflow-y-auto sm:shadow-2xl sm:ring-8 sm:ring-[#8B6B4A]/10 no-scrollbar',
      children: [
        (0, r.jsx)(r2, {
          onEnter: () => {
            e(!0)
          },
        }),
        (0, r.jsx)(ac, { audioUrl: '/wedding-muhammad-al-muqit.m4a', hasEntered: t }),
        (0, r.jsxs)('div', {
          className: `transition-opacity duration-1000 ${t ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
          children: [
            (0, r.jsx)(r5, {}),
            (0, r.jsx)(r3, {}),
            (0, r.jsx)(r6, {}),
            (0, r.jsx)(ae, {}),
            (0, r.jsx)(ar, {}),
            (0, r.jsx)(al, {}),
            (0, r.jsx)(ah, {}),
          ],
        }),
      ],
    }),
  })
}
