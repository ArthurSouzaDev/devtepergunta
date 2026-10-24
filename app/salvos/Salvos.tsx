"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TOPICS } from "@/lib/topics";
import { useStoredState } from "@/lib/useStoredState";

const SAVED_KEY = "em-pauta-tech:saved";

export default function Salvos() {
  const [saved, setSaved, ready] = useStoredState<string[]>(SAVED_KEY, []);

  const items = saved
    .map((id) => TOPICS.find((t) => t.id === id))
    .filter((t): t is (typeof TOPICS)[number] => Boolean(t));

  function remove(id: string) {
    setSaved((list) => list.filter((x) => x !== id));
  }

  return (
    <section className="stage" style={{ marginTop: 20 }}>
      <div>
        <h1 className="section-title">Pautas salvas</h1>
        <p className="section-sub">
          {ready
            ? items.length === 0
              ? "Nenhuma pauta salva ainda."
              : `${items.length} ${items.length === 1 ? "pauta salva" : "pautas salvas"}.`
            : "Carregando..."}
        </p>
      </div>

      {items.length > 0 && (
        <ul className="list">
          <AnimatePresence initial={false}>
            {items.map((t) => (
              <motion.li
                key={t.id}
                className="list-item"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <span className="chip">{t.category}</span>
                  <h3>{t.title}</h3>
                  <p>{t.hint}</p>
                </div>
                <div className="list-actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-danger"
                    onClick={() => remove(t.id)}
                    aria-label={`Remover ${t.title} dos salvos`}
                  >
                    Remover
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {ready && items.length === 0 && (
        <p className="empty" style={{ marginTop: 40 }}>
          Vá em <Link href="/">Gerar</Link> e toque em “Salvar pauta” para guardar uma aqui.
        </p>
      )}
    </section>
  );
}
