import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-doctor-display',
  templateUrl: './doctor-display.component.html',
  styleUrls: ['./doctor-display.component.css']
})
export class DoctorDisplayComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  @Input() curDoctor:User

  test(){

  }

}
