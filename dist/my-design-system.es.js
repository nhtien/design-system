(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode('.ds-scope-intrepid{font-family:var(--font-family, "Inter", sans-serif)!important;color:var(--text-color, #1f2937)!important;display:inline-block!important}.ds-button[data-v-ac2d53c8]{background-color:#42b883}')),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { createElementBlock as _, openBlock as h, renderSlot as D, defineComponent as b, inject as v, computed as l, h as p, reactive as g } from "vue";
const C = (t, o) => {
  const n = t.__vccOpts || t;
  for (const [s, e] of o)
    n[s] = e;
  return n;
}, $ = {}, y = { class: "ds-button" };
function B(t, o) {
  return h(), _("button", y, [
    D(t.$slots, "default", {}, void 0, !0)
  ]);
}
const f = /* @__PURE__ */ C($, [["render", B], ["__scopeId", "data-v-ac2d53c8"]]), m = Symbol("DsThemeConfig");
function d(t) {
  return b({
    name: `DsWrapper(${t.name ?? "Anonymous"})`,
    inheritAttrs: !1,
    // Prevent passing attributes to outer <div> unnecessarily
    setup(o, { slots: n, attrs: s }) {
      const e = v(m), c = l(() => {
        const a = {};
        return e && Object.entries(e).forEach(([i, u]) => {
          u && i !== "className" && (a[`--${E(i)}`] = u);
        }), a;
      }), r = l(
        () => (e == null ? void 0 : e.className) || "ds-scope-intrepid"
      );
      return () => p(
        "div",
        { class: r.value, style: c.value },
        [p(t, { ...s }, n)]
      );
    }
  });
}
function E(t) {
  return t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function w() {
  return {
    DsButton: f
    // 🔜 Add more components like DsInput, DsCard, etc.
  };
}
const S = {
  install(t, o) {
    const n = g(o);
    t.provide(m, n);
    const s = w();
    for (const [e, c] of Object.entries(s)) {
      const r = d(c);
      t.component(e, r);
    }
  }
};
function j(t) {
  return d(t);
}
const A = S, O = j(f);
export {
  O as DsButton,
  A as Plugin,
  S as default
};
