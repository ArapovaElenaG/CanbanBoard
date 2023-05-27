import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import TaskItem from './TaskItem';
import Error from './Error';


function Main({getInfoFooter}) {
    const [backlogTasks, setBacklogTasks] = React.useState([]);
    const [readyTasks, setReadyTasks] = React.useState([]);
    const [progressTasks, setProgressTasks] = React.useState([]);
    const [finishedTasks, setFinishedTasks] = React.useState([]);


    // ф-я передаваемя в доч компонент BacklogTask или Task и поднимающая стейт
    const getTask = (task, title) => {
        if (title === 'Backlog') {
            let randomID = Math.random().toString(36).substring(2);
            setBacklogTasks([...backlogTasks, {
                name: task,
                id: randomID,
                discription: ''
            }])
        } else if (title === 'Ready') {
            setReadyTasks([...readyTasks, task]);
            let removeIndex = backlogTasks.indexOf(task);
            let updateBacklogTasks = [...backlogTasks.slice(0, removeIndex), ...backlogTasks.slice(removeIndex + 1)];
            setBacklogTasks(updateBacklogTasks);
        } else if (title === 'In Progress') {
            setProgressTasks([...progressTasks, task]);
            let removeIndex = readyTasks.indexOf(task);
            let updateReadyTasks = [...readyTasks.slice(0, removeIndex), ...readyTasks.slice(removeIndex + 1)];
            setReadyTasks(updateReadyTasks);
        } else if (title === 'Finished') {
            setFinishedTasks([...finishedTasks, task]);
            let removeIndex = progressTasks.indexOf(task);
            let updateProgressTasks = [...progressTasks.slice(0, removeIndex), ...progressTasks.slice(removeIndex + 1)];
            setProgressTasks(updateProgressTasks);
        }
    }


    const removeTask = (task, title) => {
        if (title === 'Backlog') {
            let removeIndex = backlogTasks.findIndex(item => item.id === task.id);
            let updateBacklogTasks = [...backlogTasks.slice(0, removeIndex), ...backlogTasks.slice(removeIndex + 1)];
            setBacklogTasks(updateBacklogTasks);
        } else if (title === 'Ready') {
            let removeIndex = readyTasks.findIndex(item => item.id === task.id);
            let updateReadyTasks = [...readyTasks.slice(0, removeIndex), ...readyTasks.slice(removeIndex + 1)];
            setReadyTasks(updateReadyTasks);
        } else if (title === 'In Progress') {
            let removeIndex = progressTasks.findIndex(item => item.id === task.id);
            let updateProgressTasks = [...progressTasks.slice(0, removeIndex), ...progressTasks.slice(removeIndex + 1)];
            setProgressTasks(updateProgressTasks);
        } else if (title === 'Finished') {
            let removeIndex = finishedTasks.findIndex(item => item.id === task.id);
            let updateFinishedTasks = [...finishedTasks.slice(0, removeIndex), ...finishedTasks.slice(removeIndex + 1)];
            setFinishedTasks(updateFinishedTasks);
        }
    }


    // в hook useEffect делаем аналоги методов жизненного цикла ComponentDidMount (для получения данных их localStorage) & ComponentDidUpdate (для записи обновленного стейта в localStorage) 
    React.useEffect(() => {
        let lastBacklog = localStorage.getItem('lastBacklog');
        let lastReady = localStorage.getItem('lastReady');
        let lastProgress = localStorage.getItem('lastProgress');
        let lastFinished = localStorage.getItem('lastFinished');

        lastBacklog = JSON.parse(lastBacklog);
        lastReady = JSON.parse(lastReady);
        lastProgress = JSON.parse(lastProgress);
        lastFinished = JSON.parse(lastFinished);

        if (lastBacklog) {setBacklogTasks(lastBacklog)};
        if (lastReady) {setReadyTasks(lastReady)};
        if (lastProgress) {setProgressTasks(lastProgress)};
        if (lastFinished) {setFinishedTasks(lastFinished)};
    }, [])

    React.useEffect(() => {
        localStorage.setItem('lastBacklog', JSON.stringify(backlogTasks));
        localStorage.setItem('lastReady', JSON.stringify(readyTasks));
        localStorage.setItem('lastProgress', JSON.stringify(progressTasks));
        localStorage.setItem('lastFinished', JSON.stringify(finishedTasks));
        getInfoFooter(backlogTasks.length, finishedTasks.length);
    }, [backlogTasks, readyTasks, progressTasks, finishedTasks])



    const getDescription = (discriptionValue, id) => {
        let indexBacklog = backlogTasks.findIndex(item => item.id === id);
        let indexReady = readyTasks.findIndex(item => item.id === id);
        let indexProgress = progressTasks.findIndex(item => item.id === id);

        if (indexBacklog >= 0) {
            let newArray = backlogTasks.map(item => {
                if (item.id === id) {return {name: item.name, id: item.id, discription: discriptionValue}}
                else {return item}
            })
            setBacklogTasks(newArray);

        } else if (indexReady >= 0) {
            let newArray = readyTasks.map(item => {
                if (item.id === id) {return {name: item.name, id: item.id, discription: discriptionValue}}
                else {return item}
            })
            setReadyTasks(newArray);

        } else if (indexProgress >= 0) {
            let newArray = progressTasks.map(item => {
                if (item.id === id) {return {name: item.name, id: item.id, discription: discriptionValue}}
                else {return item}
            })
            setProgressTasks(newArray);
        } else {
            let newArray = finishedTasks.map(item => {
                if (item.id === id) {return {name: item.name, id: item.id, discription: discriptionValue}}
                else {return item}
            })
            setFinishedTasks(newArray);
        }
    }
    


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route 
                        exact path="/" 
                        element={<Home 
                            backlogTasks={backlogTasks} 
                            readyTasks={readyTasks} 
                            progressTasks={progressTasks} 
                            finishedTasks={finishedTasks}
                            getTask={getTask}
                            removeTask={removeTask}
                        />}
                    >
                    </Route>

                    <Route path="/task/:id" element={<TaskItem backlog={backlogTasks} ready={readyTasks} progress={progressTasks} finished={finishedTasks} getDescription={getDescription}/>}>
                    </Route>

                    <Route path="*" element={<Error/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Main;