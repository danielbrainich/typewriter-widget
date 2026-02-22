'use client'

import Key from './Key'

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
]

export function flashKey(char) {
  const mapped = char === ' ' ? 'SPACE' : char === 'Backspace' ? '←' : char === 'FILE' ? 'FILE' : char.toUpperCase()
  window.dispatchEvent(new CustomEvent('typewriter-key', { detail: mapped }))
}

export default function Keyboard({ onKeyPress, onFile }) {
  return (
    <div className="flex flex-col items-center gap-2 pb-5 pt-5">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-[7px] items-center">
          {ri === 0 && <Key label="TAB" wide onClick={() => onKeyPress('\t')} />}
          {row.map((k) => (
            <Key key={k} label={k} onClick={() => onKeyPress(k)} />
          ))}
          {ri === 0 && <Key label="←" wide onClick={() => onKeyPress('Backspace')} />}
          {ri === 2 && <Key label="RETURN" wide onClick={() => onKeyPress('\n')} />}
          {ri === 3 && <Key label="SHIFT" wide />}
        </div>
      ))}
      <div className="flex gap-[7px] items-center mt-1">
        <Key label="CTRL" wide />
        <Key label="SPACE" extraWide onClick={() => onKeyPress(' ')} />
        <Key label="ALT" wide />
      </div>
      {/* FILE key */}
      <div className="mt-3">
        <Key label="FILE IT" wide onClick={onFile} />
      </div>
    </div>
  )
}