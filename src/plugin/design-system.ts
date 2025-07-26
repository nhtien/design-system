import { App, Component, defineComponent, h, reactive, computed, inject } from 'vue';
import DsButton from '../components/DsButton.vue';

export const DS_THEME_KEY = Symbol('DsThemeConfig');

export interface DsTheme {
    fontFamily?: string;
    primaryColor?: string;
    borderRadius?: string;
    [key: string]: string | undefined;
}

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
                        if (val) style[`--${kebabCase(key)}`] = val;
                    });
                }
                return style;
            });
            return () =>
                h(
                    'div',
                    { class: 'ds-scope', style: cssVars.value },
                    [h(WrappedComponent, { ...attrs }, slots)]
                );
        },
    });
}

function kebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function loadComponents(): Record<string, Component> {
    return {
        DsButton,
        // Thêm các component khác tại đây
    };
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