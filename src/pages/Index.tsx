
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ 
  title, 
  description, 
  icon, 
  path,
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: string;
  path: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`glass card-hover transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <CardHeader className="space-y-1 text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm md:text-base text-center">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild className="bg-gradient-to-r from-primary to-accent text-white">
          <Link to={path}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-100 to-white dark:from-violet-950 dark:to-gray-900" />
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              <span className="inline-block animate-fade-in">🏁</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Quick, Impressive Hackathon Projects
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-fade-in">
              Three polished, ready-to-use UI components to accelerate your next hackathon project
            </p>
          </div>
        </div>
      </section>
      
      {/* Project Cards */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ProjectCard 
              title="Pricing Cards" 
              description="Interactive pricing toggle with monthly/yearly options and tiered plans"
              icon="💳"
              path="/pricing-toggle"
              delay={100}
            />
            <ProjectCard 
              title="Testimonial Carousel" 
              description="Elegant, auto-playing testimonial slider with avatars and controls"
              icon="💬"
              path="/testimonial-carousel"
              delay={200}
            />
            <ProjectCard 
              title="Priority To-Do List" 
              description="Feature-rich to-do app with priority labels and user avatars"
              icon="✅"
              path="/todo-priority"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose HackStack?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Stand out at your next hackathon with our polished, ready-to-use components
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neumorph-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🚀 Quick Implementation</h3>
              <p className="text-muted-foreground">
                Accelerate your development with copy-and-paste ready components
              </p>
            </div>
            <div className="neumorph-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">✨ Impressive UI</h3>
              <p className="text-muted-foreground">
                Modern design with animations, glassmorphism, and responsive layouts
              </p>
            </div>
            <div className="neumorph-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🔄 Adaptable Code</h3>
              <p className="text-muted-foreground">
                Easily customize components to match your project's branding
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
