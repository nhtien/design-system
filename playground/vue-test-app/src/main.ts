import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DesignSystemPlugin from '@ds/plugin/design-system'

createApp(App)
    .use(DesignSystemPlugin, {
     /*   fontFamily: "'Roboto', sans-serif",
        textColor: '#222',*/
        primaryColor: '#2a9d8f',
        borderRadius: '8px',
        className: 'ds-scope-intrepid' // optional
    })
    .mount('#app')
