import { NavLink } from 'react-router-dom'
import './index.css'

function Categories() {
    return (
        <div className="cat-div">
            <NavLink className={({isActive})=>`cat-type cat-all ${isActive ? 'cat-type-border' : ''}`} to={'/'} >
                All
            </NavLink>
            <NavLink className={({isActive})=>`cat-type cat-food ${isActive ? 'cat-type-border' : ''}`} to={'/food'} >
                Food
            </NavLink>
            <NavLink className={({isActive})=>`cat-type cat-health ${isActive ? 'cat-type-border' : ''}`} to={'/health'} >
                Health & Fitness
            </NavLink>
            <NavLink className={({isActive})=>`cat-type cat-travel ${isActive ? 'cat-type-border' : ''}`} to={'/travel'} >
                Travel
            </NavLink>
            <NavLink className={({isActive})=>`cat-type cat-movie ${isActive ? 'cat-type-border' : ''}`} to={'/movie'} >
                Movie
            </NavLink>
            <NavLink className={({isActive})=>`cat-type cat-education ${isActive ? 'cat-type-border' : ''}`} to={'/education'} >
                Education
            </NavLink>
        </div>
    )
}

export default Categories