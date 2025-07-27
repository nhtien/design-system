import DesignSystemPlugin, { wrapComponentWithTheme } from './plugin/design-system';
import DsButtonRaw from './components/DsButton.vue';

export default DesignSystemPlugin;
export const Plugin = DesignSystemPlugin;

// Wrap manually before exporting
export const DsButton = wrapComponentWithTheme(DsButtonRaw);
