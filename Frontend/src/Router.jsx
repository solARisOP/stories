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
import { loader as bookLoader } from './components/Bookmarks/loader.js'
import NotFound from './NotFound.jsx'
import App from './App.jsx'
import AllStories from './components/Feed/components/StoryTypes/AllStories.jsx'
import Stories from './components/Feed/components/Stories/Stories.jsx'
import {loader as allLoader} from './components/Feed/components/StoryTypes/loader.js'
import {loader as storyLoader} from './components/Feed/components/Stories/loader.js'

function Router() {
    const user = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)    

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route path='/' element={loading ? <Loading /> : <Feed /> }>
                    <Route index element={<AllStories /> } loader={allLoader} />
                    <Route path=':type' element={<Stories /> } loader={storyLoader} />
                </Route>
                <Route path='bookmarks' element={loading ? <Loading/> : <Bookmarks />} loader={() => user ? bookLoader(user._id) : null} />
                <Route path=':blob' element={<NotFound />} />
            </Route>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default Router