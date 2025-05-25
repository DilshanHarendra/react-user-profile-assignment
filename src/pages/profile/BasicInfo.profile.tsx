import { Link, useLocation } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserType } from '@/store/reducers/users/types.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { updateUser } from '@/helper/DBManger.ts';
import { toast } from 'sonner';
import { updateUser as updateUserStore } from '@/store/reducers/users/users.reducer.ts';
import { useDispatch } from 'react-redux';


const BasicInfo = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const isProfile =location.pathname === '/profile';
  const user = useAppSelector((state) => state.user.user);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserType>({
    defaultValues: {
      ...user
    },
  })


  const handleSubmit = form.handleSubmit((payload) => {
    setIsLoading(true);
    setError("")
    updateUser({
      ...payload,
      id: `${user?.id}`,

    }).then(()=>{

      dispatch(updateUserStore({
       ...payload
      }))
      toast.success("User Update Successfully")
      setIsLoading(false);
    }).catch(err=>{
      console.log(err)
      toast.error("Error",err.message)
      setIsLoading(false);
    })
  })


  return  <>
    {
      isProfile?
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="font-semibold">Salutation</h2>
            <p>{user?.salutation||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">First Name</h2>
            <p>{user?.firstName||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Last Name</h2>
            <p>{user?.lastName||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Email address</h2>
            <p>{user?.email||'No data'}</p>
          </div>
        </div>
        :
        <>
          <form
            className="grid gap-y-6 w-full md:w-3/4"
            onSubmit={handleSubmit}
          >
            {error&&<p className="text-red-500 text-sm font-semibold">{error}</p>}
            <FormProvider  {...form}>
              <Controller
                control={form.control}
                name="salutation"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="salutation"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Salutation
                      </Label>
                      <Select
                        onValueChange={field.onChange} defaultValue={field.value}
                      >
                        <SelectTrigger id="salutation" className="w-full">
                          <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                        </SelectContent>
                      </Select>
                      {formState.errors.salutation && <p className="text-red-500 text-sm font-semibold">{formState.errors.salutation.message}</p>}
                    </div>
                  )
                }}
              />


                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ formState }) => {
                    return (
                      <div data-slot="form-item" className="grid gap-2">
                        <Label data-slot="form-label"
                               data-error="false"
                               htmlFor="firstName"
                               className="gap-x-1"
                        >
                          <span className="text-red-500">*</span>First Name
                        </Label>
                        <Input  id="firstName"
                                {...form.register("firstName", {
                                  required: "First name is required",
                                })}
                        />
                        {formState.errors.firstName && <p className="text-red-500 text-sm font-semibold">{formState.errors.firstName.message}</p>}
                      </div>
                    )
                  }}
                />

              <Controller
                control={form.control}
                name="lastName"
                render={({ formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="lastName"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Last Name
                      </Label>
                      <Input  id="lastName"
                              {...form.register("lastName", {
                                required: "Last name is required",
                              })}
                      />
                      {formState.errors.lastName && <p className="text-red-500 text-sm font-semibold">{formState.errors.lastName.message}</p>}
                    </div>
                  )
                }}
              />

              <Controller
                control={form.control}
                name="email"
                render={({ formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="email"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Email Address
                      </Label>
                      <Input  id="email"
                              {...form.register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                                },
                              })}
                      />
                      {formState.errors.email && <p className="text-red-500 text-sm font-semibold">{formState.errors.email.message}</p>}
                    </div>
                  )
                }}
              />

               <div className="flex items-center space-x-2">
                 <Button loading={isLoading} variant="default" type="submit" className="w-fit">
                   Save & Update
                 </Button>
                 <Link to="/profile">
                   <Button loading={isLoading} variant="secondary" type="button" className="w-fit">
                     Cancel
                   </Button>
                 </Link>
               </div>
            </FormProvider>

          </form>
        </>
    }
  </>
}
export default BasicInfo