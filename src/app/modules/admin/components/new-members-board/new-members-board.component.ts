import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { mergeMap, map } from 'rxjs/operators';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UserResponse } from '@data/api/user-service/models/user-response';

type User = UserResponse & { level: string; specialization: string };

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit, OnDestroy {
  public members: User[];
  public visibleMembers: User[];
  public checkedMembers: User[] = [];
  public selectedSpecialization;
  public selectedLevel;
  public searchName = null;
  private getMembersSubscription: Subscription;

  public specializations: string[] = [
    'Front-End Developer',
    'Backend-End Developer',
    'Product Manager',
    'UI/UX Designer',
    'QA Tester',
  ];
  public levels: string[] = ['Junior', 'Middle', 'Senior'];

  constructor(private userApiService: UserApiService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.getMembersSubscription = this.userApiService
      .findUsers({
        skipCount: 0,
        takeCount: 50,
        // userNameFilter: this.searchName,
      })
      .pipe(
        mergeMap(({ users }) => {
          const subs = users.map((user) =>
            this.userApiService.getUser({ userId: user.id })
          );
          return forkJoin([...subs]);
        }),
        map((data: User[]) =>
          data.map((user) => ({
            ...user,
            ...user.user,
            level: '',
            specialization: '',
          }))
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.members = data;
        this.visibleMembers = [...this.members];
      });
  }

  onSelect() {
    this.visibleMembers = this.members;
    if (this.selectedSpecialization) {
      this.visibleMembers = this.visibleMembers.filter((user) =>
        user.specialization.includes(this.selectedSpecialization)
      );
    }

    if (this.selectedLevel) {
      this.visibleMembers = this.visibleMembers.filter(
        (user) => user.level === this.selectedLevel
      );
    }
    return this.visibleMembers;
  }

  onSearchClick(value: string): void {
    this.searchName = value;
    this.getMembers();
  }

  ngOnDestroy(): void {
    this.getMembersSubscription.unsubscribe();
  }

  onCheckMember($event, user): void {
    if ($event) {
      this.checkedMembers.push(user);
    } else {
      let uncheckedUserIndex;
      this.checkedMembers.map((x, index) => {
        if (x.user.id === user.id) {
          uncheckedUserIndex = index;
        }
      });
      this.checkedMembers.splice(uncheckedUserIndex, 1);
    }
  }
}
