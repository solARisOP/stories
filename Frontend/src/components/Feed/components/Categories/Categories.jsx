import './index.css'

function Categories() {
    return (
        <div className="cat-div">
            <div className='cat-type cat-all cat-type-border' >
                All
            </div>
            <div className='cat-type cat-food'>
                Food
            </div>
            <div className='cat-type cat-health' >
                Health & Fitness
            </div>
            <div className='cat-type cat-travel' >
                Travel
            </div>
            <div className='cat-type cat-movie' >
                Movie
            </div>
            <div className='cat-type cat-education' >
                Education
            </div>
        </div>
    )
}

export default Categories