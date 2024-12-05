"use client";

import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/Home'); 
      }
    } catch (error) {

      setError(`Ошибка входа: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
    <form className={styles.formContainer}  onSubmit={handleLogin}>
    <div className={styles.module}>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
      className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
      className={styles.input}
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.signup} type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
