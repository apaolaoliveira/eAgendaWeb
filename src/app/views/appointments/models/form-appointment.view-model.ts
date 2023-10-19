import { LocationTypeEnum } from "./location-type.enum";

export type FormAppointmentViewModel = {
    assunto: string;
    tipoLocal: LocationTypeEnum;
    link: string;
    local: string;

    data: Date;
    horaInicio: string;
    horaTermino: string;

    contactId?:string;
}