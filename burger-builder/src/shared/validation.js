export const checkValidity = (value, rules) => {
    if (rules.required && value.trim() === '') {
        return false;
    }
    if (rules.minLength && value.trim().length < rules.minLength) {
        return false;
    }
    if (rules.maxLength && value.trim().length > rules.maxLength) {
        return false;
    }
    let pattern = /^\d+$/;
    if (rules.isNumeric && !pattern.test(value)) {
        return false;
    }
    pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (rules.isEmail && !pattern.test(value)) {
        return false;
    }

    // Input is valid
    return true;
};
