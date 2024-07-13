// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT

export interface Patient {
  Additional_Info: string;
  id: number;
  name: string;
  phone_number: string;
  created_at: Date;
  LastEdited: Date;
  description: string;
  created_at_String: string;
  Extra_Info: Extra_Info[];
  Payment: Payment[];
}
export interface Notes {
  id: number;
  formId: number;
  PatientID: number;
  Note: string; // e.g. "tooth condition", "gum condition", etc.
  date: string;
}
export interface Extra_Info_Col {
  id: number;
  name: string;
  Extra_Info: Extra_Info[];
}

export interface Extra_Info {
  id: number;
  value: string;
  column: Extra_Info_Col;
  patient: Patient;
  extra_Info_ColId: number;
  patientId: number;
}

export interface Payment {
  id: number;
  date: Date;
  amount: number;
  patientId: number;
  Patient: Patient;
}

export interface Sessions {
  id: number;
  date: Date;
  amount: number;
  patientId: number;
  paid: number;
  description: string;
}
export interface Appointment_Type {
  id: number;
  name: string;
  Appointment: Appointment[];
}

export interface Appointment {
  id: number;
  type: Appointment_Type;
  Type_Name: string;
  title: string;
  phone_number: string;
  description: string;
  start: Date;
  end: Date;
}

export interface Settings {
  id: number;
  fname: string;
  password: string;
  email: string;
  phoneNumber: string;
  Address: string;
  logo: string;
  role: string;
  clinic: string;
  currency: string;
  field: string;
  gender: string;
}

export interface PrintingDocData {
  fname: string;
  speciality: string;
  Aspeciality: string;
  university: string;
  Auniversity: string;
  Aname: string;
  email: string;
  phoneNumber: string;
  Address: string;
  facebook: string;
  instagram: string;
  linkdin: string;
  twiter: string;
  whatsapp: string;
  messanger: string;
  state: boolean;
}
