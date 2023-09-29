import React, { useState, useEffect } from "react"

export default function Form() {
  const [meme, setMeme] = React.useState({
    firstText: "",
    secondText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  })
  const [currentMeme, setCurrentMeme] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setCurrentMeme(data.data.memes)
    }
    fetchData()
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target
    setMeme((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const getRandomMeme = () => {
    const randomNumber = Math.floor(Math.random() * currentMeme.length)
    const url = currentMeme[randomNumber].url
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div>
      <div className="container2">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter text here"
            value={meme.firstText}
            name="firstText"
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Enter more text here"
            value={meme.secondText}
            name="secondText"
            onChange={handleInput}
          />
          <button onClick={getRandomMeme}>Get a new meme image 🖼</button>
        </form>
        <div className="image-container">
          <img src={meme.randomImage} alt="Meme" className="meme" />
          <h2 className="meme--text top-text">{meme.firstText}</h2>
          <h2 className="meme--text bottom-text">{meme.secondText}</h2>
        </div>
      </div>
    </div>
  )
}
