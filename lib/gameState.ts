import { Question, ShuffledQuestion, GameEvent, CMMC_QUESTIONS, RANDOM_EVENTS, DEATH_MESSAGES, DEFAULT_PARTY, getShuffledQuestion } from './gameData';

export type Screen =
  | 'title'
  | 'intro'
  | 'party'
  | 'trail'
  | 'question'
  | 'result'
  | 'event'
  | 'death'
  | 'supplies'
  | 'hunting'
  | 'resting'
  | 'river'
  | 'valley_of_despair'
  | 'gameover'
  | 'victory'
  | 'leaderboard';

export interface PartyMember {
  name: string;
  alive: boolean;
}

export type Difficulty = 'easy' | 'normal' | 'hard' | 'nightmare';

export interface GameState {
  screen: Screen;
  party: PartyMember[];
  milesTraveled: number;
  totalMiles: number;
  morale: number;
  sprsScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  usedQuestions: number[];
  currentQuestion: ShuffledQuestion | null;
  currentEvent: GameEvent | null;
  lastAnswer: {
    quality: 'best' | 'good' | 'wrong';
    explanation: string;
    bestAnswer: string;
    goodExplanation?: string;
  } | null;
  lastDeath: { name: string; message: string } | null;
  huntingResult: { findings: number; severity: 'critical' | 'moderate' | 'low' } | null;
  gameOverReason: string;
  animationFrame: number;
  // New fields
  godMode: boolean;
  difficulty: Difficulty;
  deathShield: boolean;  // Prevents next random death (from Supply Store)
  totalDeaths: number;   // Track for achievements
  consecutiveCorrect: number;  // Track for perfect audit achievement
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SHOW_INTRO' }
  | { type: 'SHOW_PARTY_SELECT' }
  | { type: 'SET_PARTY'; party: string[] }
  | { type: 'START_TRAIL' }
  | { type: 'CONTINUE_TRAIL' }
  | { type: 'START_QUESTION' }
  | { type: 'ANSWER_QUESTION'; answer: string }
  | { type: 'SHOW_RESULT' }
  | { type: 'DISMISS_RESULT' }
  | { type: 'TRIGGER_EVENT' }
  | { type: 'DISMISS_EVENT' }
  | { type: 'SHOW_DEATH'; name: string; message: string }
  | { type: 'DISMISS_DEATH' }
  | { type: 'REST' }
  | { type: 'FINISH_REST' }
  | { type: 'HUNT_VULNERABILITIES' }
  | { type: 'FINISH_HUNTING' }
  | { type: 'CHECK_SUPPLIES' }
  | { type: 'CLOSE_SUPPLIES' }
  | { type: 'GIVE_UP' }
  | { type: 'GAME_OVER'; reason: string }
  | { type: 'VICTORY' }
  | { type: 'RESTART' }
  | { type: 'SHOW_LEADERBOARD' }
  | { type: 'CLOSE_LEADERBOARD' }
  | { type: 'RIVER_CROSSING' }
  | { type: 'FORD_RIVER' }
  | { type: 'WAIT_FOR_FERRY' }
  | { type: 'CAULK_AND_FLOAT' }
  | { type: 'VALLEY_OF_DESPAIR' }
  | { type: 'CONVINCE_LEADERSHIP'; success: boolean }
  | { type: 'TOGGLE_GOD_MODE' }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'SET_PARTY_WITH_BONUS'; party: string[]; sprsBonus: number };

export function getInitialState(): GameState {
  return {
    screen: 'title',
    party: [],
    milesTraveled: 0,
    totalMiles: 2000,
    morale: 100,
    sprsScore: 50,
    questionsAnswered: 0,
    correctAnswers: 0,
    usedQuestions: [],
    currentQuestion: null,
    currentEvent: null,
    lastAnswer: null,
    lastDeath: null,
    huntingResult: null,
    gameOverReason: '',
    animationFrame: 0,
    // New fields
    godMode: false,
    difficulty: 'normal',
    deathShield: false,
    totalDeaths: 0,
    consecutiveCorrect: 0,
  };
}

function getRandomQuestion(state: GameState): ShuffledQuestion {
  const available = CMMC_QUESTIONS.filter(q => !state.usedQuestions.includes(q.id));
  let question: Question;
  if (available.length === 0) {
    // Reset used questions if all have been used
    question = CMMC_QUESTIONS[Math.floor(Math.random() * CMMC_QUESTIONS.length)];
  } else {
    question = available[Math.floor(Math.random() * available.length)];
  }
  // Shuffle the answer options so correct answer isn't always in the same position
  return getShuffledQuestion(question);
}

