import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @ViewChild('hiddenInput') hiddenInput: ElementRef;

  terminalInputControl = new FormControl('');

  currentDateTime: Date;
  userInput: string;
  displayedOutput: string;

  constructor() { }

  ngOnInit() {
    this.currentDateTime = new Date();
    this.subscribeToInputChanges();
  }

  subscribeToInputChanges() {
    this.terminalInputControl.valueChanges.subscribe(newValue => {
      this.displayedOutput = newValue.replace(/\s/g, '&nbsp;');
    });
  }

  setFocus() {
    this.hiddenInput.nativeElement.focus();
  }

}
