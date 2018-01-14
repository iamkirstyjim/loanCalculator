/* By default, the interest rate is set to 6 percent. */
$(document).ready( function() {
  $("#calculate").on("click", function () {
    var loanAmount = $("#loanAmount").val();
    var numPeriods = $("#loanPeriod").val() * 12; //converting years into months
    var totalIntPay = calcTotalIntPay(loanAmount, numPeriods);
    $("#totalIntPay").html("$" + totalIntPay.toFixed(2));
    var monthlyPay = calcMonthlyPay(loanAmount, numPeriods);
    $("#monthlyPay").html("$" + monthlyPay.toFixed(2));
  });
});

function calcMonthlyPay(loan, numPeriods) {
  var presentVal = loan;
  var monthlyRate = (( 6 / 100.0) / 12.0); //convert percentage into decimal 
  var monthlyPay = ((monthlyRate * presentVal) / (1 - Math.pow((1 + monthlyRate), -numPeriods)));
  return monthlyPay; 
}

function calcTotalIntPay(loan, numPeriods) {
  var monthlyRate = (( 6 / 100.0) / 12.0); //convert percentage into decimal
  var presentVal = loan;
  var sum = 0.0, principalPay = 0.0, interestPay = 0.0; //declare variables 
  var monthlyPay = ((monthlyRate * presentVal) / (1 - Math.pow((1 + monthlyRate), -numPeriods)));
  for(var i = 0; i < numPeriods; i++) {
    interestPay = presentVal * monthlyRate;
    principalPay = monthlyPay - interestPay; 
    presentVal -= principalPay;
    sum += interestPay;
  }
  return sum;
}
