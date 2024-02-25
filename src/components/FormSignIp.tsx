"use client";
import React from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
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
  email: z.string().email({
    message: "El email no es valido",
  }),
  password: z.string().min(6, {
    message: "La Contraseña debe tener como minimo 6 caracteres.",
  }),
});

type InputFieldType = {
  email: string;
  password: string;
};

const FormSignIp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    const { email, password } = values;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res?.error);
      return toast.success("El email o la contraseña no son validas.");
    }

    if (res?.ok) return router.push("/protected/home")
  }

  const fields = [
    { name: "email", label: "Email", colSpan: "col-span-2", type: "email" },
    {
      name: "password",
      label: "password",
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
                    <FormItem className="!w-full">
                      <FormLabel
                        className="text-lg font-bold"
                        htmlFor={fieldInfo.name}
                      >
                        {fieldInfo.label}
                      </FormLabel>
                      <FormControl className="!w-full">
                        <Input
                          className="py-6 !w-full bg-gray-50 focus-visible:outline-blue-700 focus-visible:ring-0 ring-offset-blue-700"
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
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSignIp;