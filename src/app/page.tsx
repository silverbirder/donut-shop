import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-5xl font-bold text-orange-800">
            商品クイズゲーム
          </h1>
          <p className="mb-8 text-xl text-orange-700">
            様々な商品の名前を当てるクイズゲームに挑戦しよう！
          </p>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-orange-800">
              商品クイズに挑戦！
            </h2>
            <p className="mb-6 text-orange-700">
              ドーナツ🍩、アイスクリーム🍦、スターバックス商品☕の画像を見て、正しい商品名を当てるクイズゲームです。
            </p>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-orange-50 p-4">
                <div className="mb-2 text-3xl">🍩</div>
                <div className="font-semibold text-orange-800">ドーナツ</div>
                <div className="text-sm text-orange-600">
                  ミスタードーナツの商品
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="mb-2 text-3xl">🍦</div>
                <div className="font-semibold text-blue-800">
                  アイスクリーム
                </div>
                <div className="text-sm text-blue-600">
                  サーティワンアイスクリームの商品
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-2 text-3xl">☕</div>
                <div className="font-semibold text-green-800">
                  スターバックス
                </div>
                <div className="text-sm text-green-600">コーヒーやドリンク</div>
              </div>
            </div>
            <Link href="/game">
              <Button className="transform bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-lg text-white transition-all hover:scale-105 hover:from-orange-600 hover:to-pink-600">
                🎮 クイズに挑戦する！
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
