import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Member } from './member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  formData: Member; 

  constructor(private firestore: AngularFirestore) { }
  
  // Read operation
  getMembers() {
    return this.firestore.collection('members').snapshotChanges();
  }
}
