import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../../admin/login/services/auth.service';
import { SharedService } from 'app/core/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	userName: string;
	//currentLang: string;
	clickEventSubscription:Subscription;
	subscription: Subscription;

	constructor(private authService: AuthService, private router: Router, private sharedService:SharedService,private translateService: TranslateService,
		public localeStorage: LocalStorageService) {
	
		this.clickEventSubscription= this.sharedService.getChangeUserNameClickEvent().subscribe(()=>{
			this.setUserName();
		  })

		// Observable
		// 	.interval(1000)
		// 	.subscribe(res => this.currentLang = this.localeStorage.getItem("lang"))
	}

	isLoggedIn(): boolean {

		return this.authService.loggedIn();
	}

	logOut() {
		this.authService.logOut();
		this.router.navigateByUrl("/login");

	}

	help(): void{

		window.open(
			'https://www.devarchitecture.net/',
			'_blank' 
		);
	}
	ngOnInit() {
		console.log(this.userName);
		this.userName = this.authService.getUserName();
	}


	setUserName(){

		this.userName = this.authService.getUserName();
	}

	changeLang(lang){  
		localStorage.setItem("lang",lang);
		this.translateService.use(lang);
	  }
}
