'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  Globe, 
  RefreshCw,
  ChevronRight,
  Heart,
  Sparkles,
  CheckCircle,
  Mail,
  Calendar
} from 'lucide-react'

export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [lastUpdated] = useState('March 15, 2024')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('[data-reveal="true"]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const privacySections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect only the necessary information to provide our services effectively, including your name, email, and writing activity. We never sell your data to third parties or use it for advertising purposes.",
      highlight: "We never sell your data",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: UserCheck,
      title: "How We Use Your Data",
      content: "Your data is used solely to improve your experience — personalized analytics, saving progress, and enhancing writing tools. All processing is done securely with your explicit consent.",
      highlight: "Used only to improve your experience",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: "We use industry-standard encryption and follow best practices to ensure your data remains secure. Access is restricted to authorized personnel only, and we conduct regular security audits.",
      highlight: "Industry-standard encryption",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: "You have full control over your data. You can request access, updates, or deletion of your personal information at any time. We respect your privacy choices and make the process simple.",
      highlight: "Full control over your data",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Third-Party Services",
      content: "We may use trusted third-party services to enhance functionality. These services adhere to strict privacy policies and are GDPR-compliant. We carefully vet all partners.",
      highlight: "GDPR-compliant partners only",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: RefreshCw,
      title: "Updates to This Policy",
      content: "We may update this Privacy Policy as needed. Any changes will be communicated clearly via email, and your continued use of Eloquence indicates acceptance of the updated terms.",
      highlight: "Clear communication of changes",
      gradient: "from-violet-500 to-purple-500"
    }
  ]

  const commitments = [
    { icon: CheckCircle, text: "No data selling", color: "text-emerald-600" },
    { icon: CheckCircle, text: "GDPR compliant", color: "text-blue-600" },
    { icon: CheckCircle, text: "Regular security audits", color: "text-purple-600" },
    { icon: CheckCircle, text: "Transparent practices", color: "text-orange-600" }
  ]

  return (
    <>
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div 
          id="header"
          data-reveal="true"
          className={`text-center mb-16 transition-all duration-700 ${isVisible['header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >          
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-lg px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Privacy Policy
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Your Privacy Matters
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            At Eloquence, we are committed to protecting your privacy and ensuring complete transparency in how your information is handled. Your trust is our foundation.
          </p>

          <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {commitments.map((commitment, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200/50 dark:border-slate-700/50">
                <commitment.icon className={`w-4 h-4 ${commitment.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{commitment.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-8 mb-16">
          {privacySections.map((section, index) => (
            <div
              key={index}
              id={`section-${index}`}
              data-reveal="true"
              className={`transition-all duration-700 delay-${index * 100} ${isVisible[`section-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Card className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Icon Section */}
                    <div className={`lg:w-1/4 p-8 bg-gradient-to-br ${section.gradient} text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <section.icon className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3">{index + 1}. {section.title}</h2>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                          {section.highlight}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-3/4 p-8">
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        {section.content}
                      </p>
                      
                      {/* Additional details based on section */}
                      {index === 0 && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Data we collect includes:</h3>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li>• Account information (name, email)</li>
                            <li>• Writing content and analytics</li>
                            <li>• Usage patterns and preferences</li>
                          </ul>
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Mail className="w-3 h-3 mr-1" />
                            Request Data Access
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            Update Preferences
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            Delete Account
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}