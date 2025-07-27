import { App, Component, defineComponent, h, reactive, computed, inject } from 'vue';
import DsButton from '../components/DsButton.vue';
import '../styles/ds-scope.css'; // Optional: Global fallback styles for design-system wrapper

// Provide/inject key for theme configuration
export const DS_THEME_KEY = Symbol('DsThemeConfig');

// Interface for theme configuration
// - Used to dynamically apply CSS variables to the wrapper
export interface DsTheme {
    fontFamily?: string;     // Controls --font-family
    primaryColor?: string;   // Controls --primary-color
    borderRadius?: string;   // Controls --border-radius
    textColor?: string;      // Controls --text-color
    className?: string;      // Optional: override wrapper class (default is 'ds-scope-intrepid')
    [key: string]: string | undefined; // Allow any custom variable
}

// Higher-order function to wrap a component with a <div>
// - This wrapper injects theme styles and classes
function withDsWrapper(WrappedComponent: Component) {
    return defineComponent({
        name: `DsWrapper(${WrappedComponent.name ?? 'Anonymous'})`,
        inheritAttrs: false, // Prevent passing attributes to outer <div> unnecessarily
        setup(props, { slots, attrs }) {
            const theme = inject<DsTheme>(DS_THEME_KEY); // ⛳ Inject theme config from parent app

            // Convert theme config to CSS variables like --font-family, --primary-color, etc.
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

            //Wrapper CSS class: can be overridden or defaults to 'ds-scope-intrepid'
            const wrapperClass = computed(() =>
                theme?.className || 'ds-scope-intrepid'
            );

            //Render the wrapper <div> with styles and the original component inside
            return () =>
                h(
                    'div',
                    { class: wrapperClass.value, style: cssVars.value },
                    [h(WrappedComponent, { ...attrs }, slots)]
                );
        },
    });
}

// Helper function: Convert camelCase → kebab-case for CSS variable names
function kebabCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Manually register all design system components here
function loadComponents(): Record<string, Component> {
    return {
        DsButton,
        // 🔜 Add more components like DsInput, DsCard, etc.
    };
}

// 🔌 Main plugin entry point (used with app.use(DesignSystemPlugin))
export default {
    install(app: App, config: DsTheme) {
        // Make theme reactive and available to all components
        const theme = reactive(config);
        app.provide(DS_THEME_KEY, theme);

        // Register all design system components globally with theme wrapper
        const components = loadComponents();
        for (const [name, comp] of Object.entries(components)) {
            const Wrapped = withDsWrapper(comp); // 👕 Auto-wrap each component with theme support
            app.component(name, Wrapped); // Register as global component (e.g., <DsButton>)
        }
    },
};

// Export this helper to support named imports with wrapper
export function wrapComponentWithTheme(comp: Component): Component {
    return withDsWrapper(comp);
}
