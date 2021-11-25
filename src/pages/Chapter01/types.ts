export interface IInvoicesProps{
    customer:string;
    performances:IPerformancesProps[];
    totalVolumeCredits:any;
    totalAmount:any
}

export interface IPerformancesProps{
    playID:string;
    audience:number;
    play?:any;
    amount?:any;
    volumeCredits?:any;
    totalVolumeCredits?:any;
}