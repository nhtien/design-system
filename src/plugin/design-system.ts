import { App, Component, defineComponent, h, reactive, computed, inject } from 'vue';
import '../styles/ds-scope.css';
import * as rawComponents from '../components';

export const DS_THEME_KEY = Symbol('DsThemeConfig');

export interface DsTheme {
    fontFamily?: string;
    primaryColor?: string;
    borderRadius?: string;
    textColor?: string;
    className?: string;
    [key: string]: string | undefined;
}

// ✅ Wrapper dùng <span style="display: contents">
function withDsWrapper(WrappedComponent: Component) {
    return defineComponent({
        name: `DsWrapper(${WrappedComponent.name ?? 'Anonymous'})`,
        inheritAttrs: false,
        setup(props, { slots, attrs }) {
            const theme = inject<DsTheme>(DS_THEME_KEY);

            const cssVars = computed(() => {
                const style: Record<string, string> = {};
                if (theme) {
                    Object.entries(theme).forEach(([key, val]) => {
                        if (val && key !== 'className') {
                            style[`--${kebabCase(key)}`] = val;
                        }
                    });
                }
                style.display = 'contents';
                return style;
            });

            const wrapperClass = computed(() =>
                theme?.className || 'ds-scope-intrepid'
            );

            return () =>
                h(
                    'span',
                    { class: wrapperClass.value, style: cssVars.value },
                    [h(WrappedComponent, { ...attrs }, slots)]
                );
        },
    });
}

function kebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function loadComponents(): Record<string, Component> {
    const result: Record<string, Component> = {};
    for (const [name, comp] of Object.entries(rawComponents)) {
        if (name.startsWith('Ds')) {
            result[name] = comp;
        }
    }
    return result;
}

export default {
    install(app: App, config: DsTheme) {
        const theme = reactive(config);
        app.provide(DS_THEME_KEY, theme);

        const components = loadComponents();
        for (const [name, comp] of Object.entries(components)) {
            const Wrapped = withDsWrapper(comp);
            app.component(name, Wrapped);
        }
    },
};

export function wrapComponentWithTheme(comp: Component): Component {
    return withDsWrapper(comp);
}