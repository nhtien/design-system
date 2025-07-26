(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode('.ds-button[data-v-ac2d53c8]{background-color:#42b883}.ds-scope-intrepid{font-family:var(--font-family, "Inter", sans-serif)!important;color:var(--text-color, #1f2937)!important;display:inline-block!important}')),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { createElementBlock as d, openBlock as m, renderSlot as _, reactive as b, defineComponent as h, inject as v, computed as l, h as p } from "vue";
const D = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [o, t] of s)
    n[o] = t;
  return n;
}, g = {}, y = { class: "ds-button" };
function C(e, s) {
  return m(), d("button", y, [
    _(e.$slots, "default", {}, void 0, !0)
  ]);
}
const E = /* @__PURE__ */ D(g, [["render", C], ["__scopeId", "data-v-ac2d53c8"]]), f = Symbol("DsThemeConfig");
function $(e) {
  return h({
    name: `DsWrapper(${e.name ?? "Anonymous"})`,
    inheritAttrs: !1,
    setup(s, { slots: n, attrs: o }) {
      const t = v(f), c = l(() => {
        const a = {};
        return t && Object.entries(t).forEach(([i, u]) => {
          u && i !== "className" && (a[`--${S(i)}`] = u);
        }), a;
      }), r = l(
        () => (t == null ? void 0 : t.className) || "ds-scope-intrepid"
        // Default class if none provided
      );
      return () => p(
        "div",
        { class: r.value, style: c.value },
        [p(e, { ...o }, n)]
      );
    }
  });
}
function S(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function j() {
  return {
    DsButton: E
    // Add more components here
  };
}
const w = {
  install(e, s) {
    const n = b(s);
    e.provide(f, n);
    const o = j();
    for (const [t, c] of Object.entries(o)) {
      const r = $(c);
      e.component(t, r);
    }
  }
};
export {
  E as DsButton,
  w as default
};
