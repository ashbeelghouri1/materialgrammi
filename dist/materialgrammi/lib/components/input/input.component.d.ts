import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class InputComponent implements OnInit {
    theme: string;
    fStyle: string;
    label: string;
    placeholder: string;
    control: FormControl;
    type: string;
    onDark: boolean;
    class: string;
    value: EventEmitter<FormControl>;
    isFocused: EventEmitter<any>;
    keyup: EventEmitter<any>;
    textValue: string;
    rounded: boolean;
    private inputElem;
    active: boolean;
    focused: boolean;
    input_placeholder: string;
    constructor();
    ngOnInit(): void;
    onFocusIn(): void;
    onFocusOut(): void;
    onKeyUp(event: any): void;
    mainClasses(): string;
    labelClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputComponent, "mg-input", never, { "theme": "theme"; "fStyle": "fStyle"; "label": "label"; "placeholder": "placeholder"; "control": "control"; "type": "type"; "onDark": "onDark"; "class": "class"; "textValue": "textValue"; "rounded": "rounded"; }, { "value": "value"; "isFocused": "isFocused"; "keyup": "keyup"; }, never, never>;
}
//# sourceMappingURL=input.component.d.ts.map