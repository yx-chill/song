import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, email,
  min_value as minVal, max_value as maxVal, confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: '*此攔必填',
          min: '長度不足',
          max: '超過字數上限',
          email: '信箱輸入有誤',
          min_value: '字數不足',
          max_value: '超過字數上限',
          passwords_mismatch: '與密碼不相同',
        };
        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
