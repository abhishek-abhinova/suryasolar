import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    monthlyBill: '',
    requirements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[-+ ]/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit number';
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Enter a valid email address';
    }
    if (!formData.monthlyBill.trim()) newErrors.monthlyBill = 'Bill estimation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);

      // 📝 AGAR CLIENT KA EMAIL BADALNA HO TO YAHAN BADAL LO
      const clientEmail = "Infosuryasolar.in@gmail.com";

      // FormSubmit AJAX API call background me mail bhejne ke liye
      fetch(`https://formsubmit.co/ajax/${clientEmail}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Full Name": formData.fullName,
          "Phone Number": formData.phoneNumber,
          "Email Address": formData.emailAddress,
          "Monthly Electricity Bill (Rs)": formData.monthlyBill,
          "Requirements / Roof Space": formData.requirements || 'Not Specified',
          "_captcha": "false" // Taki ganda sa captcha verify screen na aaye
        })
      })
        .then(response => response.json())
        .then(data => {
          // Mail send hone ke baad form state clear karo
          setFormData({
            fullName: '',
            phoneNumber: '',
            emailAddress: '',
            monthlyBill: '',
            requirements: '',
          });
          setIsSubmitted(false);
          alert('Thank you! Your inquiry has been received. Our team will contact you within 24 hours.');
        })
        .catch(error => {
          console.error("Error sending mail:", error);
          setIsSubmitted(false);
          alert("Something went wrong. Please try again or call us directly.");
        });
    }
  };

  return (
    <section id="contact" className="py-20 bg-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
            Get in Touch for a Free Site Survey
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-dark-muted mt-4 text-sm sm:text-base">
            Have questions or want a custom quotation? Fill out our short inquiry form, or visit our office in Hyderabad.
          </p>
        </div>

        {/* 2-Column Form & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Interactive Map Placeholder & Corporate Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Map Frame Card */}
            <Card className="p-0 overflow-hidden h-72 border border-slate-200 shadow-lg relative rounded-2xl flex-grow">
              <iframe
                title="Surya Solar Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8398188147116!2d78.4727181!3d17.515104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb903a4cfdfc33%3A0xc48de278de2a66e4!2sSuchitra%2C%20Hyderabad%2C%20Telangana%20500055!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>

            {/* Quick Contact Info Cards */}
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-4 p-4 glass-card border-slate-100 bg-white/60">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-xs sm:text-sm">Office Location</h4>
                  <p className="text-xs sm:text-sm text-dark-muted">
                    MN Reddy Nagar, Suchitra, Hyderabad, Telangana - 500055
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card border-slate-100 bg-white/60">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-xs sm:text-sm">Phone Line</h4>
                  <p className="text-xs sm:text-sm text-dark-muted">+91 74002 04544</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass-card border-slate-100 bg-white/60">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-xs sm:text-sm">Email Inbox</h4>
                  <p className="text-xs sm:text-sm text-dark-muted">Infosuryasolar.in@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Field Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 h-full bg-white border border-slate-100 flex flex-col justify-between">

              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-dark text-left mb-6">
                Request Free Site Survey
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">

                {/* 1. Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`glass-input px-4 py-3 text-sm text-dark ${errors.fullName ? 'border-red-500 ring-2 ring-red-500/10' : ''
                      }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
                </div>

                {/* 2-Column Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 2. Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className={`glass-input px-4 py-3 text-sm text-dark ${errors.phoneNumber ? 'border-red-500 ring-2 ring-red-500/10' : ''
                        }`}
                    />
                    {errors.phoneNumber && <p className="text-xs text-red-500 font-semibold">{errors.phoneNumber}</p>}
                  </div>

                  {/* 3. Email Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`glass-input px-4 py-3 text-sm text-dark ${errors.emailAddress ? 'border-red-500 ring-2 ring-red-500/10' : ''
                        }`}
                    />
                    {errors.emailAddress && <p className="text-xs text-red-500 font-semibold">{errors.emailAddress}</p>}
                  </div>
                </div>

                {/* 4. Monthly Electricity Bill */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">
                    Monthly Electricity Bill (₹)
                  </label>
                  <select
                    name="monthlyBill"
                    value={formData.monthlyBill}
                    onChange={handleChange}
                    className={`glass-input px-4 py-3 text-sm text-dark ${errors.monthlyBill ? 'border-red-500 ring-2 ring-red-500/10' : ''
                      }`}
                  >
                    <option value="" disabled>Select your monthly bill range</option>
                    <option value="1000-3000">₹1,000 to ₹3,000</option>
                    <option value="3000-6000">₹3,000 to ₹6,000</option>
                    <option value="6000-10000">₹6,000 to ₹10,000</option>
                    <option value="10000+">₹10,000 or above</option>
                  </select>
                  {errors.monthlyBill && <p className="text-xs text-red-500 font-semibold">{errors.monthlyBill}</p>}
                </div>

                {/* 5. Requirements Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">
                    Roof Space / Additional Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g. 500 Sq.Ft concrete roof, interested in Mono-PERC panels..."
                    className="glass-input px-4 py-3 text-sm text-dark resize-none"
                  />
                </div>

                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Inquiry Request</span>
                      </>
                    )}
                  </Button>
                </div>

              </form>

            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;