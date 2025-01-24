import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuth() {
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const getData = async () =>{
      const user_id = JSON.parse(await AsyncStorage.getItem('userID'));
      const token = await AsyncStorage.getItem('userToken');
      if (user_id && user_id.userID && token) {
        setUser(user_id.userID);
        setToken(token);
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    getData();
  }, [isLoading, isAuthenticated]);

  const login = async (userID, token) => {
    setUser(userID);
    setToken(token);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('userID', JSON.stringify({userID}));
    await AsyncStorage.setItem('userToken', token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('userID');
    await AsyncStorage.removeItem('userToken');
    router.push('/login'); 
  };

  return { user, isAuthenticated, token, isLoading, login, logout };
}
