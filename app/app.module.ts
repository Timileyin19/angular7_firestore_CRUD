import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './members/member/member.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberService } from './shared/member.service';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule, 
    FormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
