import { app, ipcMain, Notification, session } from 'electron';
import { supabase } from './helpers/supabase-client';

export const bindHandlers = () => {
  ipcMain.handle('supabase-auth', async (event, user) => {
    console.log('Triggered!');
    const { email, password } = user;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      new Notification({
        title: 'My Application',
        body: '🎉 Successfully logged in'
      });

      const cookie = {
        url: app.isPackaged
          ? 'app://./'
          : `http://localhost:${process.argv[2]}`,
        name: 'access_token',
        httpOnly: true,
        secure: true,
        value: data.session.access_token,
        expirationDate: data.session.expires_at
      };

      await session.defaultSession.cookies.set(cookie);

      return data.session;
    } catch (e: any) {
      throw new Error(e.message || 'Unknown error');
    }
  });
};
