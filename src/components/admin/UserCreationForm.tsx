'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneInput from '@/components/ui/PhoneInput';

interface UserCreationFormProps {
  onSuccess?: () => void;
}

export default function UserCreationForm({ onSuccess }: UserCreationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    bio: '',
    role: 'AGENT',
    status: 'PENDING',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          email: '',
          password: '',
          fullName: '',
          phone: '',
          bio: '',
          role: 'AGENT',
          status: 'PENDING',
        });
        if (onSuccess) onSuccess();
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || 'Failed to create user'}`);
      }
    } catch (err) {
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {phoneError && (
    <div className="col-span-full text-red-400 text-xs uppercase tracking-widest font-bold text-center animate-in fade-in slide-in-from-top-1">
      {phoneError}
    </div>
  )}
  <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
  <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Phone Number</label>
  <PhoneInput
    required
    placeholder="+968 9xxx xxxx"
    variant="boxed"
    value={formData.phone}
    onChange={val => setFormData(prev => ({ ...prev, phone: val }))}
    onValidationError={setPhoneError}
  />
</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white appearance-none"
              >
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white appearance-none"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Bio (Optional)</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-border rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-white resize-none"
              placeholder="Brief professional bio..."
            />
          </div>
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2",
              isLoading
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-gold-primary text-luxury-black hover:bg-gold-light shadow-lg shadow-gold-primary/20"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            {isLoading ? 'Creating Identity...' : 'Create User & Agent'}
          </button>
        </div>
      </form>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Identity successfully created in the network
        </motion.div>
      )}
    </div>
  );
}
