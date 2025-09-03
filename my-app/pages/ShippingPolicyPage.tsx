import React from 'react';
import { 
  TruckIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  CameraIcon, 
  ExclamationTriangleIcon,
  BuildingStorefrontIcon,
  DocumentCheckIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const ShippingPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Tracking Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <DocumentCheckIcon className="h-7 w-7 text-blue-600 mr-3" />
                Tracking Information
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="flex items-start">
                  <TruckIcon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Automatic Tracking Notification</p>
                    <p className="text-blue-700">
                      After shipping is completed, our sales person will send you the tracking number of your merchandise.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <ClockIcon className="h-7 w-7 text-green-600 mr-3" />
                Delivery Timeline
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <ClockIcon className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-medium text-green-800">Standard Delivery</h3>
                  </div>
                  <p className="text-green-700">
                    Typically, packages are delivered within <strong>1-2 business days</strong> according to your request.
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <BuildingStorefrontIcon className="h-5 w-5 text-yellow-600 mr-2" />
                    <h3 className="text-lg font-medium text-yellow-800">Custom Orders</h3>
                  </div>
                  <p className="text-yellow-700">
                    If we are sizing or modifying your order after purchase, please allow an additional <strong>2-5 business days</strong> before shipping.
                  </p>
                </div>
              </div>
            </section>

            {/* Security & Package Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <ShieldCheckIcon className="h-7 w-7 text-purple-600 mr-3" />
                Security & Package Information
              </h2>
              
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                        <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-purple-800 mb-2">Secure Packaging Names</h3>
                      <p className="text-purple-700 mb-3">
                        The packages will <strong>not</strong> be addressed from "SJD Gold & Diamond" for security purposes.
                      </p>
                      <div className="bg-white border border-purple-200 p-3 rounded">
                        <p className="text-purple-800 font-medium mb-1">Packages may be addressed from:</p>
                        <ul className="text-purple-700 space-y-1">
                          <li>• <strong>SJD SJD</strong></li>
                          <li>• <strong>SJD GND</strong></li>
                          <li>• <strong>Naushad Nooruddin</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                        <DocumentCheckIcon className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-purple-800 mb-2">Delivery Confirmation Required</h3>
                      <p className="text-purple-700">
                        We will <strong>not ship</strong> your shipment until you have replied back to us to confirm you will be available to sign for/accept the package on the scheduled delivery date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation & Care */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <CameraIcon className="h-7 w-7 text-indigo-600 mr-3" />
                Documentation & Care
              </h2>
              
              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                <div className="flex items-start">
                  <CameraIcon className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-indigo-800 mb-2">Pre-Shipping Documentation</h3>
                    <p className="text-indigo-700 mb-4">
                      Each piece from SJD Gold & Diamond is <strong>photographed and documented</strong> before shipping and is packaged with the utmost care to ensure safe delivery.
                    </p>
                    
                    <div className="bg-white border border-indigo-200 p-4 rounded">
                      <div className="flex items-center mb-2">
                        <ExclamationTriangleIcon className="h-5 w-5 text-indigo-600 mr-2" />
                        <h4 className="font-medium text-indigo-800">Damage Reporting</h4>
                      </div>
                      <p className="text-indigo-700">
                        If your package arrives and your item is damaged, please contact us within <strong>24 hours</strong> via email:{' '}
                        <a href="mailto:shipping@sjdgnd.com" className="text-indigo-800 underline hover:text-indigo-900">
                          shipping@sjdgnd.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Merchandise Verification */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <ExclamationTriangleIcon className="h-7 w-7 text-orange-600 mr-3" />
                Merchandise Verification
              </h2>
              
              <div className="bg-orange-50 border-2 border-orange-300 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="bg-white border border-orange-200 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-orange-800 mb-3 flex items-center">
                      <DocumentCheckIcon className="h-5 w-5 text-orange-600 mr-2" />
                      Invoice Verification Required
                    </h3>
                    <p className="text-orange-700 mb-3">
                      Please make sure all merchandise received matches your invoice.
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                      <CameraIcon className="h-5 w-5 text-red-600 mr-2" />
                      Missing Items Protocol
                    </h3>
                    <p className="text-red-700 mb-3">
                      If you received incomplete merchandise, please follow these steps:
                    </p>
                    <ul className="text-red-700 space-y-2">
                      <li className="flex items-start">
                        <span className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                        <span><strong>Keep video recording</strong> of the unboxing process</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                        <span><strong>Take photos</strong> of all received items</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                        <span><strong>Keep all proof</strong> of packages with packaging bags</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                        <span><strong>Don't trash</strong> any packaging materials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Pickup Option */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <BuildingStorefrontIcon className="h-7 w-7 text-teal-600 mr-3" />
                Showroom Pickup Option
              </h2>
              
              <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
                <div className="flex items-start">
                  <BuildingStorefrontIcon className="h-6 w-6 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-teal-800 mb-3">In-Person Pickup Available</h3>
                    <p className="text-teal-700 mb-4">
                      If you'd like to make an online purchase but would prefer to pick it up in our showroom, we are happy to arrange a pickup time during our business hours.
                    </p>
                    
                    <div className="bg-white border border-teal-200 p-4 rounded">
                      <h4 className="font-medium text-teal-800 mb-2">How to Arrange Pickup:</h4>
                      <ol className="text-teal-700 space-y-1">
                        <li>1. At checkout, mention the <strong>"Pick Up"</strong> option</li>
                        <li>2. Once your payment clears, we will contact you</li>
                        <li>3. We'll let you know your purchase is ready to pick up</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-3 text-center flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Questions About Shipping?
                </h3>
                <div className="text-center">
                  <p className="text-blue-700 mb-2">Contact our shipping department:</p>
                  <a 
                    href="mailto:shipping@sjdgnd.com" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    shipping@sjdgnd.com
                  </a>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-500">
                Shipping policy effective as of: {new Date().toLocaleDateString()}
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

export default ShippingPolicy;
