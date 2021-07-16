import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import { ModalService, UserSearchModalConfig } from '@app/services/modal.service';
import { Team, TeamMember } from '../new-project/team-cards';
import { DeleteDirectionComponent, ModalApprovalConfig, ModalResult } from '../new-project/modals/delete-direction/delete-direction.component';
import { WorkFlowMode } from '../../../employee/employee-page.component';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';

@Component({
	selector: 'do-team-card',
	templateUrl: './team-card.component.html',
	styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit, AfterViewInit {
	@Input() public users: Team[];
	@Input() public teamCard: Team;
	@ViewChild('membersSection') membersDivElement: ElementRef<HTMLDivElement>;

	public members: TeamMember[];
	public visibleMembers: TeamMember[];
	public hiddenMembers: TeamMember[];
	public membersCountNotVisible: number;
	public maxImages: number;
	public cardOpenState: boolean;

	constructor(private _modalService: ModalService) {
		this.membersCountNotVisible = null;
		this.maxImages = null;
		this.cardOpenState = false;
		this.visibleMembers = null;
		this.members = null;
	}

	public ngOnInit() {
		this.members = this._sortLeads();
	}

	public ngAfterViewInit() {
		setTimeout(() => this.resizeListener());
	}

	public onEditTeam(event: MouseEvent) {
		this._handleClickEvent(event);
		const configData: UserSearchModalConfig = { team: this.teamCard, mode: WorkFlowMode.EDIT };
		this._modalService.openModal(UserSearchComponent, configData);
	}

	public onDeleteTeam(event: MouseEvent) {
		this._handleClickEvent(event);

		const configData: ModalApprovalConfig = {
			text: {
				main: 'Удаление направления',
				additional: `Вы действительно хотите удалить направление “${this.teamCard.name}” вместе со всеми участниками?`,
			},
			actions: {
				negative: 'Отменить',
				positive: 'Да, удалить',
			},
		};

		const dialogRef = this._modalService.openModal(DeleteDirectionComponent, configData, ModalResult);
	}

	private _sortLeads(): TeamMember[] {
		const leads: TeamMember[] = this.teamCard.members.filter((member: TeamMember) => member.lead);
		const ordinary: TeamMember[] = this.teamCard.members.filter((member: TeamMember) => !member.lead);
		return [...leads, ...ordinary];
	}

	private _handleClickEvent(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
	}

	private setVisibleMembers(): void {
		if (this.maxImages >= this.members.length) {
			this.visibleMembers = this.members;
			this.membersCountNotVisible = null;
		} else {
			this.membersCountNotVisible = this.members.length - this.maxImages;

			this.visibleMembers = this.members.slice(0, this.maxImages);
			this.hiddenMembers = this.members.slice(this.maxImages);
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
