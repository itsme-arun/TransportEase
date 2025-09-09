import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import GlassCard from "@/components/ui/glass-card";
import { Link } from "wouter";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const UserLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoggingIn(true);
    try {
      // This is a simplified example. In a real app, you would use proper authentication
      // For now, we'll simulate success with a toast message
      await login(data.email, data.password);
      toast({
        title: "Login Successful",
        description: "Welcome back to TransportEase!",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>User Login - TransportEase</title>
        <meta 
          name="description" 
          content="Log in to your TransportEase account to book vehicles and manage your bookings" 
        />
      </Helmet>
      
      <section className="py-20 mt-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Login Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="rounded-xl p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Log in to your account to manage your bookings and preferences.</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <Button 
                      variant="outline" 
                      type="button" 
                      className="flex-1 btn-animate flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        />
                      </svg>
                      <span>Google</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      type="button" 
                      className="flex-1 btn-animate flex items-center justify-center text-blue-600"
                    >
                      <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                        <path
                          d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12V24h6.116c0.73 0 1.323-0.593 1.323-1.325V1.325C24 0.593 23.407 0 22.675 0z"
                        />
                      </svg>
                      <span>Facebook</span>
                    </Button>
                  </div>
                  
                  <div className="relative flex items-center my-8">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-600">or log in with email</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        className="form-input w-full px-4 py-3 rounded-lg border"
                        placeholder="your@email.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <label className="block text-gray-700 font-medium" htmlFor="password">
                          Password
                        </label>
                        <a href="#" className="text-primary hover:text-primary-dark text-sm">
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        className="form-input w-full px-4 py-3 rounded-lg border"
                        placeholder="••••••••"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <Checkbox id="rememberMe" {...register("rememberMe")} />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-gray-700 text-sm"
                      >
                        Remember me
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoggingIn}
                      className="btn-animate w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300 shadow-md"
                    >
                      {isLoggingIn ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link href="/user/register">
                        <a className="text-primary hover:text-primary-dark font-medium">
                          Sign up
                        </a>
                      </Link>
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
              
              {/* Value Proposition */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">
                  Are You a Vehicle Owner?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join our network of vehicle providers and start earning by renting out your vehicles
                  for events and functions.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="h-6 w-6 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                        Increase Your Revenue
                      </h3>
                      <p className="text-gray-600">
                        Earn more by listing your vehicles on our platform and reaching a wider
                        customer base.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="h-6 w-6 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                        Simple Management
                      </h3>
                      <p className="text-gray-600">
                        Easily manage your vehicle listings, bookings, and availability through our
                        intuitive dashboard.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="h-6 w-6 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                        Secure Payments
                      </h3>
                      <p className="text-gray-600">
                        Receive timely and secure payments for all your bookings without any hassle.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link href="/owner/register">
                  <Button className="btn-animate bg-secondary hover:bg-secondary-dark text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300 shadow-md">
                    Register as Owner
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLogin;
