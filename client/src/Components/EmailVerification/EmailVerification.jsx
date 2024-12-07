import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

import './EmailVerification.css';

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split(""); // Split pasted code into digits
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || ""; // Assign each pasted digit to the corresponding field
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus(); // Move the focus to the next input field
    } else {
      // Handle normal typing (single character)
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if a value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus(); // Focus the next input
      }
    }
  };

  // Handle key down (for backspace functionality)
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus to the previous field on backspace
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      await verifyEmail(verificationCode); // Verify the code with your backend
      navigate('/'); // Redirect to home page or wherever after success
      toast.success("Email verified successfully");
    } catch (error) {
      console.log('Error response', error.response);
      console.log(error);
      toast.error('Failed to verify email');
    }
  };

  useEffect(() => {
    if (code.every(digit => digit !== "")) {
      handleSubmit(new Event('submit')); // Auto-submit when all fields are filled
    }
  }, [code]);

  return (
    <div className="container">
      <h2>Verify Your Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="digitContainer">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6" // Only one character allowed per input
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="inputCode"
            />
          ))}
        </div>
        <button type="submit" className="verifyButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;