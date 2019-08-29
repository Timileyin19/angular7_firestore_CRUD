import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { Member } from 'src/app/shared/member.model';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  membersList: Member[]; 

  constructor(
    private memberService: MemberService,
    private firestore: AngularFirestore 
    ) { }

  ngOnInit() {
    this.memberService.getMembers().subscribe( actionArray => {
       this.membersList = actionArray.map(item => {
         return {
           id: item.payload.doc.id, 
           ... item.payload.doc.data()
         } as Member 
       })
    });
  }

  onEdit(member: Member) {
    this.memberService.formData = Object.assign({}, member);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this Team Member?')) {
        this.firestore.doc('members/'+id).delete();
    
        this.alertMessage('Team Member Deleted', 'info');
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
