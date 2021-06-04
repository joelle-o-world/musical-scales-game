
const scales:Scale[] = (() => {
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
  let scales = []
  for(const key in solutions)
    scales.push({
      name: key,
      steps: solutions[key].split(' ')
    })
  return scales
})()


interface Scale {
  name: string;
  steps: string[]
}


//type CheckedSolution = {correct: false} | {
  //correct: false;
  //closestScale: Scale;
  //report: any
//} | {
  //correct: true,
  //scale: Scale,
//}

export function checkSolution(steps: string[]){


  let scaleReports = scales.map(scale => {
    const noteByNote = steps.map((step,i) => scale.steps[i%scale.steps.length] === step)
    const correctDegrees = []
    const incorrectDegrees = []
    for(let i=0; i < noteByNote.length; ++i) {
      if(noteByNote[i])
        correctDegrees.push(i)
      else
        incorrectDegrees.push(i)
    }

    const score = correctDegrees.length

    const stepsAreDiatonic = steps.every(step => scale.steps.includes(step))
    const allNotesPresent = scale.steps.every(step => steps.includes(step))
    const stepsAreUnique = steps.every((step, i) => !steps.slice(i+1).includes(step))
    const perfectMatch = score === steps.length

    return {
      scale,
      correctDegrees,
      incorrectDegrees,
      score,
      stepsAreDiatonic,
      allNotesPresent,
      stepsAreUnique,
      perfectMatch,
    }
  })

  let winner
  for(let report of scaleReports)
    if(!winner || report.score > winner.score)
      winner = report

  if(!winner) {
    return {
      correct: false
    }
  }

  if(winner.perfectMatch) {
    return {
      correct: true,
      scale: winner.scale,
      report: winner,
    }
  } else
    return {
      correct: false,
      closestScale: winner.scale,
      report: winner,
    }
}

export default checkSolution;
