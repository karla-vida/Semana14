import * as yup from 'yup'

export const createPizzaSchema = yup.object().shape({
  name:
    yup
      .string()
      .min(5, "Deve conter no mínimo 5 caracteres")
      .max(30)
      .required("Campo obrigatório"),
  description:
    yup
      .string()
      .min(10)
      .max(250)
      .required("Campo obrigatório"),
  limit_date: yup
    .string()
})