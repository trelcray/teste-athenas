import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "../scss/addPerson.scss";

interface Props {}

export const AddPerson = ({}: Props) => {
  const [validated, setValidated] = useState(false);
  const [isInvalidatedDate, setIsInvalidatedDate] = useState<boolean>();

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || isInvalidatedDate === true) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const validateAge = (e: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const birthDate = new Date(e);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let age = currentYear - birthYear;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age -= 1;
    }

    if (age < 18 || age > 80) {
      setIsInvalidatedDate(true);
    } else {
      setIsInvalidatedDate(false);
    }
  };

  return (
    <Form
      className="container"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}>
      <div className="d-flex min-h flex-col justify-content-center align-self-center">
        <p className="h1 text-center">Add Person</p>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
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
            <Form.Select required title="please select one option of gender">
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
              isInvalid={isInvalidatedDate}
              onChange={(e) => validateAge(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Date must be between 18 and 80 years
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button className="w-100" type="submit">
          Submit form
        </Button>
        <Button className="w-100 mt-2" variant="secondary" type="button" onClick={() => navigate("/")}>
          Go back
        </Button>
      </div>
    </Form>
  );
};
