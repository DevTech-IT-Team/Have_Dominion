import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-amber-50 rounded-xl shadow-lg p-8 md:p-10 border border-amber-200">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-amber-800">
              Have Dominion
            </h1>
          </Link>
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Terms of Service</h2>
          <p className="text-amber-700">Last Updated: December 12, 2025</p>
        </div>

        <div className="prose max-w-none">
          <div className="space-y-8">
            <p className="text-amber-900 leading-relaxed">
              Please read these Terms & Conditions carefully before using our website or services. By accessing or using Have Dominion's services, you agree to these terms.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">1. Acceptance of Terms</h3>
              <p className="text-amber-900 leading-relaxed">
                By using our website or booking any service, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">2. Services Provided</h3>
              <p className="text-amber-900 leading-relaxed">
                Have Dominion provides educational and professional development services, including but not limited to online courses, training materials, and consulting services. Service availability may vary by location and scheduling.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">3. Appointments & Scheduling</h3>
              <p className="text-amber-900 leading-relaxed">
                All appointments must be scheduled in advance. We reserve the right to reschedule or delay services in cases of unforeseen circumstances. If you need to reschedule, please notify us at least 24 hours in advance.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">4. Payments & Billing</h3>
              <p className="text-amber-900 leading-relaxed">
                Payments are due at the time of service unless otherwise agreed. We accept various payment methods including credit cards and electronic transfers. Late payments may incur additional fees.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">5. Cancellations & Refunds</h3>
              <p className="text-amber-900 leading-relaxed">
                Cancellations must be made at least 24 hours before the scheduled appointment. Refunds are only issued for services not performed or in cases where we fail to meet agreed service expectations.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">6. Liability & Damages</h3>
              <p className="text-amber-900 leading-relaxed">
                While we take great care with every client, Have Dominion is not responsible for issues caused by factors beyond our control. Clients are responsible for providing accurate information and meeting any prerequisites for our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">7. Use of Website</h3>
              <p className="text-amber-900 leading-relaxed">
                All content on this website, including images, text, and design, is owned by Have Dominion. Unauthorized use, copying, or distribution is strictly prohibited.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">8. Changes to Terms</h3>
              <p className="text-amber-900 leading-relaxed">
                We may update these Terms & Conditions at any time. Continued use of our services after changes are posted constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 border-b border-amber-200 pb-2">Contact Us</h3>
              <p className="text-amber-900 leading-relaxed">
                If you have any questions regarding these Terms & Conditions, please contact us at:
              </p>
              <ul className="mt-2 space-y-1 text-amber-900">
                <li>Email: lthd@letthemhavedominion.org</li>
                <li>Phone: 1-888-997-3744</li>
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
