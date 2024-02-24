interface IDetection {
  car: {
    confidence: number;
    warpedBox: number[];
  };
  confidences: number[];
  text: string;
  warpedBox: number[];
}

interface ICreateUltimateAlprDTO {
  detections: IDetection[];
  external_license_plate_event_id?: string;
  external_consult_license_plate_id?: string;
}

export { ICreateUltimateAlprDTO };
