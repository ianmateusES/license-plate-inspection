interface IDetection {
  car: {
    confidence: number;
    warpedBox: number[];
  };
  confidences: number[];
  text: string;
  warpedBox: number[];
}

interface IResponseUltimateAlprAPIDTO {
  duration: number;
  frame_id: number;
  plates: IDetection[];
}

export { IResponseUltimateAlprAPIDTO };
