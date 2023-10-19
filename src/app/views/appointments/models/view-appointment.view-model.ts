import { ListContactViewModel } from "../../contacts/models/list-contact.view-model";
import { LocationTypeEnum } from "./location-type.enum";

export type ViewAppointmentViewModel = {
    id: string;
    assunto: string;
    tipoLocal: LocationTypeEnum;
    link: string;
    local: string;

    data: Date;
    horaInicio: string;
    horaTermino: string;

    contato?: ListContactViewModel;
};