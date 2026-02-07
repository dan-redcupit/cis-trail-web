'use client';

import { useReducer, useCallback, useState, useEffect } from 'react';
import { gameReducer, getInitialState, Difficulty } from '@/lib/gameState';
import * as sounds from '@/lib/sounds';
import TitleScreen from '@/components/TitleScreen';
import IntroScreen from '@/components/IntroScreen';
import PartySelect from '@/components/PartySelect';
import TrailScreen from '@/components/TrailScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';
import EventScreen from '@/components/EventScreen';
import DeathScreen from '@/components/DeathScreen';
import SuppliesScreen from '@/components/SuppliesScreen';
import RestingScreen from '@/components/RestingScreen';
import HuntingScreen from '@/components/HuntingScreen';
import GameOverScreen from '@/components/GameOverScreen';
import VictoryScreen from '@/components/VictoryScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import NameEntryModal from '@/components/NameEntryModal';
import RiverCrossingScreen from '@/components/RiverCrossingScreen';
import ValleyOfDespairScreen from '@/components/ValleyOfDespairScreen';
import SupplyStoreScreen from '@/components/SupplyStoreScreen';
import AchievementsScreen from '@/components/AchievementsScreen';
import { StoreItem } from '@/lib/gameState';
import { unlockAchievement } from '@/lib/achievements';

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());
  const [showNameEntry, setShowNameEntry] = useState(false);

  const handleTitleContinue = useCallback(() => {
    sounds.playStart();
    dispatch({ type: 'START_GAME' });
  }, []);

  const handleLeaderboard = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'SHOW_LEADERBOARD' });
  }, []);

  const handleCloseLeaderboard = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CLOSE_LEADERBOARD' });
  }, []);

  const handleAchievements = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'SHOW_ACHIEVEMENTS' });
  }, []);

  const handleCloseAchievements = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CLOSE_ACHIEVEMENTS' });
  }, []);

  const handleGodMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_GOD_MODE' });
  }, []);

  const handleSetDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty });
  }, []);

  const handleIntroContinue = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'SHOW_PARTY_SELECT' });
  }, []);

  const handlePartySubmit = useCallback((party: string[]) => {
    sounds.playSelect();
    dispatch({ type: 'SET_PARTY', party });
  }, []);

  const handlePartySubmitWithBonus = useCallback((party: string[], moraleBonus: number) => {
    sounds.playSelect();
    dispatch({ type: 'SET_PARTY_WITH_BONUS', party, moraleBonus });
  }, []);

  const handleContinueTrail = useCallback(() => {
    sounds.playWagonMove();
    dispatch({ type: 'CONTINUE_TRAIL' });
  }, []);

  const handleRest = useCallback(() => {
    sounds.playRest();
    dispatch({ type: 'REST' });
  }, []);

  const handleFinishRest = useCallback(() => {
    dispatch({ type: 'FINISH_REST' });
  }, []);

  const handleHunt = useCallback(() => {
    sounds.playScanning();
    dispatch({ type: 'HUNT_VULNERABILITIES' });
  }, []);

  const handleFinishHunting = useCallback(() => {
    dispatch({ type: 'FINISH_HUNTING' });
  }, []);

  const handleSupplies = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CHECK_SUPPLIES' });
  }, []);

  const handleCloseSupplies = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CLOSE_SUPPLIES' });
  }, []);

  const handleGiveUp = useCallback(() => {
    sounds.playGameOver();
    dispatch({ type: 'GIVE_UP' });
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    sounds.playSelect();
    dispatch({ type: 'ANSWER_QUESTION', answer });
  }, []);

  const handleDismissResult = useCallback(() => {
    if (state.lastAnswer?.quality === 'best') {
      sounds.playCorrect();
    } else if (state.lastAnswer?.quality === 'good') {
      sounds.playSelect();
    } else {
      sounds.playWrong();
    }
    dispatch({ type: 'DISMISS_RESULT' });
  }, [state.lastAnswer]);

  const handleDismissEvent = useCallback(() => {
    if (state.currentEvent?.type === 'good') {
      sounds.playGoodEvent();
    } else if (state.currentEvent?.type === 'bad') {
      sounds.playBadEvent();
    } else if (state.currentEvent?.type === 'death') {
      sounds.playDysentery();
    }
    dispatch({ type: 'DISMISS_EVENT' });
  }, [state.currentEvent]);

  const handleDismissDeath = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'DISMISS_DEATH' });
  }, []);

  const handleRestart = useCallback(() => {
    sounds.playStart();
    setShowNameEntry(false);
    dispatch({ type: 'RESTART' });
  }, []);

  const handleShowNameEntry = useCallback(() => {
    setShowNameEntry(true);
  }, []);

  const handleNameSubmit = useCallback(() => {
    setShowNameEntry(false);
  }, []);

  const handleNameSkip = useCallback(() => {
    setShowNameEntry(false);
  }, []);

  // River crossing handlers
  const handleFordRiver = useCallback(() => {
    sounds.playWagonMove();
    dispatch({ type: 'FORD_RIVER' });
  }, []);

  const handleWaitFerry = useCallback(() => {
    sounds.playRest();
    dispatch({ type: 'WAIT_FOR_FERRY' });
  }, []);

  const handleCaulkFloat = useCallback(() => {
    sounds.playScanning();
    dispatch({ type: 'CAULK_AND_FLOAT' });
  }, []);

  // Valley of Despair handler
  const handleConvinceLeadership = useCallback((success: boolean) => {
    if (success) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
    dispatch({ type: 'CONVINCE_LEADERSHIP', success });
  }, []);

  // Supply Store handlers
  const handleBuyItem = useCallback((item: StoreItem) => {
    dispatch({ type: 'BUY_ITEM', item });
  }, []);

  const handleLeaveStore = useCallback(() => {
    sounds.playWagonMove();
    dispatch({ type: 'LEAVE_STORE' });
  }, []);

  const handleFireTank = useCallback(() => {
    dispatch({ type: 'FIRE_TANK' });
  }, []);

  // Calculate accuracy for leaderboard
  const accuracy = state.questionsAnswered > 0
    ? Math.round((state.correctAnswers / state.questionsAnswered) * 100)
    : 0;
  const survivors = state.party.filter(m => m.alive).length;

  // Achievement tracking
  useEffect(() => {
    // Konami code achievement
    if (state.godMode) {
      unlockAchievement('konami');
    }

    // Perfect 10 achievement (10 correct in a row)
    if (state.consecutiveCorrect >= 10) {
      unlockAchievement('perfect_10');
    }

    // First blood achievement
    if (state.totalDeaths >= 1) {
      unlockAchievement('first_blood');
    }

    // Tank commander achievement
    if (state.tankFireCount >= 10) {
      unlockAchievement('tank_commander');
    }

    // Shopaholic achievement
    if (state.itemsBought >= 5) {
      unlockAchievement('shopaholic');
    }

    // Secret name achievement
    if (state.secretNameUsed) {
      unlockAchievement('secret_name');
    }

    // Completionist achievement (seen all 50 questions)
    if (state.usedQuestions.length >= 50) {
      unlockAchievement('completionist');
    }
  }, [state.godMode, state.consecutiveCorrect, state.totalDeaths, state.tankFireCount, state.itemsBought, state.secretNameUsed, state.usedQuestions.length]);

  // Victory/game over achievement tracking
  useEffect(() => {
    if (state.screen === 'victory') {
      unlockAchievement('first_win');

      // Difficulty-based achievements
      if (state.difficulty === 'easy') unlockAchievement('easy_win');
      if (state.difficulty === 'normal') unlockAchievement('normal_win');
      if (state.difficulty === 'hard') unlockAchievement('hard_win');
      if (state.difficulty === 'nightmare') unlockAchievement('nightmare_win');

      // Perfect run
      const allSurvived = state.party.every(m => m.alive);
      if (allSurvived && accuracy === 100) {
        unlockAchievement('perfect_run');
      }

      // Intern's Revenge
      const livingMembers = state.party.filter(m => m.alive);
      if (livingMembers.length === 1 &&
          (livingMembers[0].name.toLowerCase().includes('intern') || livingMembers[0].name === 'The Intern (unnamed)')) {
        unlockAchievement('intern_revenge');
      }

      // Solo survivor
      if (livingMembers.length === 1) {
        unlockAchievement('solo_survivor');
      }

      // Against all odds
      if (state.morale < 25) {
        unlockAchievement('against_all_odds');
      }

      // Speed runner
      if (state.questionsAnswered < 35) {
        unlockAchievement('speed_runner');
      }
    }

    if (state.screen === 'gameover') {
      // Total party kill
      const allDead = state.party.every(m => !m.alive);
      if (allDead) {
        unlockAchievement('total_party_kill');
      }
    }
  }, [state.screen, state.difficulty, state.party, accuracy, state.morale, state.questionsAnswered]);

  // Render current screen
  switch (state.screen) {
    case 'title':
      return (
        <TitleScreen
          onContinue={handleTitleContinue}
          onLeaderboard={handleLeaderboard}
          onAchievements={handleAchievements}
          onGodMode={handleGodMode}
          onSetDifficulty={handleSetDifficulty}
          godMode={state.godMode}
          difficulty={state.difficulty}
        />
      );

    case 'leaderboard':
      return <LeaderboardScreen onClose={handleCloseLeaderboard} />;

    case 'achievements':
      return <AchievementsScreen onClose={handleCloseAchievements} />;

    case 'intro':
      return <IntroScreen onContinue={handleIntroContinue} />;

    case 'party':
      return <PartySelect onSubmit={handlePartySubmit} onSubmitWithBonus={handlePartySubmitWithBonus} />;

    case 'trail':
      return (
        <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
          onFireTank={handleFireTank}
        />
      );

    case 'question':
      if (!state.currentQuestion) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
          onFireTank={handleFireTank}
        />;
      }
      return (
        <QuestionScreen
          question={state.currentQuestion}
          onAnswer={handleAnswer}
        />
      );

    case 'result':
      if (!state.lastAnswer) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
          onFireTank={handleFireTank}
        />;
      }
      return (
        <ResultScreen
          quality={state.lastAnswer.quality}
          explanation={state.lastAnswer.explanation}
          bestAnswer={state.lastAnswer.bestAnswer}
          goodExplanation={state.lastAnswer.goodExplanation}
          onContinue={handleDismissResult}
        />
      );

    case 'event':
      if (!state.currentEvent) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
          onFireTank={handleFireTank}
        />;
      }
      return (
        <EventScreen
          event={state.currentEvent}
          onContinue={handleDismissEvent}
        />
      );

    case 'death':
      if (!state.lastDeath) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
          onFireTank={handleFireTank}
        />;
      }
      return (
        <DeathScreen
          name={state.lastDeath.name}
          message={state.lastDeath.message}
          onContinue={handleDismissDeath}
        />
      );

    case 'supplies':
      return <SuppliesScreen onClose={handleCloseSupplies} />;

    case 'resting':
      return <RestingScreen onFinish={handleFinishRest} />;

    case 'hunting':
      return <HuntingScreen onFinish={handleFinishHunting} />;

    case 'river':
      return (
        <RiverCrossingScreen
          onFord={handleFordRiver}
          onWait={handleWaitFerry}
          onCaulk={handleCaulkFloat}
        />
      );

    case 'valley_of_despair':
      return (
        <ValleyOfDespairScreen onConvince={handleConvinceLeadership} />
      );

    case 'store':
      return (
        <SupplyStoreScreen
          morale={state.morale}
          deathShield={state.deathShield}
          onBuyItem={handleBuyItem}
          onLeave={handleLeaveStore}
        />
      );

    case 'gameover':
      return (
        <>
          {showNameEntry && (
            <NameEntryModal
              score={state.milesTraveled}
              accuracy={accuracy}
              survivors={survivors}
              won={false}
              onSubmit={handleNameSubmit}
              onSkip={handleNameSkip}
            />
          )}
          <GameOverScreen
            state={state}
            onRestart={handleRestart}
            onSubmitScore={handleShowNameEntry}
          />
        </>
      );

    case 'victory':
      return (
        <>
          {showNameEntry && (
            <NameEntryModal
              score={state.milesTraveled}
              accuracy={accuracy}
              survivors={survivors}
              won={true}
              onSubmit={handleNameSubmit}
              onSkip={handleNameSkip}
            />
          )}
          <VictoryScreen
            state={state}
            onRestart={handleRestart}
            onSubmitScore={handleShowNameEntry}
          />
        </>
      );

    default:
      return (
        <TitleScreen
          onContinue={handleTitleContinue}
          onLeaderboard={handleLeaderboard}
          onAchievements={handleAchievements}
          onGodMode={handleGodMode}
          onSetDifficulty={handleSetDifficulty}
          godMode={state.godMode}
          difficulty={state.difficulty}
        />
      );
  }
}
