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
  displayedOutput = '<span class="char-span">&nbsp;</span>';

  constructor() { }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: any) {
    console.log('Keydown event', event);
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
      this.displayedOutput += '<span class="char-span">&nbsp;</span>';
    });
  }

  processInput() {
    // test functionality
    document.getElementById(String(4)).classList.add('char-span');
  }

}
