

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import apiService from '../../src/services/api';

interface FormData {
  // Authentication
  email: string;
  password: string;
  confirmPassword: string;
  
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Clear previous errors
    setErrors({});
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
      setIsSubmitting(false);
      return;
    }
    
    // Validate password length
    if (formData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long',
      }));
      setIsSubmitting(false);
      return;
    }
    
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
      // Transform form data to match backend schema
      const applicationData = {
        // Authentication
        email: formData.email,
        password: formData.password,
        
        // Account Type
        account_type: formData.accountType,
        other_account_type: formData.otherAccountType || null,
        
        // Company Information
        legal_name: formData.legalName,
        business_start_date: formData.businessStartDate,
        dba_trade_name: formData.dbaTradeName,
        
        // Physical Address
        physical_address: formData.physicalAddress,
        physical_kiosk: formData.physicalKiosk || null,
        physical_city: formData.physicalCity,
        physical_state: formData.physicalState,
        physical_zip_code: formData.physicalZipCode,
        
        // Contact Information
        tel_business: formData.telBusiness,
        fax: formData.fax || null,
        
        // Shipping Address
        shipping_address: formData.shippingAddress,
        shipping_kiosk: formData.shippingKiosk || null,
        shipping_address_type: formData.shippingAddressType,
        shipping_city: formData.shippingCity,
        shipping_state: formData.shippingState,
        shipping_zip_code: formData.shippingZipCode,
        
        // Store Lease Information
        store_lease_holder: formData.storeLeaseHolder || null,
        existing_store_annual_sales: formData.existingStoreAnnualSales || null,
        new_store_annual_sales_projected: formData.newStoreAnnualSalesProjected || null,
        
        // Tax Information
        fed_tax_id: formData.fedTaxId || null,
        resale_tax_id: formData.resaleTaxId || null,
        jbt_id: formData.jbtId || null,
        dnb_number: formData.dnbNumber || null,
        
        // Owner Information
        owner_first_name: formData.ownerFirstName || null,
        owner_last_name: formData.ownerLastName || null,
        owner_ssn: formData.ownerSsn || null,
        owner_driver_license: formData.ownerDriverLicense || null,
        owner_dob: formData.ownerDob || null,
        
        // Owner Home Address
        owner_home_address: formData.ownerHomeAddress || null,
        owner_home_kiosk: formData.ownerHomeKiosk || null,
        owner_home_city: formData.ownerHomeCity || null,
        owner_home_state: formData.ownerHomeState || null,
        owner_home_zip_code: formData.ownerHomeZipCode || null,
        owner_tel_home: formData.ownerTelHome || null,
        owner_cell: formData.ownerCell || null,
        
        
        // Authorized Buyers
        authorized_buyer_1: formData.authorizedBuyer1 || null,
        authorized_buyer_2: formData.authorizedBuyer2 || null,
        authorized_buyer_3: formData.authorizedBuyer3 || null,
        authorized_buyer_4: formData.authorizedBuyer4 || null,
        
        // Sales Tax Certificate
        certificate_number: formData.certificateNumber || null,
        certificate_state: formData.certificateState || null,
        
        // Signatures
        corporate_owner_print_name: formData.corporateOwnerPrintName || null,
        corporate_owner_title: formData.corporateOwnerTitle || null,
        partner_print_name: formData.partnerPrintName || null,
        partner_title: formData.partnerTitle || null,
      };

      // Prepare files for upload (only include non-null files)
      const files: {
        driverLicenseFile?: File;
        salesTaxPermitFile?: File;
        leaseAgreementFile?: File;
      } = {};
      
      if (formData.driverLicenseFile) {
        files.driverLicenseFile = formData.driverLicenseFile;
      }
      if (formData.salesTaxPermitFile) {
        files.salesTaxPermitFile = formData.salesTaxPermitFile;
      }
      if (formData.leaseAgreementFile) {
        files.leaseAgreementFile = formData.leaseAgreementFile;
      }

      const response = await apiService.createAccountApplication(applicationData, files);
      
      if (response.data) {
        const accountNumber = response.data.account_number;
        const userName = formData.legalName;
        alert(`Account application submitted successfully!\n\nYour Account Number: ${accountNumber}\nUser Name: ${userName}\n\nYou will be notified once your application is reviewed.`);
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          accountType: 'private_corp',
          otherAccountType: '',
          legalName: '',
          businessStartDate: '',
          dbaTradeName: '',
          physicalAddress: '',
          physicalKiosk: '',
          physicalCity: '',
          physicalState: '',
          physicalZipCode: '',
          telBusiness: '',
          fax: '',
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
        // Navigate to home page
        navigate('/');
      } else {
        throw new Error(response.error || 'Failed to submit application');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.message?.includes('email already exists')) {
        setErrors((prev) => ({
          ...prev,
          email: 'An account with this email already exists',
        }));
      } else {
      alert('Something went wrong. Please try again.');
      }
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
          {/* Authentication Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-gray-800 text-white px-4 py-2 -mx-6 -mt-6 mb-6 rounded-t-lg">
              <h2 className="text-lg font-semibold">ACCOUNT CREDENTIALS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PASSWORD <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CONFIRM PASSWORD <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STORE LEASE HOLDER
                </label>
                <input
                  type="text"
                  name="storeLeaseHolder"
                  value={formData.storeLeaseHolder}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
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

          {/* Tax Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">TAX INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FEDERAL TAX ID
                </label>
                <input
                  type="text"
                  name="fedTaxId"
                  value={formData.fedTaxId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RESALE TAX ID
                </label>
                <input
                  type="text"
                  name="resaleTaxId"
                  value={formData.resaleTaxId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  JBT ID
                </label>
                <input
                  type="text"
                  name="jbtId"
                  value={formData.jbtId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNB NUMBER
                </label>
                <input
                  type="text"
                  name="dnbNumber"
                  value={formData.dnbNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">OWNER INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OWNER FIRST NAME
                </label>
                <input
                  type="text"
                  name="ownerFirstName"
                  value={formData.ownerFirstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OWNER LAST NAME
                </label>
                <input
                  type="text"
                  name="ownerLastName"
                  value={formData.ownerLastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OWNER SSN
                </label>
                <input
                  type="text"
                  name="ownerSsn"
                  value={formData.ownerSsn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OWNER DRIVER LICENSE
                </label>
                <input
                  type="text"
                  name="ownerDriverLicense"
                  value={formData.ownerDriverLicense}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OWNER DATE OF BIRTH
                </label>
                <input
                  type="date"
                  name="ownerDob"
                  value={formData.ownerDob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Owner Home Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">OWNER HOME ADDRESS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HOME ADDRESS
                </label>
                <input
                  type="text"
                  name="ownerHomeAddress"
                  value={formData.ownerHomeAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KIOSK/SUITE
                </label>
                <input
                  type="text"
                  name="ownerHomeKiosk"
                  value={formData.ownerHomeKiosk}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CITY
                </label>
                <input
                  type="text"
                  name="ownerHomeCity"
                  value={formData.ownerHomeCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STATE
                </label>
                <input
                  type="text"
                  name="ownerHomeState"
                  value={formData.ownerHomeState}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP CODE
                </label>
                <input
                  type="text"
                  name="ownerHomeZipCode"
                  value={formData.ownerHomeZipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HOME PHONE
                </label>
                <input
                  type="tel"
                  name="ownerTelHome"
                  value={formData.ownerTelHome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CELL PHONE
                </label>
                <input
                  type="tel"
                  name="ownerCell"
                  value={formData.ownerCell}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>


          {/* Signatures */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">SIGNATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CORPORATE OWNER PRINT NAME
                </label>
                <input
                  type="text"
                  name="corporateOwnerPrintName"
                  value={formData.corporateOwnerPrintName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CORPORATE OWNER TITLE
                </label>
                <input
                  type="text"
                  name="corporateOwnerTitle"
                  value={formData.corporateOwnerTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PARTNER PRINT NAME
                </label>
                <input
                  type="text"
                  name="partnerPrintName"
                  value={formData.partnerPrintName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PARTNER TITLE
                </label>
                <input
                  type="text"
                  name="partnerTitle"
                  value={formData.partnerTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

