import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'apm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number = 0
    cropWidth: number = 75
    @Output() ratingEvent: EventEmitter<string> = new EventEmitter()

    ngOnChanges(changes: SimpleChanges): void {
        console.log('on change: ', changes)
        this.cropWidth = this.rating * (75/5)
    }

    onClick(): void {
        this.ratingEvent.emit(`the rating ${this.rating} was clicked`)
    }
}