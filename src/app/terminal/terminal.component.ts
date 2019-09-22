import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  currentDateTime = new Date();
  pretendLoaded = false;
  terminalForm: FormGroup;
  userInput: string;
  displayedOutput: string;

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
    });
  }

  processInput() {
    console.log('SUBMITTED!!');
  }

}
