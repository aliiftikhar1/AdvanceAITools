'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type GlobalContextType = {
  userId: string;
  isAuthenticated: string;
  isLang: string;
  setUserId: (value: string) => void;
  data: any[];
  setData: (value: any[]) => void;
  DisplayName: string;
  setDisplayName: (value: string) => void;
  UserName: string;
  setUserName: (value: string) => void;
  Role: string;
  setRole: (value: string) => void;
  PackageId: string;
  setPackageId: (value: string) => void;
  setLang: (value: string) => void;
  logout: () => void;
};

const GlobalContext = createContext<GlobalContextType>({
  userId: '',
  isAuthenticated: "false",
  isLang: 'eng',
  setUserId: () => {},
  data: [],
  setData: () => {},
  DisplayName: '',
  UserName: '',
  Role: '',
  PackageId: '',
  setDisplayName: () => {},
  setUserName: () => {},
  setRole: () => {},
  setPackageId: () => {},
  setLang: () => {},
  logout: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [userId, setUserIdState] = useState('');
  const [data, setDataState] = useState<any[]>([]);
  const [DisplayName, setDisplayNameState] = useState('');
  const [UserName, setUserNameState] = useState('');
  const [Role, setRoleState] = useState('');
  const [PackageId, setPackageIdState] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState("false");
  const [isLang, setIsLang] = useState('eng');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedData = JSON.parse(localStorage.getItem('data') || '[]');
    const storedDisplayName = localStorage.getItem('DisplayName');
    const storedUserName = localStorage.getItem('UserName');
    const storedRole = localStorage.getItem('Role');
    const storedPackageId = localStorage.getItem('PackageId');
    const storedLang = localStorage.getItem('isLang') || 'eng';

    if (storedUserId) {
      setUserIdState(storedUserId);
      setIsAuthenticated("true");
    }
    if (storedData) setDataState(storedData);
    if (storedDisplayName) setDisplayNameState(storedDisplayName);
    if (storedUserName) setUserNameState(storedUserName);
    if (storedRole) setRoleState(storedRole);
    if (storedPackageId) setPackageIdState(storedPackageId);
    setIsLang(storedLang);
  }, []);

  const setUserId = (value: string) => {
    setUserIdState(value);
    localStorage.setItem('userId', value);
  };

  const setData = (value: any[]) => {
    setDataState(value);
    localStorage.setItem('data', JSON.stringify(value));
  };

  const setDisplayName = (value: string) => {
    setDisplayNameState(value);
    localStorage.setItem('DisplayName', value);
  };

  const setUserName = (value: string) => {
    setUserNameState(value);
    setIsAuthenticated("true");
    localStorage.setItem('UserName', value);
  };

  const setRole = (value: string) => {
    setRoleState(value);
    localStorage.setItem('Role', value);
  };

  const setPackageId = (value: string) => {
    setPackageIdState(value);
    localStorage.setItem('PackageId', value);
  };

  const setLang = (value: string) => {
    setIsLang(value);
    localStorage.setItem('isLang', value);
  };

  const logout = () => {
    setUserIdState('');
    setDataState([]);
    setDisplayNameState('');
    setUserNameState('');
    setRoleState('');
    setPackageIdState('');
    setIsLang('eng');
    setIsAuthenticated("false");

    localStorage.removeItem('userId');
    localStorage.removeItem('data');
    localStorage.removeItem('DisplayName');
    localStorage.removeItem('UserName');
    localStorage.removeItem('Role');
    localStorage.removeItem('PackageId');
    localStorage.removeItem('isLang');
  };

  return (
    <GlobalContext.Provider
      value={{
        userId,
        isAuthenticated,
        isLang,
        setUserId,
        data,
        setData,
        DisplayName,
        setDisplayName,
        UserName,
        setUserName,
        Role,
        setRole,
        PackageId,
        setPackageId,
        setLang,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
