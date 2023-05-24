import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiformService {
  public headertokrn: any;
  public Logingeader: any;
  public image: any;
  public gettoken: any = "";
  public gettokenid: any = "";
  public apiEndPoint = environment.accesstoken;

  constructor(private http: HttpClient, private router: Router) {
    this.gettoken = localStorage.getItem("token");
    this.Logingeader = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("access-control-request-token", this.apiEndPoint)
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With")
      .set("apiKey", "E984D23F1BFB5F0BD9CECB28C485F510")
      .set("Access-Point-Token", this.apiEndPoint);

    this.headertokrn = new HttpHeaders()

      .set("access-control-request-token", this.apiEndPoint)
      .set("access-control-request-id", localStorage.getItem("userid"))
      .set("content-type", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With")
      .set("Access-Point-Token", "AO4cDo8WEIB592q1kXOC")
      .set("apiKey", "E984D23F1BFB5F0BD9CECB28C485F510");

    this.image = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With")
      .set("apiKey", "E984D23F1BFB5F0BD9CECB28C485F510")
      .set("Access-Point-Token", this.apiEndPoint)
      .set("access-control-request-token", this.apiEndPoint)
      .set("access-control-request-id", localStorage.getItem("userid"));
  }

  //   Getusername(searchkey: any) {
  //    //console.log(searchkey);
  //    var datas = {
  //      username: searchkey,
  //    };
  //    return this.http
  //      .post<any>(`${environment.apiencode}api/checkuser`, datas, {
  //        headers: this.headertokrn,
  //      })
  //      .pipe(
  //        map((result) => {
  //          //console.log(result);
  //          return result;
  //        })
  //      );
  //  }

  // CheckUseremail(email){
  //    //console.log(email);
  //    var datas = {
  //       email: "manucm@gmail.com"
  //    };
  //    return this.http.post<any>(`${environment.apiencode}api/checkEmailer`, datas, { headers: this.headertokrn })
  //      .pipe(
  //        map((result) => {
  //          //console.log(result);
  //          return result;
  //        })
  //      );
  // }

  Getusername(searchkey) {
    var datas = {
      username: searchkey,
    };
    return this.http
      .post<any>(`${environment.apiEndpoint}api/checkuser`, datas, {
        headers: this.headertokrn,
      })
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  CheckUseremail(email) {
    var datas = {
      email: email,
    };
    return this.http
      .post<any>(`${environment.apiEndpoint}api/checkEmailer`, datas, {
        headers: this.headertokrn,
      })
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  Getadminusername(searchkey) {
    var datas = {
      username: searchkey,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/checkusername`,
        datas,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  Getadminemail(searchkey) {
    var datas = {
      email: searchkey,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/checkEmails`,
        datas,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  uploadfile(datas) {
    //console.log(datas)

    let fileList: FileList = datas;
    //console.log(fileList)
    if (fileList.length > 0) {
      let file: any = fileList[0];
      //console.log(file)
      let formData: FormData = new FormData();
      formData.append("files", file, file.name);
      //console.log(formData)

      return this.http
        .post<any>(
          `${environment.apiEndpoint}api/v1.0/admin/bulkupload/upload`,
          formData,
          { headers: this.headertokrn }
        )
        .pipe(
          map((result) => {
            //console.log(result);
            return result;
          })
        );
    }
  }
  uploadfiles(datas) {
    //console.log(datas)

    let formData: FormData = new FormData();
    for (let i = 0; i < datas.length; i++) {
      let fileList: FileList = datas;
      console.log(fileList);
      if (fileList.length > 0) {
        let file: any = fileList[i];
        //console.log(file)

        formData.append("files", file, file.name);
        //console.log(formData)
      }
    }
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/bulkupload/upload`,
        formData,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getArticle() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getArticlebyid(id) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/get/` + id,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  addArticle(datas, filename, filedata) {
    var payload = {
      Heading: datas.articlehead,
      details: datas.articledetails,
      image: datas.articleimage,
      date: datas.articledate,
      watermark: 0,
      articlecata: datas.addcata,
      filedata: filedata,
      filename: filename,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/addarticles`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteArticle(id, filename) {
    var payload = {
      artid: id,
      oldfilename: filename,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/deletearticles`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  updateArticle(datas, id, files) {
    var payload = {
      artid: id,
      Heading: datas.articlehead,
      details: datas.articledetails,
      image: datas.articleimage,
      date: datas.articledate,
      watermark: 0,
      articlecata: datas.addcata,
      filedata: files.filedata,
      filename: files.newfilename,
      oldfilename: files.oldfilename,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/updateArticles`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getEvents() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/events`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  addevents(datas) {
    var payload = {
      heading: datas.eventhead,
      location: datas.eventlocation,
      address: datas.eventaddress,
      time: datas.eventtime,
      details: datas.eventdetails,
      date: datas.eventdate,
      urls: datas.imageurl,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/events/add`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getEventbyid(id) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/events/getevents/` + id,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  updateEvent(datas, id) {
    var payload = {
      eventid: id,
      heading: datas.eventhead,
      location: datas.eventlocation,
      address: datas.eventaddress,
      time: datas.eventtime,
      details: datas.eventdetails,
      date: datas.eventdate,
      urls: datas.imageurl,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/events/updateevent`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteEvent(id) {
    var payload = {
      eventId: id,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/events/delete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
//............................................................................................
  addLinks(datas) {
    var payload = {
      linkName: datas.links,
      linkUrl: datas.urls,
      priority: datas.order,
    };

    console.log(datas);
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/links/add`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getLinks() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/links`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  deleteLinks(id) {
    var payload = {
      linkid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/links/delete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getsingleLinks(id) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/links/get/` + id,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  editLinks(datas, id) {
    var payload = {
      linkid: parseInt(id),
      linkName: datas.links,
      linkUrl: datas.urls,
      priority: datas.order,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/links/update`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  //*****************************************************************/
  //Ereader

  addEreader(datas) {
    var payload = {
      Ereadertitle: datas.links,
      Ereaderurl: datas.urls,
      priority: datas.order,
    };

    console.log(datas);
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/ereader/add`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getEreader() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/ereader/`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteEreader(id) {
   var payload = {
      EreaderId: id,
   };
   return this.http
     .post<any>(
       `${environment.apiEndpoint}api/v1.0/admin/ereader/delete`,
       payload,
       { headers: this.headertokrn }
     )
     .pipe(
       map((result) => {
         //console.log(result);
         return result;
       })
     );
 }

 editEreader(datas, id) {
   var payload = {
      EreaderId: parseInt(id),
      Ereadertitle: datas.links,
      Ereaderurl: datas.urls,
     priority: datas.order,
   };

   //console.log(payload)
   return this.http
     .post<any>(
       `${environment.apiEndpoint}api/v1.0/admin/ereader/update`,
       payload,
       { headers: this.headertokrn }
     )
     .pipe(
       map((result) => {
         //console.log(result);
         return result;
       })
     );
 }

 getsingleEreader(id) {
  return this.http
    .post<any>(
      `${environment.apiEndpoint}api/v1.0/admin/ereader/get/` + id,
      {},
      { headers: this.headertokrn }
    )
    .pipe(
      map((result) => {
        //console.log(result);
        return result;
      })
    );
}

  //*************************************************************************/

  getNotifications = () => {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/notification/getnotify`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  };

  deleteNotiy(id) {
    var payload = {
      notid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/notification/delete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addnotify(datas) {
    var payload = {
      header: datas.nothead,
      details: datas.notdetails,
      userid: 5,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/notification/addnotification`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getFlagNotifications(flag, notid) {
    var payload = {
      notid: notid,
      flags: flag,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/notification/flagpublic`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getMail = () => {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/email/get`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  };
  deleteEmail(id) {
    var payload = {
      mailid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/email/delete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  toMail(datas) {
    var payload = {
      subject: datas.mailhead,
      details: datas.maildetails,
      userid: 2,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/email/addmail`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getSubscription() {
    // new session added
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/getcurrentpackage`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getPackages(id) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/package/get/` + id,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  editSub(datas, id) {
    var payload = {
      planId: parseInt(id),
      planname: datas.planname,
      planyear1: datas.plan1,
      planyear2: datas.plan2,
      plandate: datas.year,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/package/update`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getUserdata() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/getuserdata`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  searchUser(datas) {
    var payload = {
      search: datas.search,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/search`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getMemberdata(id) {
    var payload = {
      userid: id,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/getmember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getMemberSubscriptiondata(id) {
    var payload = {
      userid: id,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/getSubscription`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  checkMemberExpire(id) {
    var payload = {
      userid: id,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/chekexpire`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  adduserdata(user) {
    console.log("user");
    console.log(user);
    var payload = {
      username: user.username,
      password: user.password,
      directoryAccess: user.Access,
      FirstName: user.Firstname,
      LastName: user.LastName,
      Email: user.email,
      Phone: user.phone,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/addUser`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  adduserSubscription(payload) {
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/subscription`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  addAdminData(data, userid) {
    // //console.log(user.username)
    var payload = {
      userid: userid,
      username: data.username,
      directoryAccess: data.Access,
      FirstName: data.Firstname,
      LastName: data.lastname,
      Email: data.email,
      Phone: data.phone,
      Address_1: data.address1,
      Address_2: data.address2,
      zip: data.zip,
      city: data.city,
      State: data.state,
      Country: data.country,
      directory: data.Access,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/upload`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteuserdata(id) {
    var payload = {
      userid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/deleteuser`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getshopcataDetails() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/catagory`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  deleteshopcata(id) {
    var payload = {
      cataid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/catadelete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  addcategory(datas) {
    var payload = {
      cataheading: datas.cataheading,
      catadetails: datas.catadetails,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/addcata`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getcatagoryitems(id) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/getcata/` + id,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  editShopcata(datas, id) {
    var payload = {
      cataid: parseInt(id),
      cataheading: datas.cataheading,
      catadetails: datas.catadetails,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/updatecatas`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getshopDetails() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/getshopitems`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  deleteshopitem(id) {
    var payload = {
      shopid: parseInt(id),
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/shopdelete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addshopitems(datas) {
    var payload = {
      shopimage: datas.shopimage,
      shopHead: datas.shopHead,
      details: datas.details,
      usa: datas.usa,
      canada: datas.canada,
      other: datas.other,
      memberUsa: datas.memberUsa,
      memberCanada: datas.memberCanada,
      memberOther: datas.memberOther,
      cata_id: datas.catagory,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/addshop`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getShopitem(userid) {
    //    var payload={
    //       "shopid":parseInt(userid)
    //   }
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/getshop/` + userid,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  Updateshopitems(datas, prdid) {
    var payload = {
      shopid: parseInt(prdid),
      shopimage: datas.shopimage,
      shopHead: datas.shopHead,
      details: datas.details,
      usa: datas.usa,
      canada: datas.canada,
      other: datas.other,
      memberUsa: datas.memberUsa,
      memberCanada: datas.memberCanada,
      memberOther: datas.memberOther,
      cata_id: datas.catagory,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/shops/updateshop`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getdashboard() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/dashbord/uploads`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getgallery() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/gets/Blob`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deletegallery(imagename) {
    var payload = {
      imageName: imagename,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/uploads/Deletefile`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  // http://localhost:3000/api/v1.0/admin/uploads/Deletefile

  // upload items
  uploadimage(data) {
    var payload = {
      imageUrl: data,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/uploads/getUploaders`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  uploadmultimedia(data, datatype, extname, name) {
    var payload = {
      imagename: name,
      extname: extname,
      datatype: datatype,
      imagedata: data,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/upload/multimedia`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deletemultimediagallery(imagename) {
    var payload = {
      imageName: imagename,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/upload/Deletefile`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getmultimediagallery() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/upload/getmultimedia`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getmiscellaneousmediagallery() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/miscellaneous/getmedia`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deletemiscellaneousgallery(imagename) {
    var payload = {
      imageName: imagename,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/miscellaneous/Deletefile`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  uploadmiscellaneousmedia(data, datatype, extname, name) {
    var payload = {
      imagename: name,
      extname: extname,
      datatype: datatype,
      imagedata: data,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/miscellaneous/multimedia`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getadminusers(numbers, limit) {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/getadminmembers/` +
          limit +
          "/" +
          numbers,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getadmindata() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/getadminmembersdatas`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addadminDatauser(data) {
    var payload = {
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      flag: 1,
      shop: data.shop,
      image: data.image,
      link: data.links,
      article: data.articles,
      event: data.events,
      notification: data.notification,
      sentmail: data.sentmail,
      subscription: data.subscription,
      usermember: data.member,
      subadmin: data.subadmin,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/addadminuser`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getAdminSingleuser(id) {
    var payload = {
      adminid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/getadminmember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  adminuserupdate(data, id) {
    var payload = {
      adminid: id,
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      flag: 1,
      shop: data.shop,
      image: data.image,
      link: data.links,
      notification: data.notification,
      sentmail: data.sentmail,
      subscription: data.subscription,
      usermember: data.member,
      subadmin: data.subadmin,
      article: data.articles,
      event: data.events,
      miscellaneous: data.miscellaneous,
      multimedia: data.multimedia,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/uploadadmin`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteAdminusers(id) {
    var payload = {
      adminid: id,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/adminpanel/deleteAdminmember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  // login

  loginModule(datas) {
    var payload = {
      username: datas.Username,
      password: datas.password,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/login/adminlogin`,
        payload,
        { headers: this.Logingeader }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getmemberdatatoexport() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/user/getmembertoexport`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  // article cata

  getarticlecata() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/catagory`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  deletecataarticle(id) {
    var payload = {
      art_cataid: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/catadelete`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  addcategoryarticle(datas) {
    var payload = {
      cata_arthead: datas.cataheading,
    };
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/addcata`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getarticlecatasingleitem(id) {
    var payload = {};
    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/getcata/` + id,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  editArticlecata(datas, id) {
    var payload = {
      art_cataid: id,
      cata_arthead: datas.cataheading,
    };

    //console.log(payload)
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/article/updatecatas`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  // file

  // datainsertFile(file:File){
  //    // Create form data
  //    // const formData = new FormData();

  //    // // Store form name as "file" with file data
  //    // formData.append("uploadfile", file, file.name);

  //    // // Make http post request over api
  //    // // with formData as req
  //    // // return this.http.post(this.baseApiUrl, formData)

  //       const formData: FormData = new FormData();
  //       formData.append('files', file);
  //       //console.log(formData)
  //     return this.http.post<any>(`${environment.apiEndpoint}api/v1.0/admin/bulkupload/upload`,"",{headers: this.headertokrn}).pipe(map(result => {
  //        //console.log(result);

  //       }));

  // }

  datainsertFile(datas) {
    //console.log(datas)

    let fileList: FileList = datas;
    //console.log(fileList)
    if (fileList.length > 0) {
      let file: any = fileList[0];
      //console.log(file)
      let formData: FormData = new FormData();
      formData.append("files", file, file.name);
      //console.log(formData)

      return this.http
        .post<any>(
          `${environment.apiEndpoint}api/v1.0/admin/bulkupload/upload`,
          formData,
          { headers: this.image }
        )
        .pipe(
          map((result) => {
            //console.log(result);
            return result;
          })
        );
    } else {
      //console.log(0)
    }
  }

  getsearchcata() {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/getcata`,
        {},
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  uploadsearchdata(formdata, data, datatype, extname, name) {
    var payload = {
      imagename: name,
      extname: extname,
      datatype: datatype,
      imagedata: data,
      cataid: formdata.searchCata,
      iswatermrk: formdata.articlewatermark,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/addsearchdoc`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getsearchdata() {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/getallsearch`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deletesearchdata(id) {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/deletesearchitem/` +
          id,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getSearchCata() {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/getcata`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deletesearchCataitem(id) {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/deletecata/` + id,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addsearchcate(data) {
    var payload = {
      cataheading: data.cataheading,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/search/addcata`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getBoard() {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/boardmember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addboard(datas) {
    var payload = {
      name: datas.name,
      email: datas.email,
      position: datas.position,
      order: datas.order,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/addboard`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteboardmember(id) {
    var payload = {
      boardId: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/deleteboard`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  getadvisorymember() {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/advisorymember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  addadvisorymember(datas) {
    var payload = {
      name: datas.name,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/addadvisorymember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  deleteadvisorymember(id) {
    var payload = {
      AbId: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/board/deleteadvisorymember`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  // subscription

  create_subscription(data) {
    var payload = {
      packagename: data.packagename,
      usa: data.usa,
      canada: data.canada,
      otherworld: data.otherworld,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/create`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  get_subscription() {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/get`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  Activate_subscription(id) {
    var payload = {
      id: id,
    };
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/activate`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  Update_subscription(dataset, id) {
    console.log(dataset);

    var payload = {
      planId: id,
      planyear: dataset.planname,
      usa: dataset.usa,
      canada: dataset.canada,
      other: dataset.other,
    };

    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/update`,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
  getSingle_subscription(id) {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/get/` + id,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }

  delete_subscription(id) {
    var payload = {};
    return this.http
      .post<any>(
        `${environment.apiEndpoint}api/v1.0/admin/subscription/delete/` + id,
        payload,
        { headers: this.headertokrn }
      )
      .pipe(
        map((result) => {
          //console.log(result);
          return result;
        })
      );
  }
}
