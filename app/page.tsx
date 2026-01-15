'use client';

import { useReducer, useCallback, useState } from 'react';
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

  const handlePartySubmitWithBonus = useCallback((party: string[], sprsBonus: number) => {
    sounds.playSelect();
    dispatch({ type: 'SET_PARTY_WITH_BONUS', party, sprsBonus });
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

  // Calculate accuracy for leaderboard
  const accuracy = state.questionsAnswered > 0
    ? Math.round((state.correctAnswers / state.questionsAnswered) * 100)
    : 0;
  const survivors = state.party.filter(m => m.alive).length;

  // Render current screen
  switch (state.screen) {
    case 'title':
      return (
        <TitleScreen
          onContinue={handleTitleContinue}
          onLeaderboard={handleLeaderboard}
          onGodMode={handleGodMode}
          onSetDifficulty={handleSetDifficulty}
          godMode={state.godMode}
          difficulty={state.difficulty}
        />
      );

    case 'leaderboard':
      return <LeaderboardScreen onClose={handleCloseLeaderboard} />;

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
          onGodMode={handleGodMode}
          onSetDifficulty={handleSetDifficulty}
          godMode={state.godMode}
          difficulty={state.difficulty}
        />
      );
  }
}
