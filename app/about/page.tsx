"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Target, Lightbulb, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaEmber, FaEnvelope, FaLinkedin, FaMailBulk, FaMailchimp, FaTwitter } from "react-icons/fa"

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
  const founders = [
    {
      name: "Roma Devadhar",
      role: "Co-Founder and Director",
      image: "/roma.png",
      message:
        "When I founded this company at 19, it wasn't just about building websites or running campaigns, it was about creating a space where businesses could find clarity in the chaos of the digital world. A place where innovation meets intention. We believe real results come from real relationships. As we grow, our commitment stays the same: to be the digital partner you can trust, every step of the way. Let's build something great together.",
      socialLinks: [
        { icon: <FaEnvelope className="h-4 w-4" />, url: "#" },
      ],
    },
    {
      name: "Swarada Mhetre",
      role: "Co-Founder and Director",
      image: "/swarada.png",
      message:
        "We started Lynk Digital at 20 not because I had it all figured out — but because I saw something most agencies were missing: authenticity with an edge. In a space flooded with formulas and trends, I wanted to create a marketing agency that felt intentional, elevated, and quietly powerful. One that understood the digital world isn't just about being loud — it's about being undeniable. Lynk Digital was built for brands that want more than likes. Brands that crave identity, clarity, and timeless relevance. We blend smart strategy with elegant execution — and we never do average. This isn't just a business. It's a movement — proof that age doesn't define expertise, and great ideas don't need decades. Just vision, discipline, and the courage to build differently.Welcome to Lynk Digital. For the brands that don't follow. They lead",
      socialLinks: [
        { icon: <FaEnvelope className="h-4 w-4" />, url: "#" },
      ],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-26 relative overflow-hidden">
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
              At Lynk Digital, We don't just build websites or run campaigns — we create digital experiences that drive results. From concept to execution, we're your partner in turning vision into value.
            </motion.p>
          </div>
        </div>
      </section>

      {/* <section className="py-30">
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
      </section> */}


 {/* Message from Founders Section */}
 
       <section className="py-16">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium uppercase tracking-wider text-lynk-blue rounded-full bg-lynk-blue/10">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Message From Our Founders</h2>
            <p className="text-lg text-muted-foreground">
              Meet the visionaries behind Lynk Digital and learn about our journey and mission.
            </p>
          </motion.div>

          <div className="space-y-12">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lynk-navy/20 to-lynk-blue/20 opacity-50 blur-sm" />
                <Card className="relative border-none overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div
                        className={`md:w-1/3 bg-gradient-to-br from-lynk-navy to-lynk-blue p-8 flex flex-col items-center justify-center text-white ${index % 2 === 1 ? "md:order-last" : ""}`}
                      >
                        <div className="relative mb-4">
                          <div className="absolute -inset-1 rounded-full bg-white/20 opacity-50 blur-sm" />
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            width={300}
                            height={300}
                            className="rounded-full h-[140px] w-[140px] object-cover border-4 border-white/80 relative z-10 scale-125"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-center">{founder.name}</h3>
                        <p className="text-white/80 text-sm mb-4 text-center">{founder.role}</p>
                        <div className="flex space-x-3 mt-2">
                          {founder.socialLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                              {link.icon}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="h-full flex flex-col justify-center">
                          <div className="mb-4">
                            <svg
                              className="h-8 w-8 text-lynk-blue/30"
                              fill="currentColor"
                              viewBox="0 0 32 32"
                              aria-hidden="true"
                            >
                              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-6">{founder.message}</p>
                          <div className="mt-auto">
                            <div className="border-t border-border pt-4">
                              <p className="italic text-sm text-muted-foreground">
                                {index === 0
                                  ? "Our mission is to empower brands through innovative digital solutions."
                                  : "We believe in creating digital experiences that truly connect with audiences."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                  At Lynk Digital, we empower brands to shine in the digital world, our mission is to craft compelling digital identities, deliver cutting-edge web and UI/UX solutions, and drive bold, data-driven marketing strategies. We build authentic connections that spark engagement,
                   fuel growth, and deliver measurable results. With us,
                   your brand doesn't just compete—it leads.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Craft authentic, unforgettable digital identities",
                      "Deliver cutting-edge web solutions",
                      "Execute data-driven marketing strategies",
                      "Drive engagement and measurable growth",
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
                  We envision Lynk Digital as the ultimate digital catalyst, transforming bold ideas into impactful experiences. Our goal is to pioneer innovative design and strategic marketing, creating meaningful connections that resonate with
                  audiences worldwide. We're here to help every brand find its voice, stand out, 
                  and build a legacy in the digital age.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Be the leading digital catalyst for brands",
                      "Transform ideas into impactful experiences",
                      "Innovate in design and strategic marketing",
                      "Foster authentic, meaningful digital connections",
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
      </section> */}

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
                    <Link href="/services">Explore Services</Link>
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