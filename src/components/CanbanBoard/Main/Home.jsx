import React from 'react';
import BacklogTasks from './BacklogTask';
import Tasks from './Tasks';



function Home({backlogTasks, readyTasks, progressTasks, finishedTasks, getTask, removeTask}) {

    return (
        <div className='main'>
            <BacklogTasks 
                backlogTasks = {backlogTasks}
                getTask={getTask}
                removeTask={removeTask}
            />
            <Tasks 
                title={'Ready'}
                previousTasks={backlogTasks}
                tasks={readyTasks}
                getTask={getTask}
                removeTask={removeTask}
            />
            <Tasks 
                title={'In Progress'}
                previousTasks={readyTasks}
                tasks={progressTasks}
                getTask={getTask}
                removeTask={removeTask}
            />
            <Tasks 
                title={'Finished'}
                previousTasks={progressTasks}
                tasks={finishedTasks}
                getTask={getTask}
                removeTask={removeTask}
            />
        </div>
    )
}

export default Home;