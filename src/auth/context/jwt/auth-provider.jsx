'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession } from './utils';

// Khóa lưu trong sessionStorage (đồng nhất với action.js)
const AUTH_ROLE_KEY = 'AUTH_ROLE';   // 'admin' | 'staff'
const AUTH_USER_KEY = 'AUTH_USER';   // cache thông tin me

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      const role = sessionStorage.getItem(AUTH_ROLE_KEY) || 'admin';

      if (!accessToken) {
        setState({ user: null, loading: false });
        return null;
      }

      // Set header Authorization cho axios (kể cả token không có exp)
      await setSession(accessToken);

      // Chọn endpoint /me theo role
      const meUrl =
        role === 'staff'
          ? endpoints?.staff?.me
          : (endpoints?.admin?.me || endpoints?.auth?.me);

      // Gọi /me
      const res = await axios.get(meUrl);
      const me = res?.data?.data ?? res?.data?.user ?? res?.data ?? null;

      // Cache nhẹ để dùng lại nếu cần
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(me));

      setState({
        user: me ? { ...me, accessToken, userType: role } : null,
        loading: false,
      });

      return me;
    } catch (error) {
      // Nếu /me fail (ví dụ đang giữ token staff mà lại gọi admin, hoặc 404/401)
      // thử dùng cache AUTH_USER; nếu không có thì coi như chưa đăng nhập
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      const role = sessionStorage.getItem(AUTH_ROLE_KEY) || 'admin';
      const cached = sessionStorage.getItem(AUTH_USER_KEY);

      if (cached) {
        const me = JSON.parse(cached);
        setState({ user: { ...me, accessToken, userType: role }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
      return null;
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = state.loading ? 'loading' : state.user ? 'authenticated' : 'unauthenticated';

  const memoizedValue = useMemo(
    () => ({
      user: state.user,             // sẽ có userType: 'admin' | 'staff'
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}