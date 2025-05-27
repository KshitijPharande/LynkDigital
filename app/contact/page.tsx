"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "web-design",
    submitted: false,
    loading: false,
  })

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash === '#contact-form') {
      // Wait a bit for the page to fully load
      setTimeout(() => {
        const formSection = document.getElementById('contact-form')
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  // Web3Forms Integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState((prev) => ({ ...prev, loading: true }))

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const object = Object.fromEntries(formData)
      const json = JSON.stringify(object)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })

      if (response.status === 200) {
        setFormState((prev) => ({
          ...prev,
          loading: false,
          submitted: true,
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service: "web-design",
        }))
      } else {
        console.error("Web3Forms submission failed:", response.statusText)
        setFormState((prev) => ({ ...prev, loading: false }))
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState((prev) => ({ ...prev, loading: false }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormState((prev) => ({ ...prev, service: value }))
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Us",
      details: "hello@lynkdigital.com",
      description: "For general inquiries and information",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=pharandekshitij@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Us",
      details: "(+91) 8010195467",
      description: "Monday to Friday, 9am to 5pm IST",
      href: "tel:+918010195467",
    },
    {
      icon: <FaWhatsapp className="h-6 w-6 text-primary" />,
      title: "Message Us",
      details: "(+91) 9930632999",
      description: "Available on WhatsApp for Consultation",
      href: "https://wa.me/+9930632999?text=Hey%20I%27m%20Interested%20in%20your%20Service"
    },
    {
      icon: <FaInstagram className="h-6 w-6 text-primary" />,
      title: "Instagram",
      details: "@LynkDigital",
      description: "Connect with Us",
      href: "https://www.instagram.com/lynk.digital_?igsh=Zm5jazNleGlqZDg3"
    }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Contact Us
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Let's <span className="gradient-text">Connect</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Have a project in mind or want to learn more about our services? We'd love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Contact via ${item.title}`}>
                  <Card className="h-full border-none bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur" />
                        <div className="relative bg-background rounded-full p-4 w-fit">{item.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="font-medium mb-2">{item.details}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20" id="contact-form">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's Discuss Your <span className="gradient-text">Project</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form and our team will get back to you within 24 hours. We're excited to learn about your
                project and how we can help bring your vision to life.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Free Consultation</h3>
                    <p className="text-sm text-muted-foreground">
                      Initial consultation to discuss your needs and goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Custom Solutions</h3>
                    <p className="text-sm text-muted-foreground">
                      Tailored proposals based on your specific requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will respond to your inquiry within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm" />
              <Card className="relative border-none">
                <CardContent className="p-6 md:p-8">
                  {formState.submitted ? (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your message has been received. We'll get back to you shortly.
                      </p>
                      <Button
                        onClick={() => setFormState((prev) => ({ ...prev, submitted: false }))}
                        className="gradient-bg"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    // Web3Forms Integration
                    <form onSubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                      <input type="hidden" name="access_key" value="b7d232d7-193a-4eaf-8ecd-609b0c1da211" />
                      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              required
                              value={formState.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={formState.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="+1 (555) 123-4567"
                              value={formState.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="Project Inquiry"
                              required
                              value={formState.subject}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Service of Interest</Label>
                          <RadioGroup
                            value={formState.service}
                            onValueChange={handleServiceChange}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="web-design" id="web-design" />
                              <Label htmlFor="web-design" className="cursor-pointer">
                                Web Design
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ui-ux" id="ui-ux" />
                              <Label htmlFor="ui-ux" className="cursor-pointer">
                                UI/UX Design
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="social-media" id="social-media" />
                              <Label htmlFor="social-media" className="cursor-pointer">
                                Social Media
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other" className="cursor-pointer">
                                Other
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your project..."
                            rows={5}
                            required
                            value={formState.message}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full gradient-bg" disabled={formState.loading}>
                        {formState.loading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
              Our Location
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-lg text-muted-foreground">
              We're located in the heart of Tech City. Feel free to stop by for a coffee and a chat.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden h-[400px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm" />
            <div className="relative h-full w-full rounded-2xl">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Map Placeholder</h3>
                  <p className="text-muted-foreground">123 Digital Avenue, Tech City, 10001</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* FAQ Section  */}
      <section className="py-20">
        <div className="container px-4 mx-auto ">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto ">
            {[
              {
                question: "What is your typical process for a new project?",
                answer:
                  "Our process typically includes discovery, strategy, design, development, testing, and launch phases. We start by understanding your business goals and target audience, then develop a tailored strategy to achieve your objectives.",
              },
              {
                question: "How long does it take to complete a website?",
                answer:
                  "Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while more complex projects can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you offer ongoing maintenance and support?",
                answer:
                  "Yes, we offer various maintenance and support packages to keep your digital assets secure, up-to-date, and performing optimally. We can discuss these options based on your specific needs.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "Our pricing is project-based and depends on the scope, complexity, and timeline. We provide detailed proposals with transparent pricing after our initial consultation and understanding of your requirements.",
              },
              {
                question: "Can you help with content creation?",
                answer:
                  "Yes, we offer content strategy and creation services including copywriting, photography, and video production to ensure your digital presence effectively communicates your brand message.",
              },
              {
                question: "Do you work with clients internationally?",
                answer:
                  "We work with clients globally and have experience managing remote projects efficiently through clear communication and project management tools.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}