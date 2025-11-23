import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice';
import { Button } from '../components/UI/Button';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ username: email, password }).unwrap(); 
      
      dispatch(setCredentials({ user: userData.user, token: userData.access_token }));
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-dark-900 border border-dark-800 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">NeuroXP</h1>
          <p className="text-slate-400">Enter your system credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           {error && (
             <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-red-400 text-sm text-center">
               Login failed. Please check your credentials.
             </div>
           )}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email / Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              required
            />
          </div>
          
          <Button type="submit" isLoading={isLoading} className="w-full">
            Initialize Session
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">
              Create Identity
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;