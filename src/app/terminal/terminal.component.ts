import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TerminalComponent implements OnInit {
  currentDateTime = new Date();
  pretendLoaded = false;
  terminalForm: FormGroup;
  userInput: string;
  charSpanID: number;
  cursorPosition = 0;
  displayedOutput = '<span class="char-span">&nbsp;</span>';

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: any) {
    if (event.keyCode === 37) { // left arrow key
      this.moveCursorLeft();
    } else if ( event.keyCode === 39) { // right arrow key
      this.moveCursorRight();
    }
    console.log('charSpanId', this.charSpanID);
    console.log('cursorPosition', this.cursorPosition);
  }

  ngOnInit() {
    this.terminalForm = new FormGroup({
      userInput: new FormControl('')
    });
    this.subscribeToInputChanges();

    setTimeout(() => {
      this.pretendLoaded = true;
    }, 300);
  }

  subscribeToInputChanges() {
    this.terminalForm.controls.userInput.valueChanges.subscribe(newValue => {
      this.displayedOutput = '';
      this.charSpanID = 1;
      const charArray = newValue.split('');
      charArray.forEach(char => {
        const charHTML = char === ' ' ? '&nbsp;' : char;
        this.displayedOutput += `<span id="${this.charSpanID}">${charHTML}</span>`;
        this.charSpanID++;
      });
      this.cursorPosition = this.charSpanID;
      this.displayedOutput += `<span class="char-span" id="${this.charSpanID}">&nbsp;</span>`;
    });
  }

  moveCursorLeft() {
    if (this.cursorPosition > 1) {
      this.cursorPosition--;
      document.getElementById(String(this.cursorPosition)).classList.add('char-span');
      document.getElementById(String(this.cursorPosition + 1)).classList.remove('char-span');
    }
  }

  moveCursorRight() {
    if (this.cursorPosition < this.charSpanID) {
      this.cursorPosition++;
      document.getElementById(String(this.cursorPosition)).classList.add('char-span');
      document.getElementById(String(this.cursorPosition - 1)).classList.remove('char-span');
    }
  }

  processInput() {
    // test functionality
    document.getElementById(String(4)).classList.add('char-span');
  }

}
