"use client";

import { useState } from "react";
import { getQuizData, getQuizTitle, getQuizEmoji, type QuizItem, type QuizType } from "@/data";
import { Button } from "@/components";
import Image from "next/image";

type Difficulty = "beginner" | "intermediate" | "advanced";

type GameQuestion = QuizItem & {
  choices?: string[];
  hideIndices?: number[];
};

export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [typeSelected, setTypeSelected] = useState(false);

  const TOTAL_QUESTIONS = 5;

  const generateChoices = (correctAnswer: string, allItems: QuizItem[]) => {
    const otherItems = allItems.filter(d => d.name !== correctAnswer);
    const shuffledOthers = [...otherItems].sort(() => Math.random() - 0.5);
    const wrongChoices = shuffledOthers.slice(0, 3).map(d => d.name);
    
    const choices = [correctAnswer, ...wrongChoices];
    return choices.sort(() => Math.random() - 0.5);
  };

  const generateHidePattern = (text: string) => {
    const chars = text.split('');
    const hideCount = Math.ceil(chars.length * 0.4); // 40%の文字を隠す
    const hideIndices: number[] = [];
    
    while (hideIndices.length < hideCount) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      if (!hideIndices.includes(randomIndex) && chars[randomIndex] !== ' ') {
        hideIndices.push(randomIndex);
      }
    }
    
    return hideIndices.sort((a, b) => a - b);
  };

  const generateQuestions = (selectedDifficulty: Difficulty) => {
    if (!quizType) return;
    
    const quizData = getQuizData(quizType);
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, TOTAL_QUESTIONS);
    
    const questions: GameQuestion[] = selectedItems.map(item => {
      const question: GameQuestion = { ...item };
      
      if (selectedDifficulty === "beginner") {
        question.choices = generateChoices(item.name, quizData);
      } else if (selectedDifficulty === "intermediate") {
        question.hideIndices = generateHidePattern(item.name);
      }
      
      return question;
    });
    
    setGameQuestions(questions);
    setDifficulty(selectedDifficulty);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(true);
    setShowAnswer(false);
    setUserAnswer("");
    setSelectedChoice("");
  };

  const handleSubmit = () => {
    const currentItem = gameQuestions[currentQuestion];
    if (!currentItem) return;

    let correct = false;
    
    if (difficulty === "beginner") {
      correct = selectedChoice === currentItem.name;
    } else {
      const userInput = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
      const itemName = currentItem.name.toLowerCase().replace(/\s+/g, '');
      const itemReading = currentItem.reading.toLowerCase().replace(/\s+/g, '');
      
      correct = userInput === itemName || userInput === itemReading;
    }

    setIsCorrect(correct);
    setShowAnswer(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setSelectedChoice("");
      setShowAnswer(false);
      setIsCorrect(false);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer("");
    setSelectedChoice("");
    setShowAnswer(false);
    setIsCorrect(false);
    setDifficulty(null);
    setTypeSelected(false);
    setQuizType(null);
  };

  const renderHiddenText = (text: string, hideIndices: number[]) => {
    return text.split('').map((char, index) => {
      if (hideIndices.includes(index)) {
        return <span key={index} className="bg-gray-300 text-gray-300 select-none">●</span>;
      }
      return <span key={index}>{char}</span>;
    });
  };

  const canSubmit = () => {
    if (difficulty === "beginner") {
      return selectedChoice.trim() !== "";
    }
    return userAnswer.trim() !== "";
  };

  if (!typeSelected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-orange-800">
            🎯 クイズゲーム
          </h1>
          <p className="mb-8 text-lg text-orange-700">
            どちらのクイズに挑戦しますか？
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* ドーナツクイズ */}
            <div className="rounded-lg bg-white p-8 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 text-6xl">🍩</div>
              <h3 className="mb-4 text-2xl font-bold text-orange-600">ドーナツクイズ</h3>
              <p className="mb-6 text-gray-600">
                ミスタードーナツの商品名を当てるクイズです。<br />
                美味しそうなドーナツの写真を見て名前を答えましょう！
              </p>
              <Button
                onClick={() => {
                  setQuizType("donut");
                  setTypeSelected(true);
                }}
                className="w-full bg-orange-500 py-3 text-white hover:bg-orange-600"
              >
                ドーナツクイズを選択
              </Button>
            </div>

            {/* アイスクリームクイズ */}
            <div className="rounded-lg bg-white p-8 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 text-6xl">🍦</div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600">アイスクリームクイズ</h3>
              <p className="mb-6 text-gray-600">
                サーティワンアイスクリームのフレーバー名を当てるクイズです。<br />
                カラフルなアイスクリームの写真を見て名前を答えましょう！
              </p>
              <Button
                onClick={() => {
                  setQuizType("ice");
                  setTypeSelected(true);
                }}
                className="w-full bg-blue-500 py-3 text-white hover:bg-blue-600"
              >
                アイスクリームクイズを選択
              </Button>
            </div>

            {/* スターバックスクイズ */}
            <div className="rounded-lg bg-white p-8 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 text-6xl">☕</div>
              <h3 className="mb-4 text-2xl font-bold text-green-600">スターバックスクイズ</h3>
              <p className="mb-6 text-gray-600">
                スターバックスのドリンク名を当てるクイズです。<br />
                美味しそうなコーヒーの写真を見て名前を答えましょう！
              </p>
              <Button
                onClick={() => {
                  setQuizType("starbucks");
                  setTypeSelected(true);
                }}
                className="w-full bg-green-500 py-3 text-white hover:bg-green-600"
              >
                スターバックスクイズを選択
              </Button>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-orange-800">
              ゲームについて
            </h2>
            <ul className="space-y-2 text-left text-orange-700">
              <li>• 3つのクイズから選択できます</li>
              <li>• 初級：4択問題</li>
              <li>• 中級：一部文字がヒント表示</li>
              <li>• 上級：完全記述問題</li>
              <li>• 各クイズ{TOTAL_QUESTIONS}問出題されます</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-orange-800">
            {getQuizEmoji(quizType!)} {getQuizTitle(quizType!)}名前当てクイズ
          </h1>
          <p className="mb-8 text-lg text-orange-700">
            難易度を選択してゲームを開始しましょう！
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* 初級 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl">🟢</div>
              <h3 className="mb-3 text-xl font-bold text-green-600">初級</h3>
              <p className="mb-4 text-sm text-gray-600">
                4択の選択肢から正解を選んでください
              </p>
              <ul className="mb-6 space-y-1 text-left text-sm text-gray-600">
                <li>• 4つの選択肢から選択</li>
                <li>• 正解率が高い</li>
                <li>• 初心者におすすめ</li>
              </ul>
              <Button
                onClick={() => generateQuestions("beginner")}
                className="w-full bg-green-500 py-3 text-white hover:bg-green-600"
              >
                初級で開始
              </Button>
            </div>

            {/* 中級 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl">🟡</div>
              <h3 className="mb-3 text-xl font-bold text-yellow-600">中級</h3>
              <p className="mb-4 text-sm text-gray-600">
                一部が隠された文字を見て名前を入力
              </p>
              <ul className="mb-6 space-y-1 text-left text-sm text-gray-600">
                <li>• 文字の一部がヒント表示</li>
                <li>• 適度な難易度</li>
                <li>• バランスの良い挑戦</li>
              </ul>
              <Button
                onClick={() => generateQuestions("intermediate")}
                className="w-full bg-yellow-500 py-3 text-white hover:bg-yellow-600"
              >
                中級で開始
              </Button>
            </div>

            {/* 上級 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-3xl">🔴</div>
              <h3 className="mb-3 text-xl font-bold text-red-600">上級</h3>
              <p className="mb-4 text-sm text-gray-600">
                画像だけを見て名前を完全入力
              </p>
              <ul className="mb-6 space-y-1 text-left text-sm text-gray-600">
                <li>• ヒントなしで完全入力</li>
                <li>• 最高難易度</li>
                <li>• 上級者向け</li>
              </ul>
              <Button
                onClick={() => generateQuestions("advanced")}
                className="w-full bg-red-500 py-3 text-white hover:bg-red-600"
              >
                上級で開始
              </Button>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-orange-800">
              ゲームルール
            </h2>
            <ul className="space-y-2 text-left text-orange-700">
              <li>• 全{TOTAL_QUESTIONS}問出題されます</li>
              <li>• 各問題で{getQuizTitle(quizType!)}の画像が表示されます</li>
              <li>• 難易度により回答方法が変わります</li>
              <li>• ひらがなの読み方でも正解になります（中級・上級）</li>
              <li>• 最後に正解数が表示されます</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <Button
              onClick={() => setTypeSelected(false)}
              variant="outline"
              className="border-orange-500 px-6 py-2 text-orange-500 hover:bg-orange-50"
            >
              ← クイズ選択に戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-orange-800">
            🎉 ゲーム終了！
          </h1>
          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-bold text-orange-800">
              結果発表
            </h2>
            <div className="mb-4 text-6xl font-bold text-orange-600">
              {score} / {TOTAL_QUESTIONS}
            </div>
            <p className="mb-6 text-xl text-orange-700">
              {score === TOTAL_QUESTIONS
                ? "🏆 パーフェクト！すごい！"
                : score >= TOTAL_QUESTIONS * 0.8
                  ? "😊 とても良くできました！"
                  : score >= TOTAL_QUESTIONS * 0.6
                    ? "👍 まずまずですね！"
                    : "📚 もう少し勉強が必要かも？"}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => difficulty && generateQuestions(difficulty)}
                className="bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
              >
                もう一度プレイ
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-orange-500 px-6 py-2 text-orange-500 hover:bg-orange-50"
              >
                クイズ選択に戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = gameQuestions[currentQuestion];

  if (!currentItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-800">{getQuizTitle(quizType!)}クイズ</h1>
            <div className="text-sm text-orange-600">
              {difficulty === "beginner" && "🟢 初級モード"}
              {difficulty === "intermediate" && "🟡 中級モード"}
              {difficulty === "advanced" && "🔴 上級モード"}
            </div>
          </div>
          <div className="text-orange-700">
            問題 {currentQuestion + 1} / {TOTAL_QUESTIONS}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-xl font-semibold text-orange-800">
              {difficulty === "beginner" 
                ? `この${getQuizTitle(quizType!)}の名前は？（4択）`
                : difficulty === "intermediate"
                ? `この${getQuizTitle(quizType!)}の名前は？（穴あきヒント）`
                : `この${getQuizTitle(quizType!)}の名前は？`}
            </h2>
            <div className="relative mx-auto mb-6 h-64 w-64">
              <Image
                src={currentItem.imageUrl}
                alt={getQuizTitle(quizType!)}
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
            
            {/* 中級用のヒント表示 */}
            {difficulty === "intermediate" && currentItem.hideIndices && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-4">
                <p className="mb-2 text-sm text-yellow-700">ヒント:</p>
                <div className="text-2xl font-mono font-bold text-yellow-800">
                  {renderHiddenText(currentItem.name, currentItem.hideIndices)}
                </div>
              </div>
            )}
          </div>

          {!showAnswer ? (
            <div className="space-y-4">
              {/* 初級：選択肢 */}
              {difficulty === "beginner" && currentItem.choices && (
                <div className="space-y-3">
                  {currentItem.choices.map((choice: string, index: number) => (
                    <label
                      key={index}
                      className={`block cursor-pointer rounded-lg border-2 p-3 text-left transition-colors ${
                        selectedChoice === choice
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="donut-choice"
                        value={choice}
                        checked={selectedChoice === choice}
                        onChange={(e) => setSelectedChoice(e.target.value)}
                        className="mr-3"
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              )}
              
              {/* 中級・上級：テキスト入力 */}
              {(difficulty === "intermediate" || difficulty === "advanced") && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={
                    difficulty === "intermediate"
                      ? "ヒントを参考に名前を入力してください"
                      : `${getQuizTitle(quizType!)}の名前を入力してください（ひらがなでもOK！）`
                  }
                  className="w-full rounded-lg border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  onKeyPress={(e) =>
                    e.key === "Enter" && canSubmit() && handleSubmit()
                  }
                />
              )}
              
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className="w-full bg-orange-500 py-3 text-white hover:bg-orange-600 disabled:bg-gray-300"
              >
                答える
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`rounded-lg p-4 text-center ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                <div className="mb-2 text-2xl font-bold">
                  {isCorrect ? "🎉 正解！" : "❌ 不正解"}
                </div>
                <div className="text-lg">
                  正解:{" "}
                  <span className="font-semibold">{currentItem.name}</span>
                </div>
                {!isCorrect && (
                  <div className="mt-2 text-sm">
                    あなたの答え:{" "}
                    <span className="font-semibold">
                      {difficulty === "beginner" ? selectedChoice : userAnswer}
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleNext}
                className="w-full bg-orange-500 py-3 text-white hover:bg-orange-600"
              >
                {currentQuestion < TOTAL_QUESTIONS - 1
                  ? "次の問題へ"
                  : "結果を見る"}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-orange-700">
          現在のスコア: {score} / {currentQuestion + (showAnswer ? 1 : 0)}
        </div>
      </div>
    </div>
  );
}
