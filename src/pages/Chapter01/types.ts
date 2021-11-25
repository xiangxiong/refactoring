export interface IInvoicesProps{
    customer:string;
    performances:IPerformancesProps[]
}

export interface IPerformancesProps{
    playID:string;
    audience:number;
}