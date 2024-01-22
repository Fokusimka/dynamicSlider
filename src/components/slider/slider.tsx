import React from 'react'

import './slider.css'

type sliderProps = {
    width?: number
    height?: number
    data: any[]
    hasName?: boolean
}

const Slider = ({width, height, data, hasName}: sliderProps) => {

    const sliderWidth = width || 600

    const [offset, setOffset] = React.useState(-sliderWidth)
    const [transition, setTransition] = React.useState(0.3)

    //Создание массива слайдов с дубликатами 1го и последнего элементов для визуализации бесшовного перехода
    const getFullCarousel = () => {
        let res = [], newArr = []
        newArr.push(data[data.length - 1])
        res = newArr.concat(data)
        res.push(data[0])
        return res
    }

    //Переключение слайда вперёд
    const next = () => {
        if (transition !== 0)
            setOffset(offset - sliderWidth)
    }

    //Переключение слайда назад
    const prev = () => {
        if (transition !== 0)
            setOffset(offset + sliderWidth)
    }

    //Переключиться на выбранный слайд
    const goTo = (id: number) => {
        setOffset(-(sliderWidth * id))
    }


    //Отслеживаем первый и последний слайд для бесшовного перехода в конец и начало списка слайдов
    React.useEffect(() => {
        if (offset >= 0) {
            setTransition(0)
            setTimeout(() => setOffset(-(sliderWidth * data.length)), 300)
            setTimeout(() => setTransition(0.3), 350);
        }
        if (offset <= -(sliderWidth * data.length + 1)) {
            setTransition(0)
            setTimeout(() => setOffset(-sliderWidth), 300)
            setTimeout(() => setTransition(0.3), 350);
        }
    }, [offset])

    //Ставим первый слайд, в случае, если находимся на последнем и удаляем его
    React.useEffect(() => {
        if (Math.abs(offset / sliderWidth) > data.length){
            goTo(1)
        }
    }, [data.length])

    return (
        data.length !== 0 ? (
            <div className='container' style={{width: sliderWidth, height: height ? height : 400}}>
                <div onClick={prev} className='sliderControl left'>
                <div className='sliderControlLeft' >^</div>
                </div>
                <div className='slider' style={{transform: `translateX(${offset}px)`, transition: `all ${transition}s`}}>
                    {getFullCarousel().map((slide) => 
                    
                        <div className='slide' >
                            <div className='slideImage' style={{maxWidth: sliderWidth}} >
                                <img src={`${URL.createObjectURL(slide)}`} alt='Тут должна быть картинка' height={height ? height : 400} />
                                {hasName && <div className='slideName'><span>{slide.name.split('.')[0]}</span></div>}
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={next} className='sliderControl right'>
                <div className='sliderControlRight' >^</div>
                </div>
                <div className='sliderDots'>
                    {data.length > 1 && data.map((image, index) => (
                        <div 
                            className={Math.abs(offset / sliderWidth) === index + 1 ? 'sliderDot selected' : 'sliderDot'}
                            onClick={() => goTo(index + 1)}
                        ></div>
                    ))}
                </div>
            </div>
        ) : (
            <div className='emptySlider' style={{width: sliderWidth, height: height ? height : 400}}>
                Нет слайдов
            </div>
        )
    )
}

export default Slider