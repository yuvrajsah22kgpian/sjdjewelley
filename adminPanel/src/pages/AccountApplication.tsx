import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// TypeScript interface based on the schema
interface AccountApplication {
  id: number;
  email: string;
  account_number: string;
  account_type: string;
  other_account_type?: string;
  legal_name: string;
  business_start_date: string;
  dba_trade_name: string;
  physical_address: string;
  physical_kiosk?: string;
  physical_city: string;
  physical_state: string;
  physical_zip_code: string;
  tel_business: string;
  fax?: string;
  shipping_address: string;
  shipping_kiosk?: string;
  shipping_address_type: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip_code: string;
  store_lease_holder?: string;
  existing_store_annual_sales?: string;
  new_store_annual_sales_projected?: string;
  fed_tax_id?: string;
  resale_tax_id?: string;
  jbt_id?: string;
  dnb_number?: string;
  owner_first_name?: string;
  owner_last_name?: string;
  owner_ssn?: string;
  owner_driver_license?: string;
  owner_dob?: string;
  owner_home_address?: string;
  owner_home_kiosk?: string;
  owner_home_city?: string;
  owner_home_state?: string;
  owner_home_zip_code?: string;
  owner_tel_home?: string;
  owner_cell?: string;
  authorized_buyer_1?: string;
  authorized_buyer_2?: string;
  authorized_buyer_3?: string;
  authorized_buyer_4?: string;
  certificate_number?: string;
  certificate_state?: string;
  corporate_owner_print_name?: string;
  corporate_owner_title?: string;
  partner_print_name?: string;
  partner_title?: string;
  driver_license_file_path?: string;
  sales_tax_permit_file_path?: string;
  lease_agreement_file_path?: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  created_at: string;
  updated_at: string;
  reviewed_by?: number;
  reviewed_at?: string;
  review_notes?: string;
  reviewer?: {
    id: number;
    name: string;
    email: string;
  };
}

interface AccountApplicationDetailsProps {
  applicationId: string;
  onStatusUpdate?: (applicationId: string, status: string, notes?: string) => void;
  onBack?: () => void;
}

