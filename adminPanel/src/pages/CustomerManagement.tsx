import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isBlocked: boolean;
  isApproved: boolean;
}

interface CustomerManagementProps {
  onCustomerUpdate?: (customer: Customer) => void;
  onCustomerDelete?: (customerId: string) => void;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({
  onCustomerUpdate,
  onCustomerDelete
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0123',
        isVerified: true,
        isBlocked: false,
        isApproved: true
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0124',
        isVerified: false,
        isBlocked: false,
        isApproved: false
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1-555-0125',
        isVerified: true,
        isBlocked: true,
        isApproved: true
      }
    ];
    setCustomers(mockCustomers);
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  // Handle customer verification
  const handleVerifyCustomer = async (customerId: string) => {
    setLoading(true);
    try {
      const updatedCustomers = customers.map(customer =>
        customer.id === customerId
          ? { ...customer, isVerified: !customer.isVerified }
          : customer
      );
      setCustomers(updatedCustomers);
      
      const updatedCustomer = updatedCustomers.find(c => c.id === customerId);
      if (updatedCustomer && onCustomerUpdate) {
        onCustomerUpdate(updatedCustomer);
      }
    } catch (error) {
      console.error('Error verifying customer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle customer blocking/unblocking
  const handleBlockCustomer = async (customerId: string) => {
    setLoading(true);
    try {
      const updatedCustomers = customers.map(customer =>
        customer.id === customerId
          ? { ...customer, isBlocked: !customer.isBlocked }
          : customer
      );
      setCustomers(updatedCustomers);
      
      const updatedCustomer = updatedCustomers.find(c => c.id === customerId);
      if (updatedCustomer && onCustomerUpdate) {
        onCustomerUpdate(updatedCustomer);
      }
    } catch (error) {
      console.error('Error blocking customer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle approval status toggle
  const handleApprovalToggle = async (customerId: string) => {
    setLoading(true);
    try {
      const updatedCustomers = customers.map(customer =>
        customer.id === customerId
          ? { ...customer, isApproved: !customer.isApproved }
          : customer
      );
      setCustomers(updatedCustomers);
      
      const updatedCustomer = updatedCustomers.find(c => c.id === customerId);
      if (updatedCustomer && onCustomerUpdate) {
        onCustomerUpdate(updatedCustomer);
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customerId: string) => {
    setLoading(true);
    try {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
      
      if (onCustomerDelete) {
        onCustomerDelete(customerId);
      }
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    customer.isBlocked ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.isVerified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {customer.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                      {customer.isBlocked && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Blocked
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customer.isApproved}
                        onChange={() => handleApprovalToggle(customer.id)}
                        disabled={loading}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleVerifyCustomer(customer.id)}
                        disabled={loading}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors ${
                          customer.isVerified
                            ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200 disabled:opacity-50'
                            : 'text-green-700 bg-green-100 hover:bg-green-200 disabled:opacity-50'
                        } disabled:cursor-not-allowed`}
                      >
                        {customer.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                      
                      <button
                        onClick={() => handleBlockCustomer(customer.id)}
                        disabled={loading}
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-colors ${
                          customer.isBlocked
                            ? 'text-green-700 bg-green-100 hover:bg-green-200 disabled:opacity-50'
                            : 'text-orange-700 bg-orange-100 hover:bg-orange-200 disabled:opacity-50'
                        } disabled:cursor-not-allowed`}
                      >
                        {customer.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      
                      <button
                        onClick={() => setShowDeleteModal(customer.id)}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <p className="mt-4 text-sm text-gray-500">
              {searchTerm ? 'No customers found matching your search.' : 'No customers available.'}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete this customer account? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCustomer(showDeleteModal)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
