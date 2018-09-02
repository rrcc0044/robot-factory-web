import Loadable from 'react-loadable'
import LoadingComponent from '../../common/loader'

const appRoutes = [
  {
    path: '/dashboard/robots',
    component: Loadable({
      loader: () => import('./pages/list/'),
      loading: LoadingComponent,
    }),
  },
]

export default appRoutes
