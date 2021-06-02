
export const availableSpellings = [
  'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab',
]

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
