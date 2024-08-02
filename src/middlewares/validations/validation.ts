import { NextFunction, Request, Response } from "express"

const validationRegex: any = {
    email: {
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  }
  
  
  function validate(schema: any) {
    const validation = (request: Request, response: Response, next: NextFunction) => {
  
      const { body }: any = request;
      const errors: string[] = [];
  
      Object.keys(schema).forEach(item => {
  
  
        const itemSchema = schema[item]
  
        if (itemSchema.required && !body[item]) {
          errors.push(`${item} is required!`);
          return;
        }

        if (itemSchema.minValue && (body[item] < itemSchema.minValue)) {
          errors.push(`${item} - The minimum value is ${itemSchema.minValue}!`)
        }
  
        if (itemSchema.maxValue && (body[item] > itemSchema.maxValue)) {
          errors.push(`${item} - The maximum value is ${itemSchema.maxValue}!`)
        }
  
        if (itemSchema.minLength && (body[item].length < itemSchema.minLength)) {
          errors.push(`${item} - The minimum size is ${itemSchema.minLength}!`)
        }
  
        if (itemSchema.maxLength && (body[item].length > itemSchema.maxLength)) {
          errors.push(`${item} - The maximum size is ${itemSchema.maxLength}!`)
        }
  
        const regexItem: any = validationRegex[item];
  
        if (regexItem && (!new RegExp(regexItem.regex).test(body[item]))) {
          errors.push(`${item} is in the wrong format!`)
        }
  
      })

      if (errors.length > 0) return response.status(400).json(errors)
  
      return next();
    }
  
    return validation;
  }
  
  
  export { validate }