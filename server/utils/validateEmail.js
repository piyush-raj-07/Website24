const validateEmail = (email) => {
    const isValidDomain = email.endsWith('@iiti.ac.in');
    const isEEStudent = email.startsWith('ee');

    // check basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);

    if (!isValidFormat) {
        return {
            isValid: false,
            error: 'Invalid email format'
        };
    }

    if (!isValidDomain) {
        return {
            isValid: false,
            error: 'Email must be from IIT Indore domain (@iiti.ac.in)'
        };
    }

    if (!isEEStudent) {
        return {
            isValid: false,
            error: 'Only Electrical Engineering students are allowed to register'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

module.exports = validateEmail;
