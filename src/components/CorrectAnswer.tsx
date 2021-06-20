import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';
import {selectScaleEditor} from '../features/scaleEditor/scaleEditorSlice';
import {useSynth} from '../features/synth/synth';
import parsePitch, {pitchClassOf} from '../pitch';
import PianoKeyboard from './PianoKeyboard';
import YouTube from 'react-youtube'

const youtubeVideos:{[key: string]: string} = {
  "D Major":  "ngE4Xrs9IgA",
  "G Major":  "ngE4Xrs9IgA",
  "C Major":  "Rk72m9bLrBo",
  "A Major":  "Xdx4fVxceuQ",
  "E Major":  "bfOOWtdqZIg",
  "B Major":  "o86XsPtpY5I",
  "F Major":  "J7_KdfSWw7E",
  "Bb Major": "GSoPb67MdTw",
  "Eb Major": "KBlEe5qOt4I",
  "Ab Major": "1WhynDu2B3A",
  "Db Major": "iu2XHXz343U",
}

export const CorrectAnswer: FunctionComponent = () => {
  const {report} = useSelector(selectScaleEditor)
  const synth = useSynth()

  if(!report)
    return null

  if(report && report.correct) {
    const scale = report?.scale
    if(scale) {
      const youtubeVideoId = youtubeVideos[scale.name] || null
      let pitchClasses = scale.steps.map(p => parsePitch(p)?.midiNumber)
        .filter(p => typeof p === 'number')
        // @ts-ignore
        .map((p:number) => pitchClassOf(p))
      return <div className="CorrectAnswer">
        <h2>Correct! You have spelled {scale.name}</h2>
        <PianoKeyboard 
          onNote={e => { synth.play(e.pitchNumber) }}
          lowestNote={48} 
          numberOfKeys={25}
          highlightPitchClasses={pitchClasses}
          labelKeys="# or b"
        />
        { youtubeVideoId 
          ? <YouTube videoId={youtubeVideoId} /> 
          : null}
      </div>
    } else
      throw new Error("Correct answer but no scale specified")
  }

  return null
}

export default CorrectAnswer
