import { HttpClient } from '@angular/common/http';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  http = inject(HttpClient);
  title = 'Genshin Impact Ultimate Pull Simulator';
  count = 0;
  characters:any;
  characterName = '';
  characerDesc = '';
  imgSource = '';

  ngOnInit(): void {

    this.http.get('https://genshinlist.com/api/characters').subscribe( 
    {
        next: response => this.characters = response,
        error: err => console.log(err),
        complete: () => this.InitializeValues()
    })
  }
  
  //Sets default values after getting data from api
  InitializeValues(): void
  {
    this.characterName = this.characters[0].name;
    this.characerDesc = this.characters[0].description;
    this.imgSource = `${this.characterName}.png`;
  }

  GenerateUsername() :void
  {
    let random = Math.floor(Math.random() * ((this.characters.length - 1) - 0 + 1)) + 0;

    this.characterName = this.characters[random].name;
    this.characerDesc = this.characters[random].description;
    this.imgSource = `${this.characterName}.png`;
  }  
}
