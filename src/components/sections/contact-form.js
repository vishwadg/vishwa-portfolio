import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #64ffda;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
  }

  textarea {
    height: 100px;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .row input {
    width: calc(48% - 5px);
  }

  button {
    background-color: #0a192f;
    color: #64ffda;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    border: 1px solid #64ffda;
    ${({ theme }) => theme.mixins.bigButton};
  }

  .success-message{
    color: #64ffda;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .error-message {
    color: #c23e2d;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const apiEndpoint = 'https://axgz8mjeif.execute-api.us-east-1.amazonaws.com/v1/message';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const successTimeout = setTimeout(() => setSuccessMessage(''), 30000);
    return () => clearTimeout(successTimeout);
  }, [successMessage]);

  useEffect(() => {
    const errorTimeout = setTimeout(() => setErrorMessage(''), 10000);
    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    const requiredFields = ['firstname', 'lastname', 'email', 'subject', 'message'];
    for (const key of requiredFields) {
      if (formData[key] === '' && key !== 'phone') {
        setErrorMessage(`Please enter ${key === 'firstname' ? 'First Name' : key === 'lastname' ? 'Last Name' : key === 'email' ? 'Email' : key === 'subject' ? 'Subject' : key === 'message' ? 'Message' : '' }.`);
        return;
      }
    }

    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Validation for phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData?.message === 'success') {
        setSuccessMessage("Message sent successfully");
        setIsSubmitted(true);
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error.message);
    }
  };

  return (
    <StyledContactForm onSubmit={handleFormSubmit}>
      {isSubmitted && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="row">
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="row">
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          id="phone"
          placeholder="Phone (Optional)"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <input
        type="text"
        id="subject"
        placeholder="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Send Message</button>
    </StyledContactForm>
  );
};


export default ContactForm;



