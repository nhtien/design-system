import DesignSystemPlugin, { wrapComponentWithTheme } from './plugin/design-system';
import * as rawComponents from './components';

export default DesignSystemPlugin;
export const Plugin = DesignSystemPlugin;

export const DsButton = wrapComponentWithTheme(rawComponents.DsButton);
