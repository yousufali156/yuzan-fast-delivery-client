import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Assuming topImage is in the assets folder as per your code.
// If it's in public folder, path should be "/assets/OurCustomersSaying/customer-top.png"
const topImage = '../../../assets/OurCustomersSaying/customer-top.png';

const testimonials = [
  {
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=AwladHossin'
  },
  {
    name: 'Rasel Ahamed',
    title: 'CTO',
    text: 'A posture corrector helps you maintain your posture during long work hours and reduces back pain effectively.',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=RaselAhamed'
  },
  {
    name: 'Nasir Uddin',
    title: 'CEO',
    text: 'Wearing a corrector regularly improved my posture and relieved my lower back strain.',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=NasirUddin'
  },
  {
    name: 'Tanvir Ahmed',
    title: 'Lead Engineer',
    text: 'Helps align posture while working from home. Great value!',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=TanvirAhmed'
  },
  {
    name: 'Shahidul Islam',
    title: 'Fitness Coach',
    text: 'Perfect for gym-goers who need extra back support.',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=ShahidulIslam'
  },
  {
    name: 'Samiul Alam',
    title: 'Data Analyst',
    text: 'Very helpful in managing my spinal alignment throughout my day.',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=SamiulAlam'
  },
  {
    name: 'Imran Kabir',
    title: 'Digital Marketer',
    text: 'It gave me better posture in just a week!',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=ImranKabir'
  },
];

const OurCustomersSaying = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };
    
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    useEffect(() => {
        // Do not start interval if user is hovering over the slider
        if (isHovered) return;

        // Set up the interval for autoplay
        const intervalId = setInterval(goToNext, 5000); // Autoplay every 5 seconds

        // Clear interval on component unmount or when isHovered changes
        return () => clearInterval(intervalId);
    }, [isHovered, goToNext]);

  return (
    <div className="bg-[#F5F8F9] py-12 px-4 md:px-8 text-center overflow-hidden">
      <img 
        src={topImage} 
        alt="Customer Top Icon" 
        className="mx-auto mb-4 h-16 w-auto"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-4">
        What our customers are saying
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider container */}
        <div className="w-full h-[350px] relative">
           {testimonials.map((item, idx) => {
               let position = 'opacity-0 scale-75 -translate-x-full'; // Left
               if (idx === currentIndex) {
                   position = 'opacity-100 scale-100 z-10'; // Center
               } else if (idx === (currentIndex - 1 + testimonials.length) % testimonials.length) {
                   position = 'opacity-40 scale-90 -translate-x-1/2'; // Left adjacent
               } else if (idx === (currentIndex + 1) % testimonials.length) {
                   position = 'opacity-40 scale-90 translate-x-1/2'; // Right adjacent
               } else if (idx === (currentIndex + 2) % testimonials.length) {
                    position = 'opacity-0 scale-75 translate-x-full'; // Right
               }
               
               const isVisible = idx === currentIndex || 
                                 idx === (currentIndex - 1 + testimonials.length) % testimonials.length || 
                                 idx === (currentIndex + 1) % testimonials.length;

               return (
                <div
                    key={idx}
                    className={`absolute top-0 left-1/2 w-[340px] h-[300px] -ml-[170px] bg-white rounded-2xl shadow-lg p-6 text-left flex flex-col justify-between transition-all duration-500 ease-in-out transform ${isVisible ? position : 'opacity-0'}`}
                >
                    <div>
                        <p className="text-[#2AB09D] text-5xl font-serif leading-none mb-2">“</p>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.text}</p>
                    </div>
                    <div className="border-t border-dashed border-gray-300 pt-4 flex items-center gap-4">
                        <img 
                            src={item.avatar} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-full bg-gray-200 shrink-0 object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://avatar.iran.liara.run/public/boy'; }}
                        />
                        <div>
                            <h4 className="text-[#03373D] font-bold leading-tight">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.title}</p>
                        </div>
                    </div>
                </div>
               );
           })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-8 mt-6">
            <button onClick={goToPrevious} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
                <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`cursor-pointer h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-green-400 w-6' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
            <button onClick={goToNext} className="p-2 rounded-full bg-green-400 shadow-md hover:bg-green-500 transition-colors">
                <ChevronRight className="h-6 w-6 text-white" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default OurCustomersSaying;
