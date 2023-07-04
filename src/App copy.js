import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { renderToString } from 'react-dom/server';

import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [size, setSize] = useState(200);
  const [theme, setTheme] = useState('default');
  const colorThemes = {
    default: { color: 'black', bgColor: 'white' },
    dark: { color: 'white', bgColor: 'black' },
    pastel: { color: 'pink', bgColor: 'lightblue' },
    vibrant: { color: 'purple', bgColor: 'orange' },
    blueSky: { color: 'white', bgColor: 'skyblue' },
    earthy: { color: 'darkgreen', bgColor: 'lightbrown' },
    freshGreen: { color: 'white', bgColor: 'green' },
    warmSunset: { color: 'darkred', bgColor: 'yellow' },
    oceanBreeze: { color: 'white', bgColor: 'lightseagreen' },
    elegantMonochrome: { color: 'darkgray', bgColor: 'lightgray' },
    modern: { color: 'lime', bgColor: 'darkblue' },
    cosmic: { color: 'navy', bgColor: 'darkviolet' },
    sunnyDay: { color: 'darkorange', bgColor: 'lemonchiffon' },
    romantic: { color: 'crimson', bgColor: 'mistyrose' },
    royal: { color: 'gold', bgColor: 'royalblue' },
    freshSpring: { color: 'forestgreen', bgColor: 'palegreen' },
    elegantGold: { color: 'goldenrod', bgColor: 'black' },
    dreamy: { color: 'mediumorchid', bgColor: 'lavender' },
    tropical: { color: 'coral', bgColor: 'turquoise' },
    retro: { color: 'orangered', bgColor: 'chartreuse' },
    modernMonochrome: { color: 'darkslategray', bgColor: 'whitesmoke' },
  };

  const saveQR = () => {
    const svgString = renderToString(
      <QRCode
        size={size}
        value={inputText}
        fgColor={colorThemes[theme].color}
        bgColor={colorThemes[theme].bgColor}
      />
    );
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');

      downloadLink.download = `QR ${inputText}`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    img.src = svgUrl;
  };

  const closeCode = () => {
    setInputText('');
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleNextTheme = () => {
    const themeKeys = Object.keys(colorThemes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];
    setTheme(nextTheme);
  };

  const handlePreviousTheme = () => {
    const themeKeys = Object.keys(colorThemes);
    const currentIndex = themeKeys.indexOf(theme);
    const previousIndex = (currentIndex - 1 + themeKeys.length) % themeKeys.length;
    const previousTheme = themeKeys[previousIndex];
    setTheme(previousTheme);
  };

  return (
    <div className='app'>
      <h2>QR Code Generator</h2>
      <div className='input-container'>
        <label>Text:</label>
        <input type='text' onChange={(e) => setInputText(e.target.value)} value={inputText} />
      </div>
      <div className='input-container'>
        <label>Size:</label>
        <select onChange={(e) => setSize(e.target.value)}>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={600}>600</option>
          <option value={700}>700</option>
          <option value={800}>800</option>
          <option value={900}>900</option>
          <option value={1000}>1000</option>
        </select>
      </div>
      <div className='input-container'>
        <label>Color theme:</label>
        <div className='theme-buttons'>
          <button onClick={handlePreviousTheme}>Previous</button>
          <select onChange={handleThemeChange} value={theme}>
            {Object.keys(colorThemes).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button onClick={handleNextTheme}>Next</button>
        </div>
      </div>

      <div className='buttons'>
        <button onClick={saveQR}>Save</button>
        <button onClick={closeCode}>Clear</button>
      </div>
      {inputText !== '' && (
        <div className='qr-container'>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={inputText}
            fgColor={colorThemes[theme].color}
            bgColor={colorThemes[theme].bgColor}
            viewBox='0 0 256 256'
          />
        </div>
      )}
    </div>
  );
};

export default App;
