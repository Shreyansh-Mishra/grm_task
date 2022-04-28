var express = require('express');
var router = express.Router();
var Report = require('../models/Report');
/* GET home page. */
router.get('/reports', async (req, res) => {
  let reportID = req.query.reportID;
  let report = await Report.findOne({ _id: reportID });
  res.json({ report });
});

router.post('/reports', async(req,res)=>{
  let exists = await Report.findOne({marketID: req.body.marketID, cmdtyID: req.body.cmdtyID});
  if(exists==null){
  let report = new Report({
    cmdtyName: req.body.cmdtyName,
    cmdtyID: req.body.cmdtyID,
    marketID: req.body.marketID,
    marketName: req.body.marketName,
    priceUnit: "kg",
    price: req.body.price/req.body.convFctr,
  });
  report.users.push(req.body.userID);
  await report.save();
  res.json({
    status: "success",
    reportID: report._id,
  });
  }
  else{
    exists.users.push(req.body.userID);
    price=exists.price;
    price=(price+(req.body.price/req.body.convFctr))/2;
    exists.price=price;
    await exists.save();
    res.json({
      status: "success",
      reportID: exists._id,
    });
  }
})

module.exports = router;
