interface IFilterLicensePlateEventDTO {
  plates?: string[];
  pagazul_status?: string;
  pagazul_expired?: string;
  camera_ids?: string[];
  external_pagazul_id?: string;
}

export { IFilterLicensePlateEventDTO };
