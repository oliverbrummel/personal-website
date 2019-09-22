import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @ViewChild('hiddenInput') hiddenInput: ElementRef;

  hiddenInputEl = new FormControl('');

  currentDateTime: Date;
  userInput: string;
  displayedOutput = '';

  constructor() { }

  ngOnInit() {
    this.currentDateTime = new Date();
    console.log('this', this);

    this.subscribeToInputChanges();
  }

  subscribeToInputChanges() {
    this.hiddenInputEl.valueChanges.subscribe(value => {
      const lastCharacter = value.slice(-1);
      this.displayedOutput += lastCharacter;

      // if (lastCharacter === ' ') {
      //   console.log('WE GOTTA SPACE!');
      // }
    });
  }

  setFocus() {
    this.hiddenInput.nativeElement.focus();
  }

}
