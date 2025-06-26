"use client";

import { useState } from "react";
import { getQuizData, getQuizTitle, getQuizEmoji, type QuizType } from "@/data";
import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function StudyPage() {
  const [selectedType, setSelectedType] = useState<QuizType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<"flashcard" | "list">("flashcard");

  const studyData = selectedType ? getQuizData(selectedType) : [];

  const handleTypeSelect = (type: QuizType) => {
    setSelectedType(type);
    setCurrentIndex(0);
    setShowFlashcard(true);
    setIsFlipped(false);
    setStudyMode("flashcard");
  };

  const handleNext = () => {
    if (currentIndex < studyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const resetStudy = () => {
    setSelectedType(null);
    setCurrentIndex(0);
    setShowFlashcard(false);
    setIsFlipped(false);
    setStudyMode("flashcard");
  };

  if (!showFlashcard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              📚 学習モード
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              クイズに挑戦する前に、商品名を覚えましょう！
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div
              onClick={() => handleTypeSelect("donut")}
              className="cursor-pointer rounded-lg border-2 border-transparent bg-white p-6 shadow-lg transition-shadow hover:border-pink-300 hover:shadow-xl"
            >
              <div className="text-center">
                <div className="mb-4 text-6xl">{getQuizEmoji("donut")}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {getQuizTitle("donut")}
                </h3>
                <p className="text-sm text-gray-600">
                  ミスタードーナツの商品を学習
                </p>
              </div>
            </div>

            <div
              onClick={() => handleTypeSelect("ice")}
              className="cursor-pointer rounded-lg border-2 border-transparent bg-white p-6 shadow-lg transition-shadow hover:border-blue-300 hover:shadow-xl"
            >
              <div className="text-center">
                <div className="mb-4 text-6xl">{getQuizEmoji("ice")}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {getQuizTitle("ice")}
                </h3>
                <p className="text-sm text-gray-600">
                  サーティワンの商品を学習
                </p>
              </div>
            </div>

            <div
              onClick={() => handleTypeSelect("starbucks")}
              className="cursor-pointer rounded-lg border-2 border-transparent bg-white p-6 shadow-lg transition-shadow hover:border-green-300 hover:shadow-xl"
            >
              <div className="text-center">
                <div className="mb-4 text-6xl">{getQuizEmoji("starbucks")}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {getQuizTitle("starbucks")}
                </h3>
                <p className="text-sm text-gray-600">
                  スターバックスの商品を学習
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="outline" size="lg">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = studyData[currentIndex];

  if (!currentItem) {
    return null;
  }

  // 一覧表示モード
  if (studyMode === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              {getQuizEmoji(selectedType!)} {getQuizTitle(selectedType!)}{" "}
              一覧学習
            </h1>
            <p className="mb-4 text-gray-600">
              全 {studyData.length} 商品を一覧で確認できます
            </p>

            {/* モード切り替えボタン */}
            <div className="mb-6 flex justify-center gap-2">
              <Button
                onClick={() => setStudyMode("flashcard")}
                variant="outline"
                size="sm"
              >
                📱 フラッシュカード
              </Button>
              <Button
                onClick={() => setStudyMode("list")}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
              >
                📋 一覧表示
              </Button>
            </div>
          </div>

          {/* 商品一覧グリッド */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {studyData.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-sm leading-tight font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="mb-1 text-xs text-gray-600">
                    読み: {item.reading}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 操作ボタン */}
          <div className="flex justify-center gap-4">
            <Button onClick={resetStudy} variant="outline">
              カテゴリ選択に戻る
            </Button>

            <Link href="/game">
              <Button>クイズに挑戦！ 🎯</Button>
            </Link>

            <Link href="/">
              <Button variant="outline">ホームに戻る</Button>
            </Link>
          </div>

          {/* 学習のヒント */}
          <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="mb-2 font-semibold text-yellow-800">
              💡 一覧学習のコツ
            </h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• 似ている商品同士を比較して覚えましょう</li>
              <li>• カテゴリごとに特徴をつかみましょう</li>
              <li>• 画像と名前を関連付けて記憶しましょう</li>
              <li>• スクロールしながら全体を把握できます</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // フラッシュカードモード
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            {getQuizEmoji(selectedType!)} {getQuizTitle(selectedType!)} 学習
          </h1>
          <p className="mb-4 text-gray-600">
            {currentIndex + 1} / {studyData.length}
          </p>

          {/* モード切り替えボタン */}
          <div className="mb-4 flex justify-center gap-2">
            <Button
              onClick={() => setStudyMode("flashcard")}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
            >
              📱 フラッシュカード
            </Button>
            <Button
              onClick={() => setStudyMode("list")}
              variant="outline"
              size="sm"
            >
              📋 一覧表示
            </Button>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white p-8 shadow-xl">
          <div className="flex flex-col items-center">
            {/* フラッシュカード */}
            <div
              className={`h-96 w-full max-w-md bg-gradient-to-br ${
                isFlipped
                  ? "from-green-400 to-green-600"
                  : "from-blue-400 to-blue-600"
              } transform cursor-pointer rounded-lg shadow-lg transition-all duration-300 hover:scale-105`}
              onClick={handleFlip}
            >
              <div className="flex h-full flex-col items-center justify-center p-6 text-white">
                {!isFlipped ? (
                  // 表面：画像
                  <div className="text-center">
                    <div className="mb-4 rounded-lg bg-white p-4 shadow-lg">
                      <Image
                        src={currentItem.imageUrl}
                        alt={currentItem.name}
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <p className="mb-2 text-lg font-semibold">
                      この商品の名前は？
                    </p>
                    <p className="text-sm opacity-80">タップして答えを見る</p>
                  </div>
                ) : (
                  // 裏面：商品名と読み方
                  <div className="text-center">
                    <h3 className="mb-4 text-2xl font-bold">
                      {currentItem.name}
                    </h3>
                    <p className="mb-2 text-lg">
                      読み方: {currentItem.reading}
                    </p>
                    <p className="text-md opacity-80">
                      カテゴリ: {currentItem.category}
                    </p>
                    <p className="mt-4 text-sm opacity-60">タップで表に戻る</p>
                  </div>
                )}
              </div>
            </div>

            {/* ナビゲーションボタン */}
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
              >
                ← 前へ
              </Button>

              <Button
                onClick={handleNext}
                disabled={currentIndex === studyData.length - 1}
              >
                次へ →
              </Button>
            </div>

            {/* プログレスバー */}
            <div className="mt-6 w-full max-w-md">
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / studyData.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex justify-center gap-4">
          <Button onClick={resetStudy} variant="outline">
            カテゴリ選択に戻る
          </Button>

          <Link href="/game">
            <Button>クイズに挑戦！ 🎯</Button>
          </Link>

          <Link href="/">
            <Button variant="outline">ホームに戻る</Button>
          </Link>
        </div>

        {/* 学習のヒント */}
        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h4 className="mb-2 font-semibold text-yellow-800">💡 学習のコツ</h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• 商品画像をよく見て、特徴を覚えましょう</li>
            <li>• 読み方も一緒に覚えると、クイズで有利です</li>
            <li>• 何度も繰り返して覚えることが大切です</li>
            <li>• 全ての商品を一通り見てからクイズに挑戦しましょう</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
