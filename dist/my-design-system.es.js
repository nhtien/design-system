(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode('.ds-scope-intrepid{font-family:var(--font-family, "Inter", sans-serif)!important;color:var(--text-color, #1f2937)!important;display:inline-block!important}.ds-button[data-v-ac2d53c8]{background-color:#42b883}')),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { createElementBlock as _, openBlock as b, renderSlot as h, defineComponent as D, inject as g, computed as p, h as l, reactive as j } from "vue";
const v = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [s, n] of e)
    o[s] = n;
  return o;
}, C = {}, O = { class: "ds-button" };
function y(t, e) {
  return b(), _("button", O, [
    h(t.$slots, "default", {}, void 0, !0)
  ]);
}
const w = /* @__PURE__ */ v(C, [["render", y], ["__scopeId", "data-v-ac2d53c8"]]), f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsButton: w
}, Symbol.toStringTag, { value: "Module" })), m = Symbol("DsThemeConfig");
function d(t) {
  return D({
    name: `DsWrapper(${t.name ?? "Anonymous"})`,
    inheritAttrs: !1,
    // Prevent passing attributes to outer <div> unnecessarily
    setup(e, { slots: o, attrs: s }) {
      const n = g(m), r = p(() => {
        const a = {};
        return n && Object.entries(n).forEach(([i, u]) => {
          u && i !== "className" && (a[`--${B(i)}`] = u);
        }), a;
      }), c = p(
        () => (n == null ? void 0 : n.className) || "ds-scope-intrepid"
      );
      return () => l(
        "div",
        { class: c.value, style: r.value },
        [l(t, { ...s }, o)]
      );
    }
  });
}
function B(t) {
  return t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function E() {
  const t = {};
  for (const [e, o] of Object.entries(f))
    e.startsWith("Ds") && (t[e] = o);
  return t;
}
const S = {
  install(t, e) {
    const o = j(e);
    t.provide(m, o);
    const s = E();
    for (const [n, r] of Object.entries(s)) {
      const c = d(r);
      t.component(n, c);
    }
  }
};
function $(t) {
  return d(t);
}
const k = S, T = Object.fromEntries(
  Object.entries(f).map(([t, e]) => [t, $(e)])
), A = T.DsButton;
export {
  A as DsButton,
  k as Plugin,
  S as default
};
