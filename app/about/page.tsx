"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Target, Lightbulb, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in digital marketing and web development, Alex leads our team with vision and expertise.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Samantha Lee",
      role: "Creative Director",
      bio: "Samantha brings her award-winning design background to create stunning visual experiences that captivate and convert.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Chen",
      role: "Technical Lead",
      bio: "David's expertise in cutting-edge web technologies ensures our clients receive innovative and scalable solutions.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Maya Patel",
      role: "Marketing Strategist",
      bio: "Maya crafts data-driven marketing strategies that help our clients achieve measurable growth and engagement.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      title: "Innovation",
      description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
    },
    {
      title: "Collaboration",
      description: "We believe in working closely with our clients to understand their unique needs and goals.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Excellence",
      description: "We are committed to delivering exceptional quality in everything we do.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "Results-Driven",
      description: "We focus on creating solutions that drive real, measurable results for our clients.",
      icon: <Target className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_50%)]" />

        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About Us
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We Are <span className="gradient-text">Lynk Digital</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A team of passionate digital experts dedicated to transforming ideas into impactful experiences through
              innovative design, strategic marketing, and meaningful digital connections.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
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
                    src="/placeholder.svg?height=600&width=800"
                    alt="Our team at work"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
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
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-primary rounded-full bg-primary/10">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From Idea to <span className="gradient-text">Digital Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2018, Lynk Digital began with a simple mission: to help brands create meaningful connections
                in the digital world. What started as a small team of passionate digital enthusiasts has grown into a
                full-service digital agency serving clients across industries.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our journey has been defined by continuous innovation, a commitment to excellence, and a deep
                understanding of the evolving digital landscape. Today, we're proud to be the trusted digital partner
                for businesses of all sizes, from startups to established enterprises.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">100+</p>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">250+</p>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">15+</p>
                  <p className="text-sm text-muted-foreground">Industry Awards</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-2">5+</p>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
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
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission & Vision</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm" />
              <Card className="relative h-full border-none">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-6">
                    At Lynk Digital, our mission is to empower brands by crafting compelling digital identities,
                    delivering cutting-edge web and UI/UX solutions, and executing data-driven social media strategies
                    that drive engagement, growth, and measurable results. We're here to help brands grow loud and proud
                    in the digital world.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Create compelling digital identities",
                      "Deliver cutting-edge web solutions",
                      "Execute data-driven marketing strategies",
                      "Drive measurable growth and engagement",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm" />
              <Card className="relative h-full border-none">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground mb-6">
                    To be the leading digital catalyst for brands, transforming ideas into impactful experiences through
                    innovative design, strategic marketing, and meaningful digital connections. We envision a world
                    where every brand can effectively communicate its unique value and connect authentically with its
                    audience in the digital space.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Be the leading digital catalyst for brands",
                      "Transform ideas into impactful experiences",
                      "Pioneer innovative design and marketing",
                      "Create meaningful digital connections",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
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
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-lg text-muted-foreground">
              Our core values shape everything we do and guide our approach to client partnerships.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 mx-auto relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:blur-md transition-all duration-300" />
                      <div className="relative bg-background rounded-full p-4 h-full flex items-center justify-center">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Experts</h2>
            <p className="text-lg text-muted-foreground">
              Our talented team of digital specialists brings diverse skills and experience to every project.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <Card className="h-full border-none bg-background/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />

            <div className="relative z-10 py-16 px-6 md:px-12 lg:px-20 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
                <p className="text-lg mb-8 text-white/90">
                  Let's collaborate to create digital experiences that captivate your audience and drive real results
                  for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
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

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
