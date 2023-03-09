import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';


interface list {
  pincode: string
  state: string
  city: string
}

@Component({
  selector: '.app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  title = 'Register';
  mobile: string = ''
  birthday: string = ''
  pincode: string = ''
  state: string = ''
  city: string = ''
  latitude: any;
  longitude: any;
  myFiles: string[] = [];
  formData: any[] = [];
  lists: list[] = []


  myimage!: Observable<any>;
  base64!: any;


  base64String: string | undefined;

  constructor(private toastr: ToastrService, private http: HttpClient) { }


  ngOnInit() {
    if (!navigator.geolocation) {
      this.toastr.error('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    });
    // this.watchPosition();


  }

  // watchPosition function
  // watchPosition() {
  //   let desLat = 0;
  //   let desLon = 0;
  //   let id = navigator.geolocation.watchPosition(
  //     (position) => {

  //       // console.log(
  //       //   `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  //       // );
  //       if (position.coords.latitude === desLat) {
  //         navigator.geolocation.clearWatch(id);
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 0,
  //     }
  //   );
  // }

  // on submit function
  onSubmit() {
    const data = {
      mobile: this.mobile,
      birthday: this.birthday,
      pincode: this.pincode,
      state: this.state,
      city: this.city,
      latitude: this.latitude,
      longitude: this.longitude,
      files: this.myFiles,
    };
    // console.log(data.files)
    if (data.mobile == '') {
      this.toastr.error('please enter mobile number');
      return;
    }

    else if (data.mobile.length != 10) {
      this.toastr.error('please enter 10 digit mobile number');
      return;
    }

    else if (data.birthday == '') {
      this.toastr.error('please enter date of birth');
      return;
    }
    else if (data.pincode == '') {
      this.toastr.error('please enter pincode');
      return;
    }
    else if (data.pincode.length != 6) {
      this.toastr.error('please enter 6 digit pincode');
      return;
    }

    else if (data.files.length == 0) {
      this.toastr.error('please choose file');
      return;
    }
    else {
      debugger
      const savedData = localStorage.getItem('formData');
      if (savedData) {
        this.formData = JSON.parse(savedData);
      }

      //  this.formData.push(savedData);
      // const frmData = new FormData();

      // for (var i = 0; i < this.myFiles.length; i++) { 
      //   frmData.append("fileUpload", this.myFiles[i]);
      // }
      this.formData.push(data);
      localStorage.setItem('formData', JSON.stringify(this.formData));
      this.mobile = '';
      this.birthday = '';
      this.pincode = '';
      this.state = '';
      this.city = '';
      this.toastr.success('User added successfully');
    }

  }


  // keypress validation 

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  lettersOnly(evt: any): boolean {
    var keyCode = (evt.which) ? evt.which : evt.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) {
      return false;
    }
    return true;
  }







  // uploadFiles () {
  //   const frmData = new FormData();

  //   for (var i = 0; i < this.myFiles.length; i++) { 
  //     frmData.append("fileUpload", this.myFiles[i]);
  //this.myFiles.push(file1);
  //   }

  //   console.log(frmData)
  // }
  getFileDetails(e: any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    console.log(this.myFiles)
  }

  getpincode(event: any) {
    // console.log(event.target.value)
    const mypincode = event.target.value
    // this.http.get('https://api.postalpincode.in/pincode/332027').subscribe((data: any) => {
    //   console.log(data);
    // });
    if (mypincode == '332027') {

      this.state = 'Rajastha';
      this.city = 'Sikar';
      return;
    }
    else if (mypincode == '411041') {
      this.state = 'Maharastra';
      this.city = 'Pune';
      return;
    }
    else if (mypincode == '302001') {
      this.state = 'Rajastha';
      this.city = 'Jaipur';
      return;
    }

    else {
      this.toastr.error('pincode not found!');
      this.state = '';
      this.city = '';
      return;
    }

  }

  // chooseFile(){

  // }
  fileUpload(event: any): void {

    // const lng = event.target.files.length;
    // console.log(lng);
    if (event.target.files.length == 1) {
      const file = event.target.files[0];
      const fileName = event.target.files[0].name;
      const fileID = document.getElementById("filename") as HTMLInputElement | null;
      if (fileID != null) {
        fileID.value = fileName;
      }




      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = function () {
      //   var base64String = reader.result;
      //   //this.base64String = base64String as string;
      //   console.log(base64String);


      // };

      // reader.onerror = function (error) {
      //   console.log('Error: ', error);
      // };

      //console.log(this.base64String);
      const file1 = event.target.files[0];
      this.myFiles.push(file1);
      return;
    }
    else {
      const fileName = document.getElementById("filename") as HTMLInputElement | null;
      if (fileName != null) {
        const length = event.target.files.length;
        fileName.value = (length + " files");
      }
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    }


  }



  onChange(event: any) {

    const target = $(event.target as HTMLInputElement);
    const file = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      this.convertToBase64(event.target.files[i]);
    }
    // callback 
    

    if (event.target.files.length == 1) {
      const file = event.target.files[0];
      const fileName = event.target.files[0].name;
      const fileID = document.getElementById("filename") as HTMLInputElement | null;
      if (fileID != null) {
        fileID.value = fileName;
      }
      return;
    }
    else {
      const fileName = document.getElementById("filename") as HTMLInputElement | null;
      if (fileName != null) {
        const length = event.target.files.length;
        fileName.value = (length + " files");
      }
    }
  }






  convertToBase64(file: File) {
    const obb = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    obb.subscribe((d) => {
      this.myimage = d;
      this.base64 = d;
      
      //console.log(this.base64)
      if(file){
        this.myFiles.push(this.base64);
        console.log(this.myFiles);
      }
      else{
        //this.myFiles.push(file);
      }
    })

    
    
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
      //console.log(filereader.result);
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


}


