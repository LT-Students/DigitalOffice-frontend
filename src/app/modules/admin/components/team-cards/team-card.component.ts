import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { TeamCard } from '../new-project/team-cards';
import { ModalType } from '../new-project/new-project.component';

@Component({
  selector: 'do-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements AfterViewInit {
  @Input() public teamCard: TeamCard;
  @ViewChild('membersSection') membersDivElement: ElementRef<HTMLDivElement>;
  @Output() modal: EventEmitter<ModalType>;

  public visibleMembers: { name: string; level?: string; lead?: boolean; profileImgSrc: string; }[];
  public hiddenMembers: { name: string; level?: string; lead?: boolean; profileImgSrc: string; }[];
  public membersCountNotVisible: number;
  public maxImages: number;
  public cardOpenState: boolean;

  constructor() {
    this.membersCountNotVisible = null;
    this.maxImages = null;
    this.cardOpenState = false;
    this.visibleMembers = null;
    this.modal = new EventEmitter<ModalType>();
  }

  public ngAfterViewInit() {
    setTimeout(() => this.resizeListener());
  }

  public onEditTeam(event: MouseEvent) {
    this._handleClickEvent(event);
    this.modal.emit(ModalType.CREATE);
  }

  public onDeleteTeam(event: MouseEvent) {
    this._handleClickEvent(event);
    this.modal.emit(ModalType.DELETE);
  }

  private _handleClickEvent(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private setVisibleMembers(): void {
    if (this.maxImages >= this.teamCard.members.length) {
      this.visibleMembers = this.teamCard.members;
      this.membersCountNotVisible = null;
    } else {
      this.membersCountNotVisible = this.teamCard.members.length - this.maxImages;

      this.visibleMembers = this.teamCard.members.slice(0, this.maxImages);
      this.hiddenMembers = this.teamCard.members.slice(this.maxImages);
    }
  }

  private _countMaxImagesNumber(): number {
    const WIDTH = this.membersDivElement.nativeElement.clientWidth;
    const singleImageWidthWithMargin = 39;

    return Math.floor(WIDTH / singleImageWidthWithMargin) - 1;
  }

  @HostListener('window:resize', ['$event.target'])
  public resizeListener(): void {
    this.maxImages = this._countMaxImagesNumber();
    this.setVisibleMembers();
  }
}
