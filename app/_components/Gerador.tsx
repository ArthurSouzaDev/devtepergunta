"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, TOPICS, type Category, type Topic } from "@/lib/topics";
import { useStoredState } from "@/lib/useStoredState";
import {
  EMPTY_PROGRESS,
  lose,
  streakMessage,
  win,
  type Progress,
} from "@/lib/progress";
import { formatTime } from "@/lib/format";

const RESEARCH_MS = 10 * 60 * 1000;
const SPEAK_MS = 60 * 1000;

type Phase = "idle" | "research" | "speak" | "done";
type Filter = "Tudo" | Category;

const FILTERS: Filter[] = ["Tudo", ...CATEGORIES];
const SAVED_KEY = "devtepergunta:saved";
const PROGRESS_KEY = "devtepergunta:progress";

/** Sorteia uma pauta da categoria escolhida, evitando repetir a atual */
function pickFrom(filter: Filter, exclude?: string): Topic | null {
  const list = TOPICS.filter(
    (t) => (filter === "Tudo" || t.category === filter) && t.id !== exclude,
  );
  if (list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

export default function Gerador() {
  const [saved, setSaved] = useStoredState<string[]>(SAVED_KEY, []);
  const [progress, setProgress] = useStoredState<Progress>(
    PROGRESS_KEY,
    EMPTY_PROGRESS,
  );

  const [filter, setFilter] = useState<Filter>("Tudo");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [endAt, setEndAt] = useState(0);
  const [now, setNow] = useState(0);
  const [lastWin, setLastWin] = useState(false);
  const reduce = useReducedMotion();

  const running = phase === "research" || phase === "speak";

  // Primeira pauta ao abrir a página (apenas no cliente, evita diferença de hidratação)
  useEffect(() => {
    setTopic(pickFrom("Tudo"));
  }, []);

  // Relógio enquanto há cronômetro rodando
  useEffect(() => {
    if (!running) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [running]);

  // Troca de fase quando o tempo acaba
  useEffect(() => {
    if (!running || !endAt || now === 0 || now < endAt) return;
    if (phase === "research") {
      setPhase("speak");
      setEndAt(endAt + SPEAK_MS);
      tone();
    } else if (phase === "speak") {
      setPhase("done");
      setEndAt(0);
      tone();
    }
  }, [now, endAt, phase, running]);

  const remaining = running && endAt ? Math.max(0, endAt - now) : 0;
  const phaseTotal = phase === "research" ? RESEARCH_MS : SPEAK_MS;
  const pct = running
    ? Math.min(100, ((phaseTotal - remaining) / phaseTotal) * 100)
    : 0;

  const girar = useCallback(() => {
    if (running) return;
    setPhase("idle");
    setEndAt(0);
    setLastWin(false);
    setTopic((current) => pickFrom(filter, current?.id));
  }, [running, filter]);

  function changeFilter(f: Filter) {
    if (running) return;
    setFilter(f);
    setPhase("idle");
    setEndAt(0);
    setLastWin(false);
    setTopic((current) => pickFrom(f, current?.id));
  }

  function startResearch() {
    const t = Date.now();
    setNow(t);
    setPhase("research");
    setEndAt(t + RESEARCH_MS);
  }

  function startSpeak() {
    const t = Date.now();
    setNow(t);
    setPhase("speak");
    setEndAt(t + SPEAK_MS);
  }

  function complete() {
    if (!topic) return;
    setProgress((p) => win(p));
    setLastWin(true);
    setPhase("idle");
    setEndAt(0);
    setTopic(pickFrom(filter, topic.id));
  }

  function skipTopic() {
    if (!topic) return;
    setProgress((p) => lose(p));
    setLastWin(false);
    setPhase("idle");
    setEndAt(0);
    setTopic(pickFrom(filter, topic.id));
  }

  function toggleSave() {
    if (!topic) return;
    setSaved((list) =>
      list.includes(topic.id)
        ? list.filter((id) => id !== topic.id)
        : [topic.id, ...list],
    );
  }

  const isSaved = topic ? saved.includes(topic.id) : false;

  const savedTopics = saved
    .map((id) => TOPICS.find((t) => t.id === id))
    .filter((t): t is Topic => Boolean(t));

  function removeSaved(id: string) {
    setSaved((list) => list.filter((x) => x !== id));
  }

  return (
    <section className="stage" aria-live="polite">
      <nav className="filters" aria-label="Categorias">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`pill ${filter === f ? "active" : ""}`}
            aria-pressed={filter === f}
            onClick={() => changeFilter(f)}
            disabled={running}
          >
            {f}
          </button>
        ))}
      </nav>

      <p className="intro">
        Gira um assunto, pesquisa 10 min, depois fala 1 min.
      </p>

      <AnimatePresence mode="wait">
        <motion.article
          key={topic?.id ?? "empty"}
          className="topic"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {topic ? (
            <>
              <span className="chip">{topic.category}</span>
              <h2 className="topic-title">{topic.title}</h2>

              {running ? (
                <Timer phase={phase} remaining={remaining} pct={pct} />
              ) : phase === "done" ? (
                <p className="topic-hint">Tempo esgotado. Você falou?</p>
              ) : (
                <p className="topic-hint">{topic.hint}</p>
              )}
            </>
          ) : (
            <p className="empty">Nenhuma pauta nessa categoria.</p>
          )}
        </motion.article>
      </AnimatePresence>

      <div className="actions">
        <button
          type="button"
          className="btn btn-girar"
          onClick={girar}
          disabled={running}
        >
          Girar
        </button>

        <div className="btn-row">
          {phase === "idle" && topic && (
            <>
              <button type="button" className="btn" onClick={startResearch}>
                Pesquisar · 10 min
              </button>
              <button type="button" className="btn" onClick={startSpeak}>
                Falar · 1 min
              </button>
            </>
          )}

          {phase === "research" && (
            <button type="button" className="btn" onClick={startSpeak}>
              Pular para a fala
            </button>
          )}

          {phase === "done" && (
            <button
              type="button"
              className="btn btn-primary-outline"
              onClick={complete}
            >
              Falei!
            </button>
          )}

          {running && (
            <button
              type="button"
              className="btn btn-ghost btn-danger"
              onClick={skipTopic}
            >
              Desistir (zera a sequência)
            </button>
          )}

          {phase === "idle" && topic && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={complete}
              title="Marca como falada e ganha ponto na sequência"
            >
              Já falei
            </button>
          )}
        </div>

        {topic && (
          <button
            type="button"
            className={`btn btn-ghost btn-save ${isSaved ? "saved" : ""}`}
            onClick={toggleSave}
            aria-pressed={isSaved}
          >
            {isSaved ? "♥ Salva" : "♡ Salvar pauta"}
          </button>
        )}

        <Streak progress={progress} justWon={lastWin} />
      </div>

      {savedTopics.length > 0 && (
        <section className="saved" aria-label="Pautas salvas">
          <h2 className="saved-title">Salvos</h2>
          <ul className="saved-list">
            <AnimatePresence initial={false}>
              {savedTopics.map((t) => (
                <motion.li
                  key={t.id}
                  className="saved-item"
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="saved-name">{t.title}</span>
                  <button
                    type="button"
                    className="saved-remove"
                    onClick={() => removeSaved(t.id)}
                    aria-label={`Remover "${t.title}" dos salvos`}
                  >
                    ×
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      )}
    </section>
  );
}

function Streak({
  progress,
  justWon,
}: {
  progress: Progress;
  justWon: boolean;
}) {
  return (
    <p className="streak-line" aria-label="Sequência de pautas">
      Sequência <strong>{progress.streak}</strong>
      <span className="dot-sep">·</span>
      Recorde <strong>{progress.best}</strong>
      <span className="dot-sep">·</span>
      Total <strong>{progress.total}</strong>
      {justWon && <span className="dot-sep">·</span>}
      {justWon && "Mandou bem!"}
      <span className="dot-sep">·</span>
      {streakMessage(progress.streak)}
    </p>
  );
}

function Timer({
  phase,
  remaining,
  pct,
}: {
  phase: "research" | "speak";
  remaining: number;
  pct: number;
}) {
  return (
    <div className="timer">
      <span className="phase-label">
        <span className="dot" />
        {phase === "research" ? "Pesquisando" : "Falando"}
      </span>
      <span className="clock">{formatTime(remaining / 1000)}</span>
      <div className="progress" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Aviso sonoro ao trocar de fase, quando o navegador permite */
function tone() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
    osc.onended = () => ctx.close();
  } catch {
    // áudio indisponível: ignora
  }
}
