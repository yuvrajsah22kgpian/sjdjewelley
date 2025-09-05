// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { Link, useNavigate } from 'react-router-dom'
// import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react'
// import { useAuthStore } from '../../src/store/store'
// import Header from '../../src/components/Header'
// import Footer from '../../src/components/Footer'

// const signupSchema = z.object({
//   firstName: z.string().min(2, 'First name must be at least 2 characters'),
//   lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   phone: z.string().min(10, 'Please enter a valid phone number'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// })

// type SignupFormData = z.infer<typeof signupSchema>

// export default function Signup() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()
//   const login = useAuthStore(state => state.login)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   })

//   const onSubmit = async (data: SignupFormData) => {
//     setIsLoading(true)
//     setError('')

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // Mock user data - in real app, this would come from API
//       const user = {
//         id: '1',
//         email: data.email,
//         name: `${data.firstName} ${data.lastName}`,
//         phone: data.phone,
//         address: {
//           street: '',
//           city: '',
//           state: '',
//           zipCode: '',
//           country: ''
//         }
//       }

//       login(user)
//       navigate('/')
//     } catch (err) {
//       setError('An error occurred during registration. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Header />
      
//       <main className="flex-1 flex items-center justify-center px-4 py-8">
//         <div className="w-full max-w-md">
//           {/* Back to Home */}
//           <Link
//             to="/"
//             className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Home
//           </Link>

//           {/* Signup Form */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">
//                 Create Account
//               </h1>
//               <p className="text-gray-600">
//                 Join us to start your jewelry shopping journey
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-600 text-sm">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {/* Name Fields */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       {...register('firstName')}
//                       type="text"
//                       id="firstName"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="First name"
//                     />
//                   </div>
//                   {errors.firstName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       {...register('lastName')}
//                       type="text"
//                       id="lastName"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="Last name"
//                     />
//                   </div>
//                   {errors.lastName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     {...register('email')}
//                     type="email"
//                     id="email"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     {...register('phone')}
//                     type="tel"
//                     id="phone"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     {...register('password')}
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Create a password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     {...register('confirmPassword')}
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     id="confirmPassword"
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
//                 )}
//               </div>

//               {/* Terms and Conditions */}
//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
//                   required
//                 />
//                 <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//                   I agree to the{' '}
//                   <Link to="/terms" className="text-blue-600 hover:text-blue-500">
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Creating account...' : 'Create Account'}
//               </button>
//             </form>



//             {/* Sign In Link */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{' '}
//                 <Link
//                   to="/login"
//                   className="text-blue-600 hover:text-blue-500 font-medium"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }

import React, { useState } from 'react';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

interface FormData {
  // Account Type
  accountType: 'private_corp' | 'partnership' | 'individual' | 'other';
  otherAccountType: string;
  
  // Company Information
  legalName: string;
  businessStartDate: string;
  dbaTradeName: string; // Fixed typo
  
  // Physical Address
  physicalAddress: string;
  physicalKiosk: string;
  physicalCity: string;
  physicalState: string;
  physicalZipCode: string;
  
  // Contact Information
  telBusiness: string;
  fax: string;
  email: string;
  
  // Shipping Address
  shippingAddress: string;
  shippingKiosk: string;
  shippingAddressType: 'residence' | 'commercial';
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  
  // Store Lease Information
  storeLeaseHolder: string;
  existingStoreAnnualSales: string;
  newStoreAnnualSalesProjected: string;
  
  // Tax Information
  fedTaxId: string;
  resaleTaxId: string;
  jbtId: string;
  dnbNumber: string;
  
  // Owner Information
  ownerFirstName: string;
  ownerLastName: string;
  ownerSsn: string;
  ownerDriverLicense: string;
  ownerDob: string;
  
  // Owner Home Address
  ownerHomeAddress: string;
  ownerHomeKiosk: string;
  ownerHomeCity: string;
  ownerHomeState: string;
  ownerHomeZipCode: string;
  ownerTelHome: string;
  ownerCell: string;
  
  // Spouse Information
  spouseName: string;
  spouseLastName: string;
  spouseSsn: string;
  spouseDriverLicense: string;
  spouseDob: string;
  
  // Authorized Buyers
  authorizedBuyer1: string;
  authorizedBuyer2: string;
  authorizedBuyer3: string;
  authorizedBuyer4: string;
  
  // Sales Tax Certificate
  certificateNumber: string;
  certificateState: string;
  
  // Signatures
  corporateOwnerPrintName: string;
  corporateOwnerTitle: string;
  partnerPrintName: string;
  partnerTitle: string;
  
  // Document Uploads
  driverLicenseFile: File | null;
  salesTaxPermitFile: File | null;
  leaseAgreementFile: File | null;
}

