import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-owlbot',
  templateUrl: './owlbot.component.html',
  styleUrls: ['./owlbot.component.css']
})
export class OwlbotComponent implements OnInit {

  public wordInput : String;
  public definition: []; 
  constructor( private userService: UserService) { 
  }

 // object of form group
 wordForm = new FormGroup({
  wordInput : new FormControl(Validators.required, Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)),
});

  
  onSubmit() {
    console.log(this.wordInput);
    this.userService.owlBotWord(this.wordInput).subscribe( data => {
         this.definition = data["definitions"];
      });
  }

  ngOnInit() {
  }
}
