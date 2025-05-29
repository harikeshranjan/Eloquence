'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
            Legal Agreement
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-green-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Clear guidelines for a better experience. Your use of Eloquence means you agree to these terms.
          </p>
        </div>

        <Card className='bg-transparent border-none'>
          <CardContent>
            <div className="space-y-10">
              {[
                {
                  title: "Acceptance of Terms",
                  content: "By using Eloquence, you acknowledge and accept these Terms & Conditions. If you disagree with any part, please do not use our services."
                },
                {
                  title: "User Responsibilities", 
                  content: "You agree to use Eloquence responsibly and refrain from any activities that may harm the platform, its users, or violate laws or ethical standards."
                },
                {
                  title: "Intellectual Property",
                  content: "All content, features, and functionality are owned by Eloquence. You may not copy, modify, or distribute our material without permission."
                },
                {
                  title: "Account & Access",
                  content: "You are responsible for maintaining the confidentiality of your account. We reserve the right to suspend or terminate accounts violating these terms."
                },
                {
                  title: "Limitations of Liability",
                  content: "Eloquence is not liable for any direct, indirect, or incidental damages resulting from the use or inability to use our services."
                },
                {
                  title: "Modifications",
                  content: "We reserve the right to update these terms at any time. Continued use of Eloquence after changes constitutes your acceptance of the new terms."
                },
                {
                  title: "Contact Us",
                  content: "For questions or concerns about these Terms & Conditions, feel free to reach out via our support channels."
                }
              ].map((section, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-xl bg-gradient-to-r from-slate-50/50 to-blue-50/30 dark:from-slate-700/30 dark:to-slate-600/20 border border-slate-200/50 dark:border-slate-600/30 hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-slate-800/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6">
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}