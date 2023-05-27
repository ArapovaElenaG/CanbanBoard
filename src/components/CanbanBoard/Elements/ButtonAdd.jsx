import React from 'react';

function Button({onClick, clicked, prevEmpty}) {
    return (
        <button 
        className={`buttonAdd ${!clicked ? '' : 'submit'} ${prevEmpty ? 'buttonDisabled' : ''}`} 
        onClick={onClick} 
        disabled={prevEmpty}
        // data-tooltip='Всплывающая подсказка'
        {...(prevEmpty ? {dataTooltip: 'Please add a task to the previous block'} : {})}
        >
            {!clicked ? '+ Add card' : 'Submit'}
        </button>
    )
}

export default Button;