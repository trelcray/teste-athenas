import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Alert as BAlert } from 'react-bootstrap';
import { IAlertProps } from '../@types/alert';

export const Alert = ({
  children,
  isShowAlert,
  setIsShowAlert,
}: IAlertProps) => {
  if (isShowAlert) {
    return (
      <BAlert
        variant="light"
        onClose={() => setIsShowAlert(false)}
        dismissible
        className="position-absolute mx-auto"
        style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <BAlert.Heading className='text-dark mb-3'>Are you sure you want to delete this?</BAlert.Heading>
        {children}
      </BAlert>
    );
  } else {
    return null;
  }
};