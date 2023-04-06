// Listen for sumbit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000)
    e.preventDefault()
})

//Calculate Results
function calculateResults(){
    console.log('calculating...');
    //UI Variables
    const amount = document.getElementById('amount')
    const interest = document.getElementById('interest')
    const yearsToRepay = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')
    console.log(amount.value, interest.value, yearsToRepay.value);

    const principal = parseFloat(amount.value) 
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayment = parseFloat(yearsToRepay.value) * 12

    //calculate monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayment).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2)
        //show results
        document.getElementById('results').style.display = 'block';
        //hide loading
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check enetered numbers')
    }

}

//show error
function showError(error){
    //hide loading
    document.getElementById('loading').style.display = 'none';
    //hide results
    document.getElementById('results').style.display = 'none';
    //create div
    const errorDiv = document.createElement('div')
    //get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
    //add class
    errorDiv.className = 'alert alert-danger'
    //create text node
    errorDiv.appendChild(document.createTextNode(error))
    //insert error above heading
    card.insertBefore(errorDiv, heading)
    //clear error after 3 seconds
    setTimeout(clearError, 3000)
}

//clear error
function clearError(){
    document.querySelector('.alert').remove()
}