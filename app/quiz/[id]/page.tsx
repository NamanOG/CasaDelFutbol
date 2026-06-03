"use client"

import { use, useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Check, X as XIcon, ArrowRight, ChevronRight } from "lucide-react"
import confetti from "canvas-confetti"
import { getQuizBySlug, type QuizType, type Difficulty, type TransferQuestion } from "@/lib/data/quiz"
import { CountUp } from "@/components/motion/CountUp"

const difficultyColors = {
  beginner: "var(--color-win-green)",
  intermediate: "var(--color-draw-gold)",
  expert: "var(--color-sale-red)",
}

/* ═══════════════════════════════════════════
   TRANSFER HISTORY GAME
   ═══════════════════════════════════════════ */
function TransferGame({ questions, onFinish }: { questions: TransferQuestion[]; onFinish: (score: number) => void }) {
  const [qIdx, setQIdx] = useState(0)
  const [revealedCount, setRevealedCount] = useState(1)
  const [pick, setPick] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[qIdx]
  if (!q) { onFinish(score); return null }

  const maxClubs = q.transfers.length
  const pointsForGuess = Math.max(1, maxClubs - revealedCount + 1)

  function handleGuess(opt: string) {
    if (pick) return
    setPick(opt)
    if (opt === q.answer) {
      setScore((s) => s + pointsForGuess)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#00a651", "#ffffff", "#f4b400"] })
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

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow text-white/50">Transfer History</span>
          <div className="font-display text-3xl mt-1 text-white">Q {qIdx + 1} / {questions.length}</div>
        </div>
        <div className="text-right">
          <span className="eyebrow text-white/50">Score</span>
          <div className="font-display text-3xl mt-1 text-accent"><CountUp target={score} /></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="game-card p-8 rounded-xl relative"
        >
          <p className="eyebrow text-accent mb-6 text-center">Guess the player from this career path</p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {q.transfers.map((transfer, i) => (
              <div key={i} className="aspect-square flip-card">
                <div className={`flip-card-inner ${i < revealedCount ? 'flipped' : ''}`}>
                  <div className="flip-card-front font-display text-4xl text-white/20 bg-white/5 border-white/10">?</div>
                  <div className="flip-card-back p-2 text-center bg-white/10 border-accent/50 text-white">
                    <p className="font-display text-[1rem] sm:text-lg leading-tight uppercase tracking-wider">{transfer.club}</p>
                    <p className="text-[0.65rem] opacity-70 mt-1">{transfer.years}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!pick && revealedCount < maxClubs && (
            <div className="text-center mb-8">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 text-sm py-2 px-6"
                onClick={() => setRevealedCount((c) => c + 1)}
              >
                Reveal next club <ChevronRight size={14} className="ml-1 inline" />
              </motion.button>
              <p className="mt-4 text-xs text-white/50">
                Guess now for <strong className="text-accent">{pointsForGuess} point{pointsForGuess !== 1 ? 's' : ''}</strong>
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {q.options.map((opt) => {
              const correct = pick && opt === q.answer
              const wrong = pick === opt && opt !== q.answer
              let btnClass = "game-button text-white"
              if (pick) {
                if (correct) btnClass += " game-button--correct"
                else if (wrong) btnClass += " game-button--wrong"
                else btnClass += " opacity-30"
              }

              return (
                <motion.button
                  key={opt}
                  className={`flex items-center justify-between p-4 rounded-lg font-display text-lg uppercase tracking-wider ${btnClass}`}
                  onClick={() => handleGuess(opt)}
                  animate={wrong ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  disabled={!!pick}
                >
                  <span>{opt}</span>
                  {correct && <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}><Check size={20} className="text-win-green" /></motion.span>}
                  {wrong && <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}><XIcon size={20} className="text-sale-red" /></motion.span>}
                </motion.button>
              )
            })}
          </div>

          {pick && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-white/70 leading-relaxed mb-6 bg-black/30 p-4 rounded-lg">{q.explanation}</p>
              <button className="btn-primary w-full py-4 text-lg bg-accent hover:bg-accent-hover text-white shadow-[0_0_20px_rgba(0,166,81,0.4)]" onClick={nextQuestion}>
                {qIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </motion.div>
          )}
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

  useEffect(() => {
    if (!quiz || pick || finished) return
    const t = setInterval(() => setTime((p) => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [quiz, pick, idx, finished])

  if (!quiz || questions.length === 0) return (
    <div className="game-card p-12 text-center rounded-xl">
      <p className="font-display text-3xl text-white/50 uppercase tracking-wider">No questions available</p>
      <Link href="/quiz" className="btn-primary mt-8 inline-block">Back to Quiz Lab</Link>
    </div>
  )

  const q = questions[idx]
  const done = idx >= questions.length || finished

  if (done) {
    return (
      <div className="game-card p-12 text-center relative overflow-hidden max-w-lg w-full mx-auto rounded-xl shadow-2xl">
        <CountUp target={score} className="font-display text-[8rem] leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        <p className="eyebrow mt-4 text-white/50">Final Score</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 border-t border-white/10 pt-8 text-white">
          <div>
            <p className="font-display text-3xl">{Math.round((score / questions.length) * 100)}%</p>
            <p className="eyebrow mt-1 text-white/50">Accuracy</p>
          </div>
          <div>
            <p className="font-display text-3xl">{questions.length}</p>
            <p className="eyebrow mt-1 text-white/50">Questions</p>
          </div>
          <div>
            <p className="font-display text-3xl text-accent capitalize">{difficulty}</p>
            <p className="eyebrow mt-1 text-white/50">Difficulty</p>
          </div>
        </div>
        <Link href="/quiz" className="btn-primary bg-white text-black hover:bg-white/90 inline-block mt-10 w-full font-bold">Play Again</Link>
      </div>
    )
  }

  const ratio = (time / 30) * 100
  const barColor = ratio > 50 ? "#00a651" : ratio > 25 ? "#f4b400" : "#e22718"

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <span className="eyebrow text-white/50">Score</span>
          <div className="font-display text-4xl mt-1 text-white"><CountUp target={score} /></div>
        </div>
        <div className="text-right">
          <span className="eyebrow text-white/50">Time</span>
          <div className="font-mono text-3xl mt-1 font-bold" style={{ color: barColor, textShadow: `0 0 10px ${barColor}80` }}>{time}s</div>
        </div>
      </div>

      <div className="game-health-bar">
        <div className="game-health-fill" style={{ width: `${ratio}%`, backgroundColor: barColor, boxShadow: `0 0 15px ${barColor}` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="game-card p-8 md:p-12 rounded-xl mt-8"
        >
          <p className="eyebrow text-accent mb-4 bg-accent/10 inline-block px-3 py-1 rounded-sm border border-accent/20">{q.category}</p>
          <h1 className="font-display text-3xl md:text-5xl text-white leading-tight mb-8 drop-shadow-lg">{q.clues[0]}</h1>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {q.options.map((opt) => {
              const correct = pick && opt === q.answer
              const wrong = pick === opt && opt !== q.answer
              let btnClass = "game-button text-white"
              if (pick) {
                if (correct) btnClass += " game-button--correct"
                else if (wrong) btnClass += " game-button--wrong"
                else btnClass += " opacity-30"
              }

              return (
                <motion.button
                  key={opt}
                  className={`flex items-center justify-between p-5 rounded-lg font-display text-xl uppercase tracking-wider ${btnClass}`}
                  onClick={() => {
                    if (pick) return
                    setPick(opt)
                    if (opt === q.answer) {
                      setScore((s) => s + 1)
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#00a651", "#ffffff", "#f4b400"] })
                    }
                  }}
                  animate={wrong ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  disabled={!!pick}
                >
                  <span>{opt}</span>
                  {correct && <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}><Check size={24} className="text-win-green" /></motion.span>}
                  {wrong && <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }}><XIcon size={24} className="text-sale-red" /></motion.span>}
                </motion.button>
              )
            })}
          </div>

          {pick && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-white/70 leading-relaxed mb-6 bg-black/40 p-4 rounded-lg border border-white/5">{q.explanation}</p>
              <button className="btn-primary w-full py-4 text-xl bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.3)]" onClick={() => { setPick(null); setTime(30); setIdx((n) => n + 1) }}>
                {idx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
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
      <Link href="/quiz" className="btn-primary mt-8 inline-block">Back to Quiz Lab</Link>
    </main>
  )

  const isTransferQuiz = quiz.slug === "guess-by-transfers"

  if (transferScore !== null) {
    return (
      <main className="min-h-screen flex items-center justify-center relative z-10 p-4">
        <div className="game-bg-blur" />
        <div className="game-card p-12 text-center relative overflow-hidden max-w-lg w-full rounded-2xl">
          <CountUp target={transferScore} className="font-display text-[8rem] leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
          <p className="eyebrow mt-4 text-white/50">Final Score</p>
          <p className="text-accent text-lg mt-2 font-bold tracking-widest uppercase">Transfer History Challenge</p>
          <Link href="/quiz" className="btn-primary bg-white text-black hover:bg-white/90 inline-block mt-12 w-full text-lg">Back to Quiz Lab</Link>
        </div>
      </main>
    )
  }

  if (!started) {
    return (
      <main className="min-h-screen relative z-10 flex flex-col items-center justify-center p-4">
        <div className="game-bg-blur" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="game-card p-10 md:p-16 rounded-3xl">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center text-5xl mb-8 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {quiz.icon}
            </div>
            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider text-white drop-shadow-xl">{quiz.name}</h1>
            <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">{quiz.description}</p>

            {!isTransferQuiz && (
              <div className="mt-12 bg-black/30 p-6 rounded-2xl border border-white/5">
                <p className="eyebrow text-white/50 mb-6">Select Difficulty</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  {(["beginner", "intermediate", "expert"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`px-8 py-4 rounded-lg font-display text-xl uppercase tracking-wider transition-all cursor-pointer ${
                        difficulty === diff
                          ? 'border-accent bg-accent/20 text-accent shadow-[0_0_20px_rgba(0,166,81,0.3)] scale-105 border-2'
                          : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white border'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn-primary mt-12 px-12 py-5 text-xl bg-white text-black hover:bg-white/90 w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-transform hover:scale-105"
              onClick={() => {
                if (!isTransferQuiz && !difficulty) setDifficulty("beginner")
                setStarted(true)
              }}
            >
              START GAME <ArrowRight size={24} className="ml-3 inline" />
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative z-10 pt-32 pb-20 min-h-screen px-4">
      <div className="game-bg-blur" />
      <div className="container max-w-4xl relative z-10">
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
