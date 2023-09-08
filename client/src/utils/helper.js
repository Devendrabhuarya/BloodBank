import moment from 'moment';

export const helper = (user) => {
    if (user.userType === 'doner') {
        return user.name;
    } else if (user.userType === 'hospital') {
        return user.hospitalName;
    } else {
        return user.orgnizationName;
    }
};

export const getAntdInputValidation = () => {
    return [
        {
            required: true,
            message: "required"
        }
    ];
};

export const getDateFormat = (date) => {
    return moment(date).format('DD MMM YYYY hh:mm');
}