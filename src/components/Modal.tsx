import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Modal as BModal } from "react-bootstrap";

interface IModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ show, setShow }: IModalProps) => {
  const [validated, setValidated] = useState(false);
  const [isInvalidatedDate, setIsInvalidatedDate] = useState<boolean>();

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
    <>
      <BModal show={show} onHide={() => setShow(!show)}>
        <BModal.Header closeButton>
          <BModal.Title>Edit Person</BModal.Title>
        </BModal.Header>
        <BModal.Body>
          <Form
            className="container"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
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
                <Form.Select
                  required
                  title="please select one option of gender">
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
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShow(!show)}>
                Close
              </Button>
              <Button type="submit" onClick={() => setShow(!show)}>
                Save changes
              </Button>
            </div>
          </Form>
        </BModal.Body>
      </BModal>
    </>
  );
};
