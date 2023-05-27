import React from 'react';
import './CanbanBoard.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';


function CanbanBoard() {
    const [activeTasks, setActiveTasks] = React.useState(0);
    const [finishedTasks, setFinishedTasks] = React.useState(0);

    const getInfoFooter = (active, finished) => {
        setActiveTasks(active)
        setFinishedTasks(finished)
    }

    return (
        <>
            <Header/>
            <Main
                getInfoFooter={getInfoFooter}
            />
            <Footer
                activeTasks={activeTasks}
                finishedTasks={finishedTasks}
                name={'ElenaArapova'}
            />
        </>
    )
}

export default CanbanBoard;