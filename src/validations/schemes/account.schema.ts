export const accountSchema = {
    name: {
        required: true
    },
    email: {
        type: "email",
        required: true
    },
    password: {
        min: 5,
        required: true
    }
}