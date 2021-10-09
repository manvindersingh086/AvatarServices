function validateFields(){
    var name = document.getElementById('Name').value
    var contact = document.getElementById('Contact').value
    var address = document.getElementById('Address').value
    var zip = document.getElementById('Zip').value
    var date = document.getElementById('Date').value
    var UIN = document.getElementById('UIN').value
    
    if(name == null || name == '' || name == undefined || contact == null 
    || contact == '' || contact == undefined|| address == '' || address ==undefined || address == null ||
    zip == '' || zip == undefined || zip == null || date == undefined || date == '' || date == null || 
    UIN == '' || UIN == undefined || UIN == null)
    {
        alert('Please fill required fields!')
        return false
    }

    return true
}

function fillState()
{
    var city = document.getElementById('City').value
    if (city == 'Sydney' || city == 'Wollongong' || city == 'Newcastle' || city == 'Griffith')
    {
        document.getElementById('State').value = 'NSW'
    }
    else if (city == 'Melbourn' || city == 'Geelong' || city == 'Sunbury')
    {
        document.getElementById('State').value = 'VIC'
    }
    else  if (city == 'Brisbane' || city == 'GoldCoast')
    {
        document.getElementById('State').value = 'QLD'
    }
}