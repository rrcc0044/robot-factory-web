import Loadable from 'react-loadable'
import LoadingComponent from '../../common/loader'

const appRoutes = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('./pages/list/'),
      loading: LoadingComponent,
    }),
  },
]

export default appRoutes
