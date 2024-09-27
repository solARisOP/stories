import { useSelector } from 'react-redux'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom'
import Feed from './components/Feed/Feed.jsx'
import Bookmarks from './components/Bookmarks/Bookmarks.jsx'

import Loading from './Loading.jsx'

function Router() {
    const user = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)    
    const arr = [];

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route path='' element={loading ? <Loading /> : <Feed title="all" /> } />
                <Route path='user-stories' element={loading ? <Loading /> : <Feed title="userStories" /> } />
                <Route path='food' element={loading ? <Loading /> : <Feed title="food" /> } />
                <Route path='health' element={loading ? <Loading /> : <Feed title="health" /> } />
                <Route path='travel' element={loading ? <Loading /> : <Feed title="travel" /> } />
                <Route path='movie' element={loading ? <Loading /> : <Feed title="movie" /> } />
                <Route path='education' element={loading ? <Loading /> : <Feed title="education" /> } />
                <Route path='bookmarks' element={loading ? <Loading/> : <Bookmarks />} />
                <Route path=':blob' element={<NotFound />} />
            </Route>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default Router