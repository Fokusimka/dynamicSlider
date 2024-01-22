import React from 'react'

import './checkbox.css'

type checkBoxProps = {
    callback: (value: boolean) => void
}

const CheckBox = ({callback}: checkBoxProps) => {
    const [checked, setChecked] = React.useState(false)

    function handleChange(value: boolean) {
        setChecked(value)
        callback(value)
    }

    return (
        <>
            <label onClick={() => handleChange(!checked)} className={checked ? 'checkBox checked' : 'checkBox'} htmlFor='check'>
                {checked && <span className='checkBoxChecked'>✓</span>}
            </label>
            <input className='legasyInput' id='check' type='checkbox' />
        </>
    )
}

export default CheckBox