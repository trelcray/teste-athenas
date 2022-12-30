export interface IAlertProps {
  children: ReactNode;
  isShowAlert: boolean;
  setIsShowAlert: Dispatch<SetStateAction<boolean>>;
}