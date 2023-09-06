import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-doctor-display-patient',
  templateUrl: './doctor-display-patient.component.html',
  styleUrls: ['./doctor-display-patient.component.css']
})
export class DoctorDisplayPatientComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  @Input() curDoctor:User

  test(){
    localStorage.setItem('doctor',JSON.stringify(this.curDoctor))
    this.router.navigate(['patientDoctorProfile'])
  }

}
