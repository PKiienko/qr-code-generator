import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import QRCode from 'react-qr-code';

import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [size, setSize] = useState(200);
  const [color, setColor] = useState('black');
  const [bgColor, setBgColor] = useState('white');

  const colorOptions = [
    'black',
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'gray',
    'white',
    'cyan',
    'magenta',
    'lime',
    'indigo',
    'teal',
    'maroon',
    'navy',
    'olive',
    'silver',
  ];
  const bgColorOptions = [
    'white',
    'black',
    'gray',
    'red',
    'green',
    'blue',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'indigo',
    'teal',
    'maroon',
    'navy',
    'olive',
    'silver',
  ];

  const saveQR = () => {
    const svgString = renderToString(
      <QRCode size={size} value={inputText} fgColor={color} bgColor={bgColor} />
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

      downloadLink.download = `QR ${inputText}.png`;
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

  return (
    <div className='app'>
      <h2>QR Code Generator</h2>
      <div className='input-container'>
        <label>Enter your text:</label>
        <input type='text' onChange={(e) => setInputText(e.target.value)} value={inputText} />
      </div>
      <div className='input-container'>
        <label>Select size:</label>
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
        <label>Select color:</label>
        <select onChange={(e) => setColor(e.target.value)}>
          {colorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className='input-container'>
        <label>Select background:</label>
        <select onChange={(e) => setBgColor(e.target.value)}>
          {bgColorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
            fgColor={color}
            bgColor={bgColor}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </div>
  );
};

export default App;
