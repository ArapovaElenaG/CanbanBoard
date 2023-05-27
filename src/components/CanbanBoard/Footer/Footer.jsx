import React from 'react';


function Footer({activeTasks, finishedTasks, name}) {
    let date = new Date();
    let currentYear = date.getFullYear(); 

    return (
        <div className='footer'>
            <div className='infoFooter'>
                <div className='itemInfoFooter'>Active tasks: {activeTasks}</div>
                <div className='itemInfoFooter'>Finished tasks: {finishedTasks}</div>
            </div>

            <div className='itemInfoFooter'>Kanban board by {name}, {currentYear}</div>
            
        </div>
    )
}

export default Footer;