export interface ITableDataProps {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
};

export interface ITableDataSliceStateProps {
  datas: ITableDataProps[]
}