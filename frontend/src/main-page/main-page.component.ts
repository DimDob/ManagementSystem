import { Component, inject, OnInit } from '@angular/core';
import { ButtonOverviewExample } from "../nav-buttons/nav-buttons.component";
import { TokenService } from '../app/auth/token.service';

@Component({
  selector: 'app-main-page',
  imports: [ButtonOverviewExample],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  tokenService = inject(TokenService);

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      console.log('Token already available:', token);
    } else {
      console.error('Token is not available yet.');
    }
  }

}
