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


const SpouseInfo = () => {

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
            <p>{user?.spouse?.salutation||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">First Name</h2>
            <p>{user?.spouse?.firstName||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Last Name</h2>
            <p>{user?.spouse?.lastName||'No data'}</p>
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
                name="spouse.salutation"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="spouse-salutation"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Salutation
                      </Label>
                      <Select
                        onValueChange={field.onChange} defaultValue={field.value}
                      >
                        <SelectTrigger id="spouse-salutation" className="w-full">
                          <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                        </SelectContent>
                      </Select>
                      {formState.errors.spouse?.salutation && <p className="text-red-500 text-sm font-semibold">{formState.errors.spouse.salutation.message}</p>}
                    </div>
                  )
                }}
              />


                <Controller
                  control={form.control}
                  name="spouse.firstName"
                  render={({ formState }) => {
                    return (
                      <div data-slot="form-item" className="grid gap-2">
                        <Label data-slot="form-label"
                               data-error="false"
                               htmlFor="spouse-firstName"
                               className="gap-x-1"
                        >
                          <span className="text-red-500">*</span>First Name
                        </Label>
                        <Input  id="spouse-firstName"
                                {...form.register("spouse.firstName", {
                                  required: "First name is required",
                                })}
                        />
                        {formState.errors.spouse?.firstName && <p className="text-red-500 text-sm font-semibold">{formState.errors.spouse.firstName.message}</p>}
                      </div>
                    )
                  }}
                />

              <Controller
                control={form.control}
                name="spouse.lastName"
                render={({ formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="spouse-lastName"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Last Name
                      </Label>
                      <Input  id="spouse-lastName"
                              {...form.register("spouse.lastName", {
                                required: "Last name is required",
                              })}
                      />
                      {formState.errors.spouse?.lastName && <p className="text-red-500 text-sm font-semibold">{formState.errors.spouse.lastName.message}</p>}
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
export default SpouseInfo