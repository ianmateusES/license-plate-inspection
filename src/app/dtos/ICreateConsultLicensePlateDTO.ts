interface ICreateConsultLicensePlateDTO {
  plate?: string;
  image_name?: string;
  date_hour?: string;
  external_pagazul_id?: string;
  message_error?: string;
  camera_id?: string;
  latitude?: number;
  longitude?: number;
}

export { ICreateConsultLicensePlateDTO };
