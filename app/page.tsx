"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CheckCircle, Code, Palette, Megaphone, BarChart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

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
      title: "Web Design & Development",
      description: "Custom websites that captivate and convert, built with cutting-edge technology.",
      icon: <Code className="h-10 w-10 text-lynk-blue" />,
    },
    {
      title: "UI/UX Design",
      description: "Intuitive interfaces and seamless user experiences that delight and engage.",
      icon: <Palette className="h-10 w-10 text-lynk-blue" />,
    },
    {
      title: "Social Media Marketing",
      description: "Strategic campaigns that boost engagement and drive meaningful connections.",
      icon: <Megaphone className="h-10 w-10 text-lynk-blue" />,
    },
    {
      title: "Analytics & Insights",
      description: "Data-driven strategies to optimize performance and maximize ROI.",
      icon: <BarChart className="h-10 w-10 text-lynk-blue" />,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content:
        "Lynk Digital transformed our online presence completely. Their team delivered beyond our expectations with a website that perfectly captures our brand essence.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, Innovate Inc",
      content:
        "Working with Lynk Digital has been a game-changer for our digital marketing strategy. Their insights and execution have driven real, measurable results.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Jessica Williams",
      role: "Founder, Creative Collective",
      content:
        "The UI/UX design work from Lynk Digital has significantly improved our user engagement metrics. They truly understand how to create experiences that users love.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section ref={ref} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(91,163,212,0.15),transparent_50%)]"
          style={{ y }}
        />

        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-lynk-blue rounded-full bg-lynk-blue/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Digital Excellence
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Transforming Ideas Into <span className="gradient-text">Digital Experiences</span>
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                At Lynk Digital, we empower brands by crafting compelling digital identities, delivering cutting-edge
                web solutions, and executing data-driven strategies that drive engagement and growth.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button size="lg" className="bg-lynk-navy hover:bg-lynk-dark text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-lynk-blue text-lynk-blue hover:bg-lynk-blue/10">
                  Our Services
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lynk-navy to-lynk-blue opacity-75 blur-lg"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <div className="relative bg-background rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Digital Marketing Dashboard"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-lg border border-lynk-blue/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-lynk-blue/20 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-lynk-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Trusted by</p>
                      <p className="text-lg font-bold text-lynk-navy">100+ Brands</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-background rounded-lg p-4 shadow-lg border border-lynk-blue/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-lynk-blue/20 flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-lynk-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Average</p>
                      <p className="text-lg font-bold text-lynk-navy">3x ROI</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-lynk-blue rounded-full bg-lynk-blue/10">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-lg text-muted-foreground">
              We offer end-to-end digital services to help your brand stand out in the digital landscape and connect
              with your audience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-lynk-blue/20">
                  <CardContent className="p-6">
                    <div className="mb-4 relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-lynk-navy to-lynk-blue opacity-75 blur group-hover:blur-md transition-all duration-300" />
                      <div className="relative bg-background rounded-full p-4 w-fit">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Link
                      href="/services"
                      className="inline-flex items-center text-lynk-blue font-medium hover:underline"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-lynk-navy/20 to-lynk-blue/20 opacity-50 blur-xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg overflow-hidden h-40">
                      <Image
                        src="/placeholder.svg?height=160&width=240"
                        alt="Team collaboration"
                        width={240}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-muted rounded-lg overflow-hidden h-64">
                      <Image
                        src="/placeholder.svg?height=256&width=240"
                        alt="Design process"
                        width={240}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-muted rounded-lg overflow-hidden h-64">
                      <Image
                        src="/placeholder.svg?height=256&width=240"
                        alt="Creative workspace"
                        width={240}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-muted rounded-lg overflow-hidden h-40">
                      <Image
                        src="/placeholder.svg?height=160&width=240"
                        alt="Digital marketing"
                        width={240}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-lynk-blue rounded-full bg-lynk-blue/10">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Help Brands <span className="gradient-text">Grow Loud and Proud</span> in the Digital World
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Lynk Digital, our mission is to empower brands by crafting compelling digital identities, delivering
                cutting-edge web and UI/UX solutions, and executing data-driven social media strategies that drive
                engagement, growth, and measurable results.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Innovative design that captures your brand essence",
                  "Strategic marketing that drives real results",
                  "Meaningful digital connections with your audience",
                  "Data-driven approach to maximize ROI",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <CheckCircle className="h-5 w-5 text-lynk-blue mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button size="lg" asChild className="bg-lynk-navy hover:bg-lynk-dark text-white">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-lynk-blue rounded-full bg-lynk-blue/10">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our clients have to say about working with Lynk Digital.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:border-lynk-blue/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lynk-navy to-lynk-dark opacity-95" />

            <div className="relative z-10 py-16 px-6 md:px-12 lg:px-20 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-lg mb-8 text-white/90">
                  Let's collaborate to create digital experiences that captivate your audience and drive real results
                  for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="bg-lynk-blue hover:bg-lynk-blue/90 text-white"
                  >
                    <Link href="/contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-lynk-blue/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-lynk-blue/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
