
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Developer",
    company: "TechCorp",
    text: "HackStack transformed our development process. The components saved us hours of work and impressed our clients with their polished look and feel. Highly recommended!",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UX Designer",
    company: "DesignHub",
    text: "As a designer, I appreciate how well-crafted these components are. They're both beautiful and functional, with attention to all the little details that make a UI special.",
    avatar: "SW",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateX",
    text: "Our team won our last hackathon using HackStack components. They allowed us to focus on our core functionality while still having an impressive UI. Game changer!",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Jessica Taylor",
    role: "Frontend Engineer",
    company: "WebSolutions",
    text: "These components are so well built that I've incorporated them into my permanent workflow. Clean code, great design, and super easy to customize.",
    avatar: "JT",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "CTO",
    company: "LaunchFast",
    text: "HackStack helped our startup ship our MVP in record time. The pricing component in particular saved us days of development work and testing.",
    avatar: "DR",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused, testimonials.length]);

  const getSlideClasses = (index: number) => {
    if (index === currentIndex) {
      return "opacity-100 translate-x-0 z-10";
    }

    if (direction === 'right' && (index === currentIndex - 1 || (currentIndex === 0 && index === testimonials.length - 1))) {
      return "opacity-0 -translate-x-full z-0";
    }
    
    if (direction === 'left' && (index === currentIndex + 1 || (currentIndex === testimonials.length - 1 && index === 0))) {
      return "opacity-0 translate-x-full z-0";
    }

    return "opacity-0 translate-x-0 z-0";
  };

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-950 dark:to-gray-900" />
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              What Our Users Say
            </h1>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it — hear from the developers and designers who use HackStack
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonial Carousel */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div 
            className="relative mx-auto max-w-4xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden relative h-[400px] md:h-[300px]">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`glass absolute inset-0 transition-all duration-500 ease-in-out ${getSlideClasses(index)}`}
                >
                  <CardContent className="flex flex-col md:flex-row items-center p-6 h-full">
                    <div className="md:w-1/3 flex flex-col items-center text-center mb-6 md:mb-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xl text-white font-bold mb-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-2/3 md:pl-6">
                      <blockquote>
                        <p className="text-lg italic">"{testimonial.text}"</p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-20 px-2 md:px-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrev}
                className="rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-md"
              >
                <ArrowLeft size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext}
                className="rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-md"
              >
                <ArrowRight size={18} />
              </Button>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Ready to try HackStack?</h2>
            <p className="text-muted-foreground">
              Join thousands of developers building impressive projects in record time
            </p>
            <Button className="mt-4 bg-gradient-to-r from-primary to-accent text-white">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TestimonialCarousel;
