import { FormGroup } from "@angular/forms";

declare module '@angular/Forms'{
    interface FormGroup {
        validate(): string[];
    }
}

FormGroup.prototype.validate = function() {
    const errors: string[] = [];

    for(let field of Object.keys(this.controls)){
        const control = this.get(field);

        if(!control?.errors) continue;

        control.markAsTouched();

        for(let error of Object.keys(control.errors)){
            switch(error){
                case 'required': errors.push(`The field "${field}" is required`); break;
                case 'email': errors.push(`The email's format is invalid`); break;
            }
        }
    }

    return errors;
}