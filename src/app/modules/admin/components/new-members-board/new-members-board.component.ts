import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { User } from '@data/api/user-service/models/user';
import { IUser } from '@data/models/user';

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit, OnDestroy {
  public members: IUser[];
  public visibleMembers: IUser[];
  public checkedMembers: IUser[] = [];
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
      .getAllUsers({
        skipCount: 0,
        takeCount: 50,
        userNameFilter: this.searchName,
      })
      .pipe(
        map((data: User[]) =>
          data.map((userDb) => ({
            id: userDb.id,
            firstName: userDb.firstName,
            lastName: userDb.lastName,
            middleName: userDb.middleName,
            photo: userDb.avatarFileId,
            projectsCount: 0,
            level: '',
            specialization: '',
          }))
        )
      )
      .subscribe((data: IUser[]) => {
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
        if (x.id === user.id) {
          uncheckedUserIndex = index;
        }
      });
      this.checkedMembers.splice(uncheckedUserIndex, 1);
    }
  }
}
