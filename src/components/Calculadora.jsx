import { useState } from 'react'
import Boton from './Boton'
import './Calculadora.css'


const Calculadora = () => {

    const [ data, setData ] = useState({ operacion: '', resultado: '' })

    const escritura = (event) => {

        const valor = event.target.innerText
        const esOperacion = valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '%'

        if (data.operacion.length >= 10)
            return

        if (valor === '+/-' && data.operacion === '')
            return

        if (valor === '%' && data.operacion.includes('%'))
            return

        if (data.operacion.includes('Error')) {
            setData({ ...data, operacion: valor })
        } else if (data.resultado !== '' && data.operacion === '' && esOperacion) {
            setData({ ...data, operacion: `${data.resultado} ` + valor })
        } else if (valor === '+/-' && data.operacion !== '') {
            if (data.operacion.slice(0, 1) === '-') {
                setData({ ...data, operacion: `${data.operacion.slice(1, data.operacion.length)}` })
            } else {
                setData({ ...data, operacion: `-${data.operacion}` })
            }
        } else {
            setData({ ...data, operacion: `${data.operacion}` + valor })
        }

    }

    const eliminar = () => {
        setData({ ...data, operacion: data.operacion.slice(0, data.operacion.length - 1) })
    }

    const limpiar = () => {
        setData({ operacion: '', resultado: '' })
    }

    const resultado = () => {
        try {
            let resultado = ''

            if (data.operacion.includes('%')) {
                const valores = data.operacion.split('%')
                resultado = eval(`${valores[ 1 ]} * (${valores[ 0 ]}/100)`)
            } else {
                resultado = eval(data.operacion)
            }

            setData({ ...data, resultado, operacion: '' })
        } catch (error) {
            setData({ ...data, operacion: 'Error' })
        }

    }

    return (
        <main>
          
            <span className='resultado' >{data.resultado} </span>
            <span className='display'>{data.operacion} </span>
            <Boton texto='C' clase='gris' handleClick={limpiar} ></Boton>
            <Boton texto='+/-' clase='gris' handleClick={escritura}></Boton>
            <Boton texto='%' clase='gris' handleClick={escritura}></Boton>
            <Boton texto='/' clase='operacion' handleClick={escritura}></Boton>
            <Boton texto='7' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='8' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='9' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='*' clase='operacion' handleClick={escritura}></Boton>
            <Boton texto='4' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='5' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='6' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='-' clase='operacion' handleClick={escritura}></Boton>
            <Boton texto='1' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='2' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='3' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='+' clase='operacion' handleClick={escritura}></Boton>
            <Boton texto='.' clase='numero' handleClick={escritura}></Boton>
            <Boton texto='0' clase='numero' handleClick={escritura} ></Boton>
            <Boton texto='◄' clase='numero' handleClick={eliminar} ></Boton>
            <Boton texto='=' clase='operacion' handleClick={resultado} ></Boton>
        </main>
    )
}

export default Calculadora