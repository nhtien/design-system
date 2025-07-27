import { App, Component } from 'vue';
export declare const DS_THEME_KEY: unique symbol;
export interface DsTheme {
    fontFamily?: string;
    primaryColor?: string;
    borderRadius?: string;
    textColor?: string;
    className?: string;
    [key: string]: string | undefined;
}
declare const _default: {
    install(app: App, config: DsTheme): void;
};
export default _default;
export declare function wrapComponentWithTheme(comp: Component): Component;
