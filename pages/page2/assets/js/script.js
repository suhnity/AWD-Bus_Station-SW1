document.getElementById('next-button').addEventListener('click', function(event) {
    const form = document.getElementById('registration-form');
    const requiredFields = form.querySelectorAll('input[required]');
    let isFormValid = true;

    requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
            isFormValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });

    if (isFormValid) {
        window.location.href = '../page3/index.html';
    } else {
        alert('Please fill in all required fields.');
    }
});