import { Link, useLocation } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"


const AdditionalInfo = () => {

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
    if (payload.status == 'Single'){
      payload.spouse = undefined
    }
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
            <h2 className="font-semibold">Marital Status</h2>
            <p>{user?.status||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Address</h2>
            <p>{user?.address||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Country</h2>
            <p>{user?.country||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Postal Code</h2>
            <p>{user?.postalCode||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Date Of Birth</h2>
            <p>{user?.email||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Gender</h2>
            <p>{user?.gender||'No data'}</p>
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
                name="status"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="status"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Marital Status
                      </Label>
                      <Select
                        onValueChange={field.onChange} defaultValue={field.value}
                      >
                        <SelectTrigger id="status" className="w-full">
                          <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Single">Single</SelectItem>
                        </SelectContent>
                      </Select>
                      {formState.errors.status && <p className="text-red-500 text-sm font-semibold">{formState.errors.status.message}</p>}
                    </div>
                  )
                }}
              />


                <Controller
                  control={form.control}
                  name="address"
                  render={({ formState }) => {
                    return (
                      <div data-slot="form-item" className="grid gap-2">
                        <Label data-slot="form-label"
                               data-error="false"
                               htmlFor="address"
                               className="gap-x-1"
                        >
                          <span className="text-red-500">*</span>Address
                        </Label>
                        <Input  id="address"
                                {...form.register("address", {
                                  required: "Address is required",
                                })}
                        />
                        {formState.errors.address && <p className="text-red-500 text-sm font-semibold">{formState.errors.address.message}</p>}
                      </div>
                    )
                  }}
                />

              <Controller
                control={form.control}
                name="country"
                render={({ formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="country"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Country
                      </Label>
                      <Input  id="country"
                              {...form.register("country", {
                                required: "Country is required",
                              })}
                      />
                      {formState.errors.country && <p className="text-red-500 text-sm font-semibold">{formState.errors.country.message}</p>}
                    </div>
                  )
                }}
              />

              <Controller
                control={form.control}
                name="postalCode"
                render={({ formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="postalCode"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Postal Code
                      </Label>
                      <Input  id="postalCode"
                              {...form.register("postalCode", {
                                required: "Postal Code is required",
                              })}
                      />
                      {formState.errors.postalCode && <p className="text-red-500 text-sm font-semibold">{formState.errors.postalCode.message}</p>}
                    </div>
                  )
                }}
              />

              <Controller
                control={form.control}
                name="gender"
                render={({ formState, field }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="gender"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Gender
                      </Label>
                      <Select
                        onValueChange={field.onChange} defaultValue={field.value}
                      >
                        <SelectTrigger id="gender" className="w-full">
                          <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      {formState.errors.gender && <p className="text-red-500 text-sm font-semibold">{formState.errors.gender.message}</p>}
                    </div>
                  )
                }}
              />


              <Controller
                control={form.control}
                name="birthday"
                render={({ formState,field }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="birthday"
                             className="gap-x-1"
                      >
                        <span className="text-red-500">*</span>Birthday
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                            <Button
                              className="w-full flex"
                              variant={"outline"}
                            >
                              {field.value&& (
                                format(field.value, "PPP")
                              )}
                                <CalendarIcon className=" h-4 w-4 opacity-50 block" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {formState.errors.birthday && <p className="text-red-500 text-sm font-semibold">{formState.errors.birthday.message}</p>}
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
export default AdditionalInfo