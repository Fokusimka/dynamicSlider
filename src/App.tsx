import React from 'react'

import './App.css';
import Slider from './components/slider/slider';
import CheckBox from './components/checkbox/checkbox';
import FileInput from './components/fileInput/fileInput';
import AttachList from './components/attachList/attachList';

const getEnding = (value: number) => {
  let res = ''
  switch (value) {
    case 1:
      res = 'а'
      break;
    default: 
      res = 'ов'
  }
  return res
}

function App() {
  const [images, setImages] = React.useState<any>([])
  const [error, setError] = React.useState('')
  const [hasName, setHasName] = React.useState(false)

  const onChangeFiles = (event: any) => {
    setError('')
    if (event.target.files.length) {
      if (event.target.files.length > 48) {
        setError(`Доступно к загрузке не более 48 файлов. Сейчас загружено: ${event.target.files.length}`)
        return
      }
      let newArr = [], errorFiles = 0
      for (let i = 0; i < event.target.files.length; i ++) {
        if (event.target.files[i].type.includes('image/')) {
          setImages([])
          newArr.push(event.target.files[i])
        } else {
          errorFiles += 1
          setError(`У ${errorFiles} файл${getEnding(errorFiles)} не верный формат (Не является картинкой)`)
        }
      }
      setImages(newArr)
    }
  }

  const removeImage = (name: string) => {
    let newArr = images.filter((image: any) => image.name !== name)
    setImages(newArr)
  }

  return (
    <div className="App">
      <h1>Слайдер</h1>

      <div className='check'>
        <span>Добавлять имена слайдов: </span>
        <CheckBox callback={(value: boolean) => setHasName(value)} />
      </div>

      <Slider data={images} hasName={hasName} />
      <FileInput 
        onChangeFiles={(event) => onChangeFiles(event)}
        title={images.length !== 0 ? 'Изменить список фото' : 'Добавить фото'}
      />
      {images.length !== 0 &&
        <AttachList data={images} removeItem={removeImage} />
      }

      <div className='error'>{error}</div>
    </div>
  );
}

export default App;
