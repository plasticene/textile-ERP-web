import { isFunction } from 'lodash'

export function useForm(options = {}) {
  const formRef = ref(null)

  const onValidate = callBack => {
    return new Promise((resolve, reject) => {
      formRef.value.validate(valid => {
        if (!valid) {
          reject(false)
          return
        }
        resolve(toRaw(options.formReactive) || true)
        isFunction(callBack) && callBack()
      })
    })
  }
  const onSubmit = async () => {
    await onValidate()
    isFunction(options.onSubmit) && options.onSubmit()
  }
  const onCancel = () => {
    isFunction(options.onCancel) && options.onCancel()
  }

  return { formRef, onSubmit, onValidate, onCancel }
}
