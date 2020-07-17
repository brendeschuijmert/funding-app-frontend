import React from 'react';
import { Formik } from 'formik';
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../redux/actions';
import { Icon } from '../../../components/Icon';

import Logo from '../../../assets/company-logo.png';

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required('Email is required!')
});

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = values => {
    const { email } = values;
    dispatch(forgotPasswordRequest(email));
  };

  return (
    <Container className="h-75">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={5}>
          <div className="logo-part">
            <img src={Logo} alt="" className="auth-logo"/>
          </div>
          <Card>
            <Card.Header className="text-center">
              <h3>Forgot Password? </h3>
              <span>Enter your email below and we'll send you reset instructions.</span>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                  email: '',
                }}
              >
                {({ handleSubmit, handleChange, values, isValid, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                      <Col xs={12}>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <Icon name="envelope" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            placeholder="Input your email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <div className="text-center flex-center auth-btn">
                      <Button
                        block
                        variant="secondary"
                        type="submit"
                        disabled={!isValid}
                      >
                        Send
                      </Button>
                    </div>                    
                  </Form>
                )}
              </Formik>
              <Row>
                <Col className="d-inline-flex justify-content-center link-group mt-3">
                  <Link to={'/auth/login'}>Go back to login</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { ForgotPasswordPage };
