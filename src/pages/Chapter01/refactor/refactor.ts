import createStatementData from './createStatementData';
import { IInvoicesProps } from '../types';

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
 * */
export function statement(invoice: IInvoicesProps, plays: any) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: IInvoicesProps) {
  let result = `Statement for ${data.customer}\n`;
  data.performances.map((perf: any) => {
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
  });
  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

/**
 * 重构手法:
 * 将函数赋值给临时变量
 * 改变函数声明(124)
 */
function usd(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber);
}
