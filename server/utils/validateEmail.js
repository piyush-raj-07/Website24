const validateEmail = (email) => {
    const isValidDomain = email.endsWith('@iiti.ac.in') || email.endsWith('@iiti.alum.ac.in');
    const isEEStudent = email.startsWith('ee') || email.startsWith('EE');

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
            error: 'Email must be from IIT Indore domain'
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
