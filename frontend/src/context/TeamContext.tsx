import React, { createContext, useContext, useState } from 'react';
import { TeamInfo } from '../types';

interface TeamContextType {
  team: TeamInfo | null;
  setTeam: (team: TeamInfo | null) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<TeamInfo | null>({
    id: 't1',
    name: 'Primary Intelligence Unit',
    memberCount: 12,
    storageUsed: '42.8GB'
  });

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeamContext must be used within TeamProvider");
  return context;
};