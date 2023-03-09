import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '.app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title = 'List';
  dtOptions: DataTables.Settings = {};
  // posts: any;

  constructor() { }
  formData: any[] = [];
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
    }
    console.log(this.formData)


    // this.http.get('http://jsonplaceholder.typicode.com/posts')
    //   .subscribe(posts => {
    //     this.posts = posts;
    // });

  }
  editItem(item: any) {
    console.log(item)

  }


  removeItem(key: any) {
    // debugger
    const savedData: any = localStorage.getItem('formData');
    let myArray = JSON.parse(savedData);
    // console.log(myArray)
    myArray.pop(key);
    // console.log(myArray)
    localStorage.setItem("formData", JSON.stringify(myArray));
    window.location.reload()
  }


}
