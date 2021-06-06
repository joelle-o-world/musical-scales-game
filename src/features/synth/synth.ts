import parsePitch from '../../pitch'
import PlaceholderSampleFile from '../../samples/placeholder_midi60.wav'

export function downloadArrayBuffer(url: string):Promise<ArrayBuffer> {
  return new Promise((fulfil, reject) => {
    const request = new XMLHttpRequest()
    request.open('get', url)
    request.responseType = 'arraybuffer'
    request.onload = () => {
      fulfil(request.response);
    }
    request.onerror = err => {
      reject(err);
    }
    request.send()
  })
}

export async function downloadAudioBuffer(url: string):Promise<AudioBuffer> {
  const arraybuffer = await downloadArrayBuffer(url)

  const ctx = new AudioContext()
  const audioBuffer = await ctx.decodeAudioData(arraybuffer)

  return audioBuffer
}

class Synth {
  ctx: AudioContext
  destination: AudioDestinationNode
  sample?: AudioBuffer;

  constructor(sampleUrl: string = PlaceholderSampleFile) {
    this.ctx = new AudioContext()
    this.destination = this.ctx.destination
    downloadAudioBuffer(sampleUrl).then(audiobuffer => {
      this.sample = audiobuffer
    })
  }

  play(pitch:number|string, time = this.ctx.currentTime, onended: (() => void)|null=null) {
    console.log(`play(${pitch})`);
    if(typeof pitch === 'string') {
      let parse = parsePitch(pitch)
      if(parse && parse.midiNumber)
        pitch = parse.midiNumber
      else {
        console.warn('Unable to parse pitch:', pitch);
        return
      }
    }

    if(this.sample) {
      this.ctx.resume()
      let source = this.ctx.createBufferSource()
      source.buffer = this.sample
      source.playbackRate.value = Math.pow(2, (pitch-60)/12)
      source.connect(this.destination)
      source.start(time)
      source.onended = onended
    } else
      console.warn("Attempt to play sample before it is loaded")
  }
}

let persistantSynth: Synth
export function useSynth():Synth {
  if(!persistantSynth)
    persistantSynth = new Synth
  return persistantSynth
}

