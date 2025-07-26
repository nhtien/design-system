// 📁 src/plugin/design-system.ts

import { App, Component, defineComponent, h, reactive, computed, inject } from 'vue';
import DsButton from '../components/DsButton.vue';
import '../styles/ds-scope.css'; // ✅ This imports the default global CSS for scoped wrapper (optional but recommended)

// Key used to provide/inject theme config into all components
export const DS_THEME_KEY = Symbol('DsThemeConfig');

// Theme configuration interface with optional CSS variables
export interface DsTheme {
    fontFamily?: string;
    primaryColor?: string;
    borderRadius?: string;
    textColor?: string; // ✅ Match the --text-color variable in CSS
    className?: string; // ✅ Allows overriding the wrapper's CSS class
    [key: string]: string | undefined;
}

// Higher-order component (HOC) to wrap each DS component with a <div> that applies CSS variables
function withDsWrapper(WrappedComponent: Component) {
    return defineComponent({
        name: `DsWrapper(${WrappedComponent.name ?? 'Anonymous'})`,
        inheritAttrs: false,
        setup(props, { slots, attrs }) {
            const theme = inject<DsTheme>(DS_THEME_KEY); // Inject the provided theme config

            // Convert theme config into CSS variables
            const cssVars = computed(() => {
                const style: Record<string, string> = {};
                if (theme) {
                    Object.entries(theme).forEach(([key, val]) => {
                        if (val && key !== 'className') {
                            style[`--${kebabCase(key)}`] = val;
                        }
                    });
                }
                return style;
            });

            // Determine which class name to apply to the wrapper div
            const wrapperClass = computed(() =>
                theme?.className || 'ds-scope-intrepid' // Default class if none provided
            );

            // Render wrapped component inside the scoped div with CSS variables applied
            return () =>
                h(
                    'div',
                    { class: wrapperClass.value, style: cssVars.value },
                    [h(WrappedComponent, { ...attrs }, slots)]
                );
        },
    });
}

// Utility: Convert camelCase to kebab-case (used for CSS variable names)
function kebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Load all available DS components manually (can be automated later)
function loadComponents(): Record<string, Component> {
    return {
        DsButton,
        // Add more components here
    };
}

// Vue plugin installer
export default {
    install(app: App, config: DsTheme) {
        const theme = reactive(config); // Make theme reactive
        app.provide(DS_THEME_KEY, theme); // Provide theme for injection into each wrapped component

        const components = loadComponents();
        for (const [name, comp] of Object.entries(components)) {
            const Wrapped = withDsWrapper(comp); // Wrap each component
            app.component(name, Wrapped); // Register component with wrapper
        }
    },
};
