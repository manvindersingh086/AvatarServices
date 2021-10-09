function updatePayment()
{
    
    
    var bookingDate = new Date(document.getElementById("dateOfBooking").value)
    var returnDate = new Date(document.getElementById("dateOfReturn").value)

    var Difference_In_Time = returnDate.getTime() - bookingDate.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    var payment = parseInt(document.getElementById("totalPayment").value.split('$')[1])
     
    var totalP = '$' + String(payment*Difference_In_Days)

    document.getElementById("totalPayment").value = totalP
}