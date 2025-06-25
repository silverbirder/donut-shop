import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-5xl font-bold text-orange-800">
            🍩 ドーナツショップ
          </h1>
          <p className="mb-8 text-xl text-orange-700">
            美味しいドーナツの世界へようこそ！
          </p>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold text-orange-800">
              ゲームで遊ぼう！
            </h2>
            <p className="mb-6 text-orange-700">
              ドーナツの画像を見て、正しい名前を当てるクイズゲームです。
            </p>
            <Link href="/game">
              <Button className="bg-orange-500 px-8 py-3 text-lg text-white hover:bg-orange-600">
                🎮 ドーナツクイズに挑戦！
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
