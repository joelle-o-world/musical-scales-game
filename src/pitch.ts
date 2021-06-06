// Pitch utility functions
export const keyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const flatKeyNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
export const sharpKeyNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']


export const octaveOf = (p: number) => Math.floor(p / 12);
export const pitchClassOf = (p: number, twelve=12) => {
  while(p < 0)
    p += twelve;
  return p%twelve
}
export const isBlackNote = (p: number) => [1,3,6,8,10].includes(pitchClassOf(p))

export function printPitch(p: number, {
  includeOctave=true, 
  enharmonicPreference='#',
}={}) {
  const pc = pitchClassOf(p);
  const keyName = (
    enharmonicPreference == '#' ? sharpKeyNames : flatKeyNames
  )[pc]
  const octave = octaveOf(p);

  if(includeOctave)
    return keyName + octave;
  else
    return keyName
}

const letterValues:{[note: string]: number} = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

export interface PitchParse {
  hasPitch?: boolean;
  midiNumber?: number;
  hasError?: boolean;
  errorMessage?: string;
  str: string;
}

export function parsePitch(inputStr:string): PitchParse {
  try {
    // Trim whitespace
    let str = inputStr.trim();

    if(str.length === 0)
      return {
        hasPitch: false,
        str,
      }

    
    
    let octaveNumber = /\d+$/.exec(str);
    let octave = 4;
    if(octaveNumber) {
      octave = parseInt(octaveNumber[0])
      str = str.slice(0, -octaveNumber[0].length)
    }

    // Get letter
    let letterResult = str[0]
    let accidentalResult = str[1];

    if(letterResult) { 
      let letter = letterResult[0].toUpperCase();
      let pitchClass = letterValues[letter];
      let midiNumber = pitchClass + octave * 12
      if(accidentalResult === '#')
        midiNumber++;
      else if(accidentalResult === 'b')
        midiNumber--;
      else if(accidentalResult)
        throw `"${inputStr}" is not a musical note`
      
      if(pitchClass !== undefined)
        return {
          hasPitch: true,
          midiNumber,
          str: inputStr,
        }
      else
        throw `"${inputStr}" is not a musical note`;
    } else
      throw "Could not find letter";
  } catch(err) {
    return {
      hasPitch: false,
      hasError: true,
      errorMessage: err,
      str: inputStr,
    }
  }
}

export default parsePitch;
