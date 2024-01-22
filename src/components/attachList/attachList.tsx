import React from 'react'

import './attachList.css'

type attachListProps = {
    data: any[]
    removeItem: (name: string) => void
}

const AttachList = ({data, removeItem}: attachListProps) => {
    return (
        <div className='attachList'>
          Список из {data.length} фото:
          {data.map((item: any) => (
            <div className='attachItem'>
              <span>{item.name}</span>
              <span onClick={() => removeItem(item.name)} className='attachRemove'>x</span>
            </div>
          ))}
        </div>
    )
}

export default AttachList