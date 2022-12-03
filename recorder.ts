import { Cap } from 'cap';
import { PROTOCOL, decoders } from '@livedds/decoders'; // Private repo
import DataStorage from 'dataStorage.ts';

class Recorder {
    private capture:Cap;
    private device:any;
    private filter:string;
    private buffer:Buffer;
    private bufSize:number;
    private linkType:any;

    constructor(){
        this.capture = new Cap();
        this.device = Cap.findDevice('192.168.1.1');
        this.filter = 'RTPS';
        this.bufSize = 10 * 1024 * 1024;
        this.buffer = Buffer.alloc(65535);
    }

    private startCapture(): void{
        this.linkType = this.capture.open(this.device, this.filter, this.bufSize, this.buffer);
        this.capture('packet', this.packetHandler);
    }

    private stopCapture(): void{
        this.linkType = this.capture.open(this.device, this.filter, this.bufSize, this.buffer);
        this.capture('packet', this.packetHandler);
    }

    private packetHandler(nbytes: number, trunc: boolean): void{
        console.log('packet: length ' + nbytes + ' bytes, truncated? ' + (trunc ? 'yes' : 'no'));
        let ret!:any;
        if (this.linkType === 'ETHERNET') {
            ret = decoders.Ethernet(this.buffer);
            let data = decoders.RTPS(this.buffer, ret.offset);
            DataStorage.dataArrived(data);
        }
        else
            console.log('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[ret.info.type]);
    }
}