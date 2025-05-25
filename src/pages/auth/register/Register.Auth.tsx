import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useState } from 'react';
import {Controller, FormProvider, useForm} from "react-hook-form";
import { Password } from '@/components/ui/password.tsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRegister } from '@/store/reducers/users/users.reducer.ts';
import { toast } from "sonner"
import { initLoginData } from '@/assets/data.ts';
import { setCookie } from '@/helper/CookieManger.ts';
import { register } from '@/helper/DBManger.ts';


interface RegisterI{
  id: string;
  password: string;
  confirmPassword: string;
  keepSignIn: string;
}


const Register = () => {



  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterI>({
    defaultValues: initLoginData,
  })


  const handleSubmit = form.handleSubmit((payload) => {
    setIsLoading(true);
    setError("")
    if (payload.keepSignIn == 'true'){
          setCookie({id:payload.id})
    }
    register({
      id:payload.id,
      userId:payload.id,
      password:payload.password,
    }).then(()=>{
      toast.success("Register Successfully")
      dispatch(setRegister({
        id:payload.id,
        userId:payload.id,
      }))
      setIsLoading(false);
    }).catch(err=>{
      toast.error("Error",err.message)
      setIsLoading(false);
    })

  })



  const  password=form.watch("password")


  return   <div>
    <div className="mx-auto  w-full sm:w-[480px] sm:p-8">
      <h1 className="text-3xl font-medium text-center">Welcome to <span className="font-bold">myApp</span></h1>
      <span className="border border-2 border-gray-500 w-2/4 mx-auto mt-2 block"></span>

      <div className="bg-white shadow rounded-md p-5 mt-8">
        <form
          className="grid gap-y-6"
          onSubmit={handleSubmit}
        >
          {error&&<p className="text-red-500 text-sm font-semibold">{error}</p>}
          <FormProvider  {...form}>
            <Controller
              control={form.control}
              name="id"
              render={({ formState }) => {
                return (
                  <div data-slot="form-item" className="grid gap-2">
                    <Label data-slot="form-label"
                           data-error="false"
                           htmlFor="email"
                           className="gap-x-1"
                    >
                      <span className="text-red-500">*</span>User Id
                    </Label>
                    <Input  id="email"
                            {...form.register("id", {
                              required: "User Id is required",
                            })}
                    />
                    {formState.errors.id && <p className="text-red-500 text-sm font-semibold">{formState.errors.id.message}</p>}
                  </div>
                )
              }}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ formState }) => {
                return (
                  <div data-slot="form-item" className="grid gap-2 relative">
                    <Label data-slot="form-label"
                           data-error="false"
                           htmlFor="password"
                           className="gap-x-1"
                    >
                      <span className="text-red-500">*</span>Password
                    </Label>
                    <div className="relative rounded-md">
                      <Password
                        id="password"
                        {...form.register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                    </div>
                    {formState.errors.password && <p className="text-red-500 text-sm font-semibold">{formState.errors.password.message}</p>}
                  </div>
                )
              }}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ formState }) => {
                return (
                  <div data-slot="form-item" className="grid gap-2 relative">
                    <Label data-slot="form-label"
                           data-error="false"
                           htmlFor="confirmPassword"
                           className="gap-x-1"
                    >
                      <span className="text-red-500">*</span>Confirm Password
                    </Label>
                    <div className="relative rounded-md">
                      <Password
                        id="confirmPassword"
                        {...form.register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                    </div>
                    {formState.errors.confirmPassword && <p className="text-red-500 text-sm font-semibold">{formState.errors.confirmPassword.message}</p>}
                  </div>
                )
              }}
            />
            <Controller
              control={form.control}
              name="keepSignIn"
              render={() => {
                return (
                  <div data-slot="form-item" className="flex space-x-2 itmes-center">
                    <Input  id="checkbox"
                            type="checkbox"
                            className="w-5 h-5"
                            value="true"
                            {...form.register("keepSignIn")}
                    />
                    <Label data-slot="form-label"
                           data-error="false"
                           htmlFor="checkbox">
                      Keep me Logged In
                    </Label>
                  </div>
                )
              }}
            />
            <Button loading={isLoading} variant="default" type="submit">
              Register
            </Button>
          </FormProvider>

        </form>

        <p className="text-center mt-8">Already have an account? <Link to="/auth/login" className="font-semibold hover:text-blue-500 underline">Login here</Link></p>

      </div>

    </div>
  </div>
}
export default Register