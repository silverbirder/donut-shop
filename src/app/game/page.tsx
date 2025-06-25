"use client";

import { useState } from "react";
import { donuts } from "@/data";
import { Button } from "@/components";
import Image from "next/image";

export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameQuestions, setGameQuestions] = useState<typeof donuts>([]);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const TOTAL_QUESTIONS = 5;

  const generateQuestions = () => {
    const shuffled = [...donuts].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(true);
    setShowAnswer(false);
    setUserAnswer("");
  };

  const handleSubmit = () => {
    const currentDonut = gameQuestions[currentQuestion];
    if (!currentDonut) return;

    const userInput = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
    const donutName = currentDonut.name.toLowerCase().replace(/\s+/g, '');
    const donutReading = currentDonut.reading.toLowerCase().replace(/\s+/g, '');
    
    const correct = 
      userInput === donutName || 
      userInput === donutReading;

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
    setShowAnswer(false);
    setIsCorrect(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-orange-800">
            🍩 ドーナツ名前当てクイズ
          </h1>
          <p className="mb-8 text-lg text-orange-700">
            表示されるドーナツの画像を見て、正しい名前を入力してください！
          </p>
          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-orange-800">
              ゲームルール
            </h2>
            <ul className="space-y-2 text-left text-orange-700">
              <li>• 全{TOTAL_QUESTIONS}問出題されます</li>
              <li>• 各問題でドーナツの画像が表示されます</li>
              <li>• 正しいドーナツの名前を入力してください</li>
              <li>• ひらがなの読み方でも正解になります</li>
              <li>• 「ポン・デ・リング」→「ぽんでりんぐ」でもOK！</li>
              <li>• 最後に正解数が表示されます</li>
            </ul>
          </div>
          <Button
            onClick={generateQuestions}
            className="bg-orange-500 px-8 py-3 text-lg text-white hover:bg-orange-600"
          >
            ゲームスタート！
          </Button>
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
                onClick={generateQuestions}
                className="bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
              >
                もう一度プレイ
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-orange-500 px-6 py-2 text-orange-500 hover:bg-orange-50"
              >
                トップに戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentDonut = gameQuestions[currentQuestion];

  if (!currentDonut) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-800">ドーナツクイズ</h1>
          <div className="text-orange-700">
            問題 {currentQuestion + 1} / {TOTAL_QUESTIONS}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-xl font-semibold text-orange-800">
              このドーナツの名前は？
            </h2>
            <div className="relative mx-auto mb-6 h-64 w-64">
              <Image
                src={currentDonut.imageUrl}
                alt="ドーナツ"
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>

          {!showAnswer ? (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="ドーナツの名前を入力してください（ひらがなでもOK！）"
                className="w-full rounded-lg border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                onKeyPress={(e) =>
                  e.key === "Enter" && userAnswer.trim() && handleSubmit()
                }
              />
              <Button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full bg-orange-500 py-3 text-white hover:bg-orange-600"
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
                  <span className="font-semibold">{currentDonut.name}</span>
                </div>
                {!isCorrect && (
                  <div className="mt-2 text-sm">
                    あなたの答え:{" "}
                    <span className="font-semibold">{userAnswer}</span>
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
