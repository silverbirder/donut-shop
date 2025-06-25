export * from "./donut.data";
export * from "./ice.data";

import { donuts } from "./donut.data";
import { iceCreams } from "./ice.data";

export type QuizItem = {
  name: string;
  reading: string;
  category: string;
  imageUrl: string;
};

export type QuizType = "donut" | "ice";

export const getQuizData = (type: QuizType): QuizItem[] => {
  if (type === "donut") {
    return donuts;
  } else {
    return iceCreams;
  }
};

export const getQuizTitle = (type: QuizType): string => {
  return type === "donut" ? "ドーナツ" : "アイスクリーム";
};

export const getQuizEmoji = (type: QuizType): string => {
  return type === "donut" ? "🍩" : "🍦";
};
