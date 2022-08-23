const escpos = require('escpos');
escpos.Network = require('escpos-network');

const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;

// const networkDevice = new escpos.Network('sicpama.hopto.org', 9100);
const networkDevice = new escpos.Network('192.168.31.200', 9100);
// const networkDevice = new escpos.Network('172.30.1.100', 9100);
// const networkDevice = new escpos.Network('wok.hopto.org', 9100);
const printer = new escpos.Printer(networkDevice);
//210.123.94.242 -> 유방녕의 웍 공인 ip 주소
//wok.hopto.org:9100

// let thermalPrinter = new ThermalPrinter({
//     type: PrinterTypes.EPSON,
//     // interface: 'https://sicpama.hopto.org:9100',
//     // interface: 'tcp://221.147.62.136:9100',
//     interface: 'tcp://192.168.31.200:9100',
//     characterSet: 'KOREA',
//     lineCharacter: "="
// });

// try{
//     const isConnected = thermalPrinter.isPrinterConnected();
//     console.log(isConnected);
//     thermalPrinter.setTypeFontA();
//     thermalPrinter.setTextSize(1,1);
//     thermalPrinter.println('가나다라마바사아자차카');
//     thermalPrinter.println('the fox is lazy');
//     thermalPrinter.println('test2');
//     thermalPrinter.print('test3');
//     thermalPrinter.cut();
//     thermalPrinter.execute();
// } catch (error) {
//     console.log(error);
// }

networkDevice.open(function(err){
    printer
        .hardware('init')
        .encode('EUC-KR')
        .font('a')
        .align('ct')
        .style('bu')
        .size(0, 1)
        .text('테스트출력')
        .text('The quick brown fox jumps over the lazy dog')
        .color(1)
        .text('This line should be red')
        .color(0)
        .cut()
        .close()
});
