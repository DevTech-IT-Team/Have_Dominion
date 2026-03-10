import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'userProfile';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
        }
    };

    loadProfile();
  }, []);

  // Save profile to localStorage
  const saveProfile = useCallback((profileData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
      setProfile(profileData);
      return true;
    } catch (error) {
      console.error('Failed to save profile:', error);
      return false;
    }
  }, []);

  // Update specific fields
  const updateProfile = useCallback((updates) => {
    try {
      const current = profile || {};
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setProfile(updated);
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      return false;
    }
  }, [profile]);

  // Clear profile (e.g., on logout)
  const clearProfile = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProfile(null);
      return true;
    } catch (error) {
      console.error('Failed to clear profile:', error);
      return false;
    }
  }, []);

  // Check if profile is complete
  const isProfileComplete = useCallback(() => {
    if (!profile) return false;
    const required = ['firstName', 'lastName', 'email', 'phone', 'dob', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => profile[field] && profile[field].trim?.() !== '');
  }, [profile]);

  // Get formatted full name
  const getFullName = useCallback(() => {
    if (!profile) return '';
    return `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  }, [profile]);

  // Get formatted address
  const getFullAddress = useCallback(() => {
    if (!profile) return '';
    return `${profile.address || ''}, ${profile.city || ''}, ${profile.state || ''} ${profile.zipCode || ''}`;
  }, [profile]);

  return {
    profile,
    isLoading,
    isComplete: isProfileComplete(),
    saveProfile,
    updateProfile,
    clearProfile,
    getFullName,
    getFullAddress,
    // Direct field access helpers
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    dob: profile?.dob || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zipCode: profile?.zipCode || ''
  };
};

export default useProfile;
