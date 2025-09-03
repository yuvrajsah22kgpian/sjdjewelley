import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import { 
  ExclamationTriangleIcon, 
  LinkIcon, 
  ShieldCheckIcon,
  ClockIcon,
  CubeIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  DocumentTextIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface DisclaimerPageProps {
  companyName?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactPhone?: string;
  customerServicePhone?: string;
  lastUpdated?: string;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({
  companyName = "SJD Gold and Diamond",
  contactEmail = "your-email@domain.com",
  contactAddress = "Your Business Address",
  contactPhone = "Your Phone Number",
  customerServicePhone = "713-773-2786",
  lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}) => {
  const generalSections = [
    {
      id: 'general',
      title: 'General Information',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      content: `The information on this website is provided on an "as is" basis without warranties of any kind. While we strive to keep the information up-to-date and accurate, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained on the website for any purpose.`
    },
    {
      id: 'professional-advice',
      title: 'No Professional Advice',
      icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      content: 'The content on this website is for informational purposes only and should not be considered as legal, medical, financial advice, professional consultation, or business recommendations. Always consult with qualified professionals before making decisions based on information found on this website.'
    },
    {
      id: 'external-links',
      title: 'External Links Disclaimer',
      icon: <LinkIcon className="w-6 h-6" />,
      content: 'Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.'
    }
  ];

  const advisoryTypes = [
    'Legal advice',
    'Medical advice', 
    'Financial advice',
    'Professional consultation',
    'Business recommendations'
  ];

  const responsibilities = [
    'You use the information at your own risk',
    'You are responsible for verifying any information before acting upon it',
    'You understand that individual results may vary',
    'You will not hold us liable for any decisions made based on website content'
  ];

  const logoDisclaimer = [
    { name: 'DTC Sight holder Logo', ownership: 'Property of DTC' },
    { name: 'FedEx & UPS logos', ownership: 'Used for representational purposes only - respective property of their owners. We are not affiliated with these companies; we utilize their shipping services.' },
    { name: 'Social Media logos', ownership: 'Facebook, YouTube, Google+, Pinterest & Twitter logos are properties of their respective brands.' }
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Website Disclaimer
            </h1>
            <p className="text-sm text-gray-500 bg-gray-50 rounded-md px-3 py-1 inline-block">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Product Availability & Pricing Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                <CubeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="ml-3 text-2xl sm:text-3xl font-bold text-blue-900">
                Product Availability & Pricing Information
              </h2>
            </div>
            <p className="text-blue-800 mb-6 leading-relaxed">
              We strive to provide you with accurate and up-to-date information regarding our products and pricing. Please review the following policies:
            </p>

            {/* Order Processing */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <ClockIcon className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Order Processing</h3>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <p className="text-orange-800">
                  <strong>Order Cut-Off Time:</strong> Please note that orders placed after <strong>3:00 PM Central Standard Time (CST)</strong> will be processed on the following business day.
                </p>
              </div>
            </div>

            {/* Product Availability */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Availability</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-medium text-red-900 mb-2">Out-of-Stock Items</h4>
                  <p className="text-gray-700 text-sm">
                    If you are interested in purchasing an item that is currently out of stock, please contact our customer service team. We can provide you with an estimated restock date and, in some cases, explore the possibility of creating a custom order for you.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Inventory Discrepancies</h4>
                  <p className="text-gray-700 text-sm">
                    Due to high order volumes, there may be instances where an item goes out of stock before our website is updated. We apologize for any inconvenience this may cause. We will make every effort to fulfill your order or offer a suitable alternative.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-green-900">Price Changes:</strong>
                    <span className="text-gray-700 ml-1">Please be aware that prices are subject to change without notice.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <strong className="text-green-900">Data Accuracy:</strong>
                    <span className="text-gray-700 ml-1">We make every effort to ensure the accuracy of the information on our website. However, errors can occur. We reserve the right to correct any inaccurate data or erroneous prices as soon as possible. We sincerely regret any inconvenience this may cause.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Service Contact */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <h4 className="font-medium text-green-900">Questions?</h4>
                  <p className="text-green-800 text-sm">
                    If you have any questions or require further assistance, please contact our customer service representatives at{' '}
                    <strong className="font-semibold">{customerServicePhone}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* General Sections */}
          {generalSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                  {section.icon}
                </div>
                <h2 className="ml-3 text-xl sm:text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          {/* Professional Advice Types */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Content should not be considered as:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advisoryTypes.map((type, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Disclaimers Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="ml-3 text-2xl sm:text-3xl font-bold text-purple-900">
                Legal Disclaimers
              </h2>
            </div>

            {/* Icons/Logos */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <EyeIcon className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Icons / Logos</h3>
              </div>
              <div className="space-y-4">
                {logoDisclaimer.map((item, index) => (
                  <div key={index} className="border-l-4 border-purple-300 pl-4">
                    <h4 className="font-medium text-purple-900 mb-1">{item.name}</h4>
                    <p className="text-gray-700 text-sm">{item.ownership}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Errors and Omissions */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Errors and Omission</h3>
              <p className="text-gray-700 leading-relaxed">
                We strive to ensure that the information on this website is complete, true, and accurate. If you encounter any errors or omissions, please inform us.
              </p>
            </div>

            {/* Copyright and Trademark */}
            <div className="bg-white rounded-lg p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Copyright and Trademark</h3>
              <p className="text-gray-700 leading-relaxed">
                We take utmost care to avoid any copyright or trademark infringements. If you believe that any content on our website violates a copyright or trademark, please notify us by email or through our customer support form, and we will remove the content as soon as possible.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-red-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-red-800 leading-relaxed">
              In no event shall <strong>{companyName}</strong>, its owners, employees, or affiliates be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of this website or with the delay or inability to use this website.
            </p>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              User Responsibility
            </h2>
            <p className="text-gray-700 mb-4">
              By using this website, you acknowledge that:
            </p>
            <ul className="space-y-3">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accuracy of Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Accuracy of Information
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We make every effort to ensure information accuracy, but cannot guarantee complete accuracy or currency. Information may become outdated, and we reserve the right to make changes without notice.
              </p>
            </div>

            {/* Technical Disclaimer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Technical Disclaimer
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We cannot guarantee uninterrupted access, error-free operation, freedom from viruses, or compatibility with all devices and browsers.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Intellectual Property
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All content is protected by copyright and intellectual property laws. Unauthorized use is prohibited.
              </p>
            </div>

            {/* Changes to Disclaimer */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Changes to This Disclaimer
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We reserve the right to update this disclaimer at any time. Continued use indicates acceptance of new terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-4">
              Contact Information
            </h2>
            <p className="text-blue-800 mb-4">
              If you have any questions about this disclaimer, please contact us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-1">Customer Service</h4>
                <p className="text-blue-700 text-sm font-semibold">{customerServicePhone}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-1">Email</h4>
                <p className="text-blue-700 text-sm break-all">{contactEmail}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-1">Phone</h4>
                <p className="text-blue-700 text-sm">{contactPhone}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-1">Address</h4>
                <p className="text-blue-700 text-sm">{contactAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-12 text-center">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-500">
              This disclaimer template provides general guidance. For specific legal requirements, 
              consult with a qualified legal professional in your jurisdiction.
            </p>
          </div>
        </div> */}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default DisclaimerPage;
