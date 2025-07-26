import { createElementBlock as r, openBlock as s, renderSlot as _ } from "vue";
const d = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, c] of e)
    o[n] = c;
  return o;
}, a = {}, u = { class: "ds-button" };
function f(t, e) {
  return s(), r("button", u, [
    _(t.$slots, "default", {}, void 0, !0)
  ]);
}
const p = /* @__PURE__ */ d(a, [["render", f], ["__scopeId", "data-v-ac2d53c8"]]);
export {
  p as DsButton
};
