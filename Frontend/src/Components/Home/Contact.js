import { useState } from "react";
import Sono from "../../static/IMG/Sonography.svg"

export default function Contact({contactRef}) {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = console.log(formData);

      if (response.ok) {
        setFormData({ email: '', message: '' });
        alert('Your message was sent successfully!');
      } else {
        setSubmitError('There was an error submitting your message. Please try again later.');
      }
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={contactRef} className="form">
    <h2>Contact</h2>
    <div className="form-container">
        <div className="form-col">
        <form onSubmit={handleSubmit} className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} className="form-input" onChange={handleChange} required />

            <label htmlFor="message" className="form-label">Message:</label>
            <textarea id="message" name="message" value={formData.message} className="form-textarea" onChange={handleChange} required></textarea>

            {submitError && <div className="form-error">{submitError}</div>}
            <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        </form>
        </div>
        <div className="form-col">
        <img src={Sono} alt="Contact Image" className="contact-image" />
        </div>
    </div>
    </div>

  );
}
