import {IInvoicesProps} from './types';

const plays = {
    hamlet:{
        name:'Hamlet',
        type:'tragedy'
    },
    like:{
        name:'As You Like It',
        type:'comedy'
    },
    othello:{
        name:'Othello',
        type:'tragedy'
    }
};

const invoices: IInvoicesProps[] = [
    {
        customer:'BigCo',
        performances:[
            {
                playID:'hamlet',
                audience: 55
            },
            {
                playID:'like',
                audience: 35
            },
            {
                playID:'othello',
                audience: 40
            }
        ]
    }
];

export {
    plays,
    invoices
}