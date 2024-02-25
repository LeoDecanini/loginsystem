"use client";
import React, { FormEvent, useState, useEffect } from "react";

import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, {
      message: "El nombre debe tener como minimo 2 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como maximo 50 caracteres",
    }),
  email: z.string().email({
    message: "El email no es valido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener como minimo 6 caracteres.",
  }),
});

type InputFieldType = {
  fullname: string;
  email: string;
  password: string;
};

const FormSignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFieldType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: values.email,
        password: values.password,
        fullname: values.fullname,
      });

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) return router.push("/protected/home")

      console.log(signupResponse);
      toast.success("Usuario creado correctamente");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);

        if (error.response?.data.error === "El usuario ya existe") {
          toast.error("El usuario ya existe");
        } else {
          toast.error("Error desconosido al crear usuario");
        }
      }
    }
  }

  const fields = [
    { name: "fullname", label: "Nombre", colSpan: "col-span-1", type: "text" },
    { name: "email", label: "Email", colSpan: "col-span-1", type: "text" },
    {
      name: "password",
      label: "contraseña",
      colSpan: "col-span-2",
      type: "password",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-8">
        <div className="w-full grid gap-y-2 gap-x-4 grid-cols-2 py-4">
          {fields.map((fieldInfo: any) => (
            <div key={fieldInfo.name} className={`${fieldInfo.colSpan}`}>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name={fieldInfo.name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-lg font-bold"
                        htmlFor={fieldInfo.name}
                      >
                        {fieldInfo.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-6 bg-gray-50 focus-visible:outline-blue-700 focus-visible:ring-0 ring-offset-blue-700"
                          id={fieldInfo.name}
                          type={fieldInfo.type}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 w-full flex sm:justify-start justify-center">
          <Button type="submit" className="py-6 px-10 bg-blue-700">
            Registrarse
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSignUp;
