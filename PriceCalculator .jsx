import React, { useState } from 'react';

const PriceCalculator = () => {
  const [inputSets, setInputSets] = useState([
    { width: '', height: '', price: '', quantity: '', totalPrice: 0 }
  ]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [error, setError] = useState('');
  const [report, setReport] = useState('');

  const handleInputChange = (index, field, value) => {
    const updatedInputSets = [...inputSets];
    updatedInputSets[index][field] = value;

    // Calculate the total price for the specific input set
    const parsedWidth = parseFloat(updatedInputSets[index].width);
    const parsedHeight = parseFloat(updatedInputSets[index].height);
    const parsedPrice = parseFloat(updatedInputSets[index].price);
    const parsedQuantity = parseInt(updatedInputSets[index].quantity);

    if (parsedWidth > 0 && parsedHeight > 0 && parsedPrice > 0 && parsedQuantity > 0) {
      updatedInputSets[index].totalPrice = (parsedWidth * parsedHeight * parsedPrice * parsedQuantity).toFixed(2);
    } else {
      updatedInputSets[index].totalPrice = 0;
    }

    setInputSets(updatedInputSets);
  };

  const addInputSet = () => {
    setInputSets([...inputSets, { width: '', height: '', price: '', quantity: '', totalPrice: 0 }]);
  };

  const removeInputSet = (index) => {
    const updatedInputSets = inputSets.filter((_, i) => i !== index);
    setInputSets(updatedInputSets);
  };

  const calculateGrandTotal = () => {
    let totalPrice = 0;
    let valid = true;

    inputSets.forEach(({ totalPrice }) => {
      const parsedTotalPrice = parseFloat(totalPrice);

      if (parsedTotalPrice >= 0) {
        totalPrice += parsedTotalPrice;
      } else {
        valid = false;
      }
    });

    if (valid) {
      setGrandTotal(totalPrice.toFixed(2));
      setError('');
    } else {
      setGrandTotal(0);
      setError('Please enter valid positive numbers for all fields.');
    }
  };

  const generateReport = () => {
    const reportContent = inputSets.map((inputSet, index) => (
      `Set ${index + 1} - Width: ${inputSet.width}, Height: ${inputSet.height}, Price: ${inputSet.price}, Quantity: ${inputSet.quantity}, Total Price: ${inputSet.totalPrice}\n`
    )).join('');
    setReport(reportContent);
  };

  return (
    <div>
      <h2>Price Calculator</h2>
      {inputSets.map((inputSet, index) => (
        <div
          key={index}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'center' }}
        >
          <div>
            <label htmlFor={`width-${index}`}>Width:</label>
            <input
              type="number"
              id={`width-${index}`}
              value={inputSet.width}
              onChange={(e) => handleInputChange(index, 'width', e.target.value)}
              placeholder="Width in meters"
            />
          </div>
          <div>
            <label htmlFor={`height-${index}`}>Height:</label>
            <input
              type="number"
              id={`height-${index}`}
              value={inputSet.height}
              onChange={(e) => handleInputChange(index, 'height', e.target.value)}
              placeholder="Height in meters"
            />
          </div>
          <div>
            <label htmlFor={`price-${index}`}>Price:</label>
            <input
              type="number"
              id={`price-${index}`}
              value={inputSet.price}
              onChange={(e) => handleInputChange(index, 'price', e.target.value)}
              placeholder="Price per square meter"
            />
          </div>
          <div>
            <label htmlFor={`quantity-${index}`}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${index}`}
              value={inputSet.quantity}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
              placeholder="Quantity"
            />
          </div>
          <div>
            <label>Total Price:</label>
            <span>${inputSet.totalPrice}</span>
          </div>
          <button type="button" onClick={() => removeInputSet(index)} style={{ marginLeft: '10px' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addInputSet}>Add More</button>
      <button type="button" onClick={calculateGrandTotal} style={{ marginLeft: '10px' }}>Calculate Grand Total</button>
      <button type="button" onClick={generateReport} style={{ marginLeft: '10px' }}>Generate Report</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Grand Total Price: ${grandTotal}</h3>
      </div>
      {report && (
        <div>
          <h3>Report:</h3>
          <pre>{report}</pre>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