function getRandomEvent(): GameEvent {
  return RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
}

function getRandomDeathMessage(): string {
  return DEATH_MESSAGES[Math.floor(Math.random() * DEATH_MESSAGES.length)];
}

function killRandomMember(party: PartyMember[]): { party: PartyMember[]; victim: PartyMember | null } {
  const alive = party.filter(m => m.alive);
  if (alive.length === 0) return { party, victim: null };

  const victim = alive[Math.floor(Math.random() * alive.length)];
  const newParty = party.map(m =>
    m.name === victim.name ? { ...m, alive: false } : m
  );

  return { party: newParty, victim };
}

function checkGameEnd(state: GameState): { ended: boolean; victory: boolean; reason: string } {
  const aliveCount = state.party.filter(m => m.alive).length;

  if (aliveCount === 0) {
    return { ended: true, victory: false, reason: "Your entire compliance team has perished on the trail." };
  }

  if (state.morale <= 0) {
    return { ended: true, victory: false, reason: "Your team's morale has collapsed. They've abandoned compliance to become organic farmers in Vermont." };
  }

  if (state.milesTraveled >= state.totalMiles) {
    return { ended: true, victory: true, reason: "" };
  }

  return { ended: false, victory: false, reason: "" };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, screen: 'intro' };

    case 'SHOW_INTRO':
      return { ...state, screen: 'intro' };

    case 'SHOW_PARTY_SELECT':
      return { ...state, screen: 'party' };

    case 'SET_PARTY':
      const party = action.party.map(name => ({ name, alive: true }));
      return { ...state, party, screen: 'trail' };

    case 'START_TRAIL':
      return { ...state, screen: 'trail', animationFrame: state.animationFrame + 1 };

    case 'CONTINUE_TRAIL': {
      // River crossing at ~500 miles and ~1500 miles (2 total)
      const riverMilestones = [500, 1500];
      for (const milestone of riverMilestones) {
        if (state.milesTraveled < milestone && state.milesTraveled + 200 >= milestone) {
          return { ...state, screen: 'river' };
        }
      }

      // Valley of Despair at ~1000 miles (midpoint - 1 total)
      if (state.milesTraveled < 1000 && state.milesTraveled + 200 >= 1000) {
        return { ...state, screen: 'valley_of_despair' };
      }

      // Check for random event (35% chance)
      if (Math.random() < 0.35) {
        const event = getRandomEvent();
        return { ...state, currentEvent: event, screen: 'event' };
      }
      // Otherwise go to question
      const question = getRandomQuestion(state);
      return {
        ...state,
        currentQuestion: question,
        usedQuestions: [...state.usedQuestions, question.id],
        screen: 'question'
      };
    }

    case 'START_QUESTION': {
      const question = getRandomQuestion(state);
      return {
        ...state,
        currentQuestion: question,
        usedQuestions: [...state.usedQuestions, question.id],
        screen: 'question'
      };
    }

    case 'ANSWER_QUESTION': {
      if (!state.currentQuestion) return state;

      const q = state.currentQuestion;
      const isBest = action.answer === q.bestAnswer;
      const isGood = action.answer === q.goodAnswer;
      const quality: 'best' | 'good' | 'wrong' = isBest ? 'best' : isGood ? 'good' : 'wrong';

      let newState = {
        ...state,
        questionsAnswered: state.questionsAnswered + 1,
        lastAnswer: {
          quality,
          explanation: q.explanation,
          bestAnswer: q.bestAnswer,
          goodExplanation: q.goodExplanation,
        },
        screen: 'result' as Screen,
      };

      if (isBest) {
        // BEST answer: Full rewards (100 miles = minimum 20 questions to complete)
        newState = {
          ...newState,
          correctAnswers: state.correctAnswers + 1,
          milesTraveled: Math.min(state.totalMiles, state.milesTraveled + 100),
          morale: Math.min(100, state.morale + 10),
          sprsScore: Math.min(110, state.sprsScore + 5),
        };
      } else if (isGood) {
        // GOOD answer: Partial credit, still counts as correct
        newState = {
          ...newState,
          correctAnswers: state.correctAnswers + 1,
          milesTraveled: Math.min(state.totalMiles, state.milesTraveled + 75),
          morale: Math.min(100, state.morale + 5),
          sprsScore: Math.min(110, state.sprsScore + 2),
        };
      } else {
        // WRONG answer: Penalties
        newState = {
          ...newState,
          milesTraveled: state.milesTraveled + 25,
          morale: Math.max(0, state.morale - 15),
          sprsScore: Math.max(-203, state.sprsScore - 8),
        };

        // 50% chance of death on wrong answer
        if (Math.random() < 0.5) {
          const { party, victim } = killRandomMember(state.party);
          if (victim) {
            newState = {
              ...newState,
              party,
              lastDeath: { name: victim.name, message: getRandomDeathMessage() }
            };
          }
        }
      }

      return newState;
    }

    case 'DISMISS_RESULT': {
      // Check if we need to show death screen
      if (state.lastDeath) {
        return { ...state, screen: 'death' };
      }

      // Check game end conditions
      const endCheck = checkGameEnd(state);
      if (endCheck.ended) {
        if (endCheck.victory) {
          return { ...state, screen: 'victory', lastAnswer: null };
        } else {
          return { ...state, screen: 'gameover', gameOverReason: endCheck.reason, lastAnswer: null };
        }
      }

      return { ...state, screen: 'trail', currentQuestion: null, lastAnswer: null, animationFrame: state.animationFrame + 1 };
    }

    case 'TRIGGER_EVENT': {
      const event = getRandomEvent();
      return { ...state, currentEvent: event, screen: 'event' };
    }

    case 'DISMISS_EVENT': {
      if (!state.currentEvent) {
        return { ...state, screen: 'trail', animationFrame: state.animationFrame + 1 };
      }

      let newState = { ...state };

      switch (state.currentEvent.type) {
        case 'death': {
          const { party, victim } = killRandomMember(state.party);
          if (victim) {
            newState = {
              ...newState,
              party,
              lastDeath: { name: victim.name, message: getRandomDeathMessage() },
              screen: 'death' as Screen
            };
            return newState;
          }
          break;
        }
        case 'good':
          newState = {
            ...newState,
            morale: Math.min(100, state.morale + 15),
            sprsScore: Math.min(110, state.sprsScore + 5),
          };
          break;
        case 'bad':
          newState = {
            ...newState,
            morale: Math.max(0, state.morale - 15),
            sprsScore: Math.max(-203, state.sprsScore - 10),
          };
          break;
      }

      // After event, go to question
      const question = getRandomQuestion(newState);
      return {
        ...newState,
        currentQuestion: question,
        usedQuestions: [...newState.usedQuestions, question.id],
        currentEvent: null,
        screen: 'question'
      };
    }

    case 'SHOW_DEATH':
      return { ...state, lastDeath: { name: action.name, message: action.message }, screen: 'death' };

    case 'DISMISS_DEATH': {
      const endCheck = checkGameEnd(state);
      if (endCheck.ended) {
        if (endCheck.victory) {
          return { ...state, screen: 'victory', lastDeath: null };
        } else {
          return { ...state, screen: 'gameover', gameOverReason: endCheck.reason, lastDeath: null };
        }
      }
      return { ...state, screen: 'trail', lastDeath: null, animationFrame: state.animationFrame + 1 };
    }

    case 'REST':
      return { ...state, screen: 'resting' };

    case 'FINISH_REST': {
      const newState = {
        ...state,
        morale: Math.min(100, state.morale + 15),
        milesTraveled: state.milesTraveled + 25,
      };

      // 20% chance of event while resting
      if (Math.random() < 0.2) {
        const event = getRandomEvent();
        return { ...newState, currentEvent: event, screen: 'event' };
      }

      return { ...newState, screen: 'trail', animationFrame: state.animationFrame + 1 };
    }

    case 'HUNT_VULNERABILITIES':
      return { ...state, screen: 'hunting' };

    case 'FINISH_HUNTING': {
      const findings = Math.floor(Math.random() * 51);
      let severity: 'critical' | 'moderate' | 'low';
      let newState = { ...state, milesTraveled: state.milesTraveled + 50 };

      if (findings > 30) {
        severity = 'critical';
        newState = {
          ...newState,
          morale: Math.max(0, state.morale - 10),
          sprsScore: Math.max(-203, state.sprsScore - 15),
        };
      } else if (findings > 10) {
        severity = 'moderate';
        newState = {
          ...newState,
          sprsScore: Math.max(-203, state.sprsScore - 5),
        };
      } else {
        severity = 'low';
        newState = {
          ...newState,
          morale: Math.min(100, state.morale + 5),
          sprsScore: Math.min(110, state.sprsScore + 10),
        };
      }

      return {
        ...newState,
        huntingResult: { findings, severity },
        screen: 'trail',
        animationFrame: state.animationFrame + 1
      };
    }

    case 'CHECK_SUPPLIES':
      return { ...state, screen: 'supplies' };

    case 'CLOSE_SUPPLIES':
      return { ...state, screen: 'trail' };

    case 'GIVE_UP':
      return { ...state, screen: 'gameover', gameOverReason: "You abandoned your CMMC journey to start an organic vegetable farm in Vermont. The DoD is disappointed but respects your decision." };

    case 'GAME_OVER':
      return { ...state, screen: 'gameover', gameOverReason: action.reason };

    case 'VICTORY':
      return { ...state, screen: 'victory' };

    case 'RESTART':
      return getInitialState();

    case 'SHOW_LEADERBOARD':
      return { ...state, screen: 'leaderboard' };

    case 'CLOSE_LEADERBOARD':
      return { ...state, screen: 'title' };

    // === RIVER CROSSING ===
    case 'RIVER_CROSSING':
      return { ...state, screen: 'river' };

    case 'FORD_RIVER': {
      // 60% success, 30% lose supplies (morale), 10% death
      const roll = Math.random();
      if (roll < 0.10) {
        const { party, victim } = killRandomMember(state.party);
        if (victim) {
          return {
            ...state,
            party,
            lastDeath: { name: victim.name, message: "was swept away while fording the Legacy Systems River" },
            milesTraveled: state.milesTraveled + 50,
            screen: 'death'
          };
        }
      } else if (roll < 0.40) {
        return {
          ...state,
          morale: Math.max(0, state.morale - 25),
          sprsScore: Math.max(-203, state.sprsScore - 10),
          milesTraveled: state.milesTraveled + 50,
          screen: 'trail',
          animationFrame: state.animationFrame + 1
        };
      }
      return {
        ...state,
        milesTraveled: state.milesTraveled + 75,
        screen: 'trail',
        animationFrame: state.animationFrame + 1
      };
    }

    case 'WAIT_FOR_FERRY': {
      // Safe but slow - lose time, small morale hit
      return {
        ...state,
        milesTraveled: state.milesTraveled + 25,
        morale: Math.max(0, state.morale - 10),
        screen: 'trail',
        animationFrame: state.animationFrame + 1
      };
    }

    case 'CAULK_AND_FLOAT': {
      // Risky! 50% success, 30% lose supplies, 20% death
      const roll = Math.random();
      if (roll < 0.20) {
        const { party, victim } = killRandomMember(state.party);
        if (victim) {
          return {
            ...state,
            party,
            lastDeath: { name: victim.name, message: "drowned when the caulked server rack sank in the Legacy River" },
            milesTraveled: state.milesTraveled + 50,
            screen: 'death'
          };
        }
      } else if (roll < 0.50) {
        return {
          ...state,
          morale: Math.max(0, state.morale - 30),
          sprsScore: Math.max(-203, state.sprsScore - 15),
          milesTraveled: state.milesTraveled + 50,
          screen: 'trail',
          animationFrame: state.animationFrame + 1
        };
      }
      return {
        ...state,
        milesTraveled: state.milesTraveled + 100,
        morale: Math.min(100, state.morale + 10),
        screen: 'trail',
        animationFrame: state.animationFrame + 1
      };
    }

    // === VALLEY OF DESPAIR ===
    case 'VALLEY_OF_DESPAIR':
      return { ...state, screen: 'valley_of_despair' };

    case 'CONVINCE_LEADERSHIP': {
      if (action.success) {
        return {
          ...state,
          morale: Math.min(100, state.morale + 30),
          sprsScore: Math.min(110, state.sprsScore + 10),
          milesTraveled: state.milesTraveled + 150,
          screen: 'trail',
          animationFrame: state.animationFrame + 1
        };
      } else {
        // Failed to convince leadership
        const roll = Math.random();
        if (roll < 0.25) {
          const { party, victim } = killRandomMember(state.party);
          if (victim) {
            return {
              ...state,
              party,
              lastDeath: { name: victim.name, message: "quit in frustration after leadership denied CMMC funding... again" },
              morale: Math.max(0, state.morale - 30),
              screen: 'death'
            };
          }
        }
        return {
          ...state,
          morale: Math.max(0, state.morale - 30),
          sprsScore: Math.max(-203, state.sprsScore - 5),
          milesTraveled: state.milesTraveled + 50,
          screen: 'trail',
          animationFrame: state.animationFrame + 1
        };
      }
    }

    // === EASTER EGGS & SETTINGS ===
    case 'TOGGLE_GOD_MODE':
      return { ...state, godMode: !state.godMode };

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };

    case 'SET_PARTY_WITH_BONUS': {
      const party = action.party.map(name => ({ name, alive: true }));
      return {
        ...state,
        party,
        sprsScore: Math.min(110, Math.max(-203, state.sprsScore + action.sprsBonus)),
        screen: 'trail'
      };
    }

    default:
      return state;
  }
}
