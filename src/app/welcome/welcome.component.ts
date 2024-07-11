import { Component, AfterViewInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatTooltipModule,
    CommonModule,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {//implements AfterViewInit {
  // ngAfterViewInit(): void {
  //   const typewriter = document.querySelector('.typewriter') as HTMLElement;

  //   const restartAnimation = () => {
  //     if (typewriter) {
  //       typewriter.style.animation = 'none';
  //       setTimeout(() => {
  //         typewriter.style.animation = '';
  //         typewriter.style.animation = 'typing 3.1s steps(30, end) 1s forwards, blink-caret .60s step-end infinite';
  //       }, 2000); // 2000ms delay before restarting the animation
  //     }
  //   };

  //   // Add an event listener to detect the end of the typing animation
  //   if (typewriter) {
  //     typewriter.addEventListener('animationend', (e: AnimationEvent) => {
  //       if (e.animationName === 'typing') {
  //         setTimeout(restartAnimation, 1000); // Delay before restarting
  //       }
  //     });
  //   }
  // }
}
