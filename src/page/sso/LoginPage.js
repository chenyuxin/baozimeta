import React, { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Provider options for SSO
  const ssoProviders = [
    { name: 'Google', icon: '🔍', bgColor: 'bg-red-500' },
    { name: 'Microsoft', icon: '🪟', bgColor: 'bg-blue-500' },
    { name: 'Apple', icon: '🍎', bgColor: 'bg-black' },
    { name: 'GitHub', icon: '🐙', bgColor: 'bg-gray-800' },
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('')
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setError('')
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Your authentication logic here
      // For demonstration, we'll just simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if credentials are valid (replace with actual auth logic)
      if (email && password) {
        console.log('Login successful with credentials:', email)
        // Redirect or update app state after successful login
      } else {
        throw new Error('Please enter both email and password')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOLogin = (provider) => {
    setIsLoading(true);
    setError('');

    // Simulating SSO authentication
    console.log(`Initiating SSO login with ${provider.name}`)
    
    // In a real application, you would:
    // 1. Redirect to the provider's authentication page
    // 2. Handle the callback with an authentication token
    // 3. Validate the token and create a session
    
    // For demonstration, we'll just simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Successfully logged in with ${provider.name}`)
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Or start your 14-day free trial
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {ssoProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleSSOLogin(provider)}
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white ${provider.bgColor} rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span className="mr-2">{provider.icon}</span>
                {provider.name}
              </button>
            ))}
          </div>
        </div>
        
        <p className="mt-8 text-xs text-center text-gray-500">
          &copy; 2025 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginPage