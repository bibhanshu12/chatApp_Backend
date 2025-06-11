import { z } from "zod/v4";

export const Signup= z.object(
    {
    email:z.string().nonempty().transform((val)=> val.toLowerCase()),
    fullName:z.string().nonempty(),
    password:z.string().nonempty().min(6,"Password must be more then 6 characters!")
}
);

export const Login= z.object(
    {
    email:z.string().nonempty(),
    password:z.string().nonempty().min(6,"Password Must be more then 6 characters!! ")
}
)
