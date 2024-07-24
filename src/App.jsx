import { useState } from 'react'
import './App.css'

function App() {

  const calcButtons = [
    {
      symbol: '9',
      name: 'nine',
      tag: 'integer'
    },
    {
      symbol: '8',
      name: 'eight',
      tag: 'integer'
    },
    {
      symbol: '7',
      name: 'seven',
      tag: 'integer'
    },
    {
      symbol: '6',
      name: 'six',
      tag: 'integer'
    },
    {
      symbol: '5',
      name: 'five',
      tag: 'integer'
    },
    {
      symbol: '4',
      name: 'four',
      tag: 'integer'
    },
    {
      symbol: '3',
      name: 'three',
      tag: 'integer'
    },
    {
      symbol: '2',
      name: 'two',
      tag: 'integer'
    },
    {
      symbol: '1',
      name: 'one',
      tag: 'integer'
    },
    {
      symbol: '0',
      name: 'zero',
      tag: 'integer'
    },
    {
      symbol: '.',
      name: 'decimal',
      tag: 'integer'
    },
    {
      symbol: 'Clear',
      name: 'clear',
      tag: 'operator'
    },
    {
      symbol: '=',
      name: 'equals',
      tag: 'operator'
    },
    {
      symbol: '+',
      name: 'add',
      tag: 'operator'
    },
    {
      symbol: '-',
      name: 'subtract',
      tag: 'operator'
    },
    {
      symbol: '*',
      name: 'multiply',
      tag: 'operator'
    },
    {
      symbol: '/',
      name: 'divide',
      tag: 'operator'
    },
    {
      symbol: '%',
      name: 'modulo',
      tag: 'operator'
    }
  ];

  const [input, setInput] = useState('0');

  const handleClick = (symbol) => {

    setInput(prevInput => {
      switch (symbol) {
        case 'Clear':
          return '0';
        case '=':
          try {
            // Process the input before evaluation
            const processedInput = processInput(prevInput);
            const result = eval(processedInput);
            return Number.isFinite(result) ? result.toString() : 'Error';
          } catch (error) {
            return 'Error';
          }
        case '.':
          const parts = prevInput.split(/[-+*\/]/).filter(Boolean);
          const lastPart = parts[parts.length - 1];
          if (!lastPart.includes('.')) {
            return prevInput + symbol;
          }
          return prevInput;
        default:
          if (prevInput === '0' && '+-*/'.indexOf(symbol) === -1) {
            return symbol;
          } else {
            return prevInput + symbol;
          }
      }
    });

  };

  const processInput = (input) => {
    // Use a regular expression to find sequences of operators
    return input.replace(/([+\-*/]{2,})(\d)/g, (match, operators, digit) => {
      // Keep the last operator, unless it's a minus sign preceded by another operator
      let lastOperator = operators.slice(-1);
      if (lastOperator === '-' && operators.length > 1) {
        lastOperator = operators.slice(-2, -1) + lastOperator;
      }
      return lastOperator + digit;
    });
  };

  return (
    <>
      <div className='container'>

        <div className='calculator'>

          <div id='display'>
            { input }
          </div>
        
          {calcButtons.map(({ name, symbol, tag }) => (
            <button
            id={ name }
            key={ name }
            className={ tag }
            onClick={ () => handleClick(symbol) }
            >
              { symbol }
            </button>
          ))}

        </div>

      </div>
    </>
  )
}

export default App
