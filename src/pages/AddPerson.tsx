import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addData } from '../redux/dataTable.slice';
import '../scss/addPerson.scss';

interface Props {}

export const AddPerson = ({}: Props) => {
  const [validated, setValidated] = useState(false);
  const [firstNamePerson, setFirstNamePerson] = useState<string>('');
  const [lastNamePerson, setLastNamePerson] = useState<string>('');
  const [genderPerson, setGenderPerson] = useState<string>('');
  const [birthDatePerson, setBirthDatePerson] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const generateId = () => {
        let id = '';
        const possible = 'abcdefhjijklmnopqrstuvwxyz1234567890';
        for (let i = 0; i < 3; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return id;
      };

      const person = {
        id: generateId(),
        firstName: firstNamePerson,
        lastName: lastNamePerson,
        gender: genderPerson,
        birthDate: new Date(birthDatePerson),
      };
      dispatch(addData(person));
      navigate('/');
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

  return (
    <Form
      className="container"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="d-flex min-h flex-col justify-content-center align-self-center">
        <p className="h1 text-center">Add Person</p>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstNamePerson(e.target.value)}
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
              placeholder="Last name"
              onChange={(e) => setLastNamePerson(e.target.value)}
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
              onChange={(e) => setGenderPerson(e.target.value)}
              title="please select one option of gender"
            >
              <option value="">select a gender</option>
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
              pattern="mm-dd-yyyy"
              placeholder="mm-dd-yyyy"
              min={getMinDate()}
              max={getMaxDate()}
              onChange={(e) =>  setBirthDatePerson(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Date must be between 18 and 80 years
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="w-100" type="submit">
          Submit form
        </Button>
        <Button
          className="w-100 mt-2"
          variant="secondary"
          type="button"
          onClick={() => navigate('/')}
        >
          Go back
        </Button>
      </div>
    </Form>
  );
};
