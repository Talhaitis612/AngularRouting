import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user?: { id: number; name: string };
  paramSubscription! : Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
   this.paramSubscription = this.route.params.subscribe({
      next: (res: Params) => {
        if (res) {
          this.user!.id = res['id'];
          this.user!.name = res['name'];
        } 
      
        console.log(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();    
  }
}
