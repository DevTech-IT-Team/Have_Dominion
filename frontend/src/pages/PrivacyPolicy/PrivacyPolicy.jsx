import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-amber-50 rounded-xl shadow-lg p-8 md:p-10 border border-amber-200">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-amber-800">
              Have Dominion
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Privacy Policy</h2>
          <p className="text-amber-700">Last Updated: December 12, 2025</p>
        </div>

        <div className="prose max-w-none">
          <div className="space-y-8">
            <p className="text-amber-900 leading-relaxed">
              This Privacy Policy outlines how Have Dominion collects, uses, and protects personal information when you visit our website or use our services.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">1. Who We Are</h3>
              <p className="text-amber-900 leading-relaxed">
                Have Dominion provides educational and professional development services. We value your trust, and your privacy is extremely important to us.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">2. Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-2 text-amber-900">
                <li>Your contact details (name, phone number, email).</li>
                <li>Address and location details for service visits.</li>
                <li>Photos and project notes for service improvement.</li>
                <li>Cookies and analytics data for website performance.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">3. How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-amber-900">
                <li>To provide educational and professional development services.</li>
                <li>To create accurate program information or respond to inquiries.</li>
                <li>To analyze website usage and improve user experience.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">4. Legal Basis</h3>
              <p className="text-amber-900 leading-relaxed">
                We process personal data based on consent, legitimate business interests, or contractual obligations.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">5. Cookies & Tracking</h3>
              <p className="text-amber-900 leading-relaxed">
                We use cookies to enhance website functionality, track performance, and understand how visitors interact with our content.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">6. Sharing Your Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-amber-900">
                <li>With trusted partners assisting in service delivery.</li>
                <li>With payment processors (if applicable).</li>
                <li>With legal authorities when required by law.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">7. Data Security</h3>
              <p className="text-amber-900 leading-relaxed">
                We utilize secure internal systems and protocols to protect your information from unauthorized access or misuse.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">8. Data Retention</h3>
              <p className="text-amber-900 leading-relaxed">
                Personal data is stored only for as long as necessary for business operations or legal compliance. You may request deletion anytime.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">9. Children's Privacy</h3>
              <p className="text-amber-900 leading-relaxed">
                We do not knowingly collect information from children under age 13.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">10. Your Rights</h3>
              <ul className="list-disc pl-6 space-y-2 text-amber-900">
                <li>Right to access your personal data</li>
                <li>Right to request changes</li>
                <li>Right to delete your data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">11. Contact Us</h3>
              <p className="text-amber-900 leading-relaxed">
                For privacy concerns or requests, contact us at:
              </p>
              <ul className="mt-2 space-y-1 text-amber-900">
                <li>Email: lthd@letthemhavedominion.org</li>
                <li>Phone: (888) 343-4106</li>
                <li>Address: 1700 Seventh Avenue, Suite 2100-2029, Seattle, Washington 98101</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-amber-200 text-center">
          <Link to="/" className="inline-flex items-center text-amber-800 hover:text-amber-900 transition-colors font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
