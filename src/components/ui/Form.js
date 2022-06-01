import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Field } from "./Field";



export const Form = forwardRef(({
  data,
  schema,
  handle,
  cancel,
  buttonsNames,
  formLayout,
}, ref) => {

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  
  useImperativeHandle(ref, () => ({
      setValues: (name, value) => {
        console.log("first")
        methods.setValue(name, value)
      }
    })
  )
  // console.log(methods.formState.errors, "errors")
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handle)}>
        <div {...formLayout}>
          {data.map((item) => {
            return (
              <div {...item.fieldLayout}>
                <Field
                  key={item.id}
                  type={item.component}
                  name={item.name}
                  defaultValue={item.defaultValue}
                  props={item.props}
                  label={item.label}
                />
              </div>
            );
          })}
        </div>
        {buttonsNames.length > 0 ? (
          <div className="flex justify-content-end mt-3">
            { buttonsNames[0] && <Button
              label={buttonsNames[0]}
              icon="pi pi-check"
              className="p-button-text p-text-primary"
              style={{color: "var(--primary-color-hover)"}}
              type="submit"
            />}
            {buttonsNames[1] && <Button
              label={buttonsNames[1]}
              type="button"
              icon="pi pi-times"
              className="p-button-text"
              style={{color: "var(--primary-color-hover)"}}
              onClick={() => cancel()}
            />}
          </div>
        ) : undefined}
      </form>
    </FormProvider>
  );
}
)
