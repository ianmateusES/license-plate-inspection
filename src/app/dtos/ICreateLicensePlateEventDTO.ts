interface ICreateLicensePlateEventDTO {
  plate: string;
  image_name: string;
  label?: string;
  date_hour?: string;
  bound_box?: string;
  external_pagazul_id?: string;
  message_error?: string;
  camera_id?: string;
  latitude?: number;
  longitude?: number;
}

export { ICreateLicensePlateEventDTO };
