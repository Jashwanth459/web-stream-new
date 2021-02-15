import { Cart as CartPage } from '../screens'
import { Home as HomePage } from '../screens'
import { Liked as LikedPage } from '../screens'
import { Profile as ProfilePage } from '../screens'

export const routes = [ 
    {
        path: '/',
        exact: true,
        content: HomePage
    },
    {
        path: '/cart',
        exact: true,
        content: CartPage
    },
    {
        path: '/liked',
        exact: true,
        content: LikedPage
    },
    {
        path: '/profile',
        exact: true,
        content: ProfilePage
    }
]
