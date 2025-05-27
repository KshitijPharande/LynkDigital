"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-lynk-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/lynk-logo.jpg"
                alt="Lynk Digital Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="ml-3 text-xl font-bold text-lynk-blue">Lynk Digital</span>
            </Link>
            <p className="text-sm text-white/80">
              Empowering brands by crafting compelling digital identities, delivering cutting-edge web and UI/UX
              solutions.
            </p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="text-white/60 hover:text-lynk-blue transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link> */}
              {/* <Link href="#" className="text-white/60 hover:text-lynk-blue transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link> */}
              <Link href="#" className="text-white/60 hover:text-lynk-blue transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              {/* <Link href="#" className="text-white/60 hover:text-lynk-blue transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link> */}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-lynk-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-lynk-blue">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#web-design"
                  className="text-sm text-white/80 hover:text-lynk-blue transition-colors"
                >
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services#ui-ux" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services#social-media"
                  className="text-sm text-white/80 hover:text-lynk-blue transition-colors"
                >
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services#branding"
                  className="text-sm text-white/80 hover:text-lynk-blue transition-colors"
                >
                  Branding & Identity
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="text-sm text-white/80 hover:text-lynk-blue transition-colors">
                  SEO & Content Strategy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-lynk-blue">Contact Us</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-lynk-blue mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80">123 Digital Avenue, Tech City, 10001</span>
              </li> */}
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-lynk-blue flex-shrink-0" />
                <span className="text-sm text-white/80">(+91) 8010195467</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-lynk-blue flex-shrink-0" />
                <span className="text-sm text-white/80">hello@lynkdigital.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-white/60">&copy; {currentYear} Lynk Digital. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-white/60 hover:text-lynk-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-white/60 hover:text-lynk-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-white/60 hover:text-lynk-blue transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
