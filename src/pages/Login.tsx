import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { signIn, authError, currentUser } = useShop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path helper
  const from = (location.state as any)?.from?.pathname || '/admin';

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsSubmitting(true);
      const success = await signIn(email.trim(), password.trim());
      setIsSubmitting(false);
      if (success) {
        setSuccessMsg('Successfully signed in! Redirecting to Admin Panel...');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-wood-50 min-h-screen py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-wood-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-wood-800 rounded-2xl flex items-center justify-center text-white mx-auto shadow-sm">
            <span className="font-display font-black text-xl">W</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-wood-950 tracking-tight">Admin Portal</h1>
          <p className="text-xs text-wood-500">Sign in to add, edit, or remove catalog wooden toys.</p>
        </div>

        {/* Secure Admin Portal Badge */}
        <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/50 text-[11px] text-amber-800 leading-relaxed flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <p>Secure Administrator Portal. Unauthorized access attempts are logged and restricted.</p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-lg text-xs font-semibold">
            {successMsg}
          </div>
        )}

        {/* Error Alert */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-lg text-xs font-semibold">
            ⚠️ {authError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-wood-600 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-400" />
              <input
                type="email"
                required
                placeholder="sophia@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-wood-50 text-wood-950 text-xs pl-10 pr-4 py-2.5 rounded-lg border border-wood-200 focus:outline-hidden focus:border-wood-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-wood-600 block">Password</label>
              <button 
                type="button" 
                onClick={() => alert('Forgot password? Please contact system administrator or refer to secure configuration setup.')}
                className="text-[10px] text-wood-500 hover:text-wood-950 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-wood-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-wood-50 text-wood-950 text-xs pl-10 pr-4 py-2.5 rounded-lg border border-wood-200 focus:outline-hidden focus:border-wood-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-wood-800 hover:bg-wood-900 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            {isSubmitting ? 'Verifying...' : (
              <>
                Sign In <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
