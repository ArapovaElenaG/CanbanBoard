import React from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';


function TaskItem({backlog, ready, progress, finished, getDescription}) {
    const {id} = useParams();

    let allTasks = backlog.concat(ready, progress, finished);
    function isTask(element) {
        if (element.id === id) {
            return element
        }
    }
    let itemTask = allTasks.find(isTask);


    const [clickedDiscription, setClickedDiscription] = React.useState(false);
    const [discriptionValue, setDiscriptionValue] = React.useState(itemTask.discription);

    const handleDiscription = () => {
        setClickedDiscription(!clickedDiscription)
    }

    const handleTextarea = (event) => {
        setDiscriptionValue(event.target.value)
    }

    const handleSubmit = (event) => {
        getDescription(discriptionValue, id);
        setClickedDiscription(!clickedDiscription)
        event.preventDefault();
    }

    
    


    return (
        <div className='taskItem'>
            <div className='wrapperTitleTaskItem'>
                <h1 className='titleTaskItem'>{itemTask.name}</h1>
                <div>
                    <Link to="/">
                        <img src="../../images/Cross.svg" width="24" height="24" />
                    </Link>
                </div>

            </div>
            
            {!clickedDiscription 
            && 
            <p className='discriptionTask' onClick={handleDiscription}>{itemTask.discription ? itemTask.discription : 'This task has no description'}</p> 
            || 
            <form action="" onSubmit={handleSubmit}>
                <textarea onChange={handleTextarea} defaultValue={itemTask.discription} className="textarea">
                </textarea>
                <button className='buttonSave'>Save description</button>
            </form>}


        </div>
    )
}

export default TaskItem;