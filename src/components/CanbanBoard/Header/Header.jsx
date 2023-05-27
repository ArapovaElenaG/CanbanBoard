import React from 'react';



function Header() {
    const [clickedArrow, setClickedArrow] = React.useState(false);

    const handleArrow = () => {
        setClickedArrow(!clickedArrow)
    }

    return (
        <div className='header'>
            <div className='titleHeader'>Canban Board by Elena Arapova</div>
            <div className='user'>
                <div className='avatar'></div>
                <img src="images/Vector.svg" width="12" onClick={handleArrow} className={clickedArrow ? 'arrowRotate' : ''}/>
            </div>
            {clickedArrow 
            && 
            <div className='wrapperDropDownHeader'>
                <div className='dropDownHeader'>
                    <div className='itemDropDownHeader'>Profile</div>
                    <div className='itemDropDownHeader'>Log Out</div>
                </div>
            </div>
            }
        </div>
    )
}

export default Header;