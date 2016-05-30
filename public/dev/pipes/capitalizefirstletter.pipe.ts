import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'capitalizeFirstLetter'
})

export class capitalizeFirstLetter implements PipeTransform {
    transform(string: string): string {
            if (string && string.length) string = string.charAt(0).toUpperCase() + string.slice(1);
            return string;
        }
}