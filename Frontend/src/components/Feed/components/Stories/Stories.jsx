import './index.css'

function Stories() {
    const imgUrl = 'https://images.pexels.com/photos/24014245/pexels-photo-24014245/free-photo-of-photo-of-a-small-domestic-dog-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    return (
        <div className='stories-container'>
            <p className='stories-heading'>You Stories</p>
            <div className='stories-row'>
                {[1, 1, 1, 1].map(ele =>
                    <div className='stories-story' style={{backgroundImage: `url(${imgUrl})`}}>
                        <div className="stories-story-footer">
                            <p className="stories-story-footer-heading">Heading comes here</p>
                            <p className="stories-story-footer-description">Inspirational designs, illustrations, and graphic elements from the world's best designers.</p>
                        </div>
                    </div>
                )}
            </div>
            <button className='stories-more-btn'>See more</button>
        </div>
    )
}

export default Stories