import React, { useState } from "react";
import QRCode from "qrcode.react";

const MyQRCodeComponent = ({ setQrValue }) => {
  const [text, setText] = useState("");

  function generateQR() {
    setText(text);
    setQrValue(text);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="qr">
      <h1>My QR Code</h1>
      <QRCode size={100} bgColor="white" fgColor="black" value={text} />

      <div className="input">
        <p>Legg til Url:</p>
        <input type="text" value={text} onChange={handleChange} />
        <input
          className="button"
          onClick={generateQR}
          type="button"
          value="Generer"
        />
      </div>
    </div>
  );
};

export default MyQRCodeComponent;