export default function SJDAccountApplication() {
  const [formData, setFormData] = useState<FormData>({
    accountType: 'private_corp',
    otherAccountType: '',
    legalName: '',
    businessStartDate: '',
    dbaTradeName: '', // Fixed typo
    physicalAddress: '',
    physicalKiosk: '',
    physicalCity: '',
    physicalState: '',
    physicalZipCode: '',
    telBusiness: '',
    fax: '',
    email: '',
    shippingAddress: '',
    shippingKiosk: '',
    shippingAddressType: 'residence',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    storeLeaseHolder: '',
    existingStoreAnnualSales: '',
    newStoreAnnualSalesProjected: '',
    fedTaxId: '',
    resaleTaxId: '',
    jbtId: '',
    dnbNumber: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerSsn: '',
    ownerDriverLicense: '',
    ownerDob: '',
    ownerHomeAddress: '',
    ownerHomeKiosk: '',
    ownerHomeCity: '',
    ownerHomeState: '',
    ownerHomeZipCode: '',
    ownerTelHome: '',
    ownerCell: '',
    spouseName: '',
    spouseLastName: '',
    spouseSsn: '',
    spouseDriverLicense: '',
    spouseDob: '',
    authorizedBuyer1: '',
    authorizedBuyer2: '',
    authorizedBuyer3: '',
    authorizedBuyer4: '',
    certificateNumber: '',
    certificateState: '',
    corporateOwnerPrintName: '',
    corporateOwnerTitle: '',
    partnerPrintName: '',
    partnerTitle: '',
    driverLicenseFile: null,
    salesTaxPermitFile: null,
    leaseAgreementFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Also clear authorized buyer requirement error if any buyer field changes
    if (name.startsWith('authorizedBuyer') && errors.authorizedBuyer1) {
      setErrors(prev => ({
        ...prev,
        authorizedBuyer1: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate: At least one authorized buyer must be provided
    const hasAtLeastOneBuyer = [
      formData.authorizedBuyer1,
      formData.authorizedBuyer2,
      formData.authorizedBuyer3,
      formData.authorizedBuyer4,
    ].some((val) => (val || '').trim() !== '');
    if (!hasAtLeastOneBuyer) {
      setErrors((prev) => ({
        ...prev,
        authorizedBuyer1: 'At least one authorized buyer is required',
      }));
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
          <div className="text-center">
            <div className="inline-block bg-yellow-400 p-3 rounded mb-4">
              <span className="text-2xl font-bold text-red-700">SJD</span>
            </div>
            <h1 className="text-3xl font-bold text-red-700 mb-2">
              SJD GOLD & DIAMONDS
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              MANUFACTURERS & WHOLESELLERS OF 10K, 14K, 18K GOLD & DIAMONDS, JEWELRY
            </p>
            <p className="text-sm text-gray-600 mb-1">
              7500 BELLAIRE BLVD., SUITE # 317, HOUSTON, TX - 77036
            </p>
            <p className="text-sm text-gray-600">
              PH # (713) 773-2786 FAX # (713) 773-3786 E-mail : sales@sjdgnd.com
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account Application Type */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-gray-800 text-white px-4 py-2 -mx-6 -mt-6 mb-6 rounded-t-lg">
              <h2 className="text-lg font-semibold">ACCOUNT APPLICATION</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: 'private_corp', label: 'PRIVATE CORP' },
                { value: 'partnership', label: 'PARTNERSHIP' },
                { value: 'individual', label: 'INDIVIDUAL' },
                { value: 'other', label: 'OTHER' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value={option.value}
                    checked={formData.accountType === option.value}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  APPLICANT/COMPANY'S LEGAL NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BUSINESS START DATE <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="businessStartDate"
                  value={formData.businessStartDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DBA/TRADE NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dbaTradeName"
                value={formData.dbaTradeName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Authorized Buyers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">AUTHORIZED BUYERS</h3>
            <p className="text-sm text-gray-600 mb-4">Enter up to 4 buyers. At least one is required.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authorized Buyer 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="authorizedBuyer1"
                  value={formData.authorizedBuyer1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full name"
                />
                {errors.authorizedBuyer1 && (
                  <p className="mt-1 text-sm text-red-600">{errors.authorizedBuyer1}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authorized Buyer 2
                </label>
                <input
                  type="text"
                  name="authorizedBuyer2"
                  value={formData.authorizedBuyer2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full name (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authorized Buyer 3
                </label>
                <input
                  type="text"
                  name="authorizedBuyer3"
                  value={formData.authorizedBuyer3}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full name (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authorized Buyer 4
                </label>
                <input
                  type="text"
                  name="authorizedBuyer4"
                  value={formData.authorizedBuyer4}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full name (optional)"
                />
              </div>
            </div>
          </div>

          {/* Physical Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">PHYSICAL ADDRESS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PHYSICAL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KIOSK/SUITE
                </label>
                <input
                  type="text"
                  name="physicalKiosk"
                  value={formData.physicalKiosk}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CITY <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="physicalCity"
                  value={formData.physicalCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STATE/PROVINCE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="physicalState"
                  value={formData.physicalState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP CODE/POSTAL CODE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="physicalZipCode"
                  value={formData.physicalZipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TEL BUSINESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telBusiness"
                  value={formData.telBusiness}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FAX
                </label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">SHIPPING ADDRESS</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SHIPPING ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KIOSK/SUITE
                </label>
                <input
                  type="text"
                  name="shippingKiosk"
                  value={formData.shippingKiosk}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ADDRESS TYPE <span className="text-red-500">*</span>
                </label>
                <select
                  name="shippingAddressType"
                  value={formData.shippingAddressType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="residence">Residence</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CITY <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingCity"
                  value={formData.shippingCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STATE/PROVINCE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingState"
                  value={formData.shippingState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP CODE/POSTAL CODE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shippingZipCode"
                  value={formData.shippingZipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sales Tax Certificate */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">SALES TAX CERTIFICATE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CERTIFICATE NUMBER <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STATE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="certificateState"
                  value={formData.certificateState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">UPLOAD REQUIRED DOCUMENTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver License (copy) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="driverLicenseFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Tax Permit (copy) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="salesTaxPermitFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lease Agreement (copy) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="leaseAgreementFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Store Sales Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">STORE SALES INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EXISTING STORE ANNUAL SALES <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="existingStoreAnnualSales"
                  value={formData.existingStoreAnnualSales}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NEW STORE ANNUAL SALES PROJECTED <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="newStoreAnnualSalesProjected"
                  value={formData.newStoreAnnualSalesProjected}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
}
// business start date
// shipping address
//sales tax certificate,state
//upload copies of Driver License,sales tax permit,lease agreement
// existing store annual sales
// new store annual sales projected

