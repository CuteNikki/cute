'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardResponse {
  data: {
    kv: {
      banner?: string;
    };
    discord_user: {
      id: string;
      avatar: string;
      global_name: string;
    };
    activities: LanyardActivity[];
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  };
  success: boolean;
}

interface LanyardContextProps {
  presence: LanyardResponse['data'] | null;
  loading: boolean;
}

const LanyardContext = createContext<LanyardContextProps | undefined>(undefined);

export function LanyardProvider({ children }: { children: ReactNode }) {
  const [presence, setPresence] = useState<LanyardResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = '303142922780672013';
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json: LanyardResponse = await res.json();
        if (json.success) {
          setPresence(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch Lanyard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return <LanyardContext.Provider value={{ presence, loading }}>{children}</LanyardContext.Provider>;
}

export function useLanyard() {
  const context = useContext(LanyardContext);
  if (!context) {
    throw new Error('useLanyard must be used within a LanyardProvider');
  }
  return context;
}
