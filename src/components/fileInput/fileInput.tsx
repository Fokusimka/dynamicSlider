import React from 'react'

import './fileInput.css'

type fileInputProps = {
    onChangeFiles: (event: React.FormEvent<HTMLLabelElement>) => void
    title: string
}

const FileInput = ({onChangeFiles, title}: fileInputProps) => {
    return (
        <label onChange={(event) => onChangeFiles(event)} htmlFor='attach' >
            <input id='attach' type='file' multiple accept='image/*' hidden />
            <div className='attachContainer'>
            <span className='attachChange'>{title}</span>
            </div>
        </label>
    )
}

export default FileInput