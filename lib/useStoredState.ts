"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

/**
 * Estado persistido no localStorage.
 * Começa com o valor inicial (para não quebrar a renderização no servidor),
 * carrega o valor salvo após montar e só então passa a gravar.
 */
export function useStoredState<T>(
  key: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // JSON corrompido ou storage bloqueado: segue com o valor inicial
    }
    loaded.current = true;
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage cheio ou bloqueado: ignora silenciosamente
    }
  }, [key, value]);

  return [value, setValue, ready];
}
