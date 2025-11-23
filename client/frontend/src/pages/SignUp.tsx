import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupMutation } from '../features/auth/authApi';
import { setCredentials } from '../features/auth/authSlice';
import { Button } from '../components/UI/Button';
import { UserPlus } from 'lucide-react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signup(formData).unwrap();
      dispatch(setCredentials({ user: userData.user, token: userData.access_token }));
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to signup', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-20 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md bg-dark-900 border border-dark-800 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30">
            <UserPlus className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Join NeuroXP</h1>
          <p className="text-slate-400">Gamify your habits. Master your life.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
             <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-red-400 text-sm text-center">
               Registration failed.
             </div>
           )}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-dark-950 border border-dark-800 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              required
            />
          </div>
          
          <Button type="submit" isLoading={isLoading} className="w-full mt-4">
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Already initialized?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;