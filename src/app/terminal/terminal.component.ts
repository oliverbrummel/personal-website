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
    this.subscribeToInputChanges();
  }

  subscribeToInputChanges() {
    let previousInputValue = '';
    let previousLastCharacter = null;
    this.hiddenInputEl.valueChanges.subscribe(newValue => {

      // Typing
      if (previousInputValue.length < newValue.length) {
        this.displayedOutput += (newValue.slice(-1) === ' ' ? '&nbsp;' : newValue.slice(-1));
      }
      // Deleting
      if (previousInputValue.length > newValue.length) {
        this.displayedOutput = (previousLastCharacter === ' '
          ? this.displayedOutput.substring(0, this.displayedOutput.length - 6)
          : this.displayedOutput.substring(0, this.displayedOutput.length - 1));
      }
      previousInputValue = newValue;
      previousLastCharacter = newValue.slice(-1);
    });
  }

  setFocus() {
    this.hiddenInput.nativeElement.focus();
  }

}
