import React, { useState } from 'react';
import { dbService } from '../services/db';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSubmitting(true);
      await dbService.contactMessages.submit(
        name.trim(),
        email.trim(),
        phone.trim(),
        subject.trim() || 'General Inquiry',
        message.trim()
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');

      // Auto clear alert
      setTimeout(() => setIsSubmitted(false), 8000);
    }
  };

  const handleWhatsAppClick = () => {
    const prefilledText = encodeURIComponent("Hello Craft Kalash! I am interested in your handcrafted wooden toys. Can you help me choose the right heirloom gift?");
    window.open(`https://wa.me/919303436134?text=${prefilledText}`, '_blank');
  };

  return (
    <div className="bg-wood-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact intro header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-forest-600 uppercase tracking-widest block mb-3">Get In Touch</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-wood-950 tracking-tight leading-tight">
            We'd love to hear from you
          </h1>
          <p className="text-sm text-wood-600 mt-4 leading-relaxed">
            Have questions about safety, bulk orders, or custom name engravings? Drop our workshop a line and our small family team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Contact Details (Left side - Columns 5) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display font-bold text-xl text-wood-950 mb-4">Contact Information</h2>
            
            {/* Cards list */}
            <div className="space-y-4">
              <div className="bg-white border border-wood-200 rounded-2xl p-5 flex gap-4 shadow-2xs">
                <div className="w-10 h-10 bg-forest-50 border border-forest-100 rounded-xl flex items-center justify-center text-forest-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-wood-950 text-sm">CraftKalash Workshop</h4>
                  <p className="text-xs text-wood-600 leading-relaxed mt-1">
                    7/77, Jhanda Chouk, Budhni, Madhya Pradesh 466445
                  </p>
                </div>
              </div>

              <div className="bg-white border border-wood-200 rounded-2xl p-5 flex gap-4 shadow-2xs">
                <div className="w-10 h-10 bg-forest-50 border border-forest-100 rounded-xl flex items-center justify-center text-forest-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-wood-950 text-sm">Direct Phone Hotline</h4>
                  <p className="text-xs text-wood-600 leading-relaxed mt-1">
                    +91 93034 36134 <span className="text-wood-400 block sm:inline sm:ml-2">(Mon-Sat: 10 AM - 7 PM IST)</span>
                  </p>
                </div>
              </div>

              <div className="bg-white border border-wood-200 rounded-2xl p-5 flex gap-4 shadow-2xs">
                <div className="w-10 h-10 bg-forest-50 border border-forest-100 rounded-xl flex items-center justify-center text-forest-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-wood-950 text-sm">Support Email</h4>
                  <p className="text-xs text-wood-600 leading-relaxed mt-1">
                    craftkalash.store@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp direct help CTA */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2.5 text-emerald-950">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base">Instant WhatsApp Consultation</h3>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Want immediate advice choosing the right toy package based on child age or developmental milestone? Tap the button below to connect with our head artisan directly on WhatsApp!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer text-center shadow-xs block"
              >
                Chat on WhatsApp Now
              </button>
            </div>
          </div>

          {/* Contact form submission block (Right side - Columns 7) */}
          <div className="lg:col-span-7 bg-white border border-wood-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <h2 className="font-display font-bold text-xl text-wood-950 mb-6">Send Us a Message</h2>
            
            {isSubmitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm font-semibold mb-6">
                🎉 Success! Your message was submitted to our workshop queue. We will respond within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-wood-600 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sophia Mitchell"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-4 py-2.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-wood-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-4 py-2.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-wood-600 block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 012-3456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-4 py-2.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-wood-600 block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Engraving options, bulk orders..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-wood-50 border border-wood-200 rounded-lg px-4 py-2.5 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-wood-600 block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you would like to know..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-wood-50 border border-wood-200 rounded-lg p-4 text-xs text-wood-950 focus:outline-hidden focus:border-wood-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 3. INTERACTIVE LOCATION MAP */}
        <div className="bg-white rounded-3xl border border-wood-200 p-4 sm:p-5 shadow-xs overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-wood-100">
            <span className="font-display font-bold text-sm text-wood-950 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-wood-700" /> Interactive Location Map
            </span>
            <span className="text-[10px] text-wood-400 font-semibold uppercase font-mono">Budhni Workshop</span>
          </div>

          {/* Interactive Google Maps Iframe */}
          <div className="aspect-[4/3] md:aspect-[21/9] w-full bg-wood-50 relative rounded-2xl overflow-hidden border border-wood-150 mt-4 shadow-inner">
            <iframe
              src="https://maps.google.com/maps?q=22.766278,77.687778&z=16&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CraftKalash Budhni Workshop Location"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};
