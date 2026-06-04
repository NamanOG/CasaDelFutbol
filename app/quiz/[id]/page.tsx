"use client"

import { use, useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Check, X as XIcon, ArrowRight, ChevronRight, Eye, Zap, Trophy } from "lucide-react"
import confetti from "canvas-confetti"
import { getQuizBySlug, type QuizType, type Difficulty, type TransferQuestion } from "@/lib/data/quiz"
import { CountUp } from "@/components/motion/CountUp"

const difficultyColors = {
  beginner: "var(--color-win-green)",
  intermediate: "var(--color-draw-gold)",
  expert: "var(--color-sale-red)",
}

/* ═══════════════════════════════════════════
   PARTICLE BURST (on club reveal)
   ═══════════════════════════════════════════ */
function fireRevealParticles() {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { y: 0.5 },
    colors: ["#1976c9", "#28b84e", "#ffffff"],
    ticks: 80,
    scalar: 0.7,
  })
}

/* ═══════════════════════════════════════════
   TRANSFER HISTORY GAME
   ═══════════════════════════════════════════ */
function TransferGame({ questions, onFinish }: { questions: TransferQuestion[]; onFinish: (score: number) => void }) {
  const [qIdx, setQIdx] = useState(0)
  const [revealedCount, setRevealedCount] = useState(1)
  const [pick, setPick] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [justRevealed, setJustRevealed] = useState<number | null>(null)

  const q = questions[qIdx]
  if (!q) { onFinish(score); return null }

  const maxClubs = q.transfers.length
  const pointsForGuess = Math.max(1, maxClubs - revealedCount + 1)

  function handleReveal() {
    const next = revealedCount
    setRevealedCount((c) => c + 1)
    setJustRevealed(next)
    fireRevealParticles()
    setTimeout(() => setJustRevealed(null), 700)
  }

  function handleGuess(opt: string) {
    if (pick) return
    setPick(opt)
    if (opt === q.answer) {
      setScore((s) => s + pointsForGuess)
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#1976c9", "#28b84e", "#ffffff", "#d5ad1f"],
      })
    }
  }

  function nextQuestion() {
    if (qIdx >= questions.length - 1) {
      onFinish(score)
    } else {
      setQIdx((n) => n + 1)
      setRevealedCount(1)
      setPick(null)
    }
  }

  const progressPct = ((qIdx) / questions.length) * 100

  return (
    <div className="space-y-6 pb-32">
      {/* ── Top HUD ── */}
      <div className="flex items-end justify-between pb-4 border-b border-white/10">
        <div>
          <span className="eyebrow text-white/40">Transfer History</span>
          <div className="font-display text-4xl mt-1 text-white tracking-wider">
            Q <span className="text-accent">{qIdx + 1}</span> / {questions.length}
          </div>
        </div>
        <div className="text-right">
          <span className="eyebrow text-white/40">Score</span>
          <div className="font-display text-4xl mt-1 text-accent drop-shadow-[0_0_12px_rgba(25,118,201,0.6)]">
            <CountUp target={score} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-none overflow-hidden">
        <motion.div
          className="h-full rounded-none"
          style={{ background: "linear-gradient(90deg, #28b84e, #1976c9)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="game-card p-6 md:p-8 rounded-none relative overflow-hidden"
        >
          {/* Ambient glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            {...{ style: {
              background: "radial-gradient(ellipse at 50% 0%, rgba(25,118,201,0.07) 0%, transparent 70%)",
            } }}
          />

          <p className="eyebrow text-accent mb-2 text-center tracking-widest">
            <Eye size={12} className="inline mr-1.5 opacity-70" />
            Guess the player from this career path
          </p>
          <p className="text-center text-white/30 text-xs mb-6">
            {revealedCount} of {maxClubs} clubs revealed
          </p>

          {/* Club cards grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 mb-6">
            {q.transfers.map((transfer, i) => {
              const isRevealed = i < revealedCount
              const isJustFlipped = i === justRevealed
              return (
                <motion.div
                  key={i}
                  className="aspect-square flip-card"
                  animate={isJustFlipped ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`flip-card-inner rounded-none ${isRevealed ? "flipped" : ""}`}>
                    {/* Front: hidden */}
                    <div className="flip-card-front rounded-none">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-display text-3xl text-white/15">?</span>
                        <span className="text-[0.5rem] text-white/10 uppercase tracking-widest">Club {i + 1}</span>
                      </div>
                    </div>
                    {/* Back: revealed club */}
                    <div className="flip-card-back p-2 text-center rounded-none">
                      <span className="text-[0.6rem] text-accent/60 uppercase tracking-widest mb-1 block">
                        {transfer.years}
                      </span>
                      <p className="font-display text-[0.85rem] sm:text-base leading-tight uppercase tracking-wide text-white">
                        {transfer.club}
                      </p>
                      <p className="text-[0.55rem] text-white/40 mt-1 leading-tight">{transfer.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Reveal button */}
          {!pick && revealedCount < maxClubs && (
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(25,118,201,0.3)" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-none border border-white/20 bg-white/5 text-white font-display uppercase tracking-widest text-sm hover:border-accent/60 hover:text-accent transition-all duration-300 cursor-pointer"
                onClick={handleReveal}
              >
                <Zap size={14} />
                Reveal next club
                <ChevronRight size={14} />
              </motion.button>
              <p className="mt-3 text-xs text-white/40">
                Guess now for{" "}
                <strong className="text-accent drop-shadow-[0_0_6px_rgba(25,118,201,0.5)]">
                  {pointsForGuess} {pointsForGuess !== 1 ? "points" : "point"}
                </strong>
              </p>
            </motion.div>
          )}

          {/* All revealed - show guess prompt */}
          {!pick && revealedCount >= maxClubs && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-white/50 mb-6"
            >
              All clubs revealed — <span className="text-accent">make your guess!</span>
            </motion.p>
          )}

          {/* Answer options */}
          <div className="grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const correct = pick && opt === q.answer
              const wrong = pick === opt && opt !== q.answer
              const dimmed = pick && opt !== q.answer && pick !== opt

              return (
                <motion.button
                  key={opt}
                  className={`
                    relative flex items-center justify-between p-4 rounded-none font-display text-base uppercase tracking-wider cursor-pointer overflow-hidden
                    ${!pick ? "game-button text-white" : ""}
                    ${correct ? "game-button--correct" : ""}
                    ${wrong ? "game-button--wrong" : ""}
                    ${dimmed ? "opacity-20 cursor-default" : ""}
                  `}
                  onClick={() => handleGuess(opt)}
                  animate={wrong ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                  whileHover={!pick ? { scale: 1.02 } : {}}
                  whileTap={!pick ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.35 }}
                  disabled={!!pick}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-none border border-white/20 flex items-center justify-center text-xs text-white/40 font-body">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </span>
                  {correct && (
                    <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Check size={20} className="text-win-green" />
                    </motion.span>
                  )}
                  {wrong && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }}>
                      <XIcon size={20} className="text-sale-red" />
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Result + Next */}
          <AnimatePresence>
            {pick && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <div className={`mb-4 p-3 rounded-none text-center font-display text-xl uppercase tracking-wider ${pick === q.answer ? "text-win-green bg-green-900/20 border border-green-500/20" : "text-sale-red bg-red-900/20 border border-red-500/20"}`}>
                  {pick === q.answer ? (
                    <span>Correct +{pointsForGuess} {pointsForGuess !== 1 ? "points" : "point"}</span>
                  ) : (
                    <span>The answer was {q.answer}</span>
                  )}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-6 bg-black/30 p-4 rounded-none border border-white/5 font-body">
                  {q.explanation}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(25,118,201,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 text-base bg-accent text-white hover:bg-accent-hover font-bold cursor-pointer rounded-none"
                  onClick={nextQuestion}
                >
                  {qIdx === questions.length - 1 ? (
                    <><Trophy size={18} className="inline mr-2" /> Finish & See Score</>
                  ) : (
                    <>Next Question <ArrowRight size={18} className="inline ml-2" /></>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════
   STANDARD QUIZ GAME
   ═══════════════════════════════════════════ */
function StandardGame({ quiz, difficulty }: { quiz: ReturnType<typeof getQuizBySlug>; difficulty: Difficulty }) {
  const questions = useMemo(() => {
    if (!quiz) return []
    return quiz.questions.filter((q) => q.difficulty === difficulty || difficulty === "beginner")
  }, [quiz, difficulty])

  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [pick, setPick] = useState<string | null>(null)
  const [time, setTime] = useState(30)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!quiz || pick || finished) return
    timerRef.current = setInterval(() => setTime((p) => {
      if (p <= 1) {
        clearInterval(timerRef.current!)
        setPick("__timeout__")
        return 0
      }
      return p - 1
    }), 1000)
    return () => clearInterval(timerRef.current!)
  }, [quiz, pick, idx, finished])

  if (!quiz || questions.length === 0) return (
    <div className="game-card p-12 text-center rounded-none border border-white/10">
      <p className="font-display text-3xl text-white/50 uppercase tracking-wider">No questions available</p>
      <Link href="/quiz" className="btn-primary mt-8 inline-block rounded-none">Back to Quiz Lab</Link>
    </div>
  )

  const q = questions[idx]
  const done = idx >= questions.length || finished

  if (done) {
    const accuracy = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="game-card p-12 text-center relative overflow-hidden max-w-lg w-full mx-auto rounded-none shadow-2xl border border-white/10"
      >
        <div className="absolute inset-0 pointer-events-none" {...{ style: {
          background: "radial-gradient(ellipse at 50% 0%, rgba(25,118,201,0.08) 0%, transparent 70%)"
        } }} />
        <Trophy size={48} className="mx-auto text-accent mb-4 drop-shadow-[0_0_20px_rgba(25,118,201,0.6)]" />
        <CountUp target={score} className="font-display text-[7rem] leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        <p className="eyebrow mt-2 text-white/50">Final Score</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 border-t border-white/10 pt-8 text-white">
          <div className="p-4 rounded-none bg-white/5 border border-white/10">
            <p className="font-display text-3xl" {...{ style: { color: accuracy >= 70 ? "var(--color-win-green)" : accuracy >= 40 ? "var(--color-draw-gold)" : "var(--color-sale-red)" } }}>{accuracy}%</p>
            <p className="eyebrow mt-1 text-white/40">Accuracy</p>
          </div>
          <div className="p-4 rounded-none bg-white/5 border border-white/10">
            <p className="font-display text-3xl">{questions.length}</p>
            <p className="eyebrow mt-1 text-white/40">Questions</p>
          </div>
          <div className="p-4 rounded-none bg-white/5 border border-white/10">
            <p className="font-display text-3xl text-accent capitalize">{difficulty}</p>
            <p className="eyebrow mt-1 text-white/40">Difficulty</p>
          </div>
        </div>
        <Link href="/quiz" className="btn-primary bg-accent text-white hover:bg-accent-hover inline-block mt-8 w-full text-lg font-bold py-4 rounded-none">Play Again</Link>
      </motion.div>
    )
  }

  const ratio = (time / 30) * 100
  const barColor = ratio > 60 ? "#28b84e" : ratio > 30 ? "#d5ad1f" : "#f91f21"

  return (
    <div className="space-y-4 pb-32">
      {/* HUD */}
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow text-white/40">Score</span>
          <div className="font-display text-4xl mt-1 text-white">
            <CountUp target={score} />
          </div>
        </div>
        <div className="text-right">
          <span className="eyebrow text-white/40">Time</span>
          <motion.div
            className="font-display text-4xl mt-1"
            animate={{ scale: time <= 5 && !pick ? [1, 1.15, 1] : 1 }}
            transition={{ repeat: time <= 5 && !pick ? Infinity : 0, duration: 0.5 }}
            style={{ color: barColor, textShadow: `0 0 14px ${barColor}80` }}
          >
            {time}s
          </motion.div>
        </div>
      </div>

      <div className="game-health-bar rounded-none">
        <motion.div
          className="game-health-fill rounded-none"
          animate={{ width: `${ratio}%`, backgroundColor: barColor }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: `0 0 12px ${barColor}` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="game-card p-8 md:p-10 rounded-none mt-4 relative overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 pointer-events-none" {...{ style: {
            background: "radial-gradient(ellipse at 30% 0%, rgba(25,118,201,0.05) 0%, transparent 60%)"
          } }} />

          {/* Category + Q number */}
          <div className="flex items-center justify-between mb-6">
            <span className="eyebrow text-accent bg-accent/10 px-3 py-1.5 rounded-none border border-accent/20 text-xs">
              {q.category}
            </span>
            <span className="eyebrow text-white/30 text-xs">
              {idx + 1} / {questions.length}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight mb-8 drop-shadow-lg">
            {q.clues[0]}
          </h1>

          <div className="grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const correct = pick && opt === q.answer
              const wrong = pick === opt && opt !== q.answer && pick !== "__timeout__"
              const dimmed = pick && opt !== q.answer && pick !== opt

              let cls = "game-button text-white rounded-none"
              if (pick) {
                if (correct) cls = "game-button--correct game-button text-white rounded-none"
                else if (wrong) cls = "game-button--wrong game-button text-white rounded-none"
                else cls = "game-button text-white opacity-20 cursor-default rounded-none"
              }

              return (
                <motion.button
                  key={opt}
                  className={`relative flex items-center justify-between p-5 rounded-none font-display text-lg uppercase tracking-wider overflow-hidden cursor-pointer ${cls}`}
                  onClick={() => {
                    if (pick) return
                    clearInterval(timerRef.current!)
                    setPick(opt)
                    if (opt === q.answer) {
                      setScore((s) => s + 1)
                      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#28b84e", "#ffffff", "#d5ad1f"] })
                    }
                  }}
                  animate={wrong ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                  whileHover={!pick ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!pick ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.35 }}
                  disabled={!!pick}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-none border border-white/20 flex items-center justify-center text-xs text-white/40 flex-shrink-0">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </span>
                  {correct && (
                    <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Check size={22} className="text-win-green flex-shrink-0" />
                    </motion.span>
                  )}
                  {wrong && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}>
                      <XIcon size={22} className="text-sale-red flex-shrink-0" />
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {pick && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                {pick === "__timeout__" && (
                  <div className="mb-4 p-3 rounded-none text-center font-display text-xl uppercase tracking-wider text-sale-red bg-red-900/20 border border-red-500/20">
                    ⏱ Time's up! The answer was {q.answer}
                  </div>
                )}
                <p className="text-sm text-white/60 leading-relaxed mb-6 bg-black/30 p-4 rounded-none border border-white/5 font-body">
                  {q.explanation}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-4 text-lg bg-accent text-white hover:bg-accent-hover font-bold cursor-pointer rounded-none"
                  onClick={() => { setPick(null); setTime(30); setIdx((n) => n + 1) }}
                >
                  {idx === questions.length - 1 ? (
                    <><Trophy size={20} className="inline mr-2" /> Finish Quiz</>
                  ) : (
                    <>Next Question <ArrowRight size={20} className="inline ml-2" /></>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════
   RESULT SCREEN (Transfer)
   ═══════════════════════════════════════════ */
function TransferResult({ score, onPlayAgain }: { score: number; onPlayAgain: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 }, colors: ["#1976c9", "#28b84e", "#ffffff", "#d5ad1f"] })
    }, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <div className="game-bg-blur" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="game-card p-12 text-center relative overflow-hidden max-w-lg w-full rounded-none border border-white/10"
      >
        <div className="absolute inset-0 pointer-events-none" {...{ style: {
          background: "radial-gradient(ellipse at 50% 10%, rgba(25,118,201,0.12) 0%, transparent 70%)"
        } }} />
        <Trophy size={56} className="mx-auto text-accent mb-4 drop-shadow-[0_0_24px_rgba(25,118,201,0.7)]" />
        <CountUp target={score} className="font-display text-[8rem] leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
        <p className="eyebrow mt-2 text-white/50">Final Score</p>
        <p className="text-accent text-sm mt-2 font-bold tracking-widest uppercase">Transfer History Challenge Complete</p>
        <div className="mt-8 flex gap-3">
          <button onClick={onPlayAgain} className="flex-1 btn-primary bg-accent text-white hover:bg-accent-hover text-base font-bold py-4 cursor-pointer rounded-none">
            Play Again
          </button>
          <Link href="/quiz" className="flex-1 btn-primary bg-white/10 text-white hover:bg-white/20 border border-white/20 text-base py-4 text-center rounded-none">
            Quiz Lab
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function QuizGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const quiz = getQuizBySlug(id as QuizType)
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [started, setStarted] = useState(false)
  const [transferScore, setTransferScore] = useState<number | null>(null)

  if (!quiz) return (
    <main className="pt-32 container min-h-screen text-center">
      <div className="game-bg-blur" />
      <p className="text-white text-xl">Quiz not found.</p>
      <Link href="/quiz" className="btn-primary mt-8 inline-block rounded-none">Back to Quiz Lab</Link>
    </main>
  )

  const isTransferQuiz = quiz.slug === "guess-by-transfers"

  if (transferScore !== null) {
    return <TransferResult score={transferScore} onPlayAgain={() => { setTransferScore(null); setStarted(false) }} />
  }

  if (!started) {
    return (
      <main className="min-h-screen relative z-10 flex flex-col items-center justify-center p-4">
        <div className="game-bg-blur" />
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="game-card p-10 md:p-16 rounded-none relative overflow-hidden border border-white/10"
          >
            {/* Ambient gradient */}
            <div className="absolute inset-0 pointer-events-none" {...{ style: {
              background: "radial-gradient(ellipse at 50% 0%, rgba(25,118,201,0.08) 0%, transparent 60%)"
            } }} />

            <motion.div
              className="w-24 h-24 mx-auto bg-white/10 rounded-none flex items-center justify-center text-5xl mb-8 border border-white/20"
              animate={{ boxShadow: ["0 0 20px rgba(255,255,255,0.05)", "0 0 40px rgba(25,118,201,0.15)", "0 0 20px rgba(255,255,255,0.05)"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {quiz.icon}
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider text-white drop-shadow-xl">{quiz.name}</h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl mx-auto font-body">{quiz.description}</p>

            {!isTransferQuiz && (
              <div className="mt-10 bg-black/30 p-6 rounded-none border border-white/5">
                <p className="eyebrow text-white/40 mb-5">Select Difficulty</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {(["beginner", "intermediate", "expert"] as const).map((diff) => (
                    <motion.button
                      key={diff}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDifficulty(diff)}
                      className={`px-7 py-3.5 rounded-none font-display text-lg uppercase tracking-wider transition-all cursor-pointer ${
                        difficulty === diff
                          ? "border-2 border-accent bg-accent/15 text-accent shadow-[0_0_24px_rgba(25,118,201,0.25)] scale-105"
                          : "border border-white/15 text-white/40 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {diff}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(25,118,201,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-10 px-12 py-5 text-xl bg-accent text-white hover:bg-accent-hover w-full sm:w-auto font-bold cursor-pointer rounded-none"
              onClick={() => {
                if (!isTransferQuiz && !difficulty) setDifficulty("beginner")
                setStarted(true)
              }}
            >
              START GAME <ArrowRight size={22} className="ml-3 inline" />
            </motion.button>

            <p className="mt-6 text-xs text-white/25 uppercase tracking-widest font-mono">
              {quiz.mechanics}
            </p>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative z-10 pt-28 pb-20 min-h-screen px-4">
      <div className="game-bg-blur" />
      <div className="container max-w-4xl relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/quiz" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors font-mono">
            ← Quiz Lab
          </Link>
        </motion.div>

        {isTransferQuiz && quiz.transferQuestions ? (
          <TransferGame
            questions={quiz.transferQuestions}
            onFinish={(s) => setTransferScore(s)}
          />
        ) : (
          <StandardGame quiz={quiz} difficulty={difficulty ?? "beginner"} />
        )}
      </div>
    </main>
  )
}
