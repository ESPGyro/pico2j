const PG_ADDR = 0x66;
let send_id = 255;
//% color="#AA278D" icon="\uf2dc" weight=50
namespace Picogame {
  function readmsg(): number {
    let i2cbuf = pins.createBuffer(1);
    i2cbuf[0] = send_id;
  try {
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);
        let receivedData = readbuf[0];

        if (receivedData !== undefined) {
            return receivedData;
        } else {
            return null;
        }
    } catch (error) {
        // 處理錯誤或返回特定的錯誤值
        return null; // 或者選擇返回其他適當的值來表示錯誤狀況
    }
}
	
    //% blockId="sensor_read" block="Receive data"
    export function i2cRead(): number {
	let i2cbuf = pins.createBuffer(1);
          i2cbuf[0] = send_id; 
try {
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);
        let receivedData = readbuf[0];

        if (receivedData !== undefined) {
            return receivedData;
        } else {
            return null;
        }
    } catch (error) {
        return null; // 或者選擇返回其他適當的值來表示錯誤狀況
    }
    }

    //% blockId="sensor_write" block="Broadcast value |%v"
    //% v.min=0 v.max=200
    export function i2cwrite(v: number): void {
	let i2cbuf1 = pins.createBuffer(1);
        i2cbuf1[0] = v;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf1);
    }	
    //% blockId="read_loop" block="onReceivedMessage"
    //% draggableParameters
  export function onReceivedMessage(handler: (rev_data: number) => void): void {
     game.onUpdate(function () {
     let rev_data = readmsg();
        if (rev_data !== 0 && rev_data !== 231) {
            handler(rev_data);
        }
    });
 }	
}
