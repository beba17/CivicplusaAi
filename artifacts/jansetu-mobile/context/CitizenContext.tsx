import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CitizenRequest = {
  id: string;
  title: string;
  quote: string;
  category: string;
  location: string;
  language: string;
  channel: 'Voice' | 'Text';
  status: 'Received' | 'Structuring' | 'Under review' | 'Resolved';
  createdAt: string;
};

type CitizenContextValue = {
  requests: CitizenRequest[];
  addRequest: (request: Omit<CitizenRequest, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  isReady: boolean;
};

const STORAGE_KEY = '@jansetu/citizen-requests';
const starterRequests: CitizenRequest[] = [
  {
    id: 'demo-water',
    title: 'Reliable drinking water needed',
    quote: '“Hamare gaon mein paani ka tanker kab aayega?”',
    category: 'Water access',
    location: 'Kalyanpur, Rajasthan',
    language: 'Hindi',
    channel: 'Voice',
    status: 'Under review',
    createdAt: '2024-06-18T08:22:00.000Z',
  },
];

const CitizenContext = createContext<CitizenContextValue | null>(null);

export function CitizenProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<CitizenRequest[]>(starterRequests);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          setRequests(JSON.parse(stored) as CitizenRequest[]);
        }
      })
      .catch(() => undefined)
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(requests)).catch(() => undefined);
    }
  }, [isReady, requests]);

  const value = useMemo(
    () => ({
      requests,
      isReady,
      addRequest: async (request: Omit<CitizenRequest, 'id' | 'createdAt' | 'status'>) => {
        const next: CitizenRequest = {
          ...request,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date().toISOString(),
          status: 'Received',
        };
        setRequests((current) => [next, ...current]);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([next, ...requests]));
      },
    }),
    [isReady, requests],
  );

  return <CitizenContext.Provider value={value}>{children}</CitizenContext.Provider>;
}

export function useCitizen() {
  const context = useContext(CitizenContext);
  if (!context) {
    throw new Error('useCitizen must be used inside CitizenProvider');
  }
  return context;
}