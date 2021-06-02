
const solutions = (() => {
  let solutions:{[key: string]: string} = {
    'C Major': 'C D E F G A B',
    'Db Major': 'Db Eb F Gb Ab Bb C',
    'D Major': 'D E F# G A B C#',
    'Eb Major': 'Eb F G Ab Bb C D',
    'E Major': 'E F# G# A B C# D#',
    'F Major': 'F G A Bb C D E',
    'F# Major': 'F# G# A# B C# D# F',
    'Gb Major': 'Gb Ab Bb B Db Eb F',
    'G Major': 'G A B C D E F#',
    'Ab Major': 'Ab Bb C Db Eb F G',
    'A Major': 'A B C# D E F# G#',
    'Bb Major': 'Bb C D Eb F G A',
    'B Major': 'B C# D# E F# G# A#',
  }
  let solutionsParsed:{[key: string]: string[]} = {}
  for(const key in solutions)
    solutionsParsed[key] = solutions[key].split(' ')
  return solutionsParsed
})()


export function checkSolution(steps: string[]): {
  correct: boolean;
  scale?: string;
  reason?: string;
} {
  for(let scale in solutions) {
    const scaleSteps = solutions[scale]

    let score = 0
    for(let i=0; i < steps.length; ++i)
      if(scaleSteps[i%scaleSteps.length] === steps[i])
        ++score

    const perfectMatch = score === steps.length

    if(perfectMatch)
      return {
        correct: true,
        scale,
      }
  }

  // Otherwise
  for(let scale in solutions) {
    const scaleSteps = solutions[scale]
    const stepsAreDiatonic = steps.every(step => scaleSteps.includes(step))
    //const stepsAreUnique = steps.every((step, i) => !steps.slice(i+1).includes(step))
    const allNotesPresent = scaleSteps.every(step => steps.includes(step))

    if(stepsAreDiatonic)
      return {
        correct: false,
        scale,
        reason: `You have the ${ allNotesPresent ? 'all' : 'some of' } right notes for ${scale} but not in the right order`
      }

  }

  // Otherwise
  return {
    correct: false,
  }
}

export default checkSolution;