const AccountApplicationDetails: React.FC<AccountApplicationDetailsProps> = ({
  applicationId,
  onStatusUpdate,
  onBack
}) => {
  const [application, setApplication] = useState<AccountApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewStatus, setReviewStatus] = useState<string>('');
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockApplication: AccountApplication = {
        id: 1,
        email: 'john.doe@example.com',
        account_number: 'ACC-2024-001',
        account_type: 'Retail Store',
        legal_name: 'Doe Jewelry Store LLC',
        business_start_date: '2024-01-15',
        dba_trade_name: 'Doe\'s Fine Jewelry',
        physical_address: '123 Main Street',
        physical_city: 'New York',
        physical_state: 'NY',
        physical_zip_code: '10001',
        tel_business: '+1-555-0123',
        fax: '+1-555-0124',
        shipping_address: '123 Main Street',
        shipping_address_type: 'Same as Physical',
        shipping_city: 'New York',
        shipping_state: 'NY',
        shipping_zip_code: '10001',
        store_lease_holder: 'John Doe',
        existing_store_annual_sales: '$500,000',
        fed_tax_id: '12-3456789',
        resale_tax_id: 'ST-123456',
        owner_first_name: 'John',
        owner_last_name: 'Doe',
        owner_driver_license: 'DL123456789',
        owner_dob: '1985-06-15',
        owner_home_address: '456 Oak Street',
        owner_home_city: 'New York',
        owner_home_state: 'NY',
        owner_home_zip_code: '10002',
        owner_tel_home: '+1-555-0125',
        owner_cell: '+1-555-0126',
        authorized_buyer_1: 'Jane Doe',
        authorized_buyer_2: 'Mike Smith',
        certificate_number: 'CERT-123456',
        certificate_state: 'NY',
        corporate_owner_print_name: 'John Doe',
        corporate_owner_title: 'CEO',
        status: 'pending',
        created_at: '2024-02-15T10:30:00Z',
        updated_at: '2024-02-15T10:30:00Z',
        driver_license_file_path: '/uploads/driver_license_123.pdf',
        sales_tax_permit_file_path: '/uploads/sales_tax_permit_123.pdf',
        lease_agreement_file_path: '/uploads/lease_agreement_123.pdf'
      };
      setApplication(mockApplication);
      setLoading(false);
    }, 1000);
  }, [applicationId]);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      under_review: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const handleReviewSubmit = async () => {
    if (!reviewStatus) return;
    
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onStatusUpdate) {
        onStatusUpdate(applicationId, reviewStatus, reviewNotes);
      }
      
      setShowReviewModal(false);
      setReviewStatus('');
      setReviewNotes('');
      
      // Update local state
      if (application) {
        setApplication({
          ...application,
          status: reviewStatus as any,
          review_notes: reviewNotes,
          reviewed_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Applications
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {getStatusBadge(application.status)}
            {application.status === 'pending' && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Application
              </button>
            )}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Application Details</h1>
          <p className="text-gray-600">Application #{application.account_number} • Submitted {formatDate(application.created_at)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <p className="text-gray-900 font-mono">{application.account_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <p className="text-gray-900">{application.account_type}</p>
              </div>
              {application.other_account_type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Account Type</label>
                  <p className="text-gray-900">{application.other_account_type}</p>
                </div>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
                <p className="text-gray-900">{application.legal_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DBA/Trade Name</label>
                <p className="text-gray-900">{application.dba_trade_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Start Date</label>
                <p className="text-gray-900">{formatDate(application.business_start_date)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone</label>
                <p className="text-gray-900">{application.tel_business}</p>
              </div>
              {application.fax && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fax</label>
                  <p className="text-gray-900">{application.fax}</p>
                </div>
              )}
            </div>
          </div>

          {/* Physical Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Physical Address</h2>
            <div className="space-y-2">
              <p className="text-gray-900">{application.physical_address}</p>
              {application.physical_kiosk && (
                <p className="text-gray-600">{application.physical_kiosk}</p>
              )}
              <p className="text-gray-900">
                {application.physical_city}, {application.physical_state} {application.physical_zip_code}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <p className="text-gray-900">{application.shipping_address_type}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900">{application.shipping_address}</p>
              {application.shipping_kiosk && (
                <p className="text-gray-600">{application.shipping_kiosk}</p>
              )}
              <p className="text-gray-900">
                {application.shipping_city}, {application.shipping_state} {application.shipping_zip_code}
              </p>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tax Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {application.fed_tax_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Federal Tax ID</label>
                  <p className="text-gray-900 font-mono">{application.fed_tax_id}</p>
                </div>
              )}
              {application.resale_tax_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resale Tax ID</label>
                  <p className="text-gray-900 font-mono">{application.resale_tax_id}</p>
                </div>
              )}
              {application.jbt_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">JBT ID</label>
                  <p className="text-gray-900 font-mono">{application.jbt_id}</p>
                </div>
              )}
              {application.dnb_number && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">D&B Number</label>
                  <p className="text-gray-900 font-mono">{application.dnb_number}</p>
                </div>
              )}
            </div>
          </div>

          {/* Owner Information */}
          {(application.owner_first_name || application.owner_last_name) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900">{application.owner_first_name} {application.owner_last_name}</p>
                </div>
                {application.owner_dob && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900">{formatDate(application.owner_dob)}</p>
                  </div>
                )}
                {application.owner_driver_license && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver License</label>
                    <p className="text-gray-900 font-mono">{application.owner_driver_license}</p>
                  </div>
                )}
                {application.owner_cell && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cell Phone</label>
                    <p className="text-gray-900">{application.owner_cell}</p>
                  </div>
                )}
                {application.owner_tel_home && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Phone</label>
                    <p className="text-gray-900">{application.owner_tel_home}</p>
                  </div>
                )}
              </div>
              
              {application.owner_home_address && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
                  <div className="space-y-1">
                    <p className="text-gray-900">{application.owner_home_address}</p>
                    {application.owner_home_kiosk && (
                      <p className="text-gray-600">{application.owner_home_kiosk}</p>
                    )}
                    <p className="text-gray-900">
                      {application.owner_home_city}, {application.owner_home_state} {application.owner_home_zip_code}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Authorized Buyers */}
          {(application.authorized_buyer_1 || application.authorized_buyer_2 || application.authorized_buyer_3 || application.authorized_buyer_4) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Authorized Buyers</h2>
              <div className="space-y-2">
                {application.authorized_buyer_1 && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">1</span>
                    <p className="text-gray-900">{application.authorized_buyer_1}</p>
                  </div>
                )}
                {application.authorized_buyer_2 && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">2</span>
                    <p className="text-gray-900">{application.authorized_buyer_2}</p>
                  </div>
                )}
                {application.authorized_buyer_3 && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">3</span>
                    <p className="text-gray-900">{application.authorized_buyer_3}</p>
                  </div>
                )}
                {application.authorized_buyer_4 && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium mr-3">4</span>
                    <p className="text-gray-900">{application.authorized_buyer_4}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                {getStatusBadge(application.status)}
              </div>
              <div>
                <span className="text-sm text-gray-600">Submitted:</span>
                <p className="text-sm text-gray-900">{formatDate(application.created_at)}</p>
              </div>
              {application.reviewed_at && (
                <div>
                  <span className="text-sm text-gray-600">Reviewed:</span>
                  <p className="text-sm text-gray-900">{formatDate(application.reviewed_at)}</p>
                </div>
              )}
              {application.review_notes && (
                <div>
                  <span className="text-sm text-gray-600">Review Notes:</span>
                  <p className="text-sm text-gray-900 mt-1 p-2 bg-gray-50 rounded">{application.review_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Store Information */}
          {(application.store_lease_holder || application.existing_store_annual_sales || application.new_store_annual_sales_projected) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
              <div className="space-y-3">
                {application.store_lease_holder && (
                  <div>
                    <span className="text-sm text-gray-600">Lease Holder:</span>
                    <p className="text-sm text-gray-900">{application.store_lease_holder}</p>
                  </div>
                )}
                {application.existing_store_annual_sales && (
                  <div>
                    <span className="text-sm text-gray-600">Existing Annual Sales:</span>
                    <p className="text-sm text-gray-900">{application.existing_store_annual_sales}</p>
                  </div>
                )}
                {application.new_store_annual_sales_projected && (
                  <div>
                    <span className="text-sm text-gray-600">Projected Annual Sales:</span>
                    <p className="text-sm text-gray-900">{application.new_store_annual_sales_projected}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
            <div className="space-y-3">
              {application.driver_license_file_path && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">Driver License</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                </div>
              )}
              {application.sales_tax_permit_file_path && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">Sales Tax Permit</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                </div>
              )}
              {application.lease_agreement_file_path && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">Lease Agreement</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                </div>
              )}
            </div>
          </div>

          {/* Sales Tax Certificate */}
          {(application.certificate_number || application.certificate_state) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Tax Certificate</h3>
              <div className="space-y-3">
                {application.certificate_number && (
                  <div>
                    <span className="text-sm text-gray-600">Certificate Number:</span>
                    <p className="text-sm text-gray-900 font-mono">{application.certificate_number}</p>
                  </div>
                )}
                {application.certificate_state && (
                  <div>
                    <span className="text-sm text-gray-600">State:</span>
                    <p className="text-sm text-gray-900">{application.certificate_state}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Signatures */}
          {(application.corporate_owner_print_name || application.partner_print_name) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Signatures</h3>
              <div className="space-y-3">
                {application.corporate_owner_print_name && (
                  <div>
                    <span className="text-sm text-gray-600">Corporate Owner:</span>
                    <p className="text-sm text-gray-900">{application.corporate_owner_print_name}</p>
                    {application.corporate_owner_title && (
                      <p className="text-sm text-gray-500">{application.corporate_owner_title}</p>
                    )}
                  </div>
                )}
                {application.partner_print_name && (
                  <div>
                    <span className="text-sm text-gray-600">Partner:</span>
                    <p className="text-sm text-gray-900">{application.partner_print_name}</p>
                    {application.partner_title && (
                      <p className="text-sm text-gray-500">{application.partner_title}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Application</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select decision...</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add review notes (optional)..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 justify-end mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={!reviewStatus || submitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main page component for Account Applications
const AccountApplicationPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<AccountApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data for applications list
  useEffect(() => {
    setTimeout(() => {
      const mockApplications: AccountApplication[] = [
        {
          id: 1,
          email: 'john.doe@example.com',
          account_number: 'ACC-2024-001',
          account_type: 'Retail Store',
          legal_name: 'Doe Jewelry Store LLC',
          business_start_date: '2024-01-15',
          dba_trade_name: 'Doe\'s Fine Jewelry',
          physical_address: '123 Main Street',
          physical_city: 'New York',
          physical_state: 'NY',
          physical_zip_code: '10001',
          tel_business: '+1-555-0123',
          shipping_address: '123 Main Street',
          shipping_address_type: 'Same as Physical',
          shipping_city: 'New York',
          shipping_state: 'NY',
          shipping_zip_code: '10001',
          status: 'pending',
          created_at: '2024-02-15T10:30:00Z',
          updated_at: '2024-02-15T10:30:00Z'
        },
        {
          id: 2,
          email: 'jane.smith@example.com',
          account_number: 'ACC-2024-002',
          account_type: 'Online Store',
          legal_name: 'Smith Jewelry Inc',
          business_start_date: '2024-02-01',
          dba_trade_name: 'Smith\'s Online Jewelry',
          physical_address: '456 Oak Avenue',
          physical_city: 'Los Angeles',
          physical_state: 'CA',
          physical_zip_code: '90210',
          tel_business: '+1-555-0456',
          shipping_address: '456 Oak Avenue',
          shipping_address_type: 'Same as Physical',
          shipping_city: 'Los Angeles',
          shipping_state: 'CA',
          shipping_zip_code: '90210',
          status: 'approved',
          created_at: '2024-02-10T14:20:00Z',
          updated_at: '2024-02-12T09:15:00Z'
        }
      ];
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (applicationId: string, status: string, notes?: string) => {
    setApplications(prev => prev.map(app => 
      app.id.toString() === applicationId 
        ? { ...app, status: status as any, review_notes: notes, reviewed_at: new Date().toISOString() }
        : app
    ));
  };

  const handleBack = () => {
    navigate('/account-applications');
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      under_review: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // If we have an ID, show the details view
  if (id) {
    return (
      <AccountApplicationDetails
        applicationId={id}
        onStatusUpdate={handleStatusUpdate}
        onBack={handleBack}
      />
    );
  }

  // Otherwise show the list view
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Applications</h1>
        <p className="text-gray-600">Manage and review account applications from potential customers</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.account_number}</div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.legal_name}</div>
                      <div className="text-sm text-gray-500">{application.dba_trade_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.account_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(application.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/account-applications/${application.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountApplicationPage;
