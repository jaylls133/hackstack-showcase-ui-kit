
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const pricingPlans = [
    {
      title: "Basic",
      description: "Perfect for small projects and individuals",
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: [
        "Up to 5 projects", 
        "Basic analytics", 
        "24-hour support response time",
        "1GB storage",
      ],
      highlighted: false
    },
    {
      title: "Pro",
      description: "Best for growing teams and businesses",
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        "Up to 20 projects", 
        "Advanced analytics", 
        "4-hour support response time",
        "10GB storage",
        "Team collaboration",
      ],
      highlighted: true
    },
    {
      title: "Enterprise",
      description: "For large organizations with custom needs",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "Unlimited projects", 
        "Custom analytics & reporting", 
        "1-hour support response time",
        "100GB storage",
        "Team collaboration",
        "Custom integrations",
        "Dedicated account manager",
      ],
      highlighted: false
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-100 to-white dark:from-blue-950 dark:to-gray-900" />
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you and get started today
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <span 
                className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200 dark:bg-gray-700"
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isYearly ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span 
                className={`text-sm font-medium flex items-center ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Yearly
                <span className="ml-1.5 rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs text-green-800 dark:text-green-200">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-8 md:py-12 -mt-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`flex flex-col ${plan.highlighted 
                  ? 'shadow-lg border-primary relative overflow-hidden scale-105 z-10' 
                  : 'shadow-sm'} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-center">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {isYearly ? '/year' : '/month'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center mt-auto">
                  <Button 
                    variant={plan.highlighted ? "default" : "outline"}
                    className={plan.highlighted 
                      ? "w-full bg-gradient-to-r from-primary to-accent text-white" 
                      : "w-full"
                    }
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingToggle;
