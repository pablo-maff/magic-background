import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { setColor } from './colorReducer'
import GlobalStyle from './GlobalStyle'

const App = () => {
  const dispatch = useDispatch()
  const selectedColor = useSelector(({ color }) => color)

  const [hexCode, setHexCode] = useState('')
  const [isInputValid, setIsInputValid] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getRandomHexNumber = async () => {
      const randomHexNumber = await axios.get(
        'http://www.randomnumberapi.com/api/v1.0/random?max=15&count=6'
      )
      const numToHex = randomHexNumber.data
        .map((number) => number.toString(16))
        .join('')

      // localStorage.setItem('storedSelectedColor', `#${numToHex}`)
      dispatch(setColor(`#${numToHex}`))
    }
    getRandomHexNumber()
  }, [dispatch])

  const handleHexCode = (e) => {
    const isValidHex = /^#([0-9a-f]{3}){1,2}$/i.test(e.target.value)

    if (isValidHex) {
      setIsInputValid(true)
      setMessage('')
      setHexCode(e.target.value)
      return
    }
    setHexCode(e.target.value)
    setIsInputValid(false)
    setMessage('You can only submit a valid hex code')
  }

  const handleSubmit = (e) => {
    if (!isInputValid) {
      return e.preventDefault()
    }
    e.preventDefault()
    dispatch(setColor(hexCode))
    setHexCode('')
    setIsInputValid(false)
  }
  return (
    <ThemeProvider theme={{ backgroundColor: `${selectedColor}` }}>
      <>
        <GlobalStyle />
        <h1>Selected color is {selectedColor}</h1>
        <form onSubmit={handleSubmit}>
          <input name='color' value={hexCode} onChange={handleHexCode} />

          {isInputValid ? (
            <button type='submit'>Change Background Color</button>
          ) : null}
        </form>
        {message}
      </>
    </ThemeProvider>
  )
}

export default App
