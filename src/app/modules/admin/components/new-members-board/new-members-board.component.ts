import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { User } from '@data/api/user-service/models/user';
import { INewMember } from '@app/interfaces/INewMember';

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit, OnDestroy {
  public members: INewMember[];
  public visibleMembers: INewMember[];
  public checkedMembers: INewMember[] = [];
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

  @Output() returnedMembers = new EventEmitter<any>();

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
            fullName: `${userDb.firstName} ${userDb.lastName} `,
            projectsCount: 0,
            level: '',
            profileImgSrc: '',
            specialization: '',
          }))
        )
      )
      .subscribe((data: INewMember[]) => {
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
      let unckedUserIndex;
      this.checkedMembers.map((x, index) => {
        if (x.id === user.id) {
          unckedUserIndex = index;
        }
      });
      this.checkedMembers.splice(unckedUserIndex, 1);
    }
  }

  onReturnCheckedMembers(): void {
    this.returnedMembers.emit(this.checkedMembers);
  }
}
