import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faSearch, faEllipsisV, faCheckCircle, faTrash, faTriangleExclamation, faRocket, faShuttleSpace, faArrowUpRightFromSquare, faMeteor, faEarth, faEye } from '@fortawesome/free-solid-svg-icons'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const pinia = createPinia()

library.add(faSquare, faSquareCheck, faSearch, faEllipsisV, faCheckCircle, faTrash, faTriangleExclamation, faRocket, faShuttleSpace, faArrowUpRightFromSquare, faMeteor, faEarth, faEye)

const app = createApp(App)
  .use(router)
  .use(pinia)

app.mount('#app')
