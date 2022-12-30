import {
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Modal as BModal } from 'react-bootstrap';
import { updateData } from '../redux/dataTable.slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { IModalProps } from '../@types/modal';

export const Modal = memo(({ isShowModal, setIsShowModal, id }: IModalProps) => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthDateString, setBirthDateString] = useState<string>('');

  const dispatch = useDispatch();

  const { datas } = useAppSelector((state) => state.datas);
  const data = datas.filter((state) => state.id === id);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formatteBirthDate = new Date(birthDateString);
      const birthDate = new Date(formatteBirthDate);
      dispatch(updateData({ id, firstName, lastName, gender, birthDate }));
      setIsShowModal(!isShowModal);
    }
    setValidated(true);
  };

  function getMinDate() {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 80);
    return minDate.toISOString().substring(0, 10);
  }

  function getMaxDate() {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 18);
    return maxDate.toISOString().substring(0, 10);
  }

  useEffect(() => {
    if (data.length > 0) {
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setGender(data[0].gender);
      setBirthDateString(data[0].birthDate.toISOString());
      setValidated(true);
    }
  }, [id]);

  return (
    <>
      <BModal show={isShowModal} onHide={() => setIsShowModal(!isShowModal)}>
        <BModal.Header closeButton>
          <BModal.Title>Edit Person</BModal.Title>
        </BModal.Header>
        <BModal.Body>
          {data.length > 0 && (
            <Form
              className="container"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    pattern="[A-Za-z]{3,}"
                    title="First name must have at least 3 letters and no numbers"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valide first name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    pattern="[A-Za-z]{3,}"
                    title="Last name must have at least 3 letters and no numbers"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valide last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    title="please select one option of gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid gender.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={birthDateString.substring(0, 10)}
                    onChange={(e) => setBirthDateString(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Date must be between 18 and 80 years
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setIsShowModal(!isShowModal)}>
                  Close
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </Form>
          )}
        </BModal.Body>
      </BModal>
    </>
  );
});
