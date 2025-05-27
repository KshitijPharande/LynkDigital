"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Megaphone,
  BarChart,
  Smartphone,
  Globe,
  PenTool,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServicesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("web-design")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      const targetTab = hash.replace("-details", "")
      if (services.some((service) => service.id === targetTab)) {
        setActiveTab(targetTab)
        const element = document.getElementById(`${targetTab}-details`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const services = [
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "We craft visually stunning, user-friendly websites tailored to your brand and business goals. Our web design services focus on creating engaging layouts and seamless user experiences, while our development team brings your site to life with clean, responsive, and secure code.",
      icon: <Code className="h-10 w-10 text-primary" />,
      primary: "Stunning, responsive websites that elevate your brand's success.",
      features: [
        "Responsive design for all devices",
        "Custom UI/UX development",
        "Speed and SEO optimization",
        "Ongoing support and updates",
        "We build websites that deliver results.",
      ],
      image: "/web.webp",
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "We design intuitive and engaging user interfaces (UI) that enhance user experiences (UX) across web and mobile platforms.",
      icon: <Palette className="h-10 w-10 text-primary" />,
      primary: "Intuitive interfaces that engage and delight your users.",
      features: [
        "User research and testing",
        "Wireframing and prototyping",
        "Visual design and branding",
        "Interaction design",
        "Usability testing",
        "Design systems",
      ],
      image: "/uiux.webp",
    },
    {
      id: "social-media",
      title: "Social Media Marketing",
      description: "We help you grow your brand and connect with your audience through strategic social media marketing. From content creation and campaign management to analytics and engagement, we build a strong online presence across platforms like Instagram, Facebook, LinkedIn, and more.",
      icon: <Megaphone className="h-10 w-10 text-primary" />,
      primary: "Bold strategies to grow your audience and engagement.",
      features: [
        "Platform strategy and management",
        "Content creation and curation",
        "Setting up and improving profiles",
        "Running ads to reach more people",
        "Analytics, Tracking and reporting",
        "Reach the right people and grow your business online",
      ],
      image: "/socialmedia.webp",
    },
    // {
    //   id: "analytics",
    //   title: "Analytics & Insights",
    //   description: "Data-driven strategies to optimize performance and maximize ROI.",
    //   icon: <BarChart className="h-10 w-10 text-primary" />,
    //   features: [
    //     "Performance tracking",
    //     "Conversion optimization",
    //     "User behavior analysis",
    //     "Custom reporting dashboards",
    //     "A/B testing",
    //     "Strategic recommendations",
    //   ],
    //   image: "/placeholder.svg?height=400&width=600",
    // },
    {
      id: "digital-strategy",
      title: "Digital Strategy & Consulting",
      description: "We guide your business with smart digital plans that get results.",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      primary: "Smart digital plans to drive your business forward.",
      features: [
        "Online growth planning",
        "Brand and market analysis",
        "Brand positioning strategies",
        "Content and marketing strategy",
        "Performance review and Consultation",
        "Clear strategies to help your business succeed online.",
      ],
      image: "/digitalstatergy.webp",
    },
    {
      id: "branding",
      title: "Branding & Identity",
      description: "We create impactful brand identities that tell your story and leave a lasting impression. From logo design and color palettes to typography and brand guidelines, we develop a cohesive visual language that reflects your values and sets you apart.",
      icon: <PenTool className="h-10 w-10 text-primary" />,
      primary: "Compelling brand identities that resonate with your audience and stand out in the market.",
      features: [
        "Brand strategy",
        "Logo design",
        "Visual identity systems",
        "Brand guidelines",
        "Rebranding support",
        "Stand out and make a lasting impression",
      ],
      image: "/branding.webp",
    },
    {
      id: "seo",
      title: "SEO & Content Strategy",
      description: "We boost your online visibility with smart SEO and content strategies that drive organic traffic and improve search rankings.",
      icon: <Search className="h-10 w-10 text-primary" />,
      primary: "Powerful SEO to boost visibility and attract audiences.",
      features: [
        "Keyword research and strategy",
        "On-page optimization",
        "Technical SEO audits",
        "Content creation and optimization",
        "Blog and website content planning",
        "Performance tracking",
      ],
      image: "/seo.webp",
    },
    // {
    //   id: "ecommerce",
    //   title: "E-Commerce Solutions",
    //   description: "End-to-end e-commerce development to help you sell products and services online.",
    //   icon: <Globe className="h-10 w-10 text-primary" />,
    //   features: [
    //     "Custom e-commerce websites",
    //     "Shopping cart development",
    //     "Payment gateway integration",
    //     "Inventory management",
    //     "Order fulfillment systems",
    //     "Customer account management",
    //   ],
    //   image: "/placeholder.svg?height=400&width=600",
    // },
  ]

  const process = [
    {
      title: "Discovery",
      description: "We start by understanding your business, goals, and target audience to create a tailored strategy.",
    },
    {
      title: "Strategy",
      description: "Based on our findings, we develop a comprehensive strategy to achieve your specific objectives.",
    },
    {
      title: "Design",
      description: "Our creative team designs visually stunning and user-friendly digital experiences.",
    },
    {
      title: "Development",
      description: "We bring designs to life with clean, efficient code and cutting-edge technology.",
    },
    {
      title: "Testing",
      description: "Rigorous testing ensures everything works flawlessly across all devices and platforms.",
    },
    {
      title: "Launch",
      description: "We carefully deploy your project and provide training to ensure a smooth transition.",
    },
    {
      title: "Optimization",
      description: "Continuous monitoring and optimization to improve performance and results over time.",
    },
  ]
 
  return (
    <>
    
      {/* Hero Section */}
      <section className="pt-32 pb-18 md:pt-40 md:pb-26 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Services
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Comprehensive <span className="gradient-text">Digital Solutions</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              From slick websites and standout UI/UX to scroll-stopping social media and smart marketing moves — Lynk
              Digital connects the dots so you can shine online.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-lg text-muted-foreground">
              We offer end-to-end digital services to help your brand stand out in the digital landscape and connect
              with your audience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.slice(0, 8).map((service, index) => (
              <motion.div key={index} variants={fadeInUp} className="group" id={service.id}>
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4 relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:blur-md transition-all duration-300" />
                      <div className="relative bg-background rounded-full p-4 w-fit">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.primary}</p>
                    <Link
                      href={`#${service.id}-details`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                      onClick={() => setActiveTab(service.id)}
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
              Explore Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detailed Service Offerings</h2>
            <p className="text-lg text-muted-foreground">
              Learn more about how our services can help your business grow in the digital landscape.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative w-full overflow-auto mb-16">
              <TabsList className="inline-flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                {services.map((service, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={service.id} 
                    className="rounded-full border border-border px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {service.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {services.map((service, index) => (
              <TabsContent key={index} value={service.id} id={`${service.id}-details`} className="mt-0">
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur" />
                        <div className="relative bg-background rounded-full p-4">{service.icon}</div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-xl"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative rounded-2xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={600}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground">
              We follow a proven methodology to ensure successful outcomes for every project.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted hidden md:block" />

            {process.map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="bg-background rounded-lg p-6 shadow-md relative">
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-sm -z-10" />
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                        {index % 2 !== 0 && <span className="gradient-text">0{index + 1}</span>}
                        <span>{step.title}</span>
                        {index % 2 === 0 && <span className="gradient-text">0{index + 1}</span>}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="md:w-0 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold hidden md:flex">
                      {index + 1}
                    </div>
                  </div>

                  <div className="md:w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
            <div className="relative z-10 py-16 px-6 md:px-12 lg:px-20 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-lg mb-8 text-white/90">
                  Let's collaborate to create digital experiences that captivate your audience and drive real results
                  for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild className="group">
                    <Link href="/contact">
                      Get in Touch
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                 <Button
                    size="lg"
                    variant="outline"
                    className=" group border-lynk-navy text-lynk-navy bg-white/80 hover:bg-white/90 dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white/10 hover:text-black"
                  >
                    <Link href="/about">Learn More About Us</Link>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </>
  )
}