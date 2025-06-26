export * from "./donut.data";
export * from "./ice.data";
export * from "./starbucks.data";

import { donuts } from "./donut.data";
import { iceCreams } from "./ice.data";
import { starbucks } from "./starbucks.data";

export type QuizItem = {
  name: string;
  reading: string;
  category: string;
  imageUrl: string;
};

export type QuizType = "donut" | "ice" | "starbucks";

export const getQuizData = (type: QuizType): QuizItem[] => {
  if (type === "donut") {
    return donuts;
  } else if (type === "ice") {
    return iceCreams;
  } else {
    return starbucks;
  }
};

export const getQuizTitle = (type: QuizType): string => {
  if (type === "donut") {
    return "ドーナツ";
  } else if (type === "ice") {
    return "アイスクリーム";
  } else {
    return "スターバックス";
  }
};

export const getQuizEmoji = (type: QuizType): string => {
  if (type === "donut") {
    return "🍩";
  } else if (type === "ice") {
    return "🍦";
  } else {
    return "☕";
  }
};
