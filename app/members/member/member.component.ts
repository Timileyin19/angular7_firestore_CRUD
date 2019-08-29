import { MemberService } from './../../shared/member.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(
    public memberService: MemberService,
    private firestore: AngularFirestore, 
    private toastr: ToastrService 
    ) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null)
         form.resetForm();
    
    this.memberService.formData = {
      id: null, 
      fullname: '',
      skill: '', 
      task: '', 
      mobile: ''
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);  
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('members').add(data);    
      this.resetForm(form);  

      this.alertMessage('Team Member Added Successfully', 'success');
    }  else {
      this.firestore.doc('members/' + form.value.id).update(data);
      this.resetForm(form);  

      this.alertMessage('Successfully Editted a Team Member', 'success');
    }  
        
   
    
    
  }

  alertMessage(msg: string, alertClass:string): void {
    const parentDiv = document.querySelector('#parentForm'); 
    const siblingDiv = document.querySelector('#realForm');
    const div = document.createElement('div'); 
    div.className = 'alert alert-' + alertClass;
    div.innerHTML = msg;
    parentDiv.insertBefore(div, siblingDiv); 
    setTimeout(()=> {
       parentDiv.removeChild(div);
    }, 5000); 
  }
  

}
