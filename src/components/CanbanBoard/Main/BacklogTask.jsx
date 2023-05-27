import React from 'react';
import {Link} from 'react-router-dom';
import Input from '../Elements/Input';
import Button from '../Elements/ButtonAdd';



function BacklogTasks({backlogTasks, getTask, removeTask}) {
    const [taskValue, setTaskValue] = React.useState('');
    const [clicked, setClicked] = React.useState(false);



    const handleClick = () => {
        if (!clicked) {setClicked(!clicked)}
        else {
            if (!taskValue) {return}
            else if (backlogTasks.find(item => item.name === taskValue)) {
                alert('This task is already in the Backlog list');
                return
            } else {
                getTask(taskValue, 'Backlog')
                setTaskValue('')
                setClicked(!clicked)
            }
        }
    }
    
    const handleInput = (event) => {
        setTaskValue(event.target.value)
    }


    return (
        <div className='tasks'>
                <div className='titleTasks'>Backlog</div>
                <div className='wrapperTask'>
                    {backlogTasks.map((item) => {
                        return (
                            <div className='task' key={item.id}>
                                <div className='taskName'>
                                    <Link to={`/task/${item.id}`} className="linkTask">
                                        {item.name}
                                    </Link>
                                </div>
                                <div onClick={() => removeTask(item, 'Backlog')}>
                                    <img src="images/Cross.svg" width="10" height="10" />
                                </div>
                            </div>
                        )
                    })}

                </div>

                {clicked && <Input onChange={handleInput}/>}

                <Button 
                    onClick={handleClick}
                    clicked={clicked}
                    disabled={false}
                />
            </div>
    )
}

export default BacklogTasks;