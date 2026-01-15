import { Question, GameEvent, CMMC_QUESTIONS, RANDOM_EVENTS, DEATH_MESSAGES, DEFAULT_PARTY } from './gameData';

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
  | 'gameover'
  | 'victory'
  | 'leaderboard';

export interface PartyMember {
  name: string;
  alive: boolean;
}

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
  currentQuestion: Question | null;
  currentEvent: GameEvent | null;
  lastAnswer: { correct: boolean; explanation: string; answer: string } | null;
  lastDeath: { name: string; message: string } | null;
  huntingResult: { findings: number; severity: 'critical' | 'moderate' | 'low' } | null;
  gameOverReason: string;
  animationFrame: number;
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
  | { type: 'CLOSE_LEADERBOARD' };

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
  };
}

function getRandomQuestion(state: GameState): Question {
  const available = CMMC_QUESTIONS.filter(q => !state.usedQuestions.includes(q.id));
  if (available.length === 0) {
    // Reset used questions if all have been used
    return CMMC_QUESTIONS[Math.floor(Math.random() * CMMC_QUESTIONS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
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

      const correct = action.answer === state.currentQuestion.answer;
      let newState = {
        ...state,
        questionsAnswered: state.questionsAnswered + 1,
        lastAnswer: {
          correct,
          explanation: state.currentQuestion.explanation,
          answer: state.currentQuestion.answer
        },
        screen: 'result' as Screen,
      };

      if (correct) {
        newState = {
          ...newState,
          correctAnswers: state.correctAnswers + 1,
          milesTraveled: Math.min(state.totalMiles, state.milesTraveled + 200),
          morale: Math.min(100, state.morale + 10),
          sprsScore: Math.min(110, state.sprsScore + 5),
        };
      } else {
        newState = {
          ...newState,
          milesTraveled: state.milesTraveled + 50,
          morale: Math.max(0, state.morale - 20),
          sprsScore: Math.max(-203, state.sprsScore - 10),
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

    default:
      return state;
  }
}
