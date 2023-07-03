import { useState } from 'react';
import QRCode from 'react-qr-code';

import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [size, setSize] = useState(200);
  const [isShowCode, setIsShowCode] = useState(false);

  const showCode = () => {
    setIsShowCode(true);
  };

  const closeCode = () => {
    setIsShowCode(false);
    setInputText('');
  };

  return (
    <div className='app'>
      <h2>QR Code Generator</h2>
      <div className='top-bar'>
        <div className='input-titles'>
          <h4 className='input-name'>Enter your text here</h4>
          <h4 className='input-name'>Select size</h4>
        </div>
        <div className='input-fields'>
          <input
            className='input-data'
            type='text'
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <select className='input-data' onChange={(e) => setSize(e.target.value)}>
            <option value={100}>100</option>
            <option selected value={200}>
              200
            </option>
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
      </div>
      <div className='buttons'>
        <button className='btn' onClick={showCode}>
          Generate
        </button>
        <button className='btn' onClick={closeCode}>
          Clear
        </button>
      </div>
      {isShowCode && inputText !== '' && (
        <div className='qr-container'>
          <QRCode size={size} value={inputText} viewBox={`0 0 256 256`} />
        </div>
      )}
    </div>
  );
};

export default App;
