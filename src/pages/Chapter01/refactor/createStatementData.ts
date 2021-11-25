import { IInvoicesProps, IPerformancesProps } from '../types';

export default function createStatementData(invoice:IInvoicesProps, plays:any) {

  const statementData: IInvoicesProps = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = appleSauce(statementData);
  return statementData;

  function enrichPerformance(aPerformance: IPerformancesProps) {
    const result: any = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  /**
   * 重构手法:
   * 函数应用搬移函数（198）
   */
  function playFor(aPerformance: IPerformancesProps) {
    return plays[aPerformance.playID];
  }

  /**
   * 分解 statement 函数.
   * 重构手法:
   * 提炼函数（106) 函数的返回值永远命名成result, 提炼函数的第一步应该是命名.
   * 函数应用搬移函数（198）
   */
  function amountFor(aPerformance: IPerformancesProps) {
    // 重命名变量.
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }
    return result;
  }

  /**
   * 提炼计算观众量积分的逻辑
   * 重构手法:
   * 提炼函数（106) 函数的返回值永远命名成result, 提炼函数的第一步应该是命名.
   * 函数应用搬移函数（198）
   * */
  function volumeCreditsFor(perf: IPerformancesProps) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ('comedy' === perf.play.type) result += Math.floor(perf.audience / 5);
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
  function totalVolumeCredits(data: IInvoicesProps) {
    // todo: 重构成reduce 计算方式.
    let result = 0;
    data.performances.map(perf => {
      result += perf.volumeCredits;
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
  function appleSauce(data: IInvoicesProps) {
    // todo: 重构成reduce 计算方式.
    let result = 0;
    data.performances.map(perf => {
      result += perf.amount;
    });
    return result;
  }
}
