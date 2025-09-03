import React, { useState } from 'react';
import { Upload, FileText, User, Mail, Phone, Building, Calendar, DollarSign } from 'lucide-react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

interface FormData {
  firstName: string;
  lastName: string;
  jobPosition: string;
  email: string;
  phoneNumber: string;
  resume: File | null;
  coverLetter: File | null;
  linkedinProfile: string;
  backgroundCheck: string;
  retailExperience: string;
  yearsExperience: string;
  whyGoodFit: string;
  startDate: string;
  salaryExpectation: string;
  // Voluntary fields
  gender: string;
  hispanicLatino: string;
  veteranStatus: string;
  disabilityStatus: string;
}

const SJDJobApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    jobPosition: '',
    email: '',
    phoneNumber: '',
    resume: null,
    coverLetter: null,
    linkedinProfile: '',
    backgroundCheck: '',
    retailExperience: '',
    yearsExperience: '',
    whyGoodFit: '',
    startDate: '',
    salaryExpectation: '',
    gender: '',
    hispanicLatino: '',
    veteranStatus: '',
    disabilityStatus: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const jobPositions = [
    'Digital Marketing Specialist',
    'Sales Associate',
    'Jewelry Designer',
    'Inventory Specialist and Merchandiser',
    'E-Commerce Manager',
    'Photographer/VideoGrapher',
    'Jewelry Quality Control Inspector'
  ];

  const acceptedFileTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!acceptedFileTypes.includes(fileExtension || '')) {
        alert(`Please upload a valid file type: ${acceptedFileTypes.join(', ')}`);
        return;
      }
    }
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.jobPosition) newErrors.jobPosition = 'Job position is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.backgroundCheck) newErrors.backgroundCheck = 'Background check response is required';
    if (!formData.retailExperience) newErrors.retailExperience = 'Retail experience response is required';
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
    if (!formData.whyGoodFit.trim()) newErrors.whyGoodFit = 'This field is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.salaryExpectation.trim()) newErrors.salaryExpectation = 'Salary expectation is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      alert('Application submitted successfully!');
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Apply for the job in SJD</h1>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded-lg inline-block mb-4">
              <span className="font-semibold">SJD Gold & Diamond</span>
            </div>
          </div>
          
          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              At SJD Gold & Diamond, we would like to welcome you to join us and have a great career in the jewelry business. 
              If you are willing to join our team, you may fill up the form below.
            </p>
            <p>
              Information submitted by you on this page will be used by SJD Gold & Diamond for job vacancy purposes at 
              SJD Gold & Diamond offices only.
            </p>
            <p>
              Please note that at SJD Gold & Diamond, we value and respect your personal information. We have strict norms 
              to protect data privacy. We declare that we do not use your data and information for any kind of commercial use 
              or we do not sell (or share) your data or information with any third party.
            </p>
            <p>
              For detailed Privacy Policy, please check our link 
              <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">here</a>.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Apply for this job</h2>
            <p className="text-gray-600 text-sm">* indicates a required field</p>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Job Position */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Position <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.jobPosition ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                {jobPositions.map((position) => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
            {errors.jobPosition && <p className="text-red-500 text-sm mt-1">{errors.jobPosition}</p>}
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                    +1
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`flex-1 pl-3 pr-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <label htmlFor="resume" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Click to upload resume
                  </label>
                  <input
                    id="resume"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'resume')}
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT, RTF</p>
                {formData.resume && (
                  <p className="text-sm text-green-600 mt-2 flex items-center justify-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {formData.resume.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <label htmlFor="coverLetter" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Click to upload cover letter
                  </label>
                  <input
                    id="coverLetter"
                    type="file"
                    onChange={(e) => handleFileChange(e, 'coverLetter')}
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT, RTF</p>
                {formData.coverLetter && (
                  <p className="text-sm text-green-600 mt-2 flex items-center justify-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {formData.coverLetter.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          {/* Background Check */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you willing to undergo a background check in accordance to local law and regulations? <span className="text-red-500">*</span>
            </label>
            <select
              name="backgroundCheck"
              value={formData.backgroundCheck}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.backgroundCheck ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.backgroundCheck && <p className="text-red-500 text-sm mt-1">{errors.backgroundCheck}</p>}
          </div>

          {/* Retail Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you have experience in retail sales within fine jewelry? <span className="text-red-500">*</span>
            </label>
            <select
              name="retailExperience"
              value={formData.retailExperience}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.retailExperience ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Note: We will only consider candidates that have this experience</p>
            {errors.retailExperience && <p className="text-red-500 text-sm mt-1">{errors.retailExperience}</p>}
          </div>

          {/* Years of Experience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many years of experience do you have in retail sales within fine jewelry? <span className="text-red-500">*</span>
            </label>
            <select
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">We are looking for minimum 3 years, if you do not have this then you will not be considered.</p>
            {errors.yearsExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>}
          </div>

          {/* Why Good Fit */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why do you think you'd be a good fit for this role? And why do you want to work at SJD? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="whyGoodFit"
              value={formData.whyGoodFit}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.whyGoodFit ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tell us why you're perfect for this role..."
            />
            {errors.whyGoodFit && <p className="text-red-500 text-sm mt-1">{errors.whyGoodFit}</p>}
          </div>

          {/* Start Date and Salary */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How soon can you start? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Immediately, 2 weeks notice, etc."
                />
              </div>
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Salary Expectation ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="salaryExpectation"
                  value={formData.salaryExpectation}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.salaryExpectation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 50,000 or 45,000-55,000"
                />
              </div>
              {errors.salaryExpectation && <p className="text-red-500 text-sm mt-1">{errors.salaryExpectation}</p>}
            </div>
          </div>

          {/* Voluntary Self-Identification Section */}
          <div className="border-t pt-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Voluntary Self-Identification</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                For government reporting purposes, we ask candidates to respond to the below self-identification survey. 
                Completion of the form is entirely voluntary. Whatever your decision, it will not be considered in the hiring process 
                or thereafter. Any information that you provide will be recorded and maintained in a confidential file.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                As set forth in SJD's Equal Employment Opportunity policy, we do not discriminate on the basis of any protected group status under any applicable law.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you Hispanic or Latino?</label>
                <select
                  name="hispanicLatino"
                  value={formData.hispanicLatino}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Veteran Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Veteran Status</label>
              <div className="bg-gray-50 p-4 rounded-lg mb-3 text-sm text-gray-600">
                <p className="mb-2">
                  If you believe you belong to any of the categories of protected veterans listed below, please indicate by making the appropriate selection. 
                  As a government contractor subject to the Vietnam Era Veterans Readjustment Assistance Act (VEVRAA), we request this information in order to measure 
                  the effectiveness of the outreach and positive recruitment efforts we undertake pursuant to VEVRAA.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>A "disabled veteran" is one of the following: a veteran of the U.S. military, ground, naval or air service who is entitled to compensation under laws administered by the Secretary of Veterans Affairs.</li>
                  <li>A "recently separated veteran" means any veteran during the three-year period beginning on the date of such veteran's discharge or release from active duty.</li>
                  <li>An "active duty wartime or campaign badge veteran" means a veteran who served on active duty during a war, or in a campaign or expedition for which a campaign badge has been authorized.</li>
                  <li>An "Armed forces service medal veteran" means a veteran who participated in a United States military operation for which an Armed Forces service medal was awarded.</li>
                </ul>
              </div>
              <select
                name="veteranStatus"
                value={formData.veteranStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Disabled Veteran">Disabled Veteran</option>
                <option value="Recently Separated Veteran">Recently Separated Veteran</option>
                <option value="Armed Forces Service Medal Veteran">Armed Forces Service Medal Veteran</option>
                <option value="Other Protected Veteran">Other Protected Veteran</option>
                <option value="Not a Veteran">Not a Veteran</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Disability Status */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Voluntary Self-Identification of Disability</label>
              <div className="bg-gray-50 p-4 rounded-lg mb-3 text-sm text-gray-600 space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">Why are you being asked to complete this form?</h4>
                  <p>
                    We are a federal contractor or subcontractor. The law requires us to provide equal employment opportunity to qualified people with disabilities. 
                    We have a goal of having at least 7% of our workers as people with disabilities. The law says we must measure our progress towards this goal. 
                    To do this, we must ask applicants and employees if they have a disability or have ever had one.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How do you know if you have a disability?</h4>
                  <p className="mb-2">
                    A disability is a condition that substantially limits one or more of your "major life activities." 
                    If you have or have ever had such a condition, you are a person with a disability. Disabilities include, but are not limited to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Alcohol or substance use disorder</li>
                      <li>Autoimmune disorder (lupus, fibromyalgia, etc.)</li>
                      <li>Blind or low vision</li>
                      <li>Cancer (past or present)</li>
                      <li>Cardiovascular or heart disease</li>
                      <li>Celiac disease</li>
                      <li>Cerebral palsy</li>
                      <li>Deaf or serious difficulty hearing</li>
                      <li>Diabetes</li>
                      <li>Disfigurement from burns, wounds, accidents</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Epilepsy or other seizure disorder</li>
                      <li>Gastrointestinal disorders</li>
                      <li>Intellectual or developmental disability</li>
                      <li>Mental health conditions</li>
                      <li>Missing limbs or partially missing limbs</li>
                      <li>Mobility impairment</li>
                      <li>Nervous system conditions</li>
                      <li>Neurodivergence (ADHD, autism, dyslexia)</li>
                      <li>Partial or complete paralysis</li>
                      <li>Pulmonary or respiratory conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
              <select
                name="disabilityStatus"
                value={formData.disabilityStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Yes, I have a disability">Yes, I have a disability</option>
                <option value="No, I do not have a disability">No, I do not have a disability</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Public Burden Statement */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm text-gray-600">
            <p>
              <strong>PUBLIC BURDEN STATEMENT:</strong> According to the Paperwork Reduction Act of 1995 no persons are required to respond to a collection of information unless such collection displays a valid OMB control number. This survey should take about 5 minutes to complete.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SJDJobApplicationForm;
