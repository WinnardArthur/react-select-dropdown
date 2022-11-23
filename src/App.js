import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

const initialColors = [
  {
    id: 1,
    colorName: 'Purple',
    primary: '#A020F0',
    secondary: '#A020F015'
  },
  {
    id: 2,
    colorName: 'Red',
    primary: '#FF0000',
    secondary: '#FF000015'
  },
  {
    id: 3,
    colorName: 'Orange',
    primary: '#FFA500',
    secondary: '#FFA50015'
  },
  {
    id: 4, 
    colorName: 'Green',
    primary: '#00FF00',
    secondary: '#00FF0015'
  },
  {
    id: 5, 
    colorName: 'Yellow',
    primary: '#FFFF00',
    secondary: '#FFFF0015'
  },
  {
    id: 6, 
    colorName: 'Slate',
    primary: '#C0C2C9',
    secondary: '#C0C2C915'
  },
  {
    id: 7, 
    colorName: 'Silver',
    primary: '#C0C0C0',
    secondary: '#C0C0C015'
  },
  {
    id: 8, 
    colorName: 'Ocean',
    primary: '#7fcdff ',
    secondary: '#7fcdff15'
  },
  {
    id: 9, 
    colorName: 'Blue',
    primary: '#0000FF',
    secondary: '#0000FF15'
  },
  {
    id: 10, 
    colorName: 'Forest',
    primary: '#228B22',
    secondary: '#228B2215'
  }
]

function App() {
  const [colors, setColors] = useState(initialColors);
  const [selectedColors, setSelectedColors] = useState([])
  const [hover, setIsHover] = useState(false);
  const [active, setActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  const handleMouseEnter = (id) => {
    setIsHover(true);
    setActive(id)
  }

  const handleMouseLeave = () => {
    setIsHover(false);
    setActive(false);
  }

  const handleAdd = (newColor) => {
    setSelectedColors(prevColors => ([...prevColors, newColor]))
    setColors(colors.filter(c => c.id !== newColor.id))
  }

  const handleRemove = (colorToRemove) => {
    let id = colorToRemove.id
    setSelectedColors(selectedColors.filter(c => c.id !== id))
    setColors(prevColors => ([...prevColors.slice(0, id - 1), colorToRemove, ...prevColors.slice(id - 1)]))   // Place removed item to its original position
  }

  return (
    <div className="App">
      <div className="container">
        <div className="dropDownBox">
          <div className='colorList'>
            <div className='selectedColors'>
              {selectedColors.length > 0 &&
                selectedColors.map((selectedColor, index) => {
                  return (
                    <div key={selectedColor.id} className='selectedColor' style={{backgroundColor: `${selectedColor.secondary}`}}>
                      <p style={{color: `${selectedColor.primary}`}}>{selectedColor.colorName}</p>
                      <MdClose 
                        style={{color: `${selectedColor.primary}`}} 
                        className='closeIcon'
                        onClick={() => handleRemove(selectedColor)}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="right-action-btns">
            <MdClose className='icons' onClick={() => setSelectedColors([])}/>
            <div className='separator'></div>
            <>
              {showDropdown ? 
              <BsChevronUp className='icons' onClick={() => setShowDropdown(false)}/>
              :
              <BsChevronDown className='icons' onClick={() => setShowDropdown(true)}/>
              }
            </>
          </div>
        </div>
        {showDropdown && 
          <div className="dropDown">
            {colors.map((color, index) => {
              return (
                <div 
                  key={index} 
                  className='singleColor' 
                  style={{color: `${color.primary}`, backgroundColor: `${hover && active === color.id ? color.secondary : ''}`}}
                  onMouseEnter= {() => handleMouseEnter(color.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleAdd(color)}
                >
                  {color.colorName}
                </div>
              )
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
