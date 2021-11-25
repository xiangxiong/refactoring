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
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: IInvoicesProps) {

  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result +=
    "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(
    data.totalAmount
  )}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
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


/**
 *  总结:
 *  代码行数由我开始重构时的 44 行增加到了 70 行（不算 htmlStatement），这主要是将代码抽取到函数里带来的额外包装成本。虽然代码的行数增加了，但重构也带来了代码可读性的提高。额外的包装将混杂的逻辑分解成可辨别的部分，分离了详单的计算逻辑与样式。这种模块化使我更容易辨别代码的不同部分，了解它们的协作关系。虽说言以简为贵，但可演化的软件却以明确为贵。通过增强代码的模块化，我可以轻易地添加 HTML 版本的代码，而无须重复计算部分的逻辑。
    Tip
    编程时，需要遵循营地法则：保证你离开时的代码库一定比来时更健康。
    其实打印逻辑还可以进一步简化，但当前的代码也够用了。我经常需要在所有可做的重构与添加新特性之间寻找平衡。在当今业界，大多数人面临同样的选择时，似乎多以延缓重构而告终——当然这也是一种选择。我的观点则与营地法则无异：保证离开时的代码库一定比你来时更加健康。完美的境界很难达到，但应该时时都勤加拂拭。
 */