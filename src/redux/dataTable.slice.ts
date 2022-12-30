import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITableDataProps, ITableDataSliceStateProps } from "../@types/tableData";
import { generateData } from "../utils/data";

const initialState: ITableDataSliceStateProps = {
  datas: generateData(5),
}

export const dataTableSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<ITableDataProps>) => {
      state.datas = [...state.datas, action.payload]
    },
    updateData: (state, action: PayloadAction<ITableDataProps>) => {
      const { id, firstName, lastName, gender, birthDate } = action.payload
      const dataFound = state.datas.find(datas => datas.id === id)
      if (dataFound) {
        dataFound.firstName = firstName
        dataFound.lastName = lastName
        dataFound.gender = gender
        dataFound.birthDate = birthDate
      }
    },
    deleteData: (state, action: PayloadAction<string>) => {
      const dataFound = state.datas.find(data => data.id === action.payload)
      if (dataFound) {
        state.datas.splice(state.datas.indexOf(dataFound), 1)
      }
    }

  }
})

export const { addData, updateData, deleteData } = dataTableSlice.actions;

export default dataTableSlice.reducer
