import DesignSystemPlugin, { wrapComponentWithTheme } from './plugin/design-system';
import * as rawComponents from './components';

export default DesignSystemPlugin;
export const Plugin = DesignSystemPlugin;

// 📦 Named exports: auto-wrap all components
const wrappedComponents = Object.fromEntries(
    Object.entries(rawComponents).map(([name, comp]) => [name, wrapComponentWithTheme(comp)])
);

// Export all components as named exports
export const DsButton = wrappedComponents.DsButton;
// 🟡 Bạn có thể export thêm cái nào bạn muốn ở đây (hoặc generate tự động nếu dùng build script)
