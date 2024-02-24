interface ICreatePagazulDTO {
  status: boolean;
  expired: boolean;
  date: string;
  external_license_plate_event_id?: string;
  external_consult_license_plate_id?: string;
  message?: string;
  data?: {
    rule: {
      value: number;
      name: string;
    };
    vehicle: {
      category: string;
      brand: string;
      model: string;
    };
    location: {
      city: string;
      state: string;
      address: string;
      lat: string;
      lng: string;
    };
    cad: {
      created_at: string;
      actived_at: string;
      expired_at: string;
    };
  };
}

export { ICreatePagazulDTO };
