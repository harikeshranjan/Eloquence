'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  BarChart3,
  Tags,
  Clock,
  Heart,
  Zap,
  PenTool,
  Target,
  Users,
  Sparkles
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const router = useRouter();

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

  const features = [
    {
      icon: PenTool,
      title: "Focused Writing",
      description: "Practice your writing skills with our paragraph-focused approach. Master the building blocks of great writing, one paragraph at a time.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your writing journey with detailed analytics including word count, reading time, and writing frequency to celebrate your growth.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Tags,
      title: "Smart Organization",
      description: "Keep your writing organized with intelligent tagging and categorization. Find and revisit your work effortlessly.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "Daily Practice",
      description: "Establish a consistent writing routine with our user-friendly interface designed for daily practice and habit formation.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "Built by writers, for writers. Every feature is crafted with love and understanding of what makes writing truly enjoyable.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Future-Ready",
      description: "Stay tuned for exciting new features! We're constantly evolving to bring you the best writing experience possible.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ]

  const stats = [
    { icon: Users, value: "10K+", label: "Active Writers" },
    { icon: BookOpen, value: "50K+", label: "Paragraphs Written" },
    { icon: Target, value: "95%", label: "User Satisfaction" },
    { icon: Sparkles, value: "Daily", label: "New Features" }
  ]

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-8 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            ✨ Welcome to the Future of Writing
          </Badge>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Master the Art of
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Written Expression
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Welcome to Eloquence, where words come alive and writing becomes an art form.
            Transform your thoughts into compelling narratives, one paragraph at a time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className=" mt-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              id="mission-text"
              data-reveal="true"
              className={`transition-all duration-700 ${isVisible['mission-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                Our Mission
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empowering Every Voice
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                At Eloquence, we believe that exceptional writing is the cornerstone of effective communication.
                Our platform is designed to nurture your natural writing abilities and help you develop the
                skills needed to express your ideas with clarity, creativity, and confidence.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you're crafting your first paragraph or polishing your thousandth, we're here to
                support your journey toward becoming a more eloquent and impactful writer.
              </p>
            </div>

            <div
              id="mission-card"
              data-reveal="true"
              className={`transition-all duration-700 delay-200 ${isVisible['mission-card'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Writing Excellence</h3>
                  </div>
                  <blockquote className="text-lg leading-relaxed italic">
                    "The pen is mightier than the sword, and at Eloquence, we sharpen that pen until it becomes an instrument of profound expression and lasting impact."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="features-header"
            data-reveal="true"
            className={`text-center mb-16 transition-all duration-700 ${isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Eloquence?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover the features that make Eloquence the perfect companion for your writing journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-reveal="true"
                className={`transition-all duration-700 delay-${index * 100} ${isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <Card className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="vision"
            data-reveal="true"
            className={`transition-all duration-700 ${isVisible['vision'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
              Our Vision
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shaping the Future of Writing
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              We envision a world where everyone can express their thoughts with clarity and confidence.
              Eloquence is more than just a writing tool—it's your partner in discovering the power of your own voice.
            </p>

            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-12">
                <blockquote className="text-2xl lg:text-3xl font-medium italic mb-6 leading-relaxed">
                  "Every great writer was once a beginner. Every expert was once an amateur. Every icon was once unknown."
                </blockquote>
                <p className="text-lg opacity-90">
                  Your writing journey starts here, with Eloquence as your guide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div
            id="cta"
            data-reveal="true"
            className={`transition-all duration-700 ${isVisible['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Begin?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Join thousands of writers who are already improving their craft with Eloquence.
              Your journey to better writing starts with a single paragraph.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => router.push('/add-paragraph')}
              >
                Start Writing Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}