import React from 'react';
import { ExclamationTriangleIcon, ClockIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const ReturnPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Return Policy</h1>
              <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="text-lg text-gray-800 text-center leading-relaxed">
                  At <span className="font-semibold text-blue-800">SJD Gold & Diamond Company</span>, customer satisfaction is important to us. Please review our policies below before making a purchase.
                </p>
              </div>
            </section>

            {/* Exchange & Store Credit */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <CheckCircleIcon className="h-7 w-7 text-green-600 mr-3" />
                Exchange & Store Credit
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <ClockIcon className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-medium text-green-800">30-Day Window</h3>
                  </div>
                  <p className="text-green-700">
                    We offer exchanges or store credit within <strong>30 days</strong> from the original purchase date.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="text-lg font-medium text-red-800">Important Restrictions</h3>
                  </div>
                  <ul className="text-red-700 space-y-1">
                    <li>• <strong>Refunds are not available.</strong> All sales are considered final after 30 days.</li>
                    <li>• After the 30-day period, no store credit or exchanges will be issued under any circumstances.</li>
                    <li>• <strong>Trades are not accepted.</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Jewelry Exchange Conditions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <ExclamationTriangleIcon className="h-7 w-7 text-orange-600 mr-3" />
                Jewelry Exchange Conditions
              </h2>
              
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-800 font-bold text-sm">1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-orange-800 mb-1">Pre-Approval Required</h3>
                      <p className="text-orange-700">All jewelry exchanges must be pre-approved by our team.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-800 font-bold text-sm">2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-orange-800 mb-1">Original Condition Required</h3>
                      <p className="text-orange-700">Items must be returned in original condition, unworn, unaltered, and undamaged, along with the original receipt.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-800 font-bold text-sm">3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-orange-800 mb-1">Damaged Returns Policy</h3>
                      <p className="text-orange-700">Returns that show signs of wear, repair, or damage will not be accepted and will be returned to the sender at their cost.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-800 font-bold text-sm">4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-orange-800 mb-1">Shipping Responsibility</h3>
                      <p className="text-orange-700">Customers are responsible for return shipping fees, including insurance coverage during transit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Sale Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <XCircleIcon className="h-7 w-7 text-red-600 mr-3" />
                Final Sale Items
              </h2>
              
              <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg">
                <div className="mb-4">
                  <p className="text-red-800 font-semibold text-lg mb-3">
                    The following purchases are <span className="bg-red-200 px-2 py-1 rounded">FINAL SALE</span> and not eligible for return, exchange, or refund:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border border-red-200 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                      Financing Purchases
                    </h3>
                    <p className="text-red-700">All financing purchases</p>
                  </div>

                  <div className="bg-white border border-red-200 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                      <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                      Custom Orders
                    </h3>
                    <p className="text-red-700">Special orders and custom-designed jewelry</p>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-red-800 mb-2">Special Order Definition</h3>
                  <p className="text-red-700 mb-3">
                    Any request involving size, color, or design customizations not available for immediate purchase on our website is classified as a special order.
                  </p>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-red-800 font-medium text-sm">
                      ⚠️ These orders cannot be canceled, refunded, or exchanged under any circumstances.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Notes */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Notes</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <XCircleIcon className="h-6 w-6 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No Buy-Back Policy</h3>
                      <p className="text-gray-700">We do not buy back previously purchased jewelry.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <XCircleIcon className="h-6 w-6 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No Trade-Ins</h3>
                      <p className="text-gray-700">We do not offer trade-ins on previously sold items.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium text-yellow-800 mb-1">Company Rights</h3>
                      <p className="text-yellow-700">
                        SJD Gold & Diamond Company reserves the right to decline any return or exchange that does not meet the conditions outlined above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-3 text-center">Questions About Returns?</h3>
                <p className="text-blue-700 text-center">
                  Please contact our customer service team before initiating any return to ensure your item qualifies and to receive pre-approval.
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Policy effective as of: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                © {new Date().getFullYear()} SJD Gold & Diamond Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
