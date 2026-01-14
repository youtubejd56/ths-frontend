import React, { useRef, useState, useEffect } from 'react';
import Images1 from '../assets/images4.PNG';
import Images2 from '../assets/Images_side_views.PNG';
import Images3 from '../assets/images_side.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MapPin, Award, Users, BookOpen, Cpu, GraduationCap } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import '../index.css';

import SupportBot from "../components/SupportBot";

const Hero = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [showBot, setShowBot] = useState(true);

  // Detect mobile for keyboard behavior
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!isMobile) {
        // Desktop Behavior → Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          setShowBot(false);
        } else {
          setShowBot(true);
        }
      } else {
        // Mobile Behavior → Always show (keyboard safe)
        setShowBot(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Swiper circle timer
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const imageList = [Images1, Images2, Images3];

  return (
    <>
      {/* Swiper Section */}
      <div className="bg-gray-500">
        <div className="mx-auto w-full relative">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            {imageList.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index + 1}`} width="100%" />
              </SwiperSlide>
            ))}

            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20" />
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
        <div className="wrapper w-full h-8 bg-gray-400/20 backdrop-blur-sm absolute -bottom-12" />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Malayalam intro */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Government Technical High School
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 font-semibold">Pala, Kottayam</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">Est. 1961</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">Kerala, India</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <p
                className="text-sm md:text-lg text-white/90 text-justify font-noto"
                style={{
                  lineHeight: "2.0",
                  letterSpacing: "0.3px",
                  wordSpacing: "2px",
                  textRendering: "optimizeLegibility"
                }}
              >
                കോട്ടയം ജില്ലയ്ക്കാകെ അഭിമാനം പകരുന്ന സാങ്കേതിക വിദ്യാഭ്യാസ സ്ഥാപനമായ ഗവൺമെൻറ് ടെക്നിക്കൽ ഹൈസ്കൂൾ പാലാ 1961-ലാണ് സ്ഥാപിതമായത്. മീനച്ചിലാറിന്റെ തീരത്ത് മുത്തോലി ഗ്രാമപഞ്ചായത്ത് അഞ്ചാം വാർഡിൽ ആരെയും ആകർഷിക്കുന്ന രീതിയിൽ പൂഞ്ഞാർ ഏറ്റുമാനൂർ സ്റ്റേറ്റ് ഹൈവേയ്ക്ക് സമീപം തലയുയർത്തി നിൽക്കുന്ന വിദ്യാലയമാണ് Govt. THS, Pala. പ്രകൃതിരമണീയത തുളുമ്പി നിൽക്കുന്ന വിശാലമായ ക്യാമ്പസ് ആണ് ഈ സ്കൂളിൽ ഉള്ളത്.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Chatbot */}
        {showBot && (
          <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out transform hover:scale-110">
            <SupportBot />
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
