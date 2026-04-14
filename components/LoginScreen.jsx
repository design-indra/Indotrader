'use client';
import { useState } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Email dan password wajib diisi'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (data.success) onLogin(data.email);
      else setError(data.error || 'Login gagal');
    } catch {
      setError('Koneksi gagal, coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)' }}>

      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)' }}>
          <Zap size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100">
          Indo<span className="text-sky-400">Trader</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Scalping Bot — Indodax</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-3xl p-6 shadow-xl border border-slate-700" style={{background:'var(--surface-2)'}}>
        <h2 className="text-xl font-bold text-slate-100 mb-1">Masuk</h2>
        <p className="text-slate-500 text-sm mb-6">Login untuk akses bot trading Anda</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="email@kamu.com" autoComplete="email"
                className="w-full border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-900/50 transition-all"
                style={{background:'var(--surface-3)'}}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full border border-slate-600 rounded-xl pl-10 pr-12 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-900/50 transition-all"
                style={{background:'var(--surface-3)'}}
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 rounded-xl px-3 py-2.5">
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-sky-900/30 transition-all disabled:opacity-50"
            style={{ background: loading ? '#0369a1' : 'linear-gradient(135deg, #38bdf8, #0ea5e9)' }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Masuk...
              </span>
            ) : 'Masuk'}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-5 p-3 border border-slate-700 rounded-xl text-center" style={{background:'var(--surface-3)'}}>
          <p className="text-xs text-slate-500">
            Default: <span className="text-slate-300 font-mono font-semibold">admin@indotrader.app</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Password: <span className="text-slate-300 font-mono font-semibold">indotrader123</span>
          </p>
          <p className="text-xs text-slate-600 mt-1">Ganti via Vercel ENV: AUTH_EMAIL & AUTH_PASSWORD</p>
        </div>
      </div>

      <p className="text-slate-700 text-xs mt-8">IndoTrader v3.0 — Scalping Engine</p>
    </div>
  );
}
