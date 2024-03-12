import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

const ctx = createContext<{
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
}>({
  login: async () => null,
  loading: false
});

export const useUser = () => useContext(ctx);

export const UserProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);

    const payload = {
      email: email,
      password: password
    };

    const response = await window.ipc.invoke('supabase-auth', payload);

    console.log('Supabase response: ', response);

    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      loading,
      profile
    }),
    [login, loading, profile]
  );

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
};
