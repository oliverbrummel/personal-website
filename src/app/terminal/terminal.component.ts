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
  cursorPosition = 1;
  displayedOutput = '<span class="char-span">&nbsp;</span>';

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: any) {
    if (event.keyCode === 37) { // left arrow key
      this.onLeftKeydown();
    } else if ( event.keyCode === 39) { // right arrow key
      this.onRightKeydown();
    }
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
    let oldValue = '';
    this.terminalForm.controls.userInput.valueChanges.subscribe(newValue => {
      this.displayedOutput = '';
      this.charSpanID = 1;
      const charArray = newValue.split('');
      charArray.forEach(char => {
        const charHTML = char === ' ' ? '&nbsp;' : char;
        this.displayedOutput += `<span id="${this.charSpanID}">${charHTML}</span>`;
        this.charSpanID++;
      });
      this.displayedOutput += `<span id="${this.charSpanID}">&nbsp;</span>`;

      if (newValue.length < oldValue.length) {
        this.cursorPosition--;
      } else {
        this.cursorPosition++;
      }
      setTimeout(() => {
        document.getElementById(String(this.cursorPosition)).classList.add('char-span');
      });
      oldValue = newValue;
    });
  }

  onLeftKeydown() {
    if (this.cursorPosition > 1) {
      this.cursorPosition--;
      document.getElementById(String(this.cursorPosition)).classList.add('char-span');
      document.getElementById(String(this.cursorPosition + 1)).classList.remove('char-span');
    }
  }

  onRightKeydown() {
    if (this.cursorPosition < this.charSpanID) {
      this.cursorPosition++;
      document.getElementById(String(this.cursorPosition)).classList.add('char-span');
      document.getElementById(String(this.cursorPosition - 1)).classList.remove('char-span');
    }
  }

  processInput() {
    // test submit functionality
  }

}
