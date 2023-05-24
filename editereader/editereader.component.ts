import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiformService } from 'src/app/apiform.service';


@Component({
  selector: 'app-editereader',
  templateUrl: './editereader.component.html',
  styleUrls: ['./editereader.component.css']
})
export class EditereaderComponent implements OnInit {

  loaderdata:any=true
  dataerror: string;
  linkss: any;
  id: any;
  

  constructor(private toastr: ToastrService,private searchitems:ApiformService,private route: ActivatedRoute) {}


  form = new FormGroup({
    links: new FormControl('',Validators.required),
    urls: new FormControl('',Validators.required),
    order: new FormControl('',Validators.required),
 
  });
  get links(): any { return this.form.get('links'); }
  get urls(): any { return this.form.get('urls'); }
  get order(): any { return this.form.get('order'); }

 
 
  ngOnInit(): void {
    
    this.getereaders()
  
    

  }
getereaders(){
  this.loaderdata=true
  this.id = this.route.snapshot.paramMap.get('id');
  this.searchitems.getsingleEreader(this.id).subscribe((responces)=>{
    //console.log(responces)
    if(responces.status){
      // this.article=responces.datas
      //console.log(responces.datas)
      var linkname=responces.datas[0].Ereadertitle
      var linkurl=responces.datas[0].Ereaderurl
      var orders=responces.datas[0].order

      this.form.setValue({links:linkname , urls: linkurl,order:orders }); 
      this.loaderdata=false
    }else{
      this.dataerror="no data found";
      this.loaderdata=false
    }
  })
}

  onFormSubmit(): void {
    //console.log( this.form);
    this.form.get('profile').value; 
} 

clearInputMethod1() { this.links.reset(); this.urls.reset();this.order.reset(); }

  submitLink() {
    if (!this.form.valid) {
      //console.log( this.form.get('link'));
      this.toastr.warning('Feed has no items')
    } else {
      //console.log( this.form.get('links').value);
      //console.log(this.form.value);

      this.loaderdata=true

      this.searchitems.editEreader(this.form.value,this.id).subscribe((responces)=>{
        //console.log(responces)
        if(responces.status){
          this.getereaders()
          this.toastr.success('Successfully Changed')
          this.loaderdata=false
          // this.inputName.nativeElement.value = '';
        }else{
          this.toastr.error('please try again','error')    
          this.loaderdata=false

            }    
      })

    }
  }
}