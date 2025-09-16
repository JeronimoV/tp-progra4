import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GithubCall } from '../../services/getters/github-call';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quien-soy',
  imports: [CommonModule],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css'
})
export class QuienSoy implements OnInit {
  constructor(private githubCall: GithubCall, private cdr: ChangeDetectorRef){};

  data: any;

  ngOnInit(): void {
    this.githubCall.getData().subscribe({
    next: (data:any) =>  {this.data = data; this.cdr.detectChanges();},
    error: (err:any) => console.log('Error del server', err)
  });
  }
}
