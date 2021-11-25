import { IInvoicesProps, IPerformancesProps } from '../types';

/**
 * 设想有一个戏剧演出团，演员们经常要去各种场合表演戏剧。通常客户（customer）会指定几出剧目，
 * 而剧团则根据观众(audience)人数及剧目类型来向客户收费。该团目前出演两种戏剧：悲剧(tragedy)和喜剧(comedy)
 * 给客户发出账单时，剧团还会根据到场观众的数量给出“观众量积分”（volume credit）优惠，
 * 下次客户再请剧团表演时可以使用积分获得折扣——你可以把它看作一种提升客户忠诚度的方式.
 * 
 * 应用重构的手法:
 */

/**
 * 重构手法:
 *  拆分阶段(154)
 *  提炼函数(106)
 * 
 *  1、增加中转数据结构.
 * 
 * */
export function statement(invoice:IInvoicesProps,plays:any){
    const statementData:IInvoicesProps = {
        customer:invoice.customer,
        performances:invoice.performances.map(enrichPerformance)
    };

    return renderPlainText(statementData,plays);
    
    function enrichPerformance(aPerformance:IPerformancesProps){
        const result = Object.assign({},aPerformance);
        return result;
    }
}

function renderPlainText(data:IInvoicesProps, plays:any) {
  let result = `Statement for ${data.customer}\n`;
  data.performances.map((perf) => {
    const play = playFor(perf,plays);
    // print line for this order
    result += ` ${play.name}: ${usd(amountFor(play, perf) / 100)} (${perf.audience} seats)\n`;
  });
  result += `Amount owed is ${usd(appleSauce(data,plays) / 100)}\n`;
  result += `You earned ${totalVolumeCredits(data,plays)} credits\n`;
  return result;
}

/**
 * 重构手法:
 *  拆分循环(227)
 *  移动语句(223)
 *  查询取代临时变量(178)
 *  提炼函数(106)重命名.
 *  内联变量(123)
*/
function appleSauce(invoice: IInvoicesProps, plays: any){
    let result = 0;
    invoice.performances.map((perf)=>{
      const play = playFor(perf,plays);
      result += amountFor(play, perf);
    });
    return result;
}

/**
 * 重构手法:
 *  拆分循环(227)
 *  移动语句(223)
 *  查询取代临时变量(178)
 *  提炼函数(106)重命名.
 *  内联变量(123)
*/
function totalVolumeCredits(invoice:IInvoicesProps,plays:any){
    let result = 0;
    invoice.performances.map((perf)=>{
      result = volumeCreditsFor(perf,plays);
    });
    return result;
}

/**
 * 重构手法:
 * 将函数赋值给临时变量
 * 改变函数声明(124)
 */
function usd(aNumber:number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(aNumber);
}

/**
 * 提炼计算观众量积分的逻辑
 * 重构手法:
 * 提炼函数（106) 函数的返回值永远命名成result, 提炼函数的第一步应该是命名.
 * */
function volumeCreditsFor(perf:IPerformancesProps,plays:any){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ('comedy' === playFor(perf,plays).type)
    result += Math.floor(perf.audience / 5);
    return result;
}

/**
 * 重构手法: 
 * 查询取代临时变量(178).
 */
function playFor(aPerformance:IPerformancesProps,plays:any){
    return plays[aPerformance.playID];
}

/**
 * 分解 statement 函数.
 * 重构手法:
 * 提炼函数（106) 函数的返回值永远命名成result, 提炼函数的第一步应该是命名.
 */
function amountFor(play: any, aPerformance: IPerformancesProps) {
    // 重命名变量.
    let result = 0;
    switch (play.type) {
        case 'tragedy':
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case 'comedy':
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

