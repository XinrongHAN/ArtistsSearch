import { Component } from '@angular/core';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent {

  constructor(public getDataService: GetDataService) { }

  isShow = true;
  isShowCard = true;
  isShowResults = true;
  isShowTabsbox = false;
  isShowTabsloading = false;
  noArtworks = false;
  isShowGenesLoading = false;
  noGenes = false;
  globalid = ''


  artistname = '';
  artworkimg = '';
  artworkname = '';
  year = '';
  artistslist: any;
  info: any;
  artworks: any;
  genes: any;
  submit = false;

  //the first API call
  onSubmit(artistname: string) {
    this.submit = true;
    this.isShow = false;
    this.artistname = artistname;
    this.getDataService.getArtists(artistname).subscribe(
      response => {

        //hide searchlogo
        this.isShow = true;
        console.log(response)

        //hide tabsbox
        this.isShowTabsbox = false;

        //hide noartworksalert
        this.isShowResults = true;

        //display no results//if total_count = 0
        if (response.total_count == 0) {
          this.isShowResults = false;
        }

        //generate table
        this.artistslist = response;
        this.isShowCard = true;
      }
    )
  }


  //when artists card shows up, click on card...
  afterClickCard(event: any) {
    this.isShowTabsbox = false;
    this.isShowTabsloading = true;

    //change class
    let thecard = event.currentTarget;
    document.querySelectorAll('.cardSelected').forEach((card) => {
      card.classList.remove("cardSelected");
      card.classList.add("cardNotSelected")
    })
    thecard.classList.remove("cardNotSelected")
    thecard.classList.add("cardSelected");

    //the second API call
    let artistid = event?.currentTarget.id;
    this.getDataService.getInfo(artistid).subscribe(
      data => {
        console.log("artist info", data)
        //display the tab
        this.isShowTabsloading = false;
        this.isShowTabsbox = true;

        //display the info inside the tab
        this.info = data;
        this.globalid = data.id;
        this.showArtWorks()
      }
    )

  }



  //when click on artworks tab
  showArtWorks() {
    //the third API call
    this.getDataService.getArtworks(this.globalid).subscribe(
      data => {
        console.log("artworks", data)

        let num = data._embedded.artworks.length;
        if (num == 0) {
          this.noArtworks = true;
        } else {
          this.noArtworks = false;
        }

        this.artworks = data._embedded.artworks

      })
  }

  showModal(event: any) {
    this.isShowGenesLoading = true;
    this.noGenes = false;

    let genesid = event.currentTarget.id;
    let parent = event.currentTarget.parentNode;
    let name: string = parent?.firstElementChild?.innerHTML!;
    let year: string = parent?.firstElementChild?.nextElementSibling?.innerHTML!;
    let img: string = parent?.parentNode?.firstElementChild?.getAttribute('src')!;
    this.artworkname = name;
    this.year = year;
    this.artworkimg = img;

    //the fourth API call
    this.getDataService.getGenes(genesid).subscribe(
      data => {
        this.isShowGenesLoading = false;
        console.log("json: ", data)

        if (data._embedded.genes.length == 0) {
          this.noGenes = true;
        } else {
          this.noGenes = false;
        }

        this.genes = data._embedded.genes;
      })

  }

  //clear everything except search bar
  onClear() {
    this.artistname = ''
    this.isShowCard = false;
    this.isShowTabsbox = false;
    this.noArtworks = false;
  }
}
