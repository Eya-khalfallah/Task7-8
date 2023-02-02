function checkCashRegister(price, cash, cid) {
    const currencyUnit = {PENNY: 0.01,NICKEL: 0.05,
        DIME: 0.1,QUARTER: 0.25,
        ONE: 1,FIVE: 5,
        TEN: 10,TWENTY: 20,"ONE HUNDRED": 100};
  
    let changeDue = cash - price;
    let totalCid = cid.reduce((a, c) => a + c[1], 0);
    if (changeDue > totalCid) return { status: "INSUFFICIENT_FUNDS", change: [] };
    if (changeDue === totalCid) return { status: "CLOSED", change: cid };
  
    let change = cid
      .reverse()
      .reduce((a, c) => {
        let v = 0;
        while (changeDue >= currencyUnit[c[0]] && c[1] > 0) {
          changeDue -= currencyUnit[c[0]];
          c[1] -= currencyUnit[c[0]];
          v += currencyUnit[c[0]];
          changeDue = Math.round(changeDue * 100) / 100;
        }
        if (v > 0) a.push([c[0], v]);
        return a;
      }, [])
  
  
    return change.length > 0 && changeDue === 0
      ? { status: "OPEN", change }
      : { status: "INSUFFICIENT_FUNDS", change: [] };
  }
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])) 
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])) 