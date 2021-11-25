import { IInvoicesProps, IPerformancesProps } from '../types';

/**
 * 设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。通常客户（customer）会指定几出剧目，
 * 而剧团则根据观众(audience)人数及剧目类型来向客户收费。该团目前出演两种戏剧：悲剧(tragedy)和喜剧(comedy)
 * 给客户发出账单时，剧团还会根据到场观众的数量给出“观众量积分”（volume credit）优惠，
 * 下次客户再请剧团表演时可以使用积分获得折扣——你可以把它看作一种提升客户忠诚度的方式.
 * 
 * 应用重构的手法:
 *  
 */
export function statement(invoice: IInvoicesProps, plays: any) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  invoice.performances.map((perf) => {

    /**
     * 重构手法: 
     *  查询取代临时变量(178).
     */
    const play = playFor(perf,plays);
    // add volume credits
    volumeCredits = getVolumeCredits(volumeCredits, perf, play);
    // print line for this order
    result += ` ${play.name}: ${format(amountFor(play, perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(play, perf);
  });

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function playFor(aPerformance:IPerformancesProps,plays:any){
    return plays[aPerformance.playID];
}

function getVolumeCredits(volumeCredits: number, perf: IPerformancesProps, play: any) {
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type)
        volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}


/**
 * 分解 statement 函数.
 * 重构手法:
 * 提炼函数（106)
 */
function amountFor(play: any, perf: IPerformancesProps) {
    let thisAmount = 0;
    switch (play.type) {
        case 'tragedy':
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case 'comedy':
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

