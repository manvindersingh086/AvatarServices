// function downloadCard(){
//     var status = document.getElementById('status').innerHTML
//     if (status == 'Pending') {
//         document.getElementById("card").hidden = true;
//     }
//     else
//     {
//         document.getElementById("card").hidden = false;
//     }
// }

function validateAddress()
{
    var oldAddress = document.getElementById('oldAddress').value.trim()
    var newAddress = document.getElementById('address').value.trim()

    if(oldAddress != newAddress)
    {
        document.getElementById('addressProof').disabled = false;
        document.getElementById('subm').disabled = false; 
    }
    else
    {
        document.getElementById('addressProof').disabled = true;
        document.getElementById('subm').disabled = true; 
          
    }
}

function validateName()
{
    var oldName = document.getElementById('oldName').value.trim()
    var newName = document.getElementById('Name').value.trim()

    if(oldName != newName)
    {
        document.getElementById('identityProof').disabled = false;
        document.getElementById('subm').disabled = false;   
    }
    else
    {
        document.getElementById('identityProof').disabled = true;
        document.getElementById('subm').disabled = true; 
    } 
}

function validateDateOfBirth()
{
    var dob = new Date(document.getElementById("dob").value)

    var today = new Date()


    if(dob.getDay() == today.getDay() && dob.getMonth() == today.getMonth() && dob.getFullYear() == today.getFullYear())
    {
        alert('Invalid Date of Birth!')
        document.getElementById("dob").value = ''
    }
    if(dob > today)
    {
        alert('Invalid Date of Birth!')
        document.getElementById("dob").value = ''
    }

    var diff = today.getFullYear()-dob.getFullYear()
    if(diff <= 17)
    {
        alert('Invalid Date of Birth!')
        document.getElementById("dob").value = ''
    }
}

function validateEmail()
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = document.getElementById('email').value
    if(email.match(mailformat))
    {

    }
    else
    {
    alert("You have entered an invalid email address!");
    document.getElementById("email").value = ''
    }
}

function validatefiletype(name)
{
    var filetype = document.getElementById(name).value.split('.')
    if(filetype[1] != 'pdf')
    {
        alert('Invalid File Type!')
        document.getElementById(name).value = ''
    }
}