import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  terminalForm: FormGroup;
  currentDateTime = new Date();
  userInput: string;
  displayedOutput: string;

  constructor() { }

  ngOnInit() {
    this.terminalForm = new FormGroup({
      userInput: new FormControl('')
    });
    this.subscribeToInputChanges();
  }

  subscribeToInputChanges() {
    this.terminalForm.controls.userInput.valueChanges.subscribe(newValue => {
      this.displayedOutput = newValue.replace(/\s/g, '&nbsp;');
    });
  }

  processInput() {
    console.log('SUBMITTED!!');
  }

}
