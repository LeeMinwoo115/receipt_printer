var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const base64url = require('base64url');

const escpos = require('escpos');
escpos.Network = require('escpos-network');

const device = new escpos.Network('192.168.31.200', 9100);

const options = { encoding: "GB18030" }

const printer = new escpos.Printer(device, options);

const print = () => {
  device.open(function(error) {
    printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text('The quick brown fox jumps over the lazy dog')
      .barcode('1234567', 'EAN8')
      .table(["One", "Two", "Three"])
      .tableCustom(
        [
          {text: "Left", align: "LEFT", width: 0.33, style: 'B'},
          {text: "Center", align: "CENTER", width: 0.33},
          {text: "Right", align: "RIGHT", width:0.33}
        ],
        {encoding: 'cp857', size: [1,1]}
      );
  });
};

const randomBase64URLBuffer = (length) => {
  length = length || 32;

  const buffer = crypto.randomBytes(length);

  return base64url(buffer);
}

router.post('/print', (req, res) => {
  print();
  res.json({ status: "success" });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
