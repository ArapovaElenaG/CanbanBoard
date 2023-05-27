import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../Elements/ButtonAdd';




function Tasks({title, previousTasks, tasks, getTask, removeTask}) {

    // стейт: нажата или нет кнопка Add
    const [clickedAdd, setClickedAdd] = React.useState(false);
    // стейт: нажата или нет стрелка в select (только при муляжном селекте)
    const [clickedSelect, setClickedSelect] = React.useState(false);

    // переменная активностикнопи Add (неактивна, если предыдущий массив пуст)
    let disabledButton = previousTasks.length ? false : true


    // обработчик на кнопку Add - меняет состояние
    const handleClick = () => {
        setClickedAdd(!clickedAdd)
    }
    
    // обработчик для настоящего select
    // const handleSelect = (event) => {
    //     if (event.target.value) {
    //         getTask(event.target.value, title)
    //         setClickedAdd(!clickedAdd)
    //     } else {return}
    // }


    // следующие 2 обработчика только для муляжного селекта
    // обработчик на стрелку select
    const handleSelectDiv = () => {
        if (!clickedSelect) {
            setClickedSelect(!clickedSelect)
        } else {
            setClickedSelect(!clickedSelect);
            setClickedAdd(!clickedAdd);
        }
    }

    // обработчик на выбранную опцию в селект
    const handleOption = (item) => {
        // setSelectValue(item);
        getTask(item, title);
        setClickedAdd(!clickedAdd);
        setClickedSelect(!clickedSelect)
        // setSelectValue('');
    }


    return (
        <div className='tasks'>
            <div className='titleTasks'>{title}</div>
            <div className='wrapperTask'>
                {tasks.map((item) => {
                    return(
                        <div className='task' key={item.id}>
                            <div className='taskName'>
                                <Link to={`/task/${item.id}`} className="linkTask">
                                    {item.name}
                                </Link>
                            </div>
                            <div onClick={() => removeTask(item, title)}>
                                <img src="images/Cross.svg" width="10" height="10" />
                            </div>
                        </div>
                    )
                })} 

                                



            </div>

            {/* селект с опциями из элементов массива previousTasks */}
            {/* {clickedAdd && <select className='select' onChange={handleSelect}>
                <option value=""></option>
                {previousTasks.map((item, index) => <option className='option' value={item} key={index.toString()}>{item}</option>)}
            </select>} */}

            {/* муляжный селект */}
            {clickedAdd && 
            <div className='wrapperSelect'>
                <div className='selectDiv' onClick={handleSelectDiv}>
                    <img src="images/ArrowSelect.svg" alt=""  width="18"/>
                </div>

                {clickedSelect && 
                <div className='options'>
                    {previousTasks.map((item) => {
                        return (
                            <div className='optionItem' key={item.id} onClick={() => handleOption(item)}>
                                <input id={item.id} className="selectInput" type="radio" name="singleSelect"/>
                                <label htmlFor={item.id} className="selectLabel">{item.name}</label>
                            </div>
                        )
                    })}
                </div>}
            </div>}
            

            

            <Button 
                onClick={handleClick}
                clicked={false}
                prevEmpty={disabledButton}
            />

        </div>
    )
}

export default Tasks;