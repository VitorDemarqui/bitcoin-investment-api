
const passwordLength = 5;

export const accountSchema = {
    name: {
        required: true
    },
    email: {
        type: "email",
        required: true
    },
    password: {
        min: passwordLength,
        required: true
    }
}

export const loginSchema = {
    email: {
        type: "email",
        required: true
    },
    password: {
        min: passwordLength,
        required: true
    }
}