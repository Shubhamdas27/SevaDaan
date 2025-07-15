import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../../components/icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Demo login credentials for easy testing
  const demoCredentials = [
    { role: 'NGO', email: 'ngo@helpindia.org', password: 'password123', color: 'bg-blue-500' },
    { role: 'NGO Admin', email: 'ngoadmin@helpindia.org', password: 'password123', color: 'bg-indigo-500' },
    { role: 'NGO Manager', email: 'ngomanager@helpindia.org', password: 'password123', color: 'bg-green-500' },
    { role: 'Volunteer', email: 'volunteer@helpindia.org', password: 'password123', color: 'bg-orange-500' },
    { role: 'Donor', email: 'donor@example.com', password: 'password123', color: 'bg-red-500' },
    { role: 'Citizen', email: 'citizen@example.com', password: 'password123', color: 'bg-teal-500' }
  ];

  const handleQuickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back! Login successful.');
      
      // Add a small delay to ensure state is updated before navigation
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);
    } catch (err) {
      toast.error((err as Error).message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold">
              <span className="text-indigo-600">Seva</span>
              <span className="text-slate-800">Daan</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-slate-800">Welcome Back</h2>
          <p className="mt-3 text-slate-600">
            Sign in to access your personalized dashboard
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Demo Credentials Section */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Icons.lock className="w-4 h-4 mr-2" />
                Demo Login Credentials
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickLogin(cred.email, cred.password)}
                    className={`text-left p-3 rounded-lg border hover:shadow-md transition-all duration-200 ${cred.color} bg-white/70 hover:bg-white border-gray-200 hover:border-gray-300`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-slate-800">{cred.role}</span>
                        <div className="text-xs text-slate-600 mt-1">
                          {cred.email}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${cred.color.replace('bg-', 'bg-')} opacity-75`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  id="email"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  leftIcon={<Icons.email className="h-5 w-5 text-slate-400" />}
                  autoComplete="email"
                  required
                  className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                />

                <div className="relative">
                  <Input
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    leftIcon={<Icons.lock className="h-5 w-5 text-slate-400" />}
                    autoComplete="current-password"
                    required
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <Icons.hide className="h-5 w-5" /> : <Icons.view className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Icons.arrowRight className="w-5 h-5 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;