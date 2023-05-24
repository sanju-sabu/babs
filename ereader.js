const { request } = require("express");
var sql = require("mssql");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const config = require("../dbconfig");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post
("/test", (req, res) => {
    res.send("working")
}) 

router.post("/get/:id", function (req, res) {
  try {
    sql.connect(config, function (err) {
      var request = new sql.Request();
      var getuser = "select * from EREADER where EREADER_ID = @id";
      request.input("id", sql.Int, req.params.id);
      request.query(getuser, function (err, recordset) {
        if (err) {
          res.status(200).json({
            status: false,
            msg: "something Error In data sent!..",
          });
        } else {
          num = recordset.rowsAffected;
          datas = recordset;
          if (num > 0) {
            var userdata = [];
            var users = {};
            for (let i = 0; i < num; i++) {
              users = {};
              users["EreaderId"] = recordset.recordset[i].EREADER_ID;
              users["Ereadertitle"] = recordset.recordset[i].EREADER_TITLE;
              users["Ereaderurl"] = recordset.recordset[i].EREADER_URL;
              users["Ereaderactive"] = recordset.recordset[i].FLAGS;
              users["Ereaderdate"] = recordset.recordset[i].EREADER_DATE;
              users["order"] = recordset.recordset[i].ORDERS;

              userdata.push(users);
            }

            res.status(200).json({
              status: true,
              datas: userdata,
            });
          } else {
            res.status(200).json({
              status: false,
              msg: "no user found",
            });
          }
        }
      });
    });
  } catch (err) {
    res.status(403).json({ status: false, msg: "something Error" });
  }
});

router.post("/", function (req, res) {
  try {
    sql.connect(config, function (err) {
      var request = new sql.Request();
      var getuser = "select * from EREADER  WHERE FLAGS=1  ORDER BY ORDERS ASC, EREADER_ID DESC";

      request.query(getuser, function (err, recordset) {
        if (err) {
          res.status(200).json({
            status: false,
            msg: "something Error In data sent!..",
          });
        } else {
          num = recordset.rowsAffected;
          datas = recordset;
          if (num > 0) {
            var userdata = [];
            var users = {};
            for (let i = 0; i < num; i++) {
              users = {};
              users["EreaderId"] = recordset.recordset[i].EREADER_ID;
              users["Ereadertitle"] = recordset.recordset[i].EREADER_TITLE;
              users["Ereaderurl"] = recordset.recordset[i].EREADER_URL;
              users["Ereaderactive"] = recordset.recordset[i].FLAGS;
              users["Ereaderdate"] = recordset.recordset[i].EREADER_DATE;
              users["order"] = recordset.recordset[i].ORDERS;

              userdata.push(users);
            }

            res.status(200).json({
              status: true,
              datas: userdata,
            });
          } else {
            res.status(200).json({
              status: false,
              msg: "no user found",
            });
          }
        }
      });
    });
  } catch (err) {
    res.status(403).json({ status: false, msg: "something Error" });
  }
});

router.post("/add", (req, res) => {
  var Ereadertitle = req.body.Ereadertitle;
  var Ereaderurl = req.body.Ereaderurl;
  var priority = req.body.priority;
  var flags = 1;
  const d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var dates = year + "-" + month + "-" + day;
  // console.log("Its working");

  try {
    sql.connect(config, function (err) {
      var request = new sql.Request();

      var sqlquery =
      "Insert Into EREADER (EREADER_TITLE,EREADER_URL,EREADER_DATE,FLAGS,ORDERS) VALUES(@Ereadertitle,@Ereaderurl,@Ereaderdate,@flag,@priority)";

      request.input("Ereadertitle", sql.Text, Ereadertitle);
      request.input("Ereaderurl", sql.Text, Ereaderurl);
      request.input("Ereaderdate", sql.Date, dates);
      request.input("priority", sql.Int, priority);
      request.input("flag", sql.Int, flags);
      request.query(sqlquery, function (err, recordset) {
        if (err) {
          res.status(200).json({
            status: false,
            msg: "Something error in data",
          });
        } else {
          datas = recordset;

          res.status(200).json({ status: true, msg: "Action done" });
        }
      });
    });
  } catch (err) {
    res.status(403).json({ status: false, msg: "something Error" });
  }
  // console.log(dates);
});

router.post("/update", (req, res) => {
  var EreaderId = req.body.EreaderId;
  var Ereadertitle = req.body.Ereadertitle;
  var Ereaderurl = req.body.Ereaderurl;
  var priority = req.body.priority;
 
  // console.log("testing");
  // console.log(EreaderId + " Hii");
  // console.log(res.Ereadertitle);

  if (!Ereadertitle && !Ereaderurl) {
    res.status(400).json({ status: false, msg: "something Error" });
  } else {
    try {
      sql.connect(config, function (err) {
        var request = new sql.Request();
        var sqlquery =
          "UPDATE EREADER  set EREADER_TITLE = @Ereadertitle,EREADER_URL = @Ereaderurl, ORDERS=@priority WHERE EREADER_ID = @EreaderId ";

        request.input("Ereadertitle", sql.Text, Ereadertitle);
        request.input("Ereaderurl", sql.Text, Ereaderurl);
        request.input("priority", sql.Int, priority);
        request.input("EreaderId", sql.Int, EreaderId);
        request.query(sqlquery, function (err, recordset) {
          if (err) {
            res.status(200).json({
              status: false,
              msg: "something Error In data sent!..",
            });
          } else {
            datas = recordset;

            res
              .status(200)
              .json({ status: true, msg: "Update successfully completed" });
          }
        });
      });
    } catch (err) {
      res.status(403).json({ status: false, msg: "something Error" });
    }
  }
  console.log(Ereaderurl);
});

router.post("/delete", (req, res) => {
  var EreaderId = req.body.EreaderId;
  try {
    sql.connect(config, function (err) {
      var request = new sql.Request();
      // var sqlquery = "DELETE FROM EREADER WHERE EREADER_ID = @EreaderId ";
      var sqlquery ="UPDATE EREADER  set FLAGS=0 WHERE EREADER_ID=@EreaderId ";
      request.input("EreaderId", sql.Int, EreaderId);
      request.query(sqlquery, function (err, recordset) {
        if (err) {
          res.status(200).json({
            status: false,
            msg: "something Error In data sent!..",
          });
        } else {
          datas = recordset;

          var num = recordset.rowsAffected.toString();
          if (num > 0) {
            res
              .status(200)
              .json({ status: true, msg: "Delete successfully completed" });
          } else {
            res.status(200).json({ status: false, msg: "No Item found" });
          }
        }
      });
    });
  } catch (err) {
    res.status(403).json({ status: false, msg: "something Error" });
  }
});

router.post("/flags", (req, res) => {
  var linkid = req.body.linkid;
  var flags = req.body.flags;

  if (!linkid && !flags) {
    res.status(400).json({ status: false, msg: "something Error" });
  } else {
    try {
      sql.connect(config, function (err) {
        var request = new sql.Request();
        var sqlquery =
          "UPDATE LINKS  set FLAGS = @flags WHERE EREADER_ID = @linkid ";

        request.input("flags", sql.Int, flags);
        request.input("linkid", sql.Int, linkid);
        request.query(sqlquery, function (err, recordset) {
          if (err) {
            res.status(200).json({
              status: false,
              msg: "something Error In data sent!..",
            });
          } else {
            datas = recordset;

            res
              .status(200)
              .json({ status: true, msg: "Update successfully completed" });
          }
        });
      });
    } catch (err) {
      res.status(403).json({ status: false, msg: "something Error" });
    }
  }
});

module.exports = router;
