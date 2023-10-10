export class FormContactViewModel {
    name: string;
    email: string;
    phone: string;
    position: string;
    company: string;

    constructor(
        name: string,
        email: string,
        phone: string,
        position: string,
        company: string
    ){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.position = position;
        this.company =  company;
    }
}