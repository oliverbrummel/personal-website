import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  displayedOutput = '<span class="char-span">&nbsp;</span>';

  constructor() { }

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
      const charArray = newValue.split('');
      charArray.forEach(char => {
        const charHTML = char === ' ' ? '&nbsp;' : char;
        this.displayedOutput += `<span>${charHTML}</span>`;
      });
      this.displayedOutput += '<span class="char-span">&nbsp;</span>';
    });
  }

  processInput() {
    console.log('SUBMITTED!!');
  }

}
