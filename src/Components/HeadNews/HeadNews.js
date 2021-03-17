import React from 'react';
import './headNews.css'
const HeadNews = () => {

    return (
        <>
            <div className='news'>
                <div className='my-container'>
                    <marquee scrollamount="4" width='100%' direction="rignt" >
                        This is sample scrolling text.
                    </marquee>
                </div>

            </div>
        </>
    );
};

export default HeadNews;