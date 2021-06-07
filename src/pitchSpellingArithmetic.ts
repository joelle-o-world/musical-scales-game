
export const availableSpellings = [
  'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab',
]
const availableSpellingsLowercase = availableSpellings.map(s => s.toLowerCase())

export function incrementPitchSpelling(spelling: string) {
  let i = availableSpellings.indexOf(spelling)

  if(i === -1)
    return availableSpellings[0]

  else
    return availableSpellings[(i + 1) % availableSpellings.length]
}

export function decrementPitchSpelling(spelling: string) {
  let i = availableSpellings.indexOf(spelling)
  if(i === -1)
    return availableSpellings[0]
  else {
    --i
    if(i === -1)
      i = availableSpellings.length - 1

    return availableSpellings[i]
  }
}

export function searchSpelling(spelling: string) {
  let lower = spelling.toLowerCase()
  let i = availableSpellingsLowercase.indexOf(lower)
  if(i !== -1)
    return availableSpellings[i]

  // Otherwise
  i = availableSpellingsLowercase.indexOf(spelling.slice(-1))
  if(i !== -1)
    return availableSpellings[i]

  // Otherwise
  return null
}
