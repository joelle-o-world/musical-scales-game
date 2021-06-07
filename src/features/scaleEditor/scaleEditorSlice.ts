import {RootState} from "../../app/store";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import parsePitch from "../../pitch";
import {decrementPitchSpelling,  searchSpelling, incrementPitchSpelling} from "../../pitchSpellingArithmetic";
import checkSolution from '../../checkSolution';

export interface ScaleEditorState {
  steps: string[];
  currentStep: number;
  report?: ReturnType<typeof checkSolution>;
}

const initialState: ScaleEditorState = {
  steps: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
  currentStep: 0,
}

export const scaleEditorSlice = createSlice({
  name: 'scaleEditor',
  initialState,

  reducers: {
    incrementStep: (state, action:PayloadAction<number>) => {
      let index = action.payload;
      state.steps[index] = incrementPitchSpelling(state.steps[index])
      state.report = checkSolution(state.steps)
    },
    decrementStep: (state, action:PayloadAction<number>) => {
      let index = action.payload;
      state.steps[index] = decrementPitchSpelling(state.steps[index])
      state.report = checkSolution(state.steps)
    },
    setCurrentStep: (state, action:PayloadAction<string>) => {
      let spelling = searchSpelling(action.payload)
      if(spelling) {
        state.steps[state.currentStep] = spelling
        state.report = checkSolution(state.steps)
      }
    },
    focusStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
  },
})

export const {incrementStep, decrementStep, focusStep, setCurrentStep} = scaleEditorSlice.actions;

export const selectScaleEditor = (state: RootState) => state.scaleEditor

export default scaleEditorSlice.reducer
