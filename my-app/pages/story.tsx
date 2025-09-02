import React from 'react';
import { Gem, Award, Heart, Users, MapPin, Phone, Mail } from 'lucide-react';
import jewelryWorkshop from '../src/assets/images/jewellery_workshop.png';
import jewelryCollection from '../src/assets/images/jewellery_collection.png';
import Header from '../src/components/Header';

const scrollToSection = () => {
  document.getElementById('brand_story')?.scrollIntoView({
    behavior: 'smooth'
  });
};


const About = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${jewelryCollection})` 
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-wide">
            SJD Gold & Diamond
            <span className="block text-[#D4AF37]">Houston</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Second generation family owned diamond jewelry manufacturer and wholesaler
          </p>
          <button className="bg-[#D4AF37] text-primary hover:bg-[#B8860B] transition-all duration-300 px-8 py-6 text-lg font-medium tracking-wide rounded-md shadow-lg hover:shadow-xl transform hover:scale-105" onClick={scrollToSection}>
            Discover Our Story
          </button>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-4" id="brand_story">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                SJD Gold & Diamond Houston is a second generation family owned and operated diamond jewelry 
                manufacturer and wholesaler based out of Houston, Texas. For over the past three decades, 
                our company has been servicing clients throughout USA, Caribbean Islands, South America and Canada with great pride and respect.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We remember helping one customer in April 1992, when we opened shop, who still prefers to do business 
                together and remains one of our anchor accounts. From being a two member team at the beginning of our venture, 
                to now having the strength of 30 associates, we still exhibit the same passion for our business.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At SJD Gold & Diamond Houston, <strong>"Serve thy Customer with Loyalty and Integrity, Quality and Knowledge"</strong> has been our motto and now has become our way of life.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">30</div>
                  <div className="text-sm text-muted-foreground">Dedicated Associates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={jewelryWorkshop} 
                alt="Jewelry Workshop" 
                className="rounded-lg shadow-luxury w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] text-primary p-6 rounded-lg shadow-golden">
                <Gem className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
              Our Commitment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The values that define our approach to jewelry manufacturing and customer service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-luxury hover:shadow-golden transition-all duration-300 transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="bg-[#F7DC6F] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-[#B8860B]" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-foreground">Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We manufacture fine gold and diamond jewelry with strict adherence to industry standards, 
                  including Kimberly Process Certification for ethically sourced materials.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-luxury hover:shadow-golden transition-all duration-300 transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="bg-[#F7DC6F] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-[#B8860B]" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-foreground">Integrity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment to loyalty and integrity drives every customer interaction, 
                  building relationships that span decades with our valued clients.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-luxury hover:shadow-golden transition-all duration-300 transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="bg-[#F7DC6F] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-[#B8860B]" />
                </div>
                <h3 className="text-2xl font-serif mb-4 text-foreground">Knowledge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With over three decades of experience and strategic partnerships worldwide, 
                  we provide expert guidance and competitive pricing for all your jewelry needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src={jewelryWorkshop} 
                alt="Master Craftsman at Work" 
                className="rounded-lg shadow-luxury w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground whitespace-nowrap">
                Manufacturing Excellence
            </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our product ranges from plain gold fashion to diamond studded silver and diamond studded 10K, 14K and 18K jewelry. 
                We specialize in diamond engagement and bridal jewelry that competes with designer brands like Tacori, Ritani, and Neil Lane.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-muted-foreground">Ethically sourced gold and diamonds</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-muted-foreground">10K, 14K, and 18K gold jewelry manufacturing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-muted-foreground">Diamond engagement and bridal specialization</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-muted-foreground">Wholesale pricing from $500 to $4000</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span className="text-muted-foreground">Next-day service and shipping available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Visit Our Houston Showroom
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Experience our wholesale gold and diamond jewelry collections and meet our team
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#D4AF37] p-4 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Houston Showroom</h3>
                <p className="text-sm opacity-80">Houston, Texas<br />By Appointment</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#D4AF37] p-4 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="text-sm opacity-80">Next-day response<br />on all inquiries</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#D4AF37] p-4 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sales Team</h3>
                <p className="text-sm opacity-80">Representatives<br />serving multiple locations</p>
              </div>
            </div>
          </div>
          
          <button className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg font-medium rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 text-black">
            Contact Our Team
          </button>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
