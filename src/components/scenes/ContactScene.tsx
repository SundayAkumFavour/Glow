import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';

const ContactScene: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [wormPosition, setWormPosition] = useState({ x: 0, y: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Animate worm based on input activity
    setWormPosition({
      x: Math.random() * 20 - 10,
      y: Math.random() * 10 - 5
    });
  };

  const sendWhatsAppMessage = (formData: typeof formData) => {
    const phoneNumber = "+1234567890"; // Replace with your WhatsApp number
    const message = `New contact form submission:
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'your-email@example.com', // Replace with your email
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      // Send WhatsApp message
      sendWhatsAppMessage(formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="h-screen flex items-center justify-center relative overflow-hidden px-8">
      {/* Dancing worm */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2"
        animate={{
          x: wormPosition.x,
          y: wormPosition.y,
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="w-16 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full relative"
          animate={{
            scaleX: [1, 1.2, 0.8, 1],
            scaleY: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Worm segments */}
          <div className="absolute left-0 w-3 h-3 bg-green-300 rounded-full top-1/2 -translate-y-1/2" />
          <div className="absolute left-2 w-3 h-3 bg-green-400 rounded-full top-1/2 -translate-y-1/2" />
          <div className="absolute left-4 w-3 h-3 bg-blue-300 rounded-full top-1/2 -translate-y-1/2" />
          <div className="absolute left-6 w-3 h-3 bg-blue-400 rounded-full top-1/2 -translate-y-1/2" />
          
          {/* Worm eyes */}
          <div className="absolute -right-1 top-0 w-1 h-1 bg-white rounded-full" />
          <div className="absolute -right-1 bottom-0 w-1 h-1 bg-white rounded-full" />
          
          {/* Sparkles around worm */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${-10 + i * 4}px`,
                top: `${-5 + Math.sin(i) * 10}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Contact content */}
      <div className="max-w-2xl mx-auto text-center z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-white font-space mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Send a <span className="text-purple-400">Message</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Let's connect across the digital cosmos. Whether you have a project in mind, 
            want to collaborate, or just want to say hello, I'd love to hear from you.
          </motion.p>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-purple-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                />
              </motion.div>
            </div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2
                ${isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            {/* Contact methods info */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail size={16} />
                <span>Email</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </div>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* Success/Error Modal */}
      <AnimatePresence>
        {submitStatus !== 'idle' && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/80 p-8 rounded-xl border border-purple-500/30 text-center max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {submitStatus === 'success' ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">
                    🌌 Your message has been delivered across the cosmos. 
                    A reply will arrive with the stars.
                  </p>
                  
                  {/* Worm victory dance */}
                  <motion.div
                    className="w-12 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-6"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: 3 }}
                  />
                </>
              ) : (
                <>
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Oops!</h3>
                  <p className="text-gray-300 mb-6">
                    Something went wrong. Please try again or contact me directly.
                  </p>
                </>
              )}
              
              <motion.button
                onClick={() => {
                  setSubmitStatus('idle');
                  if (submitStatus === 'success') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {submitStatus === 'success' ? 'Back to the Beginning' : 'Try Again'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactScene;